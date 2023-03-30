import { addMonths, carryOnMonday } from './helpers';
import { PeriodType } from './typings';

function* operationGenerator<T>({
  beginDate,
  carryOnMondays,
  data,
  endDate,
  period,
  skipFirst,
}: {
  beginDate: Date;
  carryOnMondays: boolean;
  data: T;
  endDate: Date;
  period: PeriodType;
  skipFirst: boolean;
}) {
  let monthAdded = 0;
  let currentDate;
  let firstWasSkipped = false;

  while ((currentDate = addMonths(beginDate, monthAdded)) <= endDate) {
    if (carryOnMondays) {
      currentDate = carryOnMonday(currentDate);
    }

    if (!skipFirst || firstWasSkipped) {
      yield {
        data,
        date: currentDate,
      };
    }

    if (skipFirst && !firstWasSkipped) {
      firstWasSkipped = true;
    }

    switch (period) {
      case PeriodType.monthly:
        monthAdded += 1;
        break;
      case PeriodType.quarterly:
        monthAdded += 3;
        break;
      case PeriodType.yearly:
        monthAdded += 12;
        break;
      case PeriodType.onceOnly:
        monthAdded += Infinity;
        break;
      // no default
    }
  }
}

export class Operations<T> {
  public records: { data: T; date: Date }[];

  constructor(
    {
      beginDate,
      carryOnMondays = false,
      endDate,
      period = PeriodType.onceOnly,
      skipFirst = false,
    }: {
      beginDate: Date;
      carryOnMondays?: boolean;
      endDate: Date;
      period: PeriodType;
      skipFirst?: boolean;
    },
    data: T,
  ) {
    this.records = [
      ...operationGenerator({ beginDate, carryOnMondays, data: Object.assign({}, data), endDate, period, skipFirst }),
    ];
  }
}
