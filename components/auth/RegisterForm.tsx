'use client';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Toast } from '../form/Toast';
import { comparePassword, validateEmail, validatePasswordLength } from 'utils/validations';
import { CustomLink } from '../form/CustomLink';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { CustomTitle } from '../layout/CustomTitle';
import { RegisterFormT } from 'types/auth/RegisterForm.types';
import { createUser } from 'eventapp/services/auth/auth.service';
import { CustomSwitch } from '../form/CustomSwitch';
import s from '../../styles/auth/Auth.module.css';

const initialData: RegisterFormT = {
  firstname: '',
  lastname: '',
  type: 0,
  email: '',
  password: '',
  confirmPassword: ''
}

export const RegisterForm: FC = () => {
  const router = useRouter();

  const { control, handleSubmit, formState: {errors} } = useForm<RegisterFormT>();

  const [credentialsError, setCredentialsError] = useState<boolean>(false);
  const [credentialsErrorMessage, setCredentialsErrorMessage] = useState<string | undefined>(undefined);

  const handleCloseToast = () => {
    setCredentialsError(false);
  };

  const onSubmit: SubmitHandler<RegisterFormT> = async (formData) => {
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePasswordLength(formData.password);
    const passwordComparation = comparePassword(formData.password, formData.confirmPassword);

    control.setError('email', { message: emailValidation });
    control.setError('password', { message: passwordValidation });
    control.setError('confirmPassword', { message: passwordComparation });

    if (Object.keys(errors).length > 0) {
      return;
    }

    const response = await createUser(formData);

    try{
      if(!response.error){
        router.push('/');
      } else{
        setCredentialsError(true);
        setCredentialsErrorMessage(`${response.error}: ${response.message}`);
      }
    } catch(error: any){
      setCredentialsError(true);
      setCredentialsErrorMessage(`${response.error}: ${response.message}`);
    }
  };

  return(
    <Container className={s.container}>
      <Toast open={credentialsError} onClose={handleCloseToast} severity="error" message={credentialsErrorMessage}/>
      <Box>
        <CustomLink href="/" underline="none" customVariant="link" customColor="gray"><ArrowBack/></CustomLink>
        <CustomTitle color="gray" htmlTag="h2" text="Registrarme" className={s.title}/>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                type="text"
                name="firstname"
                label="Nombre"
                control={control}
                defaultValue={initialData.firstname}
                placeholder="Ej: María"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="text"
                name="lastname"
                label="Apellido"
                control={control}
                defaultValue={initialData.lastname}
                placeholder="Ej: Pérez"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="email"
                name="email"
                label="Email"
                control={control}
                defaultValue={initialData.email}
                placeholder="Ej: maria@perez.com"
                required={true}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="password"
                name="password"
                label="Contraseña"
                control={control}
                defaultValue={initialData.password}
                placeholder="······"
                required={true}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="password"
                name="confirmPassword"
                label="Confirmar contraseña"
                control={control}
                defaultValue={initialData.confirmPassword}
                placeholder="······"
                required={true}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomSwitch
                name="type"
                label="Soy proveedor"
                control={control}
                defaultChecked={Boolean(initialData.type === 1)}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton type="submit" variant="contained" customColor="primary">Registrarme</CustomButton>
            </Grid>
          </Grid>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <CustomLink href="/auth/login" underline="none" customVariant="link" customColor="primary"><span className={s['link-description']}>¿Ya tienes usuario?</span> Haz clic aquí</CustomLink>
        </Box>
      </Box>
    </Container>
  )
}