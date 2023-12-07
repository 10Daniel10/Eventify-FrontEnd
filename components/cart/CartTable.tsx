import { useState } from 'react';
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
import { CustomLink } from '../form/CustomLink';
import { CustomAlert } from 'eventapp/components/form/CustomAlert';
import { AddCircleOutline } from '@mui/icons-material';
import { IReservations } from 'interfaces';
import { sendReservations } from 'eventapp/services/cart/cart.services';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import s from '../../styles/cart/CartTable.module.css';

export const CartTable:React.FC<IReservations> = ({ reservations }) => {
  const router = useRouter();
  const [swalShown, setSwalShown] = useState(false);

  const total = reservations.reduce((total, objetoFecha) => {
    const totalTemporal = objetoFecha.products.reduce((subtotal, producto) => {      
      return subtotal + (producto.price || 0.00);
    }, 0);
  
    return total + totalTemporal;
  }, 0);

  function sendReservation(){    
    showSwal()
  }

  let timerInterval;
  const showSwal = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Reserva realizada con éxito.",
      html: "<small>Serás redirigido a tu carrito en <b></b></small>",
      showConfirmButton: (true),                
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        // Swal.showLoading();
        const timer = Swal.getPopup()?.querySelector("b");
        if(timer){
          const updateTimer = () => {
            const timerLeft = Swal.getTimerLeft();
            if (timerLeft !== null && timerLeft !== undefined) {
              timer.textContent = `${Math.round(timerLeft / 60)}`;
            } else {
              clearInterval(timerInterval);
              console.error("Valor de timerLeft indefinido");
            }
          };
          updateTimer();
          const timerInterval = setInterval(updateTimer, 100);         
        }
      },
      didClose: () => setSwalShown(false),
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        sendReservations()
        router.push("reservations")
      }
    })
  }

  return (
    <Section className={s.container}>
      <CustomTitle color='primary' htmlTag='h1' text='Carrito de reservas' className={s.title} />
      {reservations.length > 0 ? (
        <>
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
                    <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>                
                      <TableCell>{reservation.startDateTime.replace("T00:00:00","")}</TableCell>
                      <TableCell>{row.name}</TableCell>                        
                      <TableCell>{row.category?.name}</TableCell>                              
                      <TableCell align={"right"}>$ {row.price?.toFixed(2) || 0.00}</TableCell>
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
          <Box display={'flex'} justifyContent={'flex-end'} mt={2}>
            <CustomLink onclick={sendReservation} customVariant='button' customColor='primary' className={s.button}><AddCircleOutline /> Finalizar reserva</CustomLink>
          </Box>
        </>
      ) : (
        <CustomAlert severity={'info'} message={'Aún no hay reservas en tu carrito.'}/>
      )}
    </Section>
  );
}