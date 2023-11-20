import { PropsWithChildren } from 'react';

export interface CustomButtonI extends PropsWithChildren {
  className?: string,
  variant: 'text' | 'contained' | 'outlined',
  customColor: 'primary' | 'secondary' | 'white' | 'gray',
  type?: 'submit' | 'button' | 'reset' | undefined,
  disabled?: boolean,
  href?: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}