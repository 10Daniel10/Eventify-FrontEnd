import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Section } from '../layout/Section';
import { CustomTitle } from '../layout/CustomTitle';
import { IReservations } from 'interfaces/IReservations';
import s from '../../styles/services/ProviderServices.module.css';
import { Card, CardContent, Typography } from '@mui/material';
import { CustomAlert } from '../form/CustomAlert';


export const ProvidersTable:FC<any> = ({reservations}) => {
    
  return (
    <Section className={s.container}>
      <Box className={s['title-box']}>
        <CustomTitle color='primary' htmlTag='h1' text='Historial de reservas' />
      </Box>

      {reservations.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>              
                <TableCell>Nombre</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell align={"right"}>Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>          
              {reservations.map((reservation) => (  
                reservation.products?.map((row, key) => (
                  <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >                
                    <TableCell>{reservation.startDateTime.split("T")[0]}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.category?.name}</TableCell>
                    <TableCell align={"right"}>$ {row.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CustomAlert severity={'info'} message={'Aún no tienes reservas. Selecciona una fecha y un servicio para generar una.'}/>
      )}
    </Section>
  );
}