import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import useField from './useField';
import { getInputLabelFromName } from './utils/getInputLabelFromName';

const useStyles = makeStyles({
  negativeMargin: {
    marginRight: -8,
  },
  helperText: {
    margin: '8px 12px 0',
  },
});

interface FieldBoolean extends React.InputHTMLAttributes<HTMLElement> {
  switch?: boolean;
  name: string;
  helperText?: string;
  label?: string;
  naked?: boolean;
  mode?: any;
  as?: React.ComponentType;
  control?: Control;
}

function FieldBoolean({
  className,
  control: controlProp,
  children,
  name,
  helperText: helperTextProp,
  label,
  naked,
  mode,
  disabled,
  defaultValue,
  required,
  style,
  as: asProp = Checkbox,
  ...other
}: FieldBoolean) {
  const classes = useStyles();
  const { control, error } = useField({ name, control: controlProp });
  const helperText = error?.message ?? helperTextProp;

  return (
    <div className={className} style={style}>
      <FormControlLabel
        className={clsx({
          [classes.negativeMargin]: naked || !label,
        })}
        disabled={disabled}
        label={!naked ? label || getInputLabelFromName(name) : null}
        control={
          <Controller
            valueName="checked"
            disabled={disabled}
            as={asProp}
            control={control}
            name={name}
            mode={mode}
            defaultValue={defaultValue || false}
            {...other}
          />
        }
      />
      {!naked && helperText ? (
        <FormHelperText required={!!required} error={!!error} className={classes.helperText}>
          {helperText}
        </FormHelperText>
      ) : null}
    </div>
  );
}

export default FieldBoolean;
