import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { CurrencyRecord } from '../../../../interfaces';
import { CalculationData } from './calculation-data';

export interface CalculatorForm {
  calculationDataRef: MutableRefObject<{
    calculationData: CalculationData;
    currencyCodeToCurrencyRecordMap: Record<string, CurrencyRecord>;
  } | null>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
}
