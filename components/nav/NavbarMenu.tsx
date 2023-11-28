import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Redeem from '@mui/icons-material/Redeem';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import { NavbarT } from 'types/nav/Navbar.types';
import { CustomLink } from '../form/CustomLink';
import s from '../../styles/nav/NavbarMenu.module.css';

export const NavbarMenu = ({appBarMenu, handleAppBarMenu, handleClose}: NavbarT) => {
  return (
    <>
      <IconButton
        size="large"
        aria-label="menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleAppBarMenu}
        className={s['button-menu']}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={appBarMenu}
        open={Boolean(appBarMenu)}
        onClose={handleClose}
        className={s['app-bar']}
      >
        {/* // TODO: CAMBIAR ICON */}
        <MenuItem onClick={handleClose}>
          <CustomLink href="/categories" underline="none" customVariant="link" customColor="primary"><Redeem/> Categorías</CustomLink>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <CustomLink href="/providers" underline="none" customVariant="link" customColor="primary"><SupervisorAccount/> Proveedores</CustomLink>
        </MenuItem> */}
        <MenuItem onClick={handleClose}>
          <CustomLink href="/services" underline="none" customVariant="link" customColor="primary"><Redeem/>  Servicios</CustomLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <CustomLink href="/providers/add" underline="none" customVariant="link" customColor="primary"><Redeem/>  Add Provider</CustomLink>
        </MenuItem>
        <MenuItem onClick={handleClose} className={s['buttons-box']}>
          <CustomLink href="/auth/login" underline="none" customVariant="button-outline" customColor="primary">Iniciar sesión</CustomLink>
          <CustomLink href="/auth/register" underline="none" customVariant="button" customColor="primary">Registrarme</CustomLink>
        </MenuItem>
      </Menu>
      <Box className={s['button-group']}>
        <CustomLink href="/auth/login" underline="none" customVariant="button-outline" customColor="primary">Iniciar sesión</CustomLink>
        <CustomLink href="/auth/register" underline="none" customVariant="button" customColor="primary">Registrarme</CustomLink>
      </Box>
    </>
  )
}