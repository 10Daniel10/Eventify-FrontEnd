'use client';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Toast } from '../form/Toast';
import { validateEmail } from 'utils/validations';
import { CustomLink } from '../form/CustomLink';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { CustomTitle } from '../layout/CustomTitle';
import { IUser } from 'interfaces';
import { editProfile } from 'eventapp/services/users/users.service';
import s from '../../styles/auth/Auth.module.css';

interface IEditProfile {
  user: IUser;
}

export const EditProfile: FC<IEditProfile> = ({ user }) => {
  const router = useRouter();

  const { control, handleSubmit, formState: {errors}, reset } = useForm<IUser>({defaultValues: user});

  const [toast, setToast] = useState<'error' | 'success' | ''>('');
  const [toastMessage, setToastMessage] = useState<string | undefined>(undefined);

  const handleCloseToast = () => {
    setToast('');
  };

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const emailValidation = validateEmail(data.email);

    control.setError('email', { message: emailValidation });

    reset();

    if (Object.keys(errors).length > 0) {
      return;
    }

    const response = await editProfile(data);

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

        setToast('success');
        setToastMessage('Datos actualizados con éxito');

        router.push('/');
      } else{
        setToast('error');
        setToastMessage('Error al editar los datos del usuario');
      }
    } catch(error: any){
      setToast('error');
      setToastMessage(`Error al editar los datos del usuario: ${error}`);
    }
  };

  return(
    <Container className={`${s.container} ${s['edit-profile']}`}>
      {(toast === 'success' || toast === 'error') && <Toast open={true} onClose={handleCloseToast} severity={toast} message={toastMessage}/>}
      <Box>
        <CustomLink href="/" underline="none" customVariant="link" customColor="gray"><ArrowBack/></CustomLink>
        <CustomTitle color="gray" htmlTag="h2" text="Editar mis datos" className={s.title}/>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                type="text"
                name="firstname"
                label="Nombre"
                control={control}
                defaultValue={user.firstname}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="text"
                name="lastname"
                label="Apellido"
                control={control}
                defaultValue={user.lastname}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="text"
                name="username"
                label="Nombre de usuario"
                control={control}
                defaultValue={user.username}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="email"
                name="email"
                label="Email"
                control={control}
                defaultValue={user.email}
                required={true}
                error={Boolean(errors?.email)}
                helperText={errors?.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton type="submit" variant="contained" customColor="primary">Gaurdar cambios</CustomButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}