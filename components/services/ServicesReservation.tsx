'use client';
import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';
import { IServices } from 'interfaces';
import { addProduct } from 'eventapp/services/cart/cart.services';
import { useRouter } from 'next/router';
import { getIdUser } from 'eventapp/services/users/users.service';
import Swal from 'sweetalert2'

type TInitialData = {
  dateReservation: Date;
}
const initialData: TInitialData = {
  dateReservation: new Date()
}

export const ServiceReservation: FC<IServices> = ({service}) => {
  const router = useRouter();
  const userId = getIdUser(); 
  const [disabled, setDisabled] = useState(false) 
  const { control, handleSubmit, formState: {errors} } = useForm<TInitialData>();
  const { id, name, bookedDates } = service;   
  
  const onSubmit: SubmitHandler<TInitialData> = async (data) => {  
    var fechaComoCadena = `${data.dateReservation}`;
    const reserved = bookedDates?.some(x => x == `${data.dateReservation}`);
    if(reserved){ 
      showSwalError();
      return
    }
    addProduct(userId,fechaComoCadena, service);
    showSwalSuccess(fechaComoCadena);
  };

  const sendToCart = () => {
    router.push('/cart');
  }

  const showSwalError = () => {
    Swal.fire({
      icon: "error",
      title: "Lo siento",
      text: "Esta fecha ya se encuentra reservada",
      confirmButtonText: "Ver otros servicios",      
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/services');
      }
    });
  }

  const showSwalSuccess = (fechaComoCadena : string) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Reservada realizada!`,
      html: `Se reservo <b>${name}</b> el día : <b>${fechaComoCadena}</b>`,   
      showCancelButton: true,
      confirmButtonColor: "#2ABCC8",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Seguir viendo servicios",
      cancelButtonText: "Finalizar Reservas",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/services');
      }
      if(result.isDismissed){
        sendToCart()
      }
    });
    setDisabled(true)
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