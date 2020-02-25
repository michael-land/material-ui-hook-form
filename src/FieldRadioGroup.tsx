import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
  hidden: {
    display: 'none',
  },
});

interface FieldRadioGroup
  extends Pick<ValidationOptions, 'required'>,
    Except<RadioGroupProps, 'onChange' | 'name'>,
    FieldCommonProps {
  label?: string;
  disabled?: boolean;
  helperText?: string;
  hiddenLabel?: boolean;
  options: (string | { value: string; label?: string })[];
}

function FieldRadioGroup({
  children,
  className,
  control: controlProp,
  disabled,
  helperText: helperTextProp,
  hidden,
  label: labelProp,
  hiddenLabel,
  hiddenErrorMessage,
  name,
  options,
  required,
  ...other
}: FieldRadioGroup) {
  const classes = useStyles();

  const { control, error, rules } = useField({
    name,
    control: controlProp,
    disabled,
    required,
  });
  const label = labelProp || getInputLabelFromName(name);
  const helperText = hiddenErrorMessage ? undefined : error?.message || helperTextProp;
  return (
    <FormControl
      disabled={disabled}
      component="fieldset"
      required={!!required}
      error={!!error}
      className={clsx(className, { [classes.hidden]: hidden })}
    >
      {!hiddenLabel && label ? (
        <FormLabel
          disabled={disabled}
          component="legend"
          required={!!required}
          error={!!error}
          hidden={hiddenLabel}
        >
          {label}
        </FormLabel>
      ) : null}
      <Controller
        name={name}
        required={!!required}
        defaultValue={get(control.defaultValuesRef.current, name, '')}
        as={RadioGroup}
        control={control}
        rules={rules}
        {...other}
      >
        {options.map(option => {
          return typeof option === 'string' ? (
            <FormControlLabel
              key={option}
              control={<Radio />}
              label={capitalCase(option)}
              value={option}
            />
          ) : (
            <FormControlLabel
              control={<Radio />}
              {...option}
              key={option.value}
              label={option.value}
            />
          );
        })}
      </Controller>
      {helperText ? (
        <FormHelperText disabled={disabled} required={!!required} error={!!error}>
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

export default FieldRadioGroup;
