import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CategoryRounded from '@mui/icons-material/CategoryRounded';
import LocalMall from '@mui/icons-material/LocalMall';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import { logOut } from 'eventapp/services/auth/auth.service';
import { TUserData } from 'types';
import { NavbarMenu } from './NavbarMenu';
import { NavbarMenuAuth } from './NavbarMenuAuth';
import { CustomLink } from '../form/CustomLink';
import s from '../../styles/nav/Navbar.module.css';

interface INavbarProps {
  auth: boolean,
  user?: TUserData
}

export const Navbar:FC<INavbarProps> = ({ auth, user }) => {
  const router = useRouter();

  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const [appBarMenu, setAppBarMenu] = useState<null | HTMLElement>(null);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    logOut();
    router.push('/');
  }

  return (
    <AppBar className={`${s.container} ${scrolled && s.scrolled}`}>
      <Toolbar className={s['sub-container']}>
        <Box display={"flex"} alignItems={"center"} gap={4}>
          <CustomLink href="/" underline="none" className={s['navbar-logo']}>
            <Image src="/iso_logo.png" alt="Eventify" width={20} height={20}/>
            Eventify
          </CustomLink>
          <Box className={s['button-group']}>
            <CustomLink href="/categories" underline="none" customVariant="link" customColor="black"><CategoryRounded/> Categorías</CustomLink>
            <CustomLink href="/providers" underline="none" customVariant="link" customColor="black"><SupervisorAccount/> Proveedores</CustomLink>
            <CustomLink href="/services" underline="none" customVariant="link" customColor="black"><LocalMall/> Servicios</CustomLink>
            <CustomLink href="/reservations" underline="none" customVariant="link" customColor="black"><LocalMall/> Reservations</CustomLink>            
          </Box>
        </Box>
        {auth ? (
          <NavbarMenuAuth
            userId={user?.id}
            userType={user?.type}
            userEmail={user?.email}
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