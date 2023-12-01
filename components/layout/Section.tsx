import React, { FC, PropsWithChildren } from 'react';
import s from '../../styles/layout/Section.module.css';

interface SectionI extends PropsWithChildren {
  className?: string
}

export const Section: FC<SectionI> = ({ className, children }) => {
  const containerClass = `${s.container} ${className}`;

  return (
    <section className={containerClass}>
      <div>
        {children}
      </div>
    </section>
  )
}