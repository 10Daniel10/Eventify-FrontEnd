import React, { FC, PropsWithChildren } from 'react';
import Container from '@mui/material/Container';
import s from '../../styles/layout/Section.module.css';

interface SectionI extends PropsWithChildren {
  className?: string,
  variant: 'contained' | 'full'
}

export const Section: FC<SectionI> = ({ className, variant, children }) => {
  const containerClass = `${s.container} ${s[variant]} ${className}`;

  return (
    <Container className={containerClass}>
      {children}
    </Container>
  )
}