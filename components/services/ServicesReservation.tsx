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
import { getIdUser } from 'eventapp/services/users/users.service';

type TInitialData = {
  dateReservation: Date;
}
const initialData: TInitialData = {
  dateReservation: new Date()
}

export const ServiceReservation: FC<IServices> = ({service}) => {
  const router = useRouter();
  const userId = getIdUser();  
  const { control, handleSubmit, formState: {errors} } = useForm<TInitialData>();
  const { id, name, bookedDates } = service;  
console.log(bookedDates)
  
  const numeroRandom = Math.floor(Math.random() * 9) + 1;
  const onSubmit: SubmitHandler<TInitialData> = async (data) => {  
    var fechaComoCadena = `${data.dateReservation}`;
    const reserved = bookedDates?.some(x => x == `${data.dateReservation}`);
    if(reserved) alert("reservado")
    addProduct(userId,fechaComoCadena, service);
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