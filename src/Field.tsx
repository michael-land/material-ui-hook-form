import { GridProps } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { capitalCase } from 'change-case';
import React from 'react';
import { Control, Controller, ValidationOptions } from 'react-hook-form';
import useField from './useField';
import { get } from './utils/get';
import { getInputLabelFromName } from './utils/getInputLabelFromName';

interface Field
  extends ValidationOptions,
    Omit<TextFieldProps, 'required'>,
    Pick<GridProps, Breakpoint> {
  control?: Control;
  name: string;
  options?: string[];
  naked?: boolean;
}

function Field({
  control: controlProp,
  max,
  min,
  name,
  maxLength,
  minLength,
  required,
  pattern,
  naked,
  disabled,
  validate,
  helperText,
  options,
  children,
  label,
  select = !!children || !!options,
  ...other
}: Field) {
  const { control, error, rules } = useField({
    name,
    control: controlProp,
    disabled,
    max,
    min,
    maxLength,
    minLength,
    required,
    pattern,
    validate,
  });

  return (
    <Controller
      fullWidth
      select={select}
      name={name}
      required={!!required}
      label={!naked ? label ?? getInputLabelFromName(name) : undefined}
      defaultValue={get(control.defaultValuesRef.current, name, '')}
      as={TextField}
      error={!!error}
      helperText={!naked ? error?.message ?? helperText : undefined}
      control={control}
      rules={rules}
      children={
        children ||
        options?.map(option => (
          <MenuItem key={option} value={option}>
            {capitalCase(option)}
          </MenuItem>
        ))
      }
      {...other}
    />
  );
}

export default Field;
