import React, { FC } from 'react';
import { CustomSlider } from '../slider/Slider';
import { CustomTitle, CustomTitleI } from '../layout/CustomTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Section } from '../layout/Section';
import { ServicesCard } from './ServicesCard';
import Grid from '@mui/material/Grid';
import { IService } from 'interfaces';

interface ServicesListI {
  title?: CustomTitleI,
  listVariant?: 'slider' | 'grid',
  //TODO: HAY QUE TIPAR EL FUCKING SERVICE
  services: IService[]
}

export const ServicesList:FC<ServicesListI> = ({ title, listVariant = 'slider', services }) => {
  const { color = 'primary', htmlTag = 'h2', text } = {...title};

  const xs = useMediaQuery('(max-width:600px)');
  const sm = useMediaQuery('(max-width:960px)');
  const md = useMediaQuery('(max-width:1280px)');

  const cardsToShow = xs ? 1 : (sm ? 2 : (md ? 3 : 4));

  return (
    <Section variant="contained">
      {listVariant === 'slider' ? (
        <>
          <CustomTitle color={color} htmlTag={htmlTag} text={text} />
          <CustomSlider variant="cards" totalCards={services.length} cardsToShow={cardsToShow}>
            {services.map((p) => (
              <ServicesCard key={p.id} service={p}/>
            ))}
          </CustomSlider>
        </>
      ) : (
        <>
          <CustomTitle color={color} htmlTag={htmlTag} text={text} />
          <Grid container spacing={2}>
            {services.map((p) => (
              <Grid key={p.id} item xs={12} sm={6} md={4}>
                <ServicesCard key={p.id} service={p}/>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Section>
  )
}