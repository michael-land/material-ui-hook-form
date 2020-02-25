interface validateMinMaxOption {
  min?: number;
  max?: number;
}

export default function validateMax({ min, max }: validateMinMaxOption) {
  if (typeof max === 'undefined') return;

  const message = min
    ? min === max
      ? `Must be ${max}`
      : `Between ${min} and ${max}`
    : `Max is ${max}`;
  return { value: max, message };
}
