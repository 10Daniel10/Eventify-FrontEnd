'use client';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Toast } from '../form/Toast';
import {
  comparePassword,
  validateEmail,
  validatePasswordLength,
} from 'utils/validations';
import { CustomLink } from '../form/CustomLink';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { CustomTitle } from '../layout/CustomTitle';
import { ProfileFormT } from 'types/auth/ProfileForm.types';
import { createUser } from 'eventapp/services/auth/auth.service';
import s from '../../styles/auth/Auth.module.css';
import Avatar from '@mui/material/Avatar';

const initialData: ProfileFormT = {
  firstname: 'Maria',
  lastname: 'Perez',
  type: 0,
  email: 'maria@perez.com',
  password: '*******',
};

export const ProfileForm: FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormT>();

  const [credentialsError, setCredentialsError] = useState<boolean>(false);
  const [credentialsErrorMessage, setCredentialsErrorMessage] = useState<
    string | undefined
  >(undefined);

  const handleCloseToast = () => {
    setCredentialsError(false);
  };

  const onSubmit: SubmitHandler<ProfileFormT> = async (formData) => {
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePasswordLength(formData.password);
    const passwordComparation = comparePassword(
      formData.password,
      formData.confirmPassword
    );

    control.setError('email', { message: emailValidation });
    control.setError('password', { message: passwordValidation });
    control.setError('confirmPassword', { message: passwordComparation });

    if (Object.keys(errors).length > 0) {
      return;
    }

    const response = await createUser(formData);

    try {
      if (!response.error) {
        router.push('/');
      } else {
        setCredentialsError(true);
        setCredentialsErrorMessage(`${response.error}: ${response.message}`);
      }
    } catch (error: any) {
      setCredentialsError(true);
      setCredentialsErrorMessage(`${response.error}: ${response.message}`);
    }
  };

  return (
    <Container className={s.container}>
      <Toast
        open={credentialsError}
        onClose={handleCloseToast}
        severity='error'
        message={credentialsErrorMessage}
      />
      <Box>
        <CustomLink
          href='/'
          underline='none'
          customVariant='link'
          customColor='gray'
        >
          <ArrowBack />
        </CustomLink>
        <CustomTitle
          color='gray'
          htmlTag='h2'
          text='Mi Perfil'
          className={s.title}
        />
        <Grid item xs={12} mb={2}>
          <Avatar
            alt='Foto de perfil'
            src=''
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                type='text'
                name='firstname'
                label='Nombre'
                control={control}
                defaultValue={initialData.firstname}
                placeholder='Ej: María'
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type='text'
                name='lastname'
                label='Apellido'
                control={control}
                defaultValue={initialData.lastname}
                placeholder='Ej: Pérez'
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type='email'
                name='email'
                label='Email'
                control={control}
                defaultValue={initialData.email}
                placeholder='Ej: maria@perez.com'
                required={true}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type='password'
                name='password'
                label='Contraseña'
                control={control}
                defaultValue={initialData.password}
                placeholder='······'
                required={true}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid container justifyContent='center' spacing={2} mt={2}>
              <Grid item>
                <CustomButton
                  type='submit'
                  variant='contained'
                  customColor='secondary'
                >
                  Guardar
                </CustomButton>
              </Grid>
              <Grid item>
                <CustomButton
                  type='submit'
                  variant='contained'
                  customColor='gray'
                >
                  Cancelar
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box display={'flex'} justifyContent={'center'}>
          <Grid item xs={12}>
            <CustomButton
              type='submit'
              variant='contained'
              customColor='primary'
            >
              Ver Mis Reservas
            </CustomButton>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
