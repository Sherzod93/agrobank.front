import { DepositModelResult } from '../../../../calculators-models/DepositModel';
import { LoanModelResult } from '../../../../calculators-models/LoanModel';
import { ProductType } from '../../../../interfaces';

export interface CustomResultValue {
  title: string;
  type: string;
  value: string | number;
}

interface AbstractCalculationData {
  amount: number;
  customResultValues: CustomResultValue[];
  interestRate: number;
  monthCount: number;
}

interface DepositCalculationData extends AbstractCalculationData {
  monthIncome?: number;
  records?: DepositModelResult['records'];
  totalIncome?: number;
  type: ProductType.deposit;
}

interface LoanCalculationData extends AbstractCalculationData {
  annuityPayment?: number;
  gracePeriod?: number;
  initialPayment: number;
  interest?: number;
  records?: LoanModelResult['records'];
  type: ProductType.loan;
}

export type CalculationData = LoanCalculationData | DepositCalculationData;
