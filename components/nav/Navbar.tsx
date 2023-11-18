import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Redeem from '@mui/icons-material/Redeem';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import { CustomLink } from '../form/CustomLink';
import { NavbarMenu } from './NavbarMenu';
import { UserT } from 'types/users/User.types';
import { NavbarMenuAuth } from './NavbarMenuAuth';
import { useRouter } from 'next/router';
import s from '../../styles/nav/Navbar.module.css';

interface NavbarProps {
  auth: boolean,
  user?: UserT
}

export const Navbar:FC<NavbarProps> = ({ auth, user }) => {
  const router = useRouter();

  const [logged, setLogged] = useState(auth);
  const [userId, setUserId] = useState(user?.id);
  const [userType, setUserType] = useState(user?.type);
  const [userEmail, setUserEmail] = useState(user?.email);

  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const [appBarMenu, setAppBarMenu] = useState<null | HTMLElement>(null);

  // fixMe: integrar service login
  // useEffect(() => {
  //   const localLogin = localStorage.getItem('loginUser');
  //   if (localLogin) {
  //     setLogged(true);
  //     const { id } = JSON.parse(localLogin);
  //     setUserId(id);
  //     const { type } = JSON.parse(localLogin);
  //     setUserType(type);
  //     const { email } = JSON.parse(localLogin);
  //     setUserEmail(email);
  //   }
  // }, []);

  const handleAppBarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAppBarMenu(event.currentTarget);
  };

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };

  const handleClose = () => {
    setUserMenu(null);
    setAppBarMenu(null);
  };

  const handleLogOut = () => {
    // fixMe: agregar función de logOut a services
    // logOut();
    // setUserId('')
    // setUserType('')
    // setUserEmail('')
    setLogged(false);
    router.push('/');
  }

  return (
    <AppBar className={s.container}>
      <Toolbar className={s['sub-container']}>
        <Box display={"flex"} alignItems={"center"} gap={4}>
          <CustomLink href="/" underline="none" className={s['navbar-logo']}>
            <Image src="/iso_positive.png" alt="Eventify" width={30} height={30}/>
            EVENTIFY
          </CustomLink>
          <Box className={s['button-group']}>
            <CustomLink href="/categories" underline="none" customVariant="link" customColor="primary"><Redeem/> Categorías</CustomLink>
            <CustomLink href="/providers" underline="none" customVariant="link" customColor="primary"><SupervisorAccount/> Proveedores</CustomLink>
          </Box>
        </Box>
        {logged ? (
          <NavbarMenuAuth
            // fixMe: cambiar datos por los que recibo en props
            userId={userId}
            userType={userType}
            userEmail={userEmail}
            userMenu={userMenu}
            handleUserMenu={handleUserMenu}
            handleClose={handleClose}
            handleLogOut={handleLogOut}
          />
        ) : (
          <NavbarMenu
            appBarMenu={appBarMenu}
            handleAppBarMenu={handleAppBarMenu}
            handleClose={handleClose}
          />
        )}
      </Toolbar>
    </AppBar>
  )
}