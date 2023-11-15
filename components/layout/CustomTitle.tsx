import React, { FC, ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import s from '../../styles/layout/CustomTitle.module.css';

export interface CustomTitleI {
  className?: string,
  color?: 'primary' | 'secondary' | 'white' | 'gray',
  htmlTag?: 'h1' | 'h2' | 'h3' | 'h4',
  text: string | ReactNode
}

export const CustomTitle: FC<CustomTitleI> = ({ className, color, htmlTag = 'h2', text}) => {
  const titleClass = `${s.title} ${s[htmlTag]} ${color && s[color]} ${className}`;

  return (
    <Typography variant={htmlTag} className={titleClass}>{text}</Typography>
  )
}