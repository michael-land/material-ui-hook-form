import { GridProps } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { capitalCase } from 'change-case';
import clsx from 'clsx';
import React from 'react';
import { Controller, ValidationOptions } from 'react-hook-form';
import { Except } from 'type-fest';
import { FieldCommonProps } from './types';
import useField from './useField';
import get from './utils/get';
import getInputLabelFromName from './utils/getInputLabelFromName';

const useStyles = makeStyles({
  root: {},
  hidden: { display: 'none' },
});

interface Field
  extends ValidationOptions,
    Except<TextFieldProps, 'required' | 'name'>,
    Pick<GridProps, Breakpoint>,
    FieldCommonProps {
  options?: string[];
}

function Field({
  xs, //ignored
  sm, //ignored
  md, //ignored
  lg, //ignored
  xl, //ignored
  hidden,
  hiddenErrorMessage,

  control: controlProp,
  max,
  min,
  name,
  maxLength,
  minLength,
  required,
  pattern,
  disabled,
  validate,
  helperText: helperTextProp,
  className,
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

  const classes = useStyles();
  const isHidden = hidden || other.type === 'hidden';

  return (
    <Controller
      fullWidth
      select={select}
      name={name}
      disabled={disabled}
      className={clsx(className, { [classes.hidden]: isHidden })}
      required={!!required}
      label={label ?? getInputLabelFromName(name)}
      defaultValue={get(control.defaultValuesRef.current, name, '')}
      as={TextField}
      error={!!error}
      helperText={hiddenErrorMessage ? undefined : error?.message || helperTextProp}
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
