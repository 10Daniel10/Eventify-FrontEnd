'use client';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { comparePassword, validateEmail, validatePasswordLength } from 'utils/validations';
import { TUserRegister } from 'types';
import { createUser } from 'eventapp/services/auth/auth.service';
import { Toast } from '../form/Toast';
import { CustomLink } from '../form/CustomLink';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { CustomTitle } from '../layout/CustomTitle';
import { CustomSwitch } from '../form/CustomSwitch';
import s from '../../styles/auth/Auth.module.css';

const initialData: TUserRegister = {
  username: '',
  firstname: '',
  lastname: '',
  type: 'USER',
  email: '',
  password: '',
  confirmPassword: ''
}

export const RegisterForm: FC = () => {
  const router = useRouter();

  const { control, handleSubmit, formState: {errors} } = useForm<TUserRegister>();

  const [credentialsError, setCredentialsError] = useState<boolean>(false);
  const [credentialsErrorMessage, setCredentialsErrorMessage] = useState<string | undefined>(undefined);

  const handleCloseToast = () => {
    setCredentialsError(false);
  };

  const onSubmit: SubmitHandler<TUserRegister> = async (data) => {
    const emailValidation = validateEmail(data.email);
    const passwordValidation = validatePasswordLength(data.password);
    const passwordComparation = comparePassword(data.password, data.confirmPassword);

    control.setError('email', { message: passwordValidation });
    control.setError('password', { message: emailValidation });
    control.setError('confirmPassword', { message: passwordComparation });

    if (Object.keys(errors).length > 0) {
      return;
    }

    const response = await createUser(data);

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
                name="username"
                label="Nombre de usuario"
                control={control}
                defaultValue={initialData.username}
                placeholder="Ej: mariaperez"
                required={true}
              />
            </Grid>
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
                name="is_provider"
                label="Soy proveedor"
                control={control}
                defaultChecked={false}
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