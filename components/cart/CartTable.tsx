import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Section } from '../layout/Section';
import { CustomTitle } from '../layout/CustomTitle';
import { CustomLink } from '../form/CustomLink';
import { AddCircleOutline, Visibility } from '@mui/icons-material';
import { Box } from '@mui/material';
import s from '../../styles/services/ProviderServices.module.css';
import { IReservations } from 'interfaces';
import { sendReservations } from 'eventapp/services/cart/cart.services';
import { useRouter } from 'next/router';


export const CartTable:React.FC<IReservations> = ({ reservations }) => {
  const router = useRouter();
  const total = reservations.reduce((total, objetoFecha) => {
    const totalTemporal = objetoFecha.products.reduce((subtotal, producto) => {      
      return subtotal + (producto.price || 0.00);
    }, 0);
  
    return total + totalTemporal;
  }, 0);
  

  function sendReservation(){
    sendReservations()
    router.push("ok")
  }

  return (
    <Section className={s.container}>

      <Box className={s['title-box']}>
        <CustomTitle color='primary' htmlTag='h1' text='Reservas por realizar' />        
        <CustomLink onclick={sendReservation} customVariant='link' customColor='primary'>
          <AddCircleOutline /> Terminar reserva
        </CustomLink>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>              
              <TableCell>Nombre</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell align={"right"}>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>          
            {reservations != null && reservations.map((reservation, reservationkey) => (  
                reservation.products?.map((row, key) => (                    
                    <TableRow
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >                
                        <TableCell>{reservation.startDateTime.replace("T00:00:00","")}</TableCell>
                        <TableCell>{row.name}</TableCell>                        
                        <TableCell>{row.category?.name}</TableCell>                              
                        <TableCell align={"right"}>$ {row.price.toFixed(2)}</TableCell>
                    </TableRow>
                ))                           
            ))}
            <TableRow key={434344} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>      
              <TableCell></TableCell>
              <TableCell></TableCell>                        
              <TableCell></TableCell>                              
              <TableCell align={"right"}>$ {total.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
}





   
