export enum AnnuityLoanModelModes {
  amount = 'amount',
  payment = 'payment',
  period = 'period',
  interestRate = 'interestRate',
}

export interface AbstractOperation {
  date: Date;
}

export interface AbstractRegisters {
  currentYearInterestRatePerDay: number;
  previousYearInterestRatePerDay: number;
}

export enum PeriodType {
  onceOnly = 'once-only',
  monthly = 'monthly',
  quarterly = 'quarterly',
  yearly = 'yearly',
}

export enum PeriodUnits {
  month = 'month',
  year = 'year',
}
