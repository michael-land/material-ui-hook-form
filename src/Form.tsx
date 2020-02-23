import React from 'react';
import { FormContext, FormContextValues } from 'react-hook-form';

interface Form extends React.FormHTMLAttributes<HTMLFormElement> {
  form?: FormContextValues;
  debug?: boolean;
}

function Form({ form, ...other }: Form) {
  const component = <form noValidate {...other} />;
  return form ? <FormContext {...form}>{component}</FormContext> : component;
}

export default Form;
