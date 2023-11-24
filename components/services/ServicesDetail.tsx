import React, { FC } from 'react';
import { IService } from 'interfaces';
import { Section } from '../layout/Section';
import { CustomTitle } from '../layout/CustomTitle';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Redeem, SupervisorAccount } from '@mui/icons-material';
import s from '../../styles/services/ServiceDetail.module.css';

interface Service {
 service: IService | undefined
}

export const ServicesDetail:FC<Service> = ({service}) => {
  if(!service){
    return;
  }

  const { id, user, category, photos } = service;
  const { firstname , lastname } = user;
  const {  name : categoryName } = category;
  
  const mainPhoto = service.photos.find(photo => photo.main);

  function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  return (
    <Section className={s.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <ImageList
            cols={3}
            rowHeight={200}
            sx={{overflow: 'hidden'}}
          >
            {photos.map((item) => (
              <ImageListItem key={item.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...srcset(item.url, 121, 3, 2)}
                  alt={`Image ${item.id}`}
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
          <CustomTitle color='gray' text='Información' htmlTag='h3' />
          <Typography display={'flex'} gap={.5} color={'gray'} mb={2}><SupervisorAccount/> Proveedor {service.user.firstname} {service.user.lastname}</Typography>
          <Typography display={'flex'} gap={.5} color={'gray'} mb={2}> <Redeem/> Categoría {service.category.name}</Typography>
          <Typography display={'flex'} gap={.5} color={'gray'} mt={1}>{service.information}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTitle text={service.name} color='primary'/>
          <Paper className={s.form}>
            
          </Paper>
        </Grid>
      </Grid>
    </Section>
  )
}