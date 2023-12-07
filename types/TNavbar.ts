export type TNavbar = {
  userId?: number | null,
  providerId?: number | null,
  userType?: 'USER' | 'PROVIDER' | null,
  userEmail?: string | null,
  userMenu?: HTMLElement | null,
  appBarMenu?: HTMLElement | null,
  handleAppBarMenu?: (event: React.MouseEvent<HTMLElement>) => void,
  handleUserMenu?: (event: React.MouseEvent<HTMLElement>) => void,
  handleClose: () => void,
  handleLogOut?: () => void
}