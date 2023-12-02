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

export const CartTable:React.FC<IReservations> = ({ reservations }) => {
  
  function sendReservation(){
    alert("asd")
  }

  return (
    <Section className={s.container}>

      <Box className={s['title-box']}>
        <CustomTitle color='primary' htmlTag='h1' text='Mis reservas' />        
        <CustomLink onclick={sendReservation} customVariant='link' customColor='primary'>
          <AddCircleOutline /> Agregar
        </CustomLink>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>              
              <TableCell>Nombre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>          
            {reservations.map((reservation, reservationkey) => (  
                reservation.products?.map((row, key) => (
                    <TableRow
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >                
                        <TableCell>{reservation.starDatetime}</TableCell>
                        <TableCell>{row.name}</TableCell>                        
                    </TableRow>
                ))                
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
}





   
