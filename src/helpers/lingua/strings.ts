import { caseOfNumber } from './numbers';

export function formatString(template = '', ...strings: string[]) {
  return template.replace(/{(\d)}/g, ([, index]) => strings[Number(index)]);
}

export function chooseWordDeclension(count: number, words: string[]) {
  return words[caseOfNumber(count)];
}
