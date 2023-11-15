import React, { FC } from 'react';
import Button from '@mui/material/Button';
import s from '../../styles/form/CustomButton.module.css';
import { CustomButtonI } from 'types/form/CustomButton.types';

export const CustomButton: FC<CustomButtonI> = ({ children, className, variant, customColor, type, disabled, href, onClick }: CustomButtonI) => {
  const buttonVariant = variant === 'outlined' ? s[`button-outline`] : s.button;

  const buttonClass = `${buttonVariant} ${s[customColor]} ${className}`;

  return (
    <Button className={buttonClass} variant={variant} type={type} disabled={disabled} href={href} onClick={onClick}>
      {children}
    </Button>
  )
}