import React, { FC } from 'react';
import Link from '@mui/material/Link';
import s from '../../styles/form/CustomLink.module.css';
import { CustomLinkI } from 'types/form/CustomLink.types';

export const CustomLink: FC<CustomLinkI> = ({ children, className, customVariant, customColor, href, underline }: CustomLinkI) => {
  const linkColor = customVariant !== 'button' && customColor ? s[customColor] : s[`button-${customColor}`];
  const linkVariant = customVariant && s[customVariant];

  const linkClass = `${linkVariant} ${linkColor} ${className}`;

  return (
    <Link className={linkClass} href={href} underline={underline}>{children}</Link>
  )
}