'use client';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Toast } from '../form/Toast';
import { validateEmail, validatePasswordLength } from 'utils/validations';
import { CustomLink } from '../form/CustomLink';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { CustomTitle } from '../layout/CustomTitle';
import { loginUser } from 'eventapp/services/auth.service';
import { TUserLogin } from 'types';
import s from '../../styles/auth/Auth.module.css';

const initialData = {
  email: '',
  password: ''
}

export const LoginForm: FC = () => {
  const router = useRouter();

  const { control, handleSubmit, formState: {errors}, reset } = useForm<TUserLogin>();

  const [credentialsError, setCredentialsError] = useState<boolean>(false);
  const [credentialsErrorMessage, setCredentialsErrorMessage] = useState<string | undefined>(undefined);

  const handleCloseToast = () => {
    setCredentialsError(false);
  };

  const onSubmit: SubmitHandler<TUserLogin> = async (data) => {
    const emailValidation = validateEmail(data.email);
    const passwordValidation = validatePasswordLength(data.password);

    control.setError('email', { message: emailValidation });
    control.setError('password', { message: passwordValidation });

    reset();

    if (Object.keys(errors).length > 0) {
      return;
    }

    const response = await loginUser(data);

    try{
      if(response.ok){
        const responseData = await response.json();

        const userInformation = {
          id: responseData.id,
          email: responseData.email,
          username: responseData.username,
          firstname: responseData.firstname,
          lastname: responseData.lastname,
          type: responseData.type
        };

        localStorage.setItem('loginUser', JSON.stringify(userInformation));

        router.push('/');
      } else{
        setCredentialsError(true);
        setCredentialsErrorMessage('Credenciales inválidas');
      }
    } catch(error: any){
      setCredentialsError(true);
      setCredentialsErrorMessage(`Error al validar credenciales: ${error}`);
    }
  };

  return(
    <Container className={s.container}>
      <Toast open={credentialsError} onClose={handleCloseToast} severity="error" message={credentialsErrorMessage}/>
      <Box>
        <CustomLink href="/" underline="none" customVariant="link" customColor="gray"><ArrowBack/></CustomLink>
        <CustomTitle color="gray" htmlTag="h2" text="Iniciar sesión" className={s.title}/>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                type="email"
                name="email"
                label="Email"
                control={control}
                defaultValue={initialData.email}
                placeholder="Ej: maria@perez.com"
                required={true}
                error={Boolean(errors?.email)}
                helperText={errors?.email?.message}
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
                error={Boolean(errors?.password)}
                helperText={errors?.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton type="submit" variant="contained" customColor="primary">Iniciar sesión</CustomButton>
            </Grid>
          </Grid>
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
          <CustomLink href="/auth/forgetPassword" underline="none" customVariant="link" customColor="gray">Olvidé mi contraseña</CustomLink>
          <CustomLink href="/auth/register" underline="none" customVariant="link" customColor="primary"><span className={s['link-description']}>¿Aún no tienes usuario?</span> Haz clic aquí</CustomLink>
        </Box>
      </Box>
    </Container>
  )
}