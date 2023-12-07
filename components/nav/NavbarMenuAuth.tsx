import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import Logout from '@mui/icons-material/Logout';
import Redeem from '@mui/icons-material/Redeem';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { TNavbar } from 'types';
import { CustomLink } from '../form/CustomLink';
import s from '../../styles/nav/NavbarMenu.module.css';

export const NavbarMenuAuth = ({userId, userType, userEmail, userMenu, handleUserMenu, handleClose, handleLogOut}: TNavbar) => {
  return (
    <Box display={"flex"} alignItems={"center"} gap={.5}>
      <span className={s['user-email']}>{userEmail}</span>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleUserMenu}
      >
        <AccountCircle />
      </IconButton>
      {userType === 'USER' ? (
        <Menu
          id="user-menu"
          anchorEl={userMenu}
          open={Boolean(userMenu)}
          onClose={handleClose}
          className={s['app-bar']}
        >
          <MenuItem onClick={handleClose}>
            <CustomLink href={`/account?userId=${userId}`} underline="none" customVariant="link" customColor="primary"><AccountCircle/> Mi cuenta</CustomLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <CustomLink href={`/reservations`} underline="none" customVariant="link" customColor="primary"><CalendarMonth/> Reservas realizadas</CustomLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <CustomLink href={`/cart`} underline="none" customVariant="link" customColor="primary"><ShoppingCart/> Carrito de reservas</CustomLink>
          </MenuItem>
          <MenuItem onClick={handleLogOut} className={s['buttons-box']}>
            <CustomLink href="/" underline="none" customVariant="link" customColor="primary"><Logout/> Cerrar sesión</CustomLink>
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="user-menu"
          anchorEl={userMenu}
          open={Boolean(userMenu)}
          onClose={handleClose}
          className={s['app-bar']}
        >
          <MenuItem onClick={handleClose}>
            <CustomLink href={`/account?userId=${userId}`} underline="none" customVariant="link" customColor="primary"><AccountCircle/> Mi cuenta</CustomLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <CustomLink href={`/providers/${userId}/services`} underline="none" customVariant="link" customColor="primary"><Redeem/> Mis servicios</CustomLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <CustomLink href={`/agenda?userId=${userId}`} underline="none" customVariant="link" customColor="primary"><CalendarMonth/> Mi agenda</CustomLink>
          </MenuItem>
          <MenuItem onClick={handleLogOut} className={s['buttons-box']}>
            <CustomLink href="/" underline="none" customVariant="link" customColor="primary"><Logout/> Cerrar sesión</CustomLink>
          </MenuItem>
        </Menu>
      )}
    </Box>
  )
}