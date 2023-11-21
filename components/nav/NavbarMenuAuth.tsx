import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import Logout from '@mui/icons-material/Logout';
import Redeem from '@mui/icons-material/Redeem';
import { NavbarT } from 'types/nav/Navbar.types';
import { CustomLink } from '../form/CustomLink';
import s from '../../styles/nav/NavbarMenu.module.css';

export const NavbarMenuAuth = ({userId, userType, userEmail, userMenu, handleUserMenu, handleClose, handleLogOut}: NavbarT) => {
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
      <Menu
        id="user-menu"
        anchorEl={userMenu}
        open={Boolean(userMenu)}
        onClose={handleClose}
        className={s['app-bar']}
      >
        <MenuItem onClick={handleClose}>
          <CustomLink href={`/users/${userId}`} underline="none" customVariant="link" customColor="primary"><AccountCircle/> Mi cuenta</CustomLink>
        </MenuItem>
        {userType === 'USER' ? (
          <>
            <MenuItem onClick={handleClose}>
              <CustomLink href={`/reservations?userId=${userId}`} underline="none" customVariant="link" customColor="primary"><CalendarMonth/> Mis reservas</CustomLink>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleClose}>
              <CustomLink href={`/services?providerId=${userId}`} underline="none" customVariant="link" customColor="primary"><Redeem/> Mis servicios</CustomLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <CustomLink href={`agenda/${userId}`} underline="none" customVariant="link" customColor="primary"><CalendarMonth/> Mi agenda</CustomLink>
            </MenuItem>
          </>
        )}
        <MenuItem onClick={handleLogOut} className={s['buttons-box']}>
          <CustomLink href="/" underline="none" customVariant="link" customColor="primary"><Logout/> Cerrar sesión</CustomLink>
        </MenuItem>
      </Menu>
    </Box>
  )
}