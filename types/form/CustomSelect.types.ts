import { SelectChangeEvent } from '@mui/material/Select';
import { Control } from 'react-hook-form';

export type CustomSelectT = {
  name: string,
  label: string,
  required?: boolean,
  control: Control<any>,
  defaultValue?: any,
  displayEmpty?: boolean,
  error?: boolean,
  helperText?: string,
  selectProps?: Record<string, any>,
  children: React.ReactNode,
  className?: string
}