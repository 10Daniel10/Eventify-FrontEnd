import React, { FC, useState } from 'react';
import {
  Container,
  Box,
  Link,
  Typography,
  Grid,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
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

export const ServiceReservation: FC<ServiceReservationProps> = ({
    servicePrice,
  }) => {
    const { control, handleSubmit, setValue } = useForm<ReservationFormData>({
      defaultValues: initialReservationData,
    });

    const [reservationData, setReservationData] = useState<ReservationFormData>(
        initialReservationData
    );

    const handleHoursCountChange = (value: string) => {
        const hours = parseInt(value, 10) || 1;
        const totalPrice = servicePrice * hours;
    
        setReservationData((prevData) => ({
          ...prevData,
          hours,
          totalPrice,
        }));
    
        setValue('hoursCount', hours);
        setValue('totalPrice', totalPrice);
    };

    const onSubmit: SubmitHandler<ReservationFormData> = (formData) => {
        console.log('Reserva enviada:', formData);
    };

  return (
    <Container className={s.container}>
      <Box>
        <Link href="/" underline="none" className="grayLink" mt={2} mb={2} display="flex">
        </Link>
        <Typography variant="h4" mt={2} mb={4} className="colorGray">
          Formulario de reserva
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomInput
                    type="date"
                    name="day"
                    label=""
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
                    type="hours"
                    name="hours"
                    label="Horas"
                    control={control}
                    placeholder="Cantidad de horas"
                    required={true}
                    onChange={(e) => handleHoursCountChange(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" className="colorGray">
                Precio total: ${reservationData.totalPrice}
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