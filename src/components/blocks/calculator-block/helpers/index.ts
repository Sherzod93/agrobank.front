import { TFunction } from 'react-i18next';
import { formatNumber } from '../../../../helpers';
import {
  CalculationParameterValueType,
  CalculationParameterValueVariable,
  CurrencyRecord,
  LoanProductData,
} from '../../../../interfaces';

export const getCalculationParamDefaultValue = (
  calculationParams: Required<LoanProductData>['calculationParams'],
  paramKey: keyof LoanProductData['calculationParams'],
): number | undefined => {
  const param = calculationParams[paramKey];

  if (param) {
    return param.type === CalculationParameterValueType.fixed ? param.value : param?.initialValue ?? param.min;
  }
};

export const formatCalculatorValue = (
  {
    isLimitValue = false,
    type,
    value,
  }: {
    isLimitValue?: boolean;
    type: 'amount' | 'initialPayment' | 'interestRate' | 'gracePeriod' | 'monthCount' | 'percent' | 'term' | 'text';
    value: number;
  },
  t: TFunction<'translation'>,
  language = 'en',
  currencyCode?: string,
  currencyCodeToCurrencyRecordMap?: Record<string, CurrencyRecord>,
  rates?: CalculationParameterValueVariable['rates'],
): string => {
  switch (type) {
    case 'amount': {
      let result = formatNumber(value, 2, language);

      if (!currencyCode) {
        return result;
      }

      const { symbol: currencySymbol } = currencyCodeToCurrencyRecordMap?.[currencyCode] ?? {};

      if (currencySymbol) {
        result += `&nbsp;${currencySymbol}`;
      } else {
        const suffix = isLimitValue ? 'g' : 'n';

        result += `&nbsp;${t(`block-calculator.${currencyCode}_${suffix}_${declOfNum(Math.floor(Math.abs(value)))}`)}`;
      }

      return result;
    }
    case 'initialPayment':
    case 'interestRate':
    case 'percent':
      return `${formatNumber(value, 2, language)}%`;
    case 'gracePeriod':
      const suffix = isLimitValue ? 'g' : 'n';
      return `${value}&nbsp;${t(`block-calculator.month_${suffix}_${declOfNum(Math.floor(Math.abs(value)))}`)}`;
    case 'monthCount':
    case 'term': {
      const suffix = isLimitValue ? 'g' : 'n';
      let prefix = 'month';

      if (value % 12 === 0) {
        value /= 12;
        prefix = 'year';
      }

      if (rates?.length && rates[value].month % 12 === 0) {
        value = rates[value].month / 12;
        prefix = 'year';
      }

      return `${value}&nbsp;${t(`block-calculator.${prefix}_${suffix}_${declOfNum(Math.floor(Math.abs(value)))}`)}`;
    }
    default:
      return String(value);
  }
};

export const declOfNum = (n: number) => {
  const suffix = ['one', 'few', 'many'];

  return suffix[
    n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
  ];
};
