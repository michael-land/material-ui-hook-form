import { ValidationOptions } from 'react-hook-form';
import { ValidateSettings } from '../types';
import { validateMax } from './validateMax';
import { validateMaxLength } from './validateMaxLength';
import { validateMin } from './validateMin';
import { validateMinLength } from './validateMinLength';
import { validatePattern } from './validatePattern';
import { validateRequired } from './validateRequired';

export function getRules(
  { max, min, maxLength, minLength, required, pattern, validate }: ValidationOptions,
  settings: ValidateSettings
): ValidationOptions | undefined {
  const hasValidation = min || max || minLength || maxLength || required || validate || pattern;

  return hasValidation
    ? {
        max: max
          ? typeof max === 'object'
            ? max
            : (settings?.validateMax ?? validateMax)({ min, max })
          : undefined,
        min: min
          ? typeof min === 'object'
            ? min
            : (settings?.validateMin ?? validateMin)({ min, max })
          : undefined,
        maxLength: maxLength
          ? typeof maxLength === 'object'
            ? maxLength
            : (settings?.validateMaxLength ?? validateMaxLength)({
                minLength,
                maxLength,
              })
          : undefined,
        minLength: minLength
          ? typeof minLength === 'object'
            ? minLength
            : (settings?.validateMinLength ?? validateMinLength)({
                minLength,
                maxLength,
              })
          : undefined,
        pattern: pattern
          ? !(pattern instanceof RegExp)
            ? pattern
            : (settings?.validatePattern ?? validatePattern)?.(pattern)
          : undefined,
        required: required
          ? typeof required === 'object' || typeof required === 'string'
            ? required
            : (settings?.validateRequired ?? validateRequired)?.()
          : undefined,
        validate,
      }
    : undefined;
}
