import { LoanModel, LoanModelResult } from './LoanModel';
import { PeriodUnits } from './typings';

describe('LoanModel', () => {
  const args = [
    {
      amount: 100000,
      beginDate: new Date(2019, 8, 3),
      interestRate: 0.05,
      period: 7,
      periodUnit: PeriodUnits.year,
    },
    {
      amount: 135787,
      beginDate: new Date(2020, 10, 1),
      interestRate: 0.18,
      period: 7,
      periodUnit: PeriodUnits.month,
    },
  ];
  const results = args.map((args) => new LoanModel(args).result.totals);
  const aimResults: LoanModelResult['totals'][] = [
    {
      body: 100000,
      interest: 18718.16,
      payment: 118718.16,
    },
    {
      body: 135787.0,
      interest: 8209.54,
      payment: 143996.54,
    },
  ];

  args.forEach((_, index) => {
    test(`${args[index].amount}, ${args[index].period} ${args[index].periodUnit}, ${
      args[index].interestRate * 100
    }%`, () => {
      expect(results[index]).toEqual(aimResults[index]);
    });
  });
});
