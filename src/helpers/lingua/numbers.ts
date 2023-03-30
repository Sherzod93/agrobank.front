import { NumberDelimiters } from './interfaces';

export function caseOfNumber(number: number) {
  number = Math.abs(number) % 100;

  const modTen = number % 10;

  if (number > 10 && number <= 20) {
    return 2;
  }

  if (modTen > 1 && modTen < 5) {
    return 1;
  }

  if (modTen === 1) {
    return 0;
  }

  return 2;
}

const numberDelimiters: { [key: string]: NumberDelimiters } = {
  en: ['.', ','],
  ru: [',', '\xa0'],
  uz: [',', '\xa0'],
};

const formatAmountValueParseRegExp = new RegExp('^(-?\\d+)(?:\\.(\\d+))?$');

export function formatNumber(number: number, precision = 2, lang = 'en') {
  const [decimalDelimiter, thousandsDelimiter] = numberDelimiters[lang];
  let strValue = String(number);
  const params = formatAmountValueParseRegExp.exec(strValue);

  if (Number.isFinite(precision)) {
    precision = -1;
  }

  if (params) {
    const integerPart = params[1];
    let fractionalPart = params[2] || '';

    strValue = integerPart;

    if (thousandsDelimiter && integerPart.length > 4) {
      strValue = strValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousandsDelimiter);
    }

    if (precision >= 0) {
      if (precision > 0) {
        strValue += decimalDelimiter;
      }

      fractionalPart = fractionalPart.slice(0, precision);
      fractionalPart += new Array(precision + 1 - fractionalPart.length).join('0');
    } else if (fractionalPart) {
      strValue += decimalDelimiter;
    }

    strValue += fractionalPart;
  }

  return strValue;
}
