import React, { FC } from 'react';
import { SliderCard } from '../slider/SliderCard';
import { IProvider } from 'interfaces';

interface IProvidersCardProps {
  provider: IProvider
}

export const ProvidersCard:FC<IProvidersCardProps> = ({ provider }) => {
  return (
    <SliderCard
      title={`${provider.name}`}
      cardImg={{
        imgSrc: provider.imageUrl || '/shapes/shape6.png', 
        imgAlt: provider.name
      }}
      description={provider.information}
      link={{
        element: {
          customVariant: 'button-outline',
          customColor: 'primary',
          href: `/services?providerId=${provider.id}`
        },
        text: 'Ver servicios'
      }}
    />
  )
}