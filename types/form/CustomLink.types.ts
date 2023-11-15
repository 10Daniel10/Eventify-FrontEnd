import { PropsWithChildren } from 'react';

export interface CustomLinkI extends PropsWithChildren {
  className?: string,
  customVariant?: 'link' | 'button' | 'button-outline',
  customColor?: 'primary' | 'secondary' | 'white' | 'gray',
  href?: string,
  underline?: 'none' | 'hover' | 'always'
}