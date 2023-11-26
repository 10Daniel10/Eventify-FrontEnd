import React, { FC } from 'react';
import Image from 'next/image';
import { Section } from '../layout/Section';
import { CustomTitle } from '../layout/CustomTitle';
import s from '../../styles/home/Clients.module.css';

const clients = ['cx_events', 'event_connect', 'eventbrite'];

export const Clients:FC = () => {
  return (
    <Section className={s.container}>
      <CustomTitle text={'Elige entre +8,000 proveedores'} className={s.title}/>
      <ul className={s.clients}>
        {clients.map((c, index) => (
          <li key={index}>
            <Image src={`/clients/${c}.png`} alt={`${c}`} width={100} height={100}/>
          </li>
        ))}
      </ul>
    </Section>
  )
}