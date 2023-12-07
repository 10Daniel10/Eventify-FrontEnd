'use client';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { CustomInput } from '../form/CustomInput';
import { CustomButton } from '../form/CustomButton';

type TInitialData = {
  date: Date;
}
const initialData: TInitialData = {
  date: new Date()
}

export const ServiceBooking: FC = () => {
  const { control, handleSubmit, formState: {errors}} = useForm<TInitialData>();

  const onSubmit: SubmitHandler<TInitialData> = async (data) => {
    console.log(data);
  };

  return(
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomInput
            type="date"
            name="date"
            label="Fecha"
            control={control}
            defaultValue={initialData.date}
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