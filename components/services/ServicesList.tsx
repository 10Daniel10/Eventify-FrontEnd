import React, { FC } from 'react';
import { CustomSlider } from '../slider/Slider';
import { CustomTitle, CustomTitleI } from '../layout/CustomTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Section } from '../layout/Section';
import { ServicesCard } from './ServicesCard';
import { CustomAlert } from '../form/CustomAlert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { IService, IServiceProvider } from 'interfaces';
import { CustomLink } from '../form/CustomLink';

interface IServicesListProps {
  className?: string,
  title?: CustomTitleI,
  listVariant?: 'slider' | 'grid',  
  services : (IService & IServiceProvider)[]
}

export const ServicesList:FC<IServicesListProps> = ({ className, title, listVariant = 'slider', services }) => {
  const { color = 'primary', htmlTag = 'h2', text } = {...title};

  const xs = useMediaQuery('(max-width:600px)');
  const sm = useMediaQuery('(max-width:960px)');
  const md = useMediaQuery('(max-width:1280px)');

  const cardsToShow = xs ? 1 : (sm ? 2 : (md ? 3 : 4));

  return (
    <Section className={className}>
      <CustomTitle color={color} htmlTag={htmlTag} text={text} />
      {services.length > 0 ? (
        listVariant === 'slider' ? (
          <CustomSlider variant="cards" totalCards={services.length} cardsToShow={cardsToShow}>
            {services.map((service : (IService & IServiceProvider)) => (
              <ServicesCard key={service.id} service={service}/>              
            ))}
          </CustomSlider>
        ) : (
          <Grid container spacing={2}>
            {services.map((service : (IService & IServiceProvider)) => (
              <Grid key={service.id} item xs={12} sm={6} md={4}>
                <ServicesCard service={service}/>
              </Grid>
            ))}
          </Grid>
        )
      ) : (
        <CustomAlert severity={'info'} message={'No hay servicios que coincidan con tu búsqueda.'}/>
      )}
    </Section>
  )
}