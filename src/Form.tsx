import React from 'react';
import { FormContext, FormContextValues, FieldValues } from 'react-hook-form';

interface Form<FormValues extends FieldValues = FieldValues>
  extends React.FormHTMLAttributes<HTMLFormElement> {
  form?: FormContextValues<FormValues>;
  debug?: boolean;
}

function Form<FormValues extends FieldValues = FieldValues>({ form, ...other }: Form<FormValues>) {
  const component = <form noValidate {...other} />;
  return form ? <FormContext {...form}>{component}</FormContext> : component;
}

export default Form;
