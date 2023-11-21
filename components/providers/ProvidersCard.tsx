import React, { FC } from 'react';
import { SliderCard } from '../slider/SliderCard';
import { UserProviderI } from 'interfaces';

interface ProvidersCardI {
  provider: UserProviderI
}

export const ProvidersCard:FC<ProvidersCardI> = ({ provider }) => {
  return (
    <SliderCard
      avatar={{
        ariaLabel: `${provider.firstname} ${provider.lastname}`,
        imgSrc: provider.avatar || '/users/avatar.png',
        imgAlt: `${provider.firstname} ${provider.lastname}`
      }}
      title={`${provider.firstname} ${provider.lastname}`}
      cardImg={{
        imgSrc: provider.defaultImage,
        imgAlt: provider.type
      }}
      description={provider.shortDescription}
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