import React, { FC } from 'react';
import { CustomSlider } from '../slider/Slider';
import Image from 'next/image';
import { Section } from '../layout/Section';
import s from '../../styles/home/Hero.module.css';

// fixMe: traer listado de imgs de services
const imgs = ['photography', 'food', 'website', 'video', 'music', 'lights', 'decoration', 'flowers', 'invitations', 'places', 'tents', 'cars', 'livings'];

export const Hero:FC = () => {
  return (
    <Section variant="full" className={s.container}>
      <CustomSlider className={s['slider-container']} variant="images" totalCards={imgs.length} cardsToShow={1} autoplay={true} autoplaySpeed={2000} dots={false} arrows={false}>
        {imgs.map((img, index) => (
          <Image
            key={index}
            src={`/categories/${img}.jpeg`}
            alt={img}
            width={500}
            height={200}
            objectFit='contain'
            objectPosition='center'
          />
        ))}
      </CustomSlider>
    </Section>
  )
}