import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { FC, PropsWithChildren } from 'react';
import Slider from 'react-slick';
import s from '../../styles/slider/Slider.module.css';

interface CustomSliderProps extends PropsWithChildren {
  className?: string,
  variant: 'images' | 'cards',
  totalCards: number,
  cardsToShow: number,
  autoplay?: boolean,
  autoplaySpeed?: number,
  dots?: boolean,
  arrows?: boolean
}

export const CustomSlider:FC<CustomSliderProps> = ({ className, variant, totalCards, cardsToShow, autoplay, autoplaySpeed, dots = true, arrows = false, children }) => {
  const containerClass = `${s.slider} ${s[variant]} ${className}`;

  const settings = {
    dots: dots,
    infinite: false,
    speed: 500,
    arrows: arrows,
    // fade: true,
    // centerMode: true,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    slidesToShow: totalCards >= cardsToShow ? cardsToShow : totalCards,
    slidesToScroll: cardsToShow
  };

  return (
    <Slider {...settings} className={containerClass}>
      {children}
    </Slider>
  )
}