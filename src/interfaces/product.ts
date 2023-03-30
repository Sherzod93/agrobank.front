import { ProductProperty } from '../components/blocks';
import { ImageInfo } from './classes';
import { ProductAdvantageData } from './product-advantage';
import { ProductTagData } from './product-tag';

export enum CalculationParameterValueType {
  fixed = 'fixed',
  variable = 'variable',
}

interface AbstractCalculationParameter {
  title: string;
}

interface CalculationParameterRates {
  month: number;
  rate: number;
}

export interface CalculationParameterValueFixed extends AbstractCalculationParameter {
  rates?: CalculationParameterRates[];
  type: CalculationParameterValueType.fixed;
  value: number;
}

export interface CalculationParameterValueVariable extends AbstractCalculationParameter {
  type: CalculationParameterValueType.variable;
  initialValue?: number;
  isInput?: boolean;
  max: number;
  min: number;
  gracePeriod?: number;
  rates?: CalculationParameterRates[];
  step?: number;
}

export type CalculationParameter = CalculationParameterValueFixed | CalculationParameterValueVariable;

export enum ProductType {
  advice = 'advice',
  business = 'business',
  bankCell = 'bank-cell',
  card = 'card',
  default = 'default',
  deposit = 'deposit',
  loan = 'loan',
  tariffs = 'tariffs',
  remittance = 'remittance',
}

export interface AbstractProductData {
  advantages?: ProductAdvantageData[];
  backgroundPicture: ImageInfo;
  bannerPicture?: ImageInfo;
  canBeApplied?: boolean;
  code: string;
  description?: string;
  id: number;
  mainBannerPicture?: ImageInfo;
  promoted?: boolean;
  properties?: ProductProperty[];
  tags: ProductTagData[];
  title: string;
  url: string;
  updatedDate: string;
}

export interface AdviceProductData extends AbstractProductData {
  productType?: ProductType;
  type: ProductType.advice;
}

export interface BankCellProductData extends AbstractProductData {
  type: ProductType.bankCell;
}

export interface CardProductData extends AbstractProductData {
  categoryIds: number[];
  picture: ImageInfo;
  type: ProductType.card;
}

export interface DepositProductData extends AbstractProductData {
  calculationParams: {
    amount: CalculationParameter;
    interestRate: CalculationParameter;
    monthCount: CalculationParameter;
  };
  categoryIds: number[];
  currency: string;
  customResultValueFunctionBodies?: string[];
  type: ProductType.deposit;
}

export interface LoanProductData extends AbstractProductData {
  calculationParams: {
    amount: CalculationParameter;
    initialPayment?: CalculationParameter;
    interestRate: CalculationParameter;
    monthCount: CalculationParameter;
  };
  categoryIds: number[];
  currency: string;
  customResultValueFunctionBodies?: string[];
  type: ProductType.loan;
}
export interface TariffsProductData extends AbstractProductData {
  calculationParams: {
    amount: CalculationParameter;
    initialPayment?: CalculationParameter;
    interestRate: CalculationParameter;
    monthCount: CalculationParameter;
  };
  categoryIds: number[];
  currency: string;
  customResultValueFunctionBodies?: string[];
  type: ProductType.tariffs;
}

export interface RemittanceProductData extends AbstractProductData {
  countries: [string, string][];
  type: ProductType.remittance;
}

export type ProductData =
  | AdviceProductData
  | BankCellProductData
  | CardProductData
  | DepositProductData
  | LoanProductData
  | TariffsProductData
  | RemittanceProductData;
