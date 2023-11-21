import { Controller } from 'react-hook-form';
import { CustomSelectT } from 'types/form/CustomSelect.types';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import s from '../../styles/form/CustomSelect.module.css';

export const CustomSelect = ({
  name,
  label,
  required,
  control,
  defaultValue,
  displayEmpty,
  error,
  helperText,
  selectProps,
  children,
  className
}: CustomSelectT) => {
  const inputSelect = `${s.select} ${className}`
  return(
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel className={s.label}>{label}</InputLabel>
          <Select
            variant="outlined"
            fullWidth
            {...field}
            label={label}
            required={required}
            displayEmpty={displayEmpty}
            error={error}
            {...selectProps}
            className={inputSelect}
          >
            {children}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      )}
    />
  )
}