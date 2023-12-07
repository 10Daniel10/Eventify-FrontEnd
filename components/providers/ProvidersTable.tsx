import { FC, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CustomAlert } from '../form/CustomAlert';

export const ProvidersTable:FC<any> = ({reservations}) => {
  return (
    reservations.length ? (
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
            {reservations.map((reservation: { products: any[]; startDateTime: string; }) => (  
              reservation.products?.map((row: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; category: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }; price: number; }, key: Key | null | undefined) => (
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
      <CustomAlert severity={'info'} message={'No se registran reservas en el período seleccionado'}/>
    )
  );
}