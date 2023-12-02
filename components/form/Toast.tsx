import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ToastT } from 'types/form/Toast.types';
import s from '../../styles/form/Toast.module.css';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  }
)

export const Toast = ({className, open, onClose, severity, message}: ToastT) => {
  const snackbarContainer = `${s.container} ${className}`;

  return (
    <Snackbar open={open} onClose={onClose} className={snackbarContainer}>
      <Alert severity={severity} sx={{ width: '100%' }}>{message}</Alert>
    </Snackbar>
  )
}