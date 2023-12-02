import { Control } from 'react-hook-form';

export type CustomInputT = {
    name: string,
    label: string,
    type: string,
    required?: boolean,
    control: Control<any>,
    placeholder?: string,
    defaultValue?: any,
    error?: boolean,
    helperText?: string,
    textFieldProps?: Record<string, any>,
    className?: string,
    onChange?: (e: any) => void
}