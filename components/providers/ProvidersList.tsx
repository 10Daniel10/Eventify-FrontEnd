import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IProvider } from 'interfaces';
import { Section } from '../layout/Section';
import { ProvidersCard } from './ProvidersCard';
import { CustomSlider } from '../slider/Slider';
import { CustomTitle, CustomTitleI } from '../layout/CustomTitle';
import { Loader } from '../loader/Loader';

interface IProvidersListProps {
  className?: string,
  title?: CustomTitleI,
  listVariant?: 'slider' | 'grid',
  providers: IProvider[],
  emptyState?: boolean
}

export const ProvidersList:FC<IProvidersListProps> = ({ className, title, listVariant = 'slider', providers, emptyState }) => {
  const { color = 'primary', htmlTag = 'h2', text } = {...title};

  const xs = useMediaQuery('(max-width:600px)');
  const sm = useMediaQuery('(max-width:960px)');
  const md = useMediaQuery('(max-width:1280px)');

  const cardsToShow = xs ? 1 : (sm ? 2 : (md ? 3 : 4));

  return (
    <Section className={className}>
      {emptyState ? (
        <Loader />
      ) : (
        (listVariant === 'slider') ? (
          <>
            <CustomTitle color={color} htmlTag={htmlTag} text={text} />
            <CustomSlider variant="cards" totalCards={providers.length} cardsToShow={cardsToShow}>
              {providers.map((p) => (
                <ProvidersCard key={p.id} provider={p} />
              ))}
            </CustomSlider>
          </>
        ) : (
          <>
            <CustomTitle color={color} htmlTag={htmlTag} text={text} />
            <Grid container spacing={2}>
              {providers.map((p) => (
                <Grid key={p.id} item xs={12} sm={6} md={4}>
                  <ProvidersCard key={p.id} provider={p}/>
                </Grid>
              ))}
            </Grid>
          </>
        )
      )}
    </Section>
  )
}