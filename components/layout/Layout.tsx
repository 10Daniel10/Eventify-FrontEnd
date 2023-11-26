import React, { FC, PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import { Navbar } from '../nav/Navbar';
import { IUser } from 'interfaces';

interface LayoutI extends PropsWithChildren {
  variant?: 'navigation' | 'full'
}

// fixMe: ver de dónde saco estas credenciales para saber quién es el user si está loggeado (auth = true)
const auth = false;
const fakeUser: IUser = {
  id: 1,
  type: 'USER',
  firstname: 'María',
  lastname: 'Pérez',
  email: 'maria@perez.com'
}

export const Layout: FC<LayoutI> = ({ variant = 'navigation', children }) => {
  return (
    <Stack>
      {variant === 'navigation' && <Navbar auth={auth} user={fakeUser} />}
      {children}
      {/* {variant === 'navigation' && <Footer />} */}
    </Stack>
  )
}