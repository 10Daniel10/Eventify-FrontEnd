import React, { FC } from 'react';
import Image from 'next/image';
import { Section } from '../layout/Section';
import { CustomTitle } from '../layout/CustomTitle';
import { Check } from '@mui/icons-material';
import s from '../../styles/home/Hero.module.css';

export const Hero:FC = () => {
  return (
    <Section className={s.container}>
      <Image src={'/shapes/shape2.png'} alt={'Eventify'} height={500} width={500} className={s.image}/>
      <div className={s.content}>
        <CustomTitle text={'Planea y organiza eventos inolvidables con Eventify.'} htmlTag='h1' className={s.title}/>
        <p className={s.description}>Coordina eventos, colabora con clientes, administra presupuestos y ¡mucho más! con las sencillas herramientas de administración de eventos de Eventify.</p>
        <ul className={s.features}>
          <li><Check/> Gestión de eventos y cronogramas</li>
          <li><Check/> Protección de datos y fiabilidad</li>
          <li><Check/> Agenda personalizada</li>
          <li><Check/> Visión panorámica de reservas</li>
        </ul>
      </div>
    </Section>
  )
}