'use client';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { checkIfEmailExists, comparePassword, validateEmail, validatePasswordLength } from 'utils/validations';
import { TUserRegister } from 'types';
import { createUser } from 'eventapp/services/auth.service';
import { Toast } from '../form/Toast';
import { CustomLink } from '../form/CustomLink';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { CustomTitle } from '../layout/CustomTitle';
import { CustomSwitch } from '../form/CustomSwitch';
import { CustomSelect } from '../form/CustomSelect';
import s from '../../styles/auth/Auth.module.css';

const initialData: TUserRegister = {
  username: '',
  firstname: '',
  lastname: '',
  type: 'USER',
  email: '',
  password: '',
  confirmPassword: '',
  isProvider: false,
  providerName: '',
  providerInformation: '',
  providerAddress: ''
}

export const RegisterForm: FC = () => {
  const router = useRouter();

  const { control, handleSubmit, watch, formState: {errors}, clearErrors } = useForm<TUserRegister>();
  const isProvider = watch('isProvider');

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

    clearErrors();

    if (Object.keys(errors).length > 0) {
      return;
    }

    const emailExists = await checkIfEmailExists(data.email);

    if (emailExists) {
      control.setError('email', { message: 'El email ingresado ya está registrado. Inicia sesión o utiliza un email nuevo' });
      return;
    }

    const userType = isProvider ? 'PROVIDER' : 'USER';
    const userData: TUserRegister = {
      ...data,
      type: userType,
    };

    const response = await createUser(userData);

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

        if(isProvider){
          const providerId = responseData.providerInfo.id;
          localStorage.setItem('providerId', JSON.stringify(providerId));
        }

        localStorage.setItem('loginUser', JSON.stringify(userInformation));

        router.push('/');
      } else{
        setCredentialsError(true);
        setCredentialsErrorMessage('Ha ocurrido un error, revisa los datos ingresados');
      }
    } catch(error: any){
      setCredentialsError(true);
      setCredentialsErrorMessage(`Error al registrar usuario: ${error}`);
    }
  };

  const containerClass = `${s.container} ${s['register-container']}`

  return(
    <Container className={containerClass}>
      <Toast open={credentialsError} onClose={handleCloseToast} severity="error" message={credentialsErrorMessage}/>
      <Box>
        <CustomLink href="/" underline="none" customVariant="link" customColor="gray"><ArrowBack/></CustomLink>
        <CustomTitle color="gray" htmlTag="h2" text="Registrarme" className={s.title}/>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <CustomInput
                type="password"
                name="confirmPassword"
                label="Confirmar contraseña"
                control={control}
                defaultValue={initialData.confirmPassword}
                placeholder="······"
                required={true}
                error={Boolean(errors?.confirmPassword)}
                helperText={errors?.confirmPassword?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomSwitch
                name="isProvider"
                label="Soy proveedor"
                control={control}
                defaultChecked={false}
              />
            </Grid>
            {isProvider && (
              <>
                <Grid item xs={12} sm={6}>
                  <CustomInput
                    type="text"
                    name="providerName"
                    label="Nombre de proveedor"
                    control={control}
                    defaultValue={initialData.providerName}
                    placeholder="Ej. Supercatering"
                    required={isProvider}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomSelect
                    name="providerAddress"
                    label="Provincia"
                    control={control}                    
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="Buenos Aires">Buenos Aires</MenuItem>
                    <MenuItem value="CABA">CABA</MenuItem>
                    <MenuItem value="Catamarca">Catamarca</MenuItem>
                    <MenuItem value="Chaco">Chaco</MenuItem>
                    <MenuItem value="Chubut">Chubut</MenuItem>
                    <MenuItem value="Córdoba">Córdoba</MenuItem>
                    <MenuItem value="Corrientes">Corrientes</MenuItem>
                    <MenuItem value="Entre Ríos">Entre Ríos</MenuItem>
                    <MenuItem value="Formosa">Formosa</MenuItem>
                    <MenuItem value="Jujuy">Jujuy</MenuItem>
                    <MenuItem value="La Pampa">La Pampa</MenuItem>
                    <MenuItem value="La Rioja">La Rioja</MenuItem>
                    <MenuItem value="Mendoza">Mendoza</MenuItem>
                    <MenuItem value="Misiones">Misiones</MenuItem>
                    <MenuItem value="Neuquén">Neuquén</MenuItem>
                    <MenuItem value="Río Negro">Río Negro</MenuItem>
                    <MenuItem value="Salta">Salta</MenuItem>
                    <MenuItem value="San Juan">San Juan</MenuItem>
                    <MenuItem value="San Luis">San Luis</MenuItem>
                    <MenuItem value="Santa Cruz">Santa Cruz</MenuItem>
                    <MenuItem value="Santa Fe">Santa Fe</MenuItem>
                    <MenuItem value="Santiago del Estero">Santiago del Estero</MenuItem>
                    <MenuItem value="Tierra del Fuego">Tierra del Fuego</MenuItem>
                    <MenuItem value="Tucumán">Tucumán</MenuItem>
                  </CustomSelect>
                </Grid>
                <Grid item xs={12}>
                  <CustomInput
                    type="text"
                    name="providerInformation"
                    label="Información"
                    control={control}
                    defaultValue={initialData.providerName}
                    placeholder="Ej. Somos una empresa dedicada a..."
                    required={isProvider}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} className={s['register-button']}>
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