import { DepositModel, DepositModelResult } from './DepositModel';
import { PeriodUnits } from './typings';

describe('DepositModel', () => {
  const args = [
    {
      amount: 1_000_000,
      beginDate: new Date(2021, 8, 3),
      interestRate: 0.06,
      period: 5,
      periodUnit: PeriodUnits.year,
    },
    {
      amount: 5_000_000,
      beginDate: new Date(2023, 9, 1),
      interestRate: 0.22,
      period: 13,
      periodUnit: PeriodUnits.month,
    },
  ];
  const results = args.map((args) => new DepositModel(args).result.totals);
  const aimResults: DepositModelResult['totals'][] = [
    {
      amount: 1_000_000,
      income: 300_000.04,
    },
    {
      amount: 5_000_000,
      income: 1_193_918.7,
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
