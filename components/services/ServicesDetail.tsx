import React, { FC } from 'react';
import { IService, IServiceProvider } from 'interfaces';
import { Section } from '../layout/Section';
import { CustomTitle } from '../layout/CustomTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ServiceReservation } from './ServicesReservation';
import { CustomAlert } from 'eventapp/components/form/CustomAlert';
import Check from '@mui/icons-material/Check';
import s from '../../styles/services/ServiceDetail.module.css';

export type TFeature = {
  description: string;
};
interface IServicesDetailProps {
  service: (IService & IServiceProvider);
  features?: TFeature[];
}

export const ServicesDetail:FC<IServicesDetailProps> = ({ service, features }) => {
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

  console.log({features})

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
            <Box mb={2}>
              <CustomTitle color='gray' text={'Proveedor'} htmlTag='h4' className={s.subtitle} />
              <Typography color={'gray'}>{service.provider?.name}</Typography>
            </Box>
            <Box mb={2}>
              <CustomTitle color='gray' text={'Categoría'} htmlTag='h4' className={s.subtitle} />
              <Typography color={'gray'}>{service.category?.name}</Typography>
            </Box>
            <Box mb={2}>
              <CustomTitle color='gray' text={'Información'} htmlTag='h4' className={s.subtitle} />
              <Typography color={'gray'}>{service.description}</Typography>
            </Box>
            {(features && features.length > 0) && 
              <Box mb={2}>
                <CustomTitle color='gray' text={'Características'} htmlTag='h4' className={s.subtitle} />
                <ul className={s.features}>
                  {features.map((f, i) => (
                    <li key={i}><Check/>{f.description}</li>
                  ))}
                </ul>
              </Box>
            }
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