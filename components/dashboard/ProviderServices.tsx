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
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import s from '../../styles/services/ProviderServices.module.css';
import { Card } from '@mui/material';

// TODO: actualmente existe un IService, que no lo vamos a usar porque no está alineado con lo que le pedimos al back. Una vez que esté todo integrado, vamos a modificar la interfaz que tenemos y reemplazarla por este type para que nos quede en todos lados igual. Si lo cambio ahora, rompo tutti.
type ServiceType = {
  id: number,
  name: string,
  short_description: string,
  description: string,
  characteristics: string[],
  category: {
    id: number,
    name: string
  }, // TODO: acá después hay que reemplazarlo por el type
  provider: {
    id: number,
    name: string
  }, // TODO: acá después hay que reemplazarlo por el type
  images: string[],
  place: string,
  price: number,
  available_dates: Date[]
}

interface ProviderServicesProps {
  services: ServiceType[]
}

export const ProviderServices:React.FC<ProviderServicesProps> = ({ services }) => {
  return (
    <Section className={s.container}>

    {/* <Box display={"flex"} gap={2}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Total Diciembre
          </Typography>
          <Typography variant="h2" color="text.secondary">
            $ 30.000
          </Typography>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Total Diciembre
          </Typography>
          <Typography variant="h2" color="text.secondary">
            $ 30.000
          </Typography>
        </CardContent>
      </Card>
    
    </Box> */}
      <Box className={s['title-box']}>
        <CustomTitle color='primary' htmlTag='h1' text='Mis servicios' />
        <CustomLink customVariant='link' customColor='primary' href='dashboard/new'>
          <AddCircleOutline /> Agregar
        </CustomLink>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Lugar</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.short_description}</TableCell>
                <TableCell>{row.category.name}</TableCell>
                <TableCell>{row.place}</TableCell>
                <TableCell>$ {row.price}</TableCell>
                <TableCell><CustomLink customVariant='link' customColor='gray' href={`/services/${row.id}`}><Visibility /> Ver</CustomLink></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
}