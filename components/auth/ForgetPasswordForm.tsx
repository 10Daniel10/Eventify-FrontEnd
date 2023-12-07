'use client';
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Toast } from '../form/Toast';
import { checkIfEmailExists, validateEmail } from 'utils/validations';
import { CustomLink } from '../form/CustomLink';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { CustomTitle } from '../layout/CustomTitle';
import { TUserEmail } from 'types';
import s from '../../styles/auth/Auth.module.css';

const initialData = {
  email: ''
}

export const ForgetPasswordForm: FC = () => {
  const { control, handleSubmit, formState: {errors}, reset } = useForm<TUserEmail>();

  const [success, setSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);

  const [nextStep, setNextStep] = useState<boolean>(false);

  const handleCloseToast = () => {
    setSuccess(false);
  };

  const onSubmit: SubmitHandler<TUserEmail> = async (data) => {
    const emailValidation = validateEmail(data.email);

    if (!emailValidation) {
      control.setError('email', { message: emailValidation });
    }

    reset();

    if (Object.keys(errors).length > 0) {
      return;
    }

    const emailExists = await checkIfEmailExists(data.email);

    if (emailExists) {
      setSuccess(true);
      setSuccessMessage('Email enviado: revisa tu correo y sigue los pasos para recuperar tu contraseña');
      setNextStep(true);
    } else{
      control.setError('email', { message: 'El email ingresado no existe. Regístrate o ingresa un email válido' });
      return;
    }
  };

  return(
    <Container className={s.container}>
      {!nextStep ? (
        <>
          <Toast open={success} onClose={handleCloseToast} severity="success" message={successMessage}/>
          <Box>
            <CustomLink href="/" underline="none" customVariant="link" customColor="gray"><ArrowBack/></CustomLink>
            <CustomTitle color="gray" htmlTag="h2" text="Recuperar contraseña" className={s.title}/>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomInput
                    type="email"
                    name="email"
                    label="Ingresa tu email"
                    control={control}
                    defaultValue={initialData.email}
                    placeholder="Ej: maria@perez.com"
                    required={true}
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomButton type="submit" variant="contained" customColor="primary">Enviar correo</CustomButton>
                </Grid>
              </Grid>
            </Box>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
              <CustomLink href="/auth/login" underline="none" customVariant="link" customColor="primary">Iniciar sesión</CustomLink>
              <CustomLink href="/auth/register" underline="none" customVariant="link" customColor="primary"><span className={s['link-description']}>¿Aún no tienes usuario?</span> Haz clic aquí</CustomLink>
            </Box>
          </Box>
        </>
      ) : (
        <Box>
          <CustomTitle color="primary" htmlTag="h2" text="¡Email enviado!" className={s.title}/>
          <Typography mb={1}>Revisa tu bandeja de entrada.</Typography>
          <Typography mb={2}>Si no puedes ver el mensaje, revisa tu bandeja de spam o <CustomLink href="/auth/forgetPassword" underline="none" customVariant="link" customColor="primary" className={s['fp-link']} onclick={() => setSuccess(false)}>haz clic aquí</CustomLink> para ingresar nuevamente tu email</Typography>
          <CustomLink href="/auth/login" underline="none" customVariant="button" customColor="primary">Iniciar sesión</CustomLink>
        </Box>
      )}
    </Container>
  )
}