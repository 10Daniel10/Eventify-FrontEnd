'use client';
import { Controller } from 'react-hook-form';
import { CustomSwitchT } from 'types/form/CustomSwitch.types';
import { FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';
import s from '../../styles/form/CustomSwitch.module.css';

export const CustomSwitch = ({
  name,
  label,
  checked,
  required,
  control,
  defaultChecked,
  className
}: CustomSwitchT) => {
  const [active, setActive] = useState(defaultChecked || false);
  const switchClass = `${active ? s.switch : ''}`;

  return(
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch
            {...field}
            required={required}
            defaultChecked={defaultChecked}
            checked={checked}
            className={switchClass}
            onChange={(e) => {
              field.onChange(e);
              setActive(e.target.checked);
            }}
          />}
          label={label}
          className={className}
        />
      )}
    />
  )
}