import { AnnuityLoanModel } from './AnnuityLoanModel';
import {
  actualizeInterestRateRegisters,
  addMonths,
  bankersRound,
  getInterestRatePerDay,
  integerifyAmount,
  isValidDateObject,
  zeroTime,
} from './helpers';
import { Operations } from './Operations';
import { AbstractOperation, AbstractRegisters, AnnuityLoanModelModes, PeriodType, PeriodUnits } from './typings';

export function calcLoanParametersHash(parameters = {}) {
  return JSON.stringify(parameters);
}

export enum PaymentTypes {
  annuity = 'annuity',
  differential = 'differential',
}

enum LoanModelOperationTypes {
  closing = 'closing',
  interestRateActualization = 'interest-rate-actualization',
  periodEnd = 'period-end',
}

interface ClosingOperation extends AbstractOperation {
  data: { type: LoanModelOperationTypes.closing };
}

interface InterestRateActualizationOperation extends AbstractOperation {
  data: { type: LoanModelOperationTypes.interestRateActualization };
}

interface PeriodEndOperation extends AbstractOperation {
  data: { type: LoanModelOperationTypes.periodEnd };
}

type Operation = ClosingOperation | InterestRateActualizationOperation | PeriodEndOperation;

const loanModelOperationTypesKeys: (keyof typeof LoanModelOperationTypes)[] = Object.keys(
  LoanModelOperationTypes,
) as any;

const operationPredicates: Record<keyof typeof LoanModelOperationTypes, ({ data }: Operation) => boolean> =
  Object.freeze(
    loanModelOperationTypesKeys.reduce(
      (result, loanModelOperationType) =>
        Object.assign(result, {
          [loanModelOperationType]: ({ data: { type } }: Operation) =>
            type === LoanModelOperationTypes[loanModelOperationType],
        }),
      {},
    ),
  ) as any;

class LoanRecord {
  private readonly _amount;
  private readonly _body;
  private readonly _commission;
  private readonly _date;
  private readonly _interest;
  private readonly _isItFirst;

  constructor({
    amount,
    body,
    commission = 0,
    date,
    interest,
    isItFirst = false,
  }: Readonly<{
    amount: number;
    body: number;
    commission?: number;
    date: Date;
    interest: number;
    isItFirst?: boolean;
  }>) {
    this._amount = amount;
    this._body = body;
    this._commission = commission;
    this._date = new Date(date);
    this._interest = interest;
    this._isItFirst = isItFirst;
  }

  get amount() {
    return this._amount;
  }

  get body() {
    return this._isItFirst ? 0 : this._body;
  }

  get commission() {
    return this._commission;
  }

  get date() {
    return this._date;
  }

  get interest() {
    return this._interest;
  }

  get isItFirst() {
    return this._isItFirst;
  }

  get payment() {
    return !this._isItFirst ? this._body + this._interest : 0;
  }
}

interface Registers extends AbstractRegisters {
  amount: number;
  lastDate: Date;
  periodPayment: number;
}

interface LoanModelResultRecord {
  amount: number;
  body: number;
  date: Date;
  interest: number;
  payment: number;
}

export interface LoanModelResult {
  records: Readonly<LoanModelResultRecord>[];
  totals: Readonly<{
    body: number;
    interest: number;
    payment: number;
  }>;
}

export const oneOffCommissionFeeInPercent = 99;
export const periodCommissionFeeInPercent = 99;

export class LoanModel {
  private readonly _amount;
  private readonly _beginDate;
  private readonly _endDate;
  private readonly _interestRate;
  private readonly _oneOffCommissionFee;
  private readonly _paymentPeriod;
  private readonly _paymentType: PaymentTypes;
  private readonly _periodCommissionFee;

  private readonly _records: LoanRecord[] = [];
  private readonly _result: Readonly<LoanModelResult>;

  constructor({
    amount,
    beginDate,
    oneOffCommissionFee = 0,
    endDate,
    interestRate,
    paymentPeriod = PeriodType.monthly,
    paymentType = PaymentTypes.annuity,
    period,
    periodCommissionFee = 0,
    periodUnit = PeriodUnits.month,
  }: Readonly<{
    amount: number;
    beginDate: Date;
    oneOffCommissionFee?: number;
    endDate?: Date;
    interestRate: number;
    paymentPeriod?: PeriodType;
    paymentType?: PaymentTypes;
    period: number;
    periodCommissionFee?: number;
    periodUnit?: PeriodUnits;
  }>) {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new TypeError(`Invalid amount: ${amount}`);
    }

    if (!isValidDateObject(beginDate)) {
      throw new TypeError(`Invalid beginDate: ${beginDate}`);
    }

    if (endDate && (!isValidDateObject(endDate) || endDate <= beginDate)) {
      throw new TypeError(`Invalid endDate: ${endDate}`);
    }

    this._beginDate = zeroTime(new Date(beginDate));

    if (!Object.values(PeriodType).includes(paymentPeriod)) {
      throw new TypeError(`Invalid paymentPeriod: ${paymentPeriod}`);
    }

    if (!Number.isFinite(period) || period <= 0) {
      throw new TypeError(`Invalid period: ${period}`);
    }

    if (!Object.values(PeriodUnits).includes(periodUnit)) {
      throw new TypeError(`Invalid periodUnit: ${periodUnit}`);
    }

    let periodInMonth = period;

    if (periodUnit === PeriodUnits.year) {
      periodInMonth = periodInMonth * 12;
    }

    let monthInPeriod;

    switch (paymentPeriod) {
      case PeriodType.monthly:
        monthInPeriod = 1;
        break;
      case PeriodType.quarterly:
        monthInPeriod = 3;
        break;
      case PeriodType.yearly:
        monthInPeriod = 12;
        break;
      default:
        throw new TypeError(`Invalid paymentPeriod: ${paymentPeriod}`);
    }

    if (periodInMonth % monthInPeriod !== 0) {
      throw new TypeError(`Invalid period: ${period}`);
    }

    if (endDate) {
      this._endDate = zeroTime(new Date(endDate));
    } else {
      this._endDate = addMonths(this._beginDate, periodInMonth);
    }

    if (!Number.isFinite(interestRate) || interestRate <= 0) {
      throw new TypeError(`Invalid interestRate: ${interestRate}`);
    }

    if (
      !Number.isFinite(oneOffCommissionFee) ||
      oneOffCommissionFee > Math.floor((oneOffCommissionFeeInPercent * amount) / 100)
    ) {
      throw new TypeError(`Invalid oneOffCommissionFee: ${oneOffCommissionFee}`);
    }

    if (!Object.values(PaymentTypes).includes(paymentType)) {
      throw new TypeError(`Invalid paymentType: ${paymentType}`);
    }

    if (
      !Number.isFinite(periodCommissionFee) ||
      periodCommissionFee > Math.floor((periodCommissionFeeInPercent * amount) / 100)
    ) {
      throw new TypeError(`Invalid periodCommissionFee: ${periodCommissionFee}`);
    }

    this._amount = integerifyAmount(amount);
    this._interestRate = interestRate;
    this._oneOffCommissionFee = integerifyAmount(oneOffCommissionFee);
    this._paymentPeriod = paymentPeriod;
    this._paymentType = paymentType;
    this._periodCommissionFee = integerifyAmount(periodCommissionFee);

    const periodCount = periodInMonth / monthInPeriod;

    let periodInterestRate: number;

    switch (paymentPeriod) {
      case PeriodType.monthly:
        periodInterestRate = interestRate / 12;
        break;
      case PeriodType.quarterly:
        periodInterestRate = interestRate / 4;
        break;
      case PeriodType.yearly:
        periodInterestRate = interestRate;
        break;
      default:
        throw new TypeError(`Invalid paymentPeriod: ${paymentPeriod}`);
    }

    let periodPayment = 0;

    switch (this._paymentType) {
      case PaymentTypes.annuity: {
        periodPayment = (
          new AnnuityLoanModel({
            amount: this._amount,
            periodInterestRate,
            periodCount,
            mode: AnnuityLoanModelModes.payment,
          }).result as { payment: number }
        ).payment;
        break;
      }
      case PaymentTypes.differential:
        periodPayment = this._amount / periodCount;
        break;
    }

    const operations: Operation[] = new Operations(
      {
        beginDate: this._beginDate,
        endDate: this._endDate,
        period: paymentPeriod,
        skipFirst: true,
      },
      {
        type: LoanModelOperationTypes.periodEnd as const,
      },
    ).records;

    operations.push({
      date: this._endDate,
      data: {
        type: LoanModelOperationTypes.closing,
      },
    });

    const interestRateActualizationOperations = new Operations(
      {
        beginDate: new Date(this._beginDate.getFullYear(), 11, 31),
        endDate: this._endDate,
        period: PeriodType.yearly,
      },
      {
        type: LoanModelOperationTypes.interestRateActualization as const,
      },
    ).records;

    operations.push(...interestRateActualizationOperations);

    operations.sort((a, b) => a.date.getTime() - b.date.getTime());

    const timeToOperationsMap: Map<number, typeof operations> = operations.reduce((result, operation) => {
      const time = operation.date.getTime();

      if (!result.has(time)) {
        result.set(time, []);
      }

      result.get(time).push(operation);

      return result;
    }, new Map());

    const timeAndOperationsPairs = [...timeToOperationsMap.entries()];

    this._records = [
      new LoanRecord({
        amount: -this._amount,
        body: -this._amount,
        commission: this._oneOffCommissionFee,
        date: this._beginDate,
        interest: 0,
        isItFirst: true,
      }),
    ];

    const interestRatePerDay = getInterestRatePerDay(this._interestRate, this._beginDate.getFullYear());
    const registers: Registers = {
      amount: -this._amount,
      currentYearInterestRatePerDay: interestRatePerDay,
      lastDate: this._beginDate,
      periodPayment: bankersRound(periodPayment),
      previousYearInterestRatePerDay: interestRatePerDay,
    };

    timeAndOperationsPairs.forEach(([time, operations]) => {
      if (registers.amount === 0) {
        return;
      }

      const operationDate = new Date(time);
      const absoluteAmount = Math.abs(registers.amount);
      const isThereAClosingOperation = operations.some(operationPredicates.closing);
      const isThereAPeriodEndOperation = operations.some(operationPredicates.periodEnd);
      const isThereAnInterestRateActualizationOperation = operations.some(
        operationPredicates.interestRateActualization,
      );

      if (isThereAnInterestRateActualizationOperation) {
        actualizeInterestRateRegisters({
          registers,
          interestRate: this._interestRate,
          year: operationDate.getFullYear(),
        });
      }

      if (!isThereAPeriodEndOperation && !isThereAClosingOperation) {
        return;
      }

      const interest = bankersRound(((absoluteAmount * interestRate) / periodCount) * (periodCount / 12));

      let body = 0;

      if (isThereAClosingOperation) {
        body = absoluteAmount;
      } else if (isThereAPeriodEndOperation) {
        body =
          PaymentTypes.annuity === this._paymentType ? registers.periodPayment - interest : registers.periodPayment;
      }

      body = Math.min(absoluteAmount, body);

      registers.amount += body;

      this._records.push(
        new LoanRecord({
          amount: registers.amount,
          body,
          commission: isThereAPeriodEndOperation || isThereAClosingOperation ? this._periodCommissionFee : 0,
          date: operationDate,
          interest,
        }),
      );

      registers.lastDate = operationDate;
    });

    const records: LoanModelResultRecord[] = [];
    const totals = { body: 0, commission: 0, interest: 0, payment: 0 };

    this._records.forEach(({ amount, body, date, interest, payment }) => {
      records.push({
        amount: Math.round(amount / 100),
        body: Math.round(body / 100),
        date,
        interest: Math.round(interest / 100),
        payment: Math.round(payment / 100),
      });
      totals.body += body;
      totals.interest += interest;
      totals.payment += payment;
    });

    records.sort((a, b) => (a.body < b.body ? -1 : a.body > b.body ? 1 : 0));

    this._result = {
      records,
      totals: {
        body: totals.body / 100,
        interest: totals.interest / 100,
        payment: totals.payment / 100,
      },
    };
  }

  get result() {
    return this._result;
  }
}
