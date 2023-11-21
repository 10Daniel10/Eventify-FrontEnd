import React, { FC } from 'react';
import { SliderCard } from '../slider/SliderCard';
import { ICategory } from 'interfaces';

interface CategoriesCardI {
  category: ICategory
}

export const CategoriesCard:FC<CategoriesCardI> = ({ category }) => {
  return (
    <SliderCard
      key={category.id}
      title={`${category.name}`}
      cardImg={{
        imgSrc: category.imageUrl || '',
        imgAlt: category.name
      }}
      favButtons={false}
      link={{
        element: {
          customVariant: 'button-outline',
          customColor: 'primary',
          href: `/services?categoryId=${category.id}`
        },
        text: 'Ver servicios'
      }}
    />
  )
}