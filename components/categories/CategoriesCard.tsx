import React, { FC } from 'react';
import { SliderCard } from '../slider/SliderCard';
import { CategoryT } from 'types/categories/Category.types';

interface CategoriesCardI {
  category: CategoryT
}

export const CategoriesCard:FC<CategoriesCardI> = ({ category }) => {
  return (
    <SliderCard
      key={category.id}
      title={`${category.name}`}
      cardImg={{
        imgSrc: category.defaultImage || '',
        imgAlt: category.name
      }}
      description={category.description}
      favButtons={false}
      link={{
        element: {
          customVariant: 'button-outline',
          customColor: 'primary',
          href: `/categories/${category.name}`
        },
        text: 'Buscar proveedores'
      }}
    />
  )
}