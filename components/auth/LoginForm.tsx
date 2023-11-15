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
import s from '../../styles/auth/LoginForm.module.css';
import { LoginFormT } from 'types/auth/LoginForm.types';
import { loginUser } from 'eventapp/services/auth/auth.service';

const initialData = {
  email: '',
  password: ''
}

export const LoginForm: FC = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<LoginFormT>();

  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | undefined>(undefined);

  const [pswError, setPswError] = useState<boolean>(false);
  const [pswErrorMessage, setPswErrorMessage] = useState<string | undefined>(undefined);

  const [credentialsError, setCredentialsError] = useState<boolean>(false);
  const [credentialsErrorMessage, setCredentialsErrorMessage] = useState<string | undefined>(undefined);

  const handleCloseToast = () => {
    setCredentialsError(false);
  };

  const onSubmit: SubmitHandler<LoginFormT> = async (formData) => {
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePasswordLength(formData.password);

    setEmailError(emailValidation !== undefined);
    setEmailErrorMessage(emailValidation);
    setPswError(passwordValidation !== undefined);
    setPswErrorMessage(passwordValidation);

    if (emailValidation) {
      setEmailError(true);
      setEmailErrorMessage(emailValidation);
      return;
    }

    if (passwordValidation) {
      setPswError(true);
      setPswErrorMessage(passwordValidation);
      return;
    }

    const response = await loginUser(formData);

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
    <Container>
      <Toast open={credentialsError} onClose={handleCloseToast} severity="error" message={credentialsErrorMessage}/>
      <Box>
        <CustomLink href="/" underline="none" customVariant="link" customColor="gray"><ArrowBack/></CustomLink>
        <CustomTitle color="gray" htmlTag="h2" text="Iniciar sesión"/>
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
                error={emailError}
                helperText={emailErrorMessage}
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
                error={pswError}
                helperText={pswErrorMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton type="submit" variant="contained" customColor="primary">Iniciar sesión</CustomButton>
            </Grid>
          </Grid>
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
          <CustomLink href="/" underline="none" customVariant="link" customColor="gray">Olvidé mi contraseña</CustomLink>
          <CustomLink href="/auth/register" underline="none" customVariant="link" customColor="primary"><span className={s['link-description']}>Aún no tienes usuario?</span> Haz clic aquí</CustomLink>
        </Box>
      </Box>
    </Container>
  )
}