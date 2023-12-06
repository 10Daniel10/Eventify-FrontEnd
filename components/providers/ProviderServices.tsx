'use client';
import { useRouter } from 'next/router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { IService, IServiceProvider } from 'interfaces';
import { Section } from '../layout/Section';
import { CustomTitle } from '../layout/CustomTitle';
import { CustomLink } from '../form/CustomLink';
import s from '../../styles/services/ProviderServices.module.css';

interface IProviderServicesProps {
  services: (IService & IServiceProvider)[],
  emptyState: boolean
}

export const ProviderServices:React.FC<IProviderServicesProps> = ({ services, emptyState }) => {
  const router = useRouter();
  const { id } = router.query;
  const providerId = Number(id);

  return (
    <Section className={s.container}>
      <Box className={s['title-box']}>
        <CustomTitle color='primary' htmlTag='h1' text='Mis servicios' />
        <CustomLink customVariant='link' customColor='primary' href='services/new'>
          <AddCircleOutline /> Agregar
        </CustomLink>
      </Box>
      {!emptyState ? (
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
              {services?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shortDescription}</TableCell>
                  <TableCell>{row.category?.name}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>$ {row.price}</TableCell>
                  <TableCell><CustomLink customVariant='link' customColor='gray' href={`/services/${row.id}`}><Visibility /> Ver</CustomLink></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert className={s.message} severity={'error'}>{'Aún no cargas ningún servicio. Haz clic en "Agregar" para que los usuarios puedan contratarte.'}</Alert>
      )}
    </Section>
  );
}