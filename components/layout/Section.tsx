import React, { FC, PropsWithChildren } from 'react';
import s from '../../styles/layout/Section.module.css';

interface SectionI extends PropsWithChildren {
  className?: string,
  variant?: 'contained' | 'full',
}

export const Section: FC<SectionI> = ({ className, variant = 'contained', children }) => {
  const containerClass = `${s.container} ${s[variant]} ${className}`;

  return (
    <section className={containerClass}>
      <div className={s.subcontainer}>
        {children}
      </div>
    </section>
  )
}