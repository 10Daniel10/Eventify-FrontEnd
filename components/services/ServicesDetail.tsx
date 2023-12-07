import React, { FC } from 'react';
import { IService, IServiceProvider } from 'interfaces';
import { Section } from '../layout/Section';
import { CustomTitle } from '../layout/CustomTitle';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CategoryRounded from '@mui/icons-material/CategoryRounded';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import { ServiceReservation } from './ServicesReservation';
import { CustomAlert } from 'eventapp/components/form/CustomAlert';
import s from '../../styles/services/ServiceDetail.module.css';

interface IServicesDetailProps {
  service: (IService & IServiceProvider);
}

export const ServicesDetail:FC<IServicesDetailProps> = ({ service }) => {
  function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  const isLogged = localStorage.getItem('loginUser');
  const isProvider = localStorage.getItem('providerId');

  return (
    service && (
      <Section className={s.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            <CustomTitle color='primary' text={service.name} htmlTag='h3' className={s.title} />
            <Typography display={'flex'} gap={.5} color={'gray'}>{service.shortDescription}</Typography>
            <Typography className={s.price} mb={4}>$ {service.price.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={12} md={!isProvider ? 6 : 12} lg={!isProvider ? 8 : 12} className={s.info}>
            {(service.imageUrls && service.imageUrls.length > 0) && (
              <ImageList
                cols={3}
                rowHeight={200}
                sx={{overflow: 'hidden'}}
              >
                {service.imageUrls.map((item: string) => (
                  <ImageListItem key={item}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      {...srcset(item, 121, 3, 2)}
                      alt={`Imagen ${item}`}
                      loading="lazy"
                    />
                    {/* <img src={item.url} alt={`Image ${item.id}`} /> */}
                    {/* <Image
                      src={item.url}
                      alt={service.name}
                      width={500}
                      height={500}
                    /> */}
                  </ImageListItem>
                ))}
              </ImageList>
            )}
            <Typography display={'flex'} gap={.5} color={'gray'} mb={2}><SupervisorAccount/> Proveedor: {service.provider?.name}</Typography>
            <Typography display={'flex'} gap={.5} color={'gray'} mb={2}> <CategoryRounded /> Categoría: {service.category?.name}</Typography>
            <Typography display={'flex'} gap={.5} color={'gray'} mt={1}>{service.description}</Typography>
          </Grid>
          {!isProvider && (
            <Grid item xs={12} md={6} lg={4} className={s.form}>
              {isLogged ? (
                <Paper className={s.reservation}>
                  <ServiceReservation service={service} />
                </Paper>
              ) : (
                <CustomAlert severity={'error'} message={'Para reservar un servicio, debes registrarte o iniciar sesión.'}/>
              )}
            </Grid>
          )}
        </Grid>
      </Section>
    )
  )
}