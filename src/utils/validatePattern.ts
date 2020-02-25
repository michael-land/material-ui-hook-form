export default function validatePattern(pattern: RegExp) {
  return { value: pattern, message: `Invalid. Expect ${pattern}` };
}
