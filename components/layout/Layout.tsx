import React, { FC, PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import { Navbar } from '../nav/Navbar';
import s from '../../styles/layout/Layout.module.css';
import { UserT } from 'types/users/User.types';

interface LayoutI extends PropsWithChildren {
  className?: string,
  variant: 'navigation' | 'full'
}

// fixMe: ver de dónde saco estas credenciales para saber quién es el user si está loggeado (auth = true)
const auth = false;
const fakeUser: UserT = {
  id: 1,
  type: 'client',
  firstName: 'María',
  lastName: 'Pérez',
  email: 'maria@perez.com'
}

export const Layout: FC<LayoutI> = ({ className, variant, children }) => {
  const containerClass = `${s.container} ${s[variant]} ${className}`;

  return (
    <Stack className={containerClass}>
      {variant === 'navigation' && <Navbar auth={auth} user={fakeUser} />}
      {children}
      {/* {variant === 'navigation' && <Footer />} */}
    </Stack>
  )
}