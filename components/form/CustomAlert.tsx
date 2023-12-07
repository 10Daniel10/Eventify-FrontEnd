import Alert from '@mui/material/Alert';
import { AlertT } from 'types/form/CustomAlert.types';
import s from '../../styles/form/Alert.module.css';

export const CustomAlert = ({className, severity, message}: AlertT) => {
  const alertContainer = `${s.container} ${className}`;

  return (
    <Alert className={alertContainer} severity={severity}>{message}</Alert>
  )
}