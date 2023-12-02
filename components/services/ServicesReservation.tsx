'use client';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { IServices } from 'interfaces';
import { addProduct } from 'eventapp/services/cart/cart.services';
import { useRouter } from 'next/router';

type TInitialData = {
  dateReservation: Date;
}
const initialData: TInitialData = {
  dateReservation: new Date()
}

export const ServiceReservation: FC<IServices> = ({service}) => {
  const router = useRouter();
  
  const { control, handleSubmit, formState: {errors} } = useForm<TInitialData>();
  const { id, name } = service;

  const numeroRandom = Math.floor(Math.random() * 9) + 1;
  const onSubmit: SubmitHandler<TInitialData> = async (data) => {

    console.log(data)
    const userId = 1;
   
    var fechaComoCadena = `2023-0${numeroRandom}-0${numeroRandom}`;
    addProduct(userId,fechaComoCadena, id, name);
  };

  const sendToCart = () => {
    router.push('/cart');
  }

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
          <CustomButton type="button" onClick={sendToCart} variant="contained" customColor="primary">Finalizar reservas</CustomButton>
        </Grid>
      </Grid>
    </Box>
  )
}