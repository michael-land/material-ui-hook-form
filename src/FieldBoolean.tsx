import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Except } from 'type-fest';
import { FieldCommonProps } from './types';
import useField from './useField';
import get from './utils/get';
import getInputLabelFromName from './utils/getInputLabelFromName';

const useStyles = makeStyles({
  negativeMargin: {
    marginRight: -8,
  },
  helperText: {
    margin: '8px 12px 0',
  },
  hidden: {
    display: 'none',
  },
});

interface FieldBoolean
  extends Except<React.InputHTMLAttributes<HTMLElement>, 'name' | 'type'>,
    FieldCommonProps {
  switch?: boolean;
  helperText?: string;
  label?: string;
  mode?: any;
  as?: React.ComponentType;
  hiddenLabel?: boolean;
}

function FieldBoolean({
  className,
  control: controlProp,
  children,
  name,
  helperText: helperTextProp,
  label,
  mode,
  disabled,
  hidden,
  hiddenLabel,
  hiddenErrorMessage,
  defaultValue,
  required,
  style,
  as: asProp = Checkbox,
  ...other
}: FieldBoolean) {
  const classes = useStyles();
  const { control, error } = useField({ name, control: controlProp });
  const helperText = hiddenErrorMessage ? undefined : error?.message || helperTextProp;

  return (
    <div className={className} style={style}>
      <FormControlLabel
        className={clsx({
          [classes.negativeMargin]: !label,
          [classes.hidden]: hidden,
        })}
        disabled={disabled}
        hidden={hiddenLabel}
        label={hiddenLabel ? undefined : label ?? getInputLabelFromName(name)}
        control={
          <Controller
            disabled={disabled}
            as={asProp}
            control={control}
            name={name}
            mode={mode}
            defaultValue={defaultValue ?? get(control.defaultValuesRef.current, name, false)}
            {...other}
          />
        }
      />
      {helperText ? (
        <FormHelperText required={!!required} error={!!error} className={classes.helperText}>
          {helperText}
        </FormHelperText>
      ) : null}
    </div>
  );
}

export default FieldBoolean;
