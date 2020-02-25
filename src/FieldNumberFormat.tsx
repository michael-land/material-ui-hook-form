import { GridProps } from '@material-ui/core/Grid';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { TextFieldProps } from '@material-ui/core/TextField';
import clsx from 'clsx';
import React from 'react';
import { Controller, ValidationOptions } from 'react-hook-form';
import { NumberFormatProps } from 'react-number-format';
import { Except } from 'type-fest';
import { FieldCommonProps } from './types';
import useField from './useField';
import get from './utils/get';
import getInputLabelFromName from './utils/getInputLabelFromName';

const useStyles = makeStyles({
  hidden: {
    display: 'none',
  },
});

interface FieldFormatBase
  extends Except<ValidationOptions, 'maxLength' | 'minLength' | 'pattern'>,
    Except<
      TextFieldProps,
      'required' | 'value' | 'defaultValue' | 'type' | 'select' | 'SelectProps' | 'name'
    >,
    Pick<NumberFormatProps, NumberFormatKey>,
    Pick<GridProps, Breakpoint>,
    FieldCommonProps {
  as: React.ReactElement | React.ElementType;
  parse?: (value: string) => string;
  format?: (value: string) => string;
}

function FieldFormatBase({
  xs, //ignored
  sm, //ignored
  md, //ignored
  lg, //ignored
  xl, //ignored

  className,
  hidden,
  hiddenLabel,
  hiddenErrorMessage,
  control: controlProp,
  max,
  label,
  min,
  name,
  required,
  disabled,
  validate,
  helperText: helperTextProp,
  as: asProp,
  ...other
}: FieldFormatBase) {
  const classes = useStyles();
  const { control, error, rules } = useField({
    name,
    control: controlProp,
    disabled,
    max,
    min,
    required,
    validate,
  });

  return (
    <Controller
      className={clsx(className, { [classes.hidden]: hidden })}
      fullWidth
      name={name}
      disabled={disabled}
      required={!!required}
      defaultValue={get(control.defaultValuesRef.current, name, '')}
      as={asProp}
      error={!!error}
      hiddenLabel={hiddenLabel}
      label={hiddenLabel ? undefined : label ?? getInputLabelFromName(name)}
      helperText={hiddenErrorMessage ? undefined : error?.message || helperTextProp}
      control={control}
      rules={rules}
      {...other}
    />
  );
}

export default FieldFormatBase;

// Manually copy props here, b/c Omit<NumberFormatProps, keyof React.InputHTMLAttributes<HTMLInputElement>> does not work
type NumberFormatKey =
  | 'thousandSeparator'
  | 'decimalSeparator'
  | 'thousandsGroupStyle'
  | 'decimalScale'
  | 'fixedDecimalScale'
  | 'displayType'
  | 'prefix'
  | 'suffix'
  | 'format'
  | 'removeFormatting'
  | 'mask'
  | 'value'
  | 'defaultValue'
  | 'isNumericString'
  | 'customInput'
  | 'allowNegative'
  | 'allowEmptyFormatting'
  | 'allowLeadingZeros'
  | 'onValueChange'
  | 'type'
  | 'isAllowed'
  | 'renderText'
  | 'getInputRef'
  | 'allowedDecimalSeparators';
