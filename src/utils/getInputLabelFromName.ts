import { capitalCase } from 'change-case';

export default function getInputLabelFromName(name: string) {
  return capitalCase(name.split('.').pop() || name);
}
