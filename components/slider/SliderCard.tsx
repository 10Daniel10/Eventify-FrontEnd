import Image from 'next/image';
import React, { FC, ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { CustomLinkI } from 'types/form/CustomLink.types';
import { CustomLink } from '../form/CustomLink';
import s from '../../styles/slider/SliderCard.module.css';

export interface SliderCardI {
  className?: string,
  avatar?: {
    ariaLabel: string,
    imgSrc: string,
    imgAlt: string
  },
  title: string,
  subheader?: string,
  cardImg: {
    imgSrc: string,
    imgAlt: string
  }
  description?: string | ReactNode,
  extraDescription?: string | ReactNode,
  favButtons?: boolean,
  link?: {
    element: CustomLinkI,
    text: string | ReactNode
  }
}

export const SliderCard:FC<SliderCardI> = ({ className, avatar, title, subheader, cardImg, description, extraDescription, favButtons = true, link }) => {
  const containerClass = `${s['slider-card']} ${className}`;

  return (
    <Card className={containerClass}>
      <CardHeader
        className={s['slider-card-header']}
        avatar={avatar && 
          <Avatar aria-label={avatar?.ariaLabel}>
            <Image src={avatar?.imgSrc || ''} alt={avatar?.imgAlt || ''} width={40} height={40} />
          </Avatar>
        }
        title={title}
        subheader={subheader && subheader}
      />
      <CardMedia
        component="img"
        height="194"
        image={cardImg?.imgSrc}
        alt={cardImg?.imgAlt}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        {extraDescription && <Typography variant="body2" color="text.secondary">{extraDescription}</Typography>}
      </CardContent>
      <CardActions disableSpacing className={s['slider-card-actions']}>
        {favButtons && <div>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </div>}
        {link && <CustomLink customVariant={link.element.customVariant} customColor={link.element.customColor} href={link.element.href} underline='none'>{link.text}</CustomLink>}
      </CardActions>
    </Card>
  )
}