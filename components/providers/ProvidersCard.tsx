import React, { FC } from 'react';
import { SliderCard } from '../slider/SliderCard';
import { IProvider } from 'interfaces/IProvider';

interface ProvidersCardI {
  provider: IProvider
}

export const ProvidersCard:FC<ProvidersCardI> = ({ provider }) => {
  return (
    <SliderCard
      avatar={{
        ariaLabel: `${provider.user.firstname} ${provider.user.lastname}`,
        imgSrc: provider.user.avatar || '/users/avatar.png',
        imgAlt: `${provider.user.firstname} ${provider.user.lastname}`
      }}
      title={`${provider.defaultImage}`}
      cardImg={{
        imgSrc: provider.defaultImage, 
        imgAlt: provider.defaultImage       
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