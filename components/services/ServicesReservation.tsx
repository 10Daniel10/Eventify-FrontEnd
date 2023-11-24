'use client';
import React, { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validateDate, validateTime, validateHours } from 'utils/validations';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { CustomTitle } from '../layout/CustomTitle';
import s from '../../styles/auth/Auth.module.css';

interface ServiceReservationProps {
  servicePrice: number;
}

interface ReservationFormData {
  date: string;
  time: string;
  hoursCount: number;
  totalPrice: number;
}

const initialReservationData: ReservationFormData = {
  date: '2023-11-22',
  time: '00:00',
  hoursCount: 1,
  totalPrice: 0,
};

export const ServiceReservation: FC<ServiceReservationProps> = ({ servicePrice }) => {
  const [price, setPrice] = useState(0);

  const { control, handleSubmit, formState: {errors} } = useForm<ReservationFormData>();

  const handleHoursCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseInt(e.target.value);
    setPrice(newPrice * servicePrice);
  };

  const onSubmit: SubmitHandler<ReservationFormData> = (formData) => {

    const dateValidation = validateDate(formData.date);
    const timeValidation = validateTime(formData.time);
    const hoursValidation = validateHours(formData.hoursCount);

    control.setError('date', { message: dateValidation });
    control.setError('time', { message: timeValidation });
    control.setError('hoursCount', { message: hoursValidation });

    if (Object.keys(errors).length > 0) {
      return;
    }

    // try{
    //   if(!response.error){
    //     router.push('/');
    //   } else{
    //     setCredentialsError(true);
    //     setCredentialsErrorMessage(`${response.error}: ${response.message}`);
    //   }
    // } catch(error: any){
    //   setCredentialsError(true);
    //   setCredentialsErrorMessage(`${response.error}: ${response.message}`);
    // }

    console.log('Reserva enviada:', formData);

  };

  return (
    <Container className={s.container}>
      <Box>
        <Link href="/" underline="none" className="grayLink" mt={2} mb={2} display="flex">
        </Link>
        <CustomTitle color="gray" htmlTag="h4" text="Formulario de reserva" className={s.title}/>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomInput
                type="date"
                name="day"
                label=""
                control={control}
                required={true}
                // defaultValue={initialReservationData.date}
                // error={Boolean(errors.date)}
                // helperText={errors.date?.message}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <CustomInput
                type="time"
                name="time"
                label=""
                control={control}
                required={true}
                // defaultValue={initialReservationData.time}
                error={Boolean(errors.time)}
                helperText={errors.time?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                type="number"
                name="hours"
                label="Horas"
                control={control}
                required={true}
                // defaultValue={initialReservationData.hoursCount}
                error={Boolean(errors.hoursCount)}
                helperText={errors.hoursCount?.message}
                onChange={handleHoursCountChange}
              />
            </Grid>
            <Grid item xs={12}>
            <OutlinedInput
              startAdornment={<InputAdornment position="start">Precio total: ${price}</InputAdornment>}
              readOnly
              fullWidth
            />
            </Grid>
            <Typography variant="subtitle2" color={"gray"}>*El precio total se calcula multiplicando el precio del servicio por la cantidad de horas del evento</Typography> */}
          </Grid>
          <Grid item xs={12}>
          <CustomButton type="submit" variant="contained" customColor="primary">Iniciar reserva</CustomButton>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};