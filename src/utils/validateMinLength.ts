interface ValidateLengthOptions {
  minLength?: number;
  maxLength?: number;
}

export default function validateMinLength({ maxLength, minLength }: ValidateLengthOptions) {
  if (typeof minLength === 'undefined') return;
  const value = minLength;

  const message =
    typeof maxLength !== 'undefined'
      ? maxLength === minLength
        ? `Must be ${minLength} charactors`
        : `Between ${minLength} and ${maxLength} charactors`
      : `At least ${minLength} charactors`;

  return { value, message };
}
