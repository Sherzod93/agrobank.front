import {
  actualizeInterestRateRegisters,
  addMonths,
  bankersRound,
  calcInterest,
  getInterestRatePerDay,
  integerifyAmount,
  isValidDateObject,
  zeroTime,
} from './helpers';
import { Operations } from './Operations';
import { AbstractOperation, AbstractRegisters, PeriodType, PeriodUnits } from './typings';

export function calcDepositParametersHash(parameters = {}) {
  return JSON.stringify(parameters);
}

enum DepositModelOperationTypes {
  closing = 'closing',
  interestRateActualization = 'interest-rate-actualization',
  periodEnd = 'period-end',
}

interface ClosingOperation extends AbstractOperation {
  data: { type: DepositModelOperationTypes.closing };
}

interface InterestRateActualizationOperation extends AbstractOperation {
  data: { type: DepositModelOperationTypes.interestRateActualization };
}

interface PeriodEndOperation extends AbstractOperation {
  data: { type: DepositModelOperationTypes.periodEnd };
}

type Operation = ClosingOperation | InterestRateActualizationOperation | PeriodEndOperation;

const loanModelOperationTypesKeys: (keyof typeof DepositModelOperationTypes)[] = Object.keys(
  DepositModelOperationTypes,
) as any;

const operationPredicates: Record<keyof typeof DepositModelOperationTypes, ({ data }: Operation) => boolean> =
  Object.freeze(
    loanModelOperationTypesKeys.reduce(
      (result, loanModelOperationType) =>
        Object.assign(result, {
          [loanModelOperationType]: ({ data: { type } }: { data: { type: string } }) =>
            type === DepositModelOperationTypes[loanModelOperationType],
        }),
      {},
    ),
  ) as any;

class DepositRecord {
  private readonly _amount;
  private readonly _amountDelta;
  private readonly _date;
  private readonly _income;

  constructor({
    amount,
    amountDelta = 0,
    date,
    income,
  }: {
    amount: number;
    amountDelta?: number;
    date: Date;
    income: number;
  }) {
    this._amount = amount;
    this._amountDelta = amountDelta;
    this._date = new Date(date);
    this._income = income;
  }

  get amount() {
    return this._amount;
  }

  get amountDelta() {
    return this._amountDelta;
  }

  get date() {
    return this._date;
  }

  get income() {
    return this._income;
  }
}

interface Registers extends AbstractRegisters {
  amount: number;
  lastDate: Date;
  periodIncome: number;
}

interface DepositModelResultRecord {
  amount: number;
  date: Date;
  income: number;
}

export interface DepositModelResult {
  records: Readonly<DepositModelResultRecord>[];
  totals: Readonly<{
    amount: number;
    income: number;
  }>;
}

export class DepositModel {
  private readonly _amount;
  private readonly _beginDate;
  private readonly _endDate;
  private readonly _interestRate;
  private readonly _records: DepositRecord[];
  private readonly _result: Readonly<DepositModelResult>;
  private readonly _periodInMonth;

  constructor({
    amount = 0,
    beginDate,
    endDate,
    interestRate,
    period,
    periodUnit = PeriodUnits.month,
  }: Readonly<{
    amount?: number;
    beginDate: Date;
    endDate?: Date;
    interestRate: number;
    period: number;
    periodUnit?: PeriodUnits;
  }>) {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new TypeError(`Invalid amount: ${amount}`);
    }

    if (!isValidDateObject(beginDate)) {
      throw new TypeError(`Invalid beginDate: ${beginDate}`);
    }

    if (!Number.isFinite(period) || period <= 0) {
      throw new TypeError(`Invalid period: ${period}`);
    }

    if (!Object.values(PeriodUnits).includes(periodUnit)) {
      throw new TypeError(`Invalid periodUnit: ${periodUnit}`);
    }

    this._periodInMonth = period;

    if (periodUnit === PeriodUnits.year) {
      this._periodInMonth = period * 12;
    }

    if (endDate && (!isValidDateObject(endDate) || endDate <= beginDate)) {
      throw new TypeError(`Invalid endDate: ${endDate}`);
    }

    this._beginDate = zeroTime(new Date(beginDate));

    if (endDate) {
      endDate = zeroTime(endDate);
      this._endDate = endDate;
    } else {
      this._endDate = addMonths(this._beginDate, this._periodInMonth);
    }

    if (!Number.isFinite(interestRate) || interestRate < 0) {
      throw new TypeError(`Invalid interestRate: ${interestRate}`);
    }

    this._amount = integerifyAmount(amount);

    this._interestRate = interestRate;

    const operations: Operation[] = new Operations(
      {
        beginDate: this._beginDate,
        endDate: this._endDate,
        period: PeriodType.monthly,
        skipFirst: true,
      },
      {
        type: DepositModelOperationTypes.periodEnd as const,
      },
    ).records;

    operations.push({
      date: this._endDate,
      data: {
        type: DepositModelOperationTypes.closing,
      },
    });

    const interestRateActualizationOperations = new Operations(
      {
        beginDate: new Date(this._beginDate.getFullYear(), 11, 31),
        carryOnMondays: false,
        endDate: this._endDate,
        period: PeriodType.yearly,
      },
      {
        type: DepositModelOperationTypes.interestRateActualization as const,
      },
    ).records;

    operations.push(...interestRateActualizationOperations);
    operations.sort((a, b) => a.date.getTime() - b.date.getTime());

    this._records = [
      new DepositRecord({ amount: this._amount, amountDelta: this._amount, date: this._beginDate, income: 0 }),
    ];

    const interestRatePerDay = getInterestRatePerDay(this._interestRate, this._beginDate.getFullYear());
    const registers: Registers = {
      amount: this._amount,
      currentYearInterestRatePerDay: interestRatePerDay,
      lastDate: this._beginDate,
      periodIncome: 0,
      previousYearInterestRatePerDay: interestRatePerDay,
    };

    const timeToOperationsMap = operations.reduce((result, operation) => {
      const time = operation.date.getTime();

      if (!result.has(time)) {
        result.set(time, []);
      }

      result.get(time).push(operation);

      return result;
    }, new Map());

    let timeAndOperationsPairs = [...timeToOperationsMap.entries()];

    if (endDate) {
      const lastPair = timeAndOperationsPairs[timeAndOperationsPairs.length - 1];

      timeAndOperationsPairs = timeAndOperationsPairs.filter(([time]) => time <= endDate!);

      const lastPairAfterFiltration = timeAndOperationsPairs[timeAndOperationsPairs.length - 1];

      if (lastPairAfterFiltration && lastPairAfterFiltration[0] !== endDate.getTime()) {
        timeAndOperationsPairs.push([
          endDate.getTime(),
          lastPair[1].filter(({ data: { type } }: Operation) => type === DepositModelOperationTypes.periodEnd),
        ]);
      }
    }

    let closed = false;

    timeAndOperationsPairs.forEach(([time, operations]) => {
      if (closed) {
        return;
      }

      const operationDate = new Date(time);
      const isThereAClosingOperation = operations.some(operationPredicates.closing);
      const isThereAPeriodEndOperation = operations.some(operationPredicates.periodEnd);
      const isThereAnInterestRateActualizationOperation = operations.some(
        operationPredicates.interestRateActualization,
      );
      const { currentYearInterestRatePerDay, previousYearInterestRatePerDay } = registers;

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

      const income = bankersRound(
        calcInterest(
          registers.amount,
          registers.lastDate,
          operationDate,
          previousYearInterestRatePerDay,
          currentYearInterestRatePerDay,
        ),
      );

      if (registers.amount < 0) {
        throw new Error();
      }

      registers.periodIncome += income;

      if (isThereAPeriodEndOperation) {
        registers.periodIncome = 0;
      }

      if (isThereAClosingOperation) {
        closed = true;
      }

      this._records.push(
        new DepositRecord({
          amount: registers.amount,
          date: operationDate,
          income,
        }),
      );

      registers.lastDate = operationDate;
    });

    const records: DepositModelResultRecord[] = [];
    let totalIncome = 0;

    this._records.forEach(({ date, amount, income }) => {
      records.push({
        date,
        amount: amount / 100,
        income: income / 100,
      });

      totalIncome += income;
    });

    this._result = {
      records,
      totals: {
        amount: this._records[this._records.length - 1].amount / 100,
        income: totalIncome / 100,
      },
    };
  }

  get result() {
    return this._result;
  }
}
