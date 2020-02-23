interface validateMinMaxOption {
  min?: number;
  max?: number;
}

export function validateMin({ min, max }: validateMinMaxOption) {
  if (typeof min === 'undefined') return;

  const message = max
    ? min === max
      ? `Must be ${max}`
      : `Between ${min} and ${max}`
    : `Min is ${min}`;
  return { value: min, message };
}
