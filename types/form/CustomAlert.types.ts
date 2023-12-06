import { AlertProps } from '@mui/material/Alert';

export type AlertT = {
  className?: string,
  severity: AlertProps['severity'],
  message?: string | undefined
}