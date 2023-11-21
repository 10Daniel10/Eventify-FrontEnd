import React, { FC } from 'react';
import { CustomSlider } from '../slider/Slider';
import { CustomTitle, CustomTitleI } from '../layout/CustomTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Section } from '../layout/Section';
import Grid from '@mui/material/Grid';
import { CategoriesCard } from './CategoriesCard';
import { ICategory } from 'interfaces';

interface CategoriesListI {
  title?: CustomTitleI,
  listVariant?: 'slider' | 'grid',
  categories: ICategory[]
}

export const CategoriesList:FC<CategoriesListI> = ({ title, listVariant = 'slider', categories }) => {
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
          <CustomSlider variant="cards" totalCards={categories.length} cardsToShow={cardsToShow}>
            {categories.map((c) => (
              <CategoriesCard key={c.id} category={c}/>
            ))}
          </CustomSlider>
        </>
      ) : (
        <>
          <CustomTitle color={color} htmlTag={htmlTag} text={text} />
          <Grid container spacing={2}>
            {categories.map((c) => (
              <Grid key={c.id} item xs={12} sm={6} md={4}>
                <CategoriesCard key={c.id} category={c}/>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Section>
  )
}