import React, { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Toast } from '../form/Toast';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { validateEmail } from 'utils/validations';
import { Section } from '../layout/Section';
import { CustomTitle } from '../layout/CustomTitle';
import s from '../../styles/home/CallToAction.module.css';
import { TUserEmail } from 'types';

const initialData = {
  email: ''
}

export const CallToAction:FC = () => {
  const { control, handleSubmit, formState: {errors} } = useForm<TUserEmail>();

  const [credentialsError, setCredentialsError] = useState<boolean>(false);
  const [credentialsErrorMessage, setCredentialsErrorMessage] = useState<string | undefined>(undefined);

  const handleCloseToast = () => {
    setCredentialsError(false);
  };

  const onSubmit: SubmitHandler<TUserEmail> = async (data: TUserEmail) => {
    const emailValidation = validateEmail(data.email);

    if (!emailValidation) {
      control.setError('email', { message: emailValidation });
    }

    if (Object.keys(errors).length > 0) {
      return;
    }

    const response = await validateEmail(data.email);

    try{
      if(response){
        alert('Email enviado');
      } else{
        setCredentialsError(true);
        setCredentialsErrorMessage(`Email inválido`);
      }
    } catch(error: any){
      setCredentialsError(true);
      setCredentialsErrorMessage(`Email inválido`);
    }
  };

  return (
    <Section className={s.container}>
      <Toast open={credentialsError} onClose={handleCloseToast} severity="error" message={credentialsErrorMessage}/>
      <CustomTitle text={'Agenda una demo con nuestros especialistas'} className={s.title}/>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
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
            <Grid item xs={12} sm={4}>
              <CustomButton type="submit" variant="contained" customColor="primary" className={s.button}>Agendar</CustomButton>
            </Grid>
          </Grid>
        </Box>
    </Section>
  )
}