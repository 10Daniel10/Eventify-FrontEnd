import React, { FC } from 'react';
import { SliderCard } from '../slider/SliderCard';
import { IService } from 'interfaces';

interface IServicesCardProps {
  service: IService;  
}

export const ServicesCard:FC<IServicesCardProps> = ( { service }) => {
  if(!service){
    return;
  }

  const { id, user, category, photos } = service;
  const firstname = user?.firstname;
  const lastname = user?.lastname;  
  const categoryName = category?.name;
  
  const mainPhoto = photos?.find(photo => photo.main);

  return (
    <SliderCard
      avatar={{
        ariaLabel: `${firstname} ${lastname}`,
        imgSrc: '' || '/users/avatar.png',
        imgAlt: `${firstname} ${lastname}`
      }}
      title={service.name}
      cardImg={{
        imgSrc: mainPhoto?.url || "imagenpordefecto",
        imgAlt: service.name
      }}
      description={service.information}
      extraDescription={`Proveedor: ${firstname} ${lastname} | Categoría: ${categoryName}`}
      link={{
        element: {
          customVariant: 'button-outline',
          customColor: 'primary',
          href: `/services/${id}`
        },
        text: 'Ver servicio'
      }}
    />
  )
}