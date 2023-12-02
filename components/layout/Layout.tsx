import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { Navbar } from '../nav/Navbar';
import { TUserData } from 'types';

interface LayoutI extends PropsWithChildren {
  variant?: 'navigation' | 'full'
}

const initialData: TUserData = {
  id: 0,
  email: '',
  username: '',
  firstname: '',
  lastname: '',
  type: 'USER'
}

export const Layout: FC<LayoutI> = ({ variant = 'navigation', children }) => {
  const [ logged, setLogged ] = useState<boolean>(false);
  const [ userData, setUserData ] = useState<TUserData>(initialData);

  useEffect(() => {
    const loggedUser = localStorage.getItem('loginUser');

    if(loggedUser){
      setLogged(true);

      const parsedUserData = JSON.parse(loggedUser);
      setUserData(parsedUserData);
    }
  }, []);

  return (
    <Stack>
      {variant === 'navigation' && <Navbar auth={logged} user={userData} />}
      {children}
      {/* {variant === 'navigation' && <Footer />} */}
    </Stack>
  )
}