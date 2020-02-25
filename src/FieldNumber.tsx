import TextField from '@material-ui/core/TextField';
import React from 'react';
import NumberFormat from 'react-number-format';
import { Except } from 'type-fest';
import FieldNumberFormat from './FieldNumberFormat';

const Format = ({ onChange, ...other }: any) => (
  <NumberFormat
    onValueChange={value => onChange(value.floatValue)}
    customInput={TextField}
    {...other}
  />
);

interface FieldNumber extends Except<FieldNumberFormat, 'as'> {}

function FieldNumber(props: FieldNumber) {
  return <FieldNumberFormat {...props} as={Format} />;
}

export default FieldNumber;
