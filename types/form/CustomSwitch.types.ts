import { Control } from 'react-hook-form';

export type CustomSwitchT = {
  name: string,
  label: string,
  checked?: boolean,
  required?: boolean,
  control: Control<any>,
  defaultChecked?: boolean,
  className?: string
}