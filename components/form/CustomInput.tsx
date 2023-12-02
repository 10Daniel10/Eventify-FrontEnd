import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { CustomInputT } from 'types/form/CustomInput.types';
import s from '../../styles/form/CustomInput.module.css';

export const CustomInput = ({
  name,
  label,
  type,
  required,
  control,
  placeholder,
  defaultValue,
  error,
  helperText,
  textFieldProps,
  className,
  onChange
}: CustomInputT) => {
  const inputClass = `${s.input} ${className}`
  return(
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          variant="outlined"
          fullWidth
          {...field}
          label={label}
          type={type}
          required={required}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          {...textFieldProps}
          className={inputClass}
          onChange={onChange}
        />
      )}
    />
  )
}