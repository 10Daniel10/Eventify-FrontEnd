import React, { FC } from 'react';
import { SliderCard } from '../slider/SliderCard';
import { IService } from 'interfaces';

interface Service {
 service: IService | undefined
}

export const ServicesCard:FC<Service> = ({service}) => {
  if(!service){
    return;
  }

  const { id, user, category, photos } = service;
  const { firstname , lastname } = user;
  const {  name : categoryName } = category;
  
  const mainPhoto = service.photos.find(photo => photo.main);

  return (
    <SliderCard
      avatar={{
        ariaLabel: `${firstname} ${lastname}`,
        imgSrc: '' || '/users/avatar.png',
        imgAlt: `${firstname} ${lastname}`
      }}
      title={`${firstname} ${lastname}`}
      cardImg={{
        imgSrc: mainPhoto?.url || service.photos[0]?.url,
        imgAlt: `${firstname} ${lastname}`
      }}
      description={service.information}
      extraDescription={`Categoría: ${categoryName}`}
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