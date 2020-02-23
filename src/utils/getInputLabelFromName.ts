import { capitalCase } from 'change-case';
export function getInputLabelFromName(name: string) {
  return capitalCase(name.split('.').pop() || name);
}
