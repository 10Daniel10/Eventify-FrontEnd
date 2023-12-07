import React, { FC } from 'react';
import { SliderCard } from '../slider/SliderCard';
import { IService, IServiceProvider } from 'interfaces';

interface IServicesCardProps {
  service: (IService & IServiceProvider);
}

export const ServicesCard:FC<IServicesCardProps> = ( { service }) => {
  return (
    <SliderCard
      avatar={{
        ariaLabel: `${service.provider?.name}`,
        imgSrc: service.provider?.imageUrl ? `${service.provider.imageUrl}` : '/users/avatar.png',
        imgAlt: `${service.provider?.name}`
      }}
      title={service.name}
      cardImg={{
        imgSrc: (service.imageUrls && service.imageUrls.length > 0) ? `${service.imageUrls[0]}` : '/shapes/shape5.png',
        imgAlt: service.name
      }}
      description={service.information}
      extraDescription={`Proveedor: ${service.provider?.name} | Categoría: ${service.category?.name}`}
      link={{
        element: {
          customVariant: 'button-outline',
          customColor: 'primary',
          href: `/services/${service.id}`
        },
        text: 'Ver servicio'
      }}
    />
  )
}