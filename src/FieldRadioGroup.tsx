import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup';
import { capitalCase } from 'change-case';
import React from 'react';
import { Control, Controller, ValidationOptions } from 'react-hook-form';
import useField from './useField';
import { get } from './utils/get';
import { getInputLabelFromName } from './utils/getInputLabelFromName';

interface FieldRadioGroup
  extends Pick<ValidationOptions, 'required'>,
    Omit<RadioGroupProps, 'onChange' | 'options'> {
  control?: Control;
  name: string;
  label?: string;
  naked?: boolean;
  disabled?: boolean;
  helperText?: string;
  options: (string | { value: string; label?: string })[];
}

function FieldRadioGroup({
  control: controlProp,
  name,
  required,
  naked,
  label,
  disabled,
  helperText,
  options,
  children,
  ...other
}: FieldRadioGroup) {
  const { control, error, rules } = useField({
    name,
    control: controlProp,
    disabled,
    required,
  });

  return (
    <FormControl disabled={disabled} component="fieldset" required={!!required} error={!!error}>
      <FormLabel disabled={disabled} component="legend" required={!!required} error={!!error}>
        {!naked ? label || getInputLabelFromName(name) : null}
      </FormLabel>
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
      {!naked && helperText ? (
        <FormHelperText disabled={disabled} required={!!required} error={!!error}>
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

export default FieldRadioGroup;
