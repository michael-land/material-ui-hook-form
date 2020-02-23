type ValidationOptionObject<Value> =
  | Value
  | {
      value: Value;
      message: string;
    };

export interface ValidateSettings {
  validateRequired: () => ValidationOptionObject<boolean>;
  validatePattern: (pattern: RegExp) => ValidationOptionObject<RegExp>;
  validateMax: (options: {
    min?: ValidationOptionObject<number | string>;
    max: ValidationOptionObject<number | string>;
  }) => ValidationOptionObject<number | string>;
  validateMin: (options: {
    min: ValidationOptionObject<number | string>;
    max?: ValidationOptionObject<number | string>;
  }) => ValidationOptionObject<number | string>;
  validateMaxLength: (options: {
    minLength?: ValidationOptionObject<number | string>;
    maxLength: ValidationOptionObject<number | string>;
  }) => ValidationOptionObject<number | string>;
  validateMinLength: (options: {
    minLength: ValidationOptionObject<number | string>;
    maxLength?: ValidationOptionObject<number | string>;
  }) => ValidationOptionObject<number | string>;
}
