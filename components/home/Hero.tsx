import React, { FC } from 'react';
import { CustomSlider } from '../slider/Slider';
import { CategoriesT } from 'types/categories/Category.types';
import Image from 'next/image';
import { Section } from '../layout/Section';

// fixMe: traer listado de imgs de services
const imgs: CategoriesT[] = ['photography', 'food', 'website', 'video', 'music', 'lights', 'decoration', 'flowers', 'invitations', 'places', 'tents', 'cars', 'livings'];

export const Hero:FC = () => {
  return (
    <Section variant="full">
      <CustomSlider variant="images" totalCards={imgs.length} cardsToShow={1} autoplay={true} autoplaySpeed={2000}>
        {imgs.map((img, index) => (
          <Image
            key={index}
            src={`/categories/${img}.png`}
            alt={img}
            width={100}
            height={100}
          />
        ))}
      </CustomSlider>
    </Section>
  )
}