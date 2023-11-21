'use client';
import React, { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { CustomTitle } from '../layout/CustomTitle';
import s from '../../styles/auth/Auth.module.css';

interface ServiceReservationProps {
  servicePrice: number;
}

interface ReservationFormData {
  day: string;
  hour: string;
  hoursCount: number;
  totalPrice: number;
}

const initialReservationData: ReservationFormData = {
  day: '',
  hour: '',
  hoursCount: 1,
  totalPrice: 0,
};

export const ServiceReservation: FC<ServiceReservationProps> = ({ servicePrice }) => {
  const [price, setPrice] = useState(0);

  const { control, handleSubmit } = useForm<ReservationFormData>();

  const handleHoursCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseInt(e.target.value);
    setPrice(newPrice * servicePrice);
  };

  const onSubmit: SubmitHandler<ReservationFormData> = (formData) => {
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
                label="Fecha"
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                type="time"
                name="time"
                label=""
                control={control}
                placeholder="Ej: 18:00"
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomInput
                type="number"
                name="hours"
                label="Horas"
                control={control}
                placeholder="Cantidad de horas"
                required={true}
                onChange={handleHoursCountChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" className="colorGray">
                Precio total: ${price}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
          <CustomButton type="submit" variant="contained" customColor="primary">Reservar</CustomButton>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};