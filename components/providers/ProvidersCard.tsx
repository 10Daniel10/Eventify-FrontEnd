import React, { FC } from 'react';
import { SliderCard } from '../slider/SliderCard';
import { IProvider } from 'interfaces';

interface IProvidersCardProps {
  provider: IProvider
}

export const ProvidersCard:FC<IProvidersCardProps> = ({ provider }) => {
  return (
    <SliderCard
      avatar={{
        ariaLabel: `${provider.user.firstname} ${provider.user.lastname}`,
        imgSrc: provider.user.urlImage || '/users/avatar.png',
        imgAlt: `${provider.user.firstname} ${provider.user.lastname}`
      }}
      title={`${provider.name}`}
      cardImg={{
        imgSrc: provider.defaultImage, 
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