import { useTheme } from '@material-ui/core';
import { Control, FieldError, useFormContext, ValidationOptions } from 'react-hook-form';
import { get } from './utils/get';
import { getRules } from './utils/getRules';

export interface UseFieldOptions extends ValidationOptions {
  name: string;
  control?: Control;
  disabled?: boolean;
}

export default function useField({
  name,
  disabled,
  control: controlProp,
  ...validations
}: UseFieldOptions) {
  const methods = useFormContext();
  const theme = useTheme();
  const control = controlProp || methods.control;
  const error = get<FieldError>(control.errorsRef.current, name);

  const rules: ValidationOptions | undefined = !disabled
    ? getRules(validations, (theme as any)?.validation)
    : undefined;

  return { control, error, rules };
}
