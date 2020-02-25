interface ValidateLengthOptions {
  minLength?: number;
  maxLength?: number;
}

export default function validateMaxLength({ maxLength, minLength }: ValidateLengthOptions) {
  if (typeof maxLength === 'undefined') return;

  const value = maxLength;

  const message =
    typeof minLength !== 'undefined'
      ? maxLength === minLength
        ? `Must be ${minLength} charactors`
        : `Between ${minLength} and ${maxLength} charactors`
      : `At most ${maxLength} charactors`;
  return { value, message };
}
