import React, { FC } from 'react';
import { SliderCard } from '../slider/SliderCard';
import { UserProviderI } from 'types/users/User.types';

interface ProvidersCardI {
  provider: UserProviderI
}

export const ProvidersCard:FC<ProvidersCardI> = ({ provider }) => {
  return (
    <SliderCard
      avatar={{
        ariaLabel: `${provider.firstName} ${provider.lastName}`,
        imgSrc: provider.avatar || '/users/avatar.png',
        imgAlt: `${provider.firstName} ${provider.lastName}`
      }}
      title={`${provider.firstName} ${provider.lastName}`}
      cardImg={{
        imgSrc: provider.defaultImage,
        imgAlt: provider.type
      }}
      description={provider.shortDescription}
      extraDescription={`Categorías: ${provider.categories}`}
      link={{
        element: {
          customVariant: 'button-outline',
          customColor: 'primary',
          href: `/providers/${provider.id}`
        },
        text: 'Ver proveedor'
      }}
    />
  )
}