import { GridProps } from '@material-ui/core/Grid';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import { Control, Controller, ValidationOptions } from 'react-hook-form';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { Except } from 'type-fest';
import useField from './useField';
import { get } from './utils/get';
import { getInputLabelFromName } from './utils/getInputLabelFromName';

interface FieldNumber
  extends Except<ValidationOptions, 'maxLength' | 'minLength' | 'pattern'>,
    Except<
      TextFieldProps,
      'required' | 'value' | 'defaultValue' | 'type' | 'select' | 'SelectProps'
    >,
    Pick<NumberFormatProps, NumberFormatKey>,
    Pick<GridProps, Breakpoint> {
  control?: Control;
  name: string;
  naked?: boolean;
  options?: Record<string, any>;
}

const Format = (props: any) => <NumberFormat {...props} customInput={TextField} />;

function FieldNumber({
  control: controlProp,
  max,
  label,
  min,
  name,
  required,
  disabled,
  validate,
  helperText,
  naked,
  options,
  ...other
}: FieldNumber) {
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
      fullWidth
      name={name}
      required={!!required}
      label={!naked ? label ?? getInputLabelFromName(name) : undefined}
      defaultValue={get(control.defaultValuesRef.current, name, '')}
      as={Format}
      error={!!error}
      helperText={!naked ? error?.message ?? helperText : undefined}
      control={control}
      rules={rules}
      {...other}
    />
  );
}

export default FieldNumber;

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
