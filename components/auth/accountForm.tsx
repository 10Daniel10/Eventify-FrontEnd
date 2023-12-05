import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CustomLink } from '../form/CustomLink';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { CustomTitle } from '../layout/CustomTitle';
import s from '../../styles/auth/Auth.module.css';
import { IUser } from 'interfaces';

interface AccountFormData {
  email?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  urlImage?: string;
}

interface AccountFormProps {
  user: IUser;
}

export const AccountForm: FC <AccountFormProps> = ({user}) => {
    
  const { control, handleSubmit } = useForm<IUser>({ defaultValues: user });

  const onSubmit: SubmitHandler<AccountFormData> = async (data) => {
    
    console.log('Datos del usuario:', data);
  };

  return (
    <Container className={s.container}>
      <Box>
        <CustomLink href="/" underline="none" customVariant="link" customColor="gray"></CustomLink>
        <CustomTitle color="gray" htmlTag="h2" text="Editar datos de usuario" className={s.title}/>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                type="email"
                name="email"
                label="Email"
                control={control}
                placeholder="Ej: maria@perez.com"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="text"
                name="username"
                label="Nombre de usuario"
                control={control}
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
                placeholder="Ej: Pérez"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                type="text"
                name="urlImage"
                label="URL de la imagen"
                control={control}
                placeholder="Ej: https://example.com/image.jpg"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton type="submit" variant="contained" customColor="primary">Guardar cambios</CustomButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};