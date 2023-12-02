'use client';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { IServices } from 'interfaces';
import { addProduct } from 'eventapp/services/cart/cart.services';

type TInitialData = {
  dateReservation: Date;
}
const initialData: TInitialData = {
  dateReservation: new Date()
}

export const ServiceReservation: FC<IServices> = ({service}) => {
  const { control, handleSubmit, formState: {errors} } = useForm<TInitialData>();
  const { id, name } = service;

  const onSubmit: SubmitHandler<TInitialData> = async (data) => {
    const userId = 1;
    addProduct(userId,data.dateReservation.toISOString(), id, name);
    
  };

  return(
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomInput
            type="date"
            name="dateReservation"
            label="Fecha"
            control={control}
            //defaultValue={initialData.dateLocura}
            placeholder="DD/MM/AAAA"
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton type="submit" variant="contained" customColor="primary">Reservar</CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}