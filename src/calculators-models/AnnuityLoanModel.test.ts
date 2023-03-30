import { AnnuityLoanModel } from './AnnuityLoanModel';
import { AnnuityLoanModelModes } from './typings';

describe('AnnuityLoanModel', () => {
  test('amount mode', () => {
    expect(
      (
        new AnnuityLoanModel({
          payment: 8991.2691,
          periodInterestRate: 0.05 / 12,
          periodCount: 36,
          mode: AnnuityLoanModelModes.amount,
        }).result as { amount: number }
      ).amount,
    ).toBeCloseTo(300000);
  });

  test('payment mode', () => {
    expect(
      (
        new AnnuityLoanModel({
          amount: 300000,
          periodInterestRate: 0.05 / 12,
          periodCount: 36,
          mode: AnnuityLoanModelModes.payment,
        }).result as { payment: number }
      ).payment,
    ).toBeCloseTo(8991.2691);
  });

  test('period mode', () => {
    expect(
      (
        new AnnuityLoanModel({
          amount: 300000,
          payment: 8991.27,
          periodInterestRate: 0.05 / 12,
          mode: AnnuityLoanModelModes.period,
        }).result as { period: number }
      ).period,
    ).toBe(36);
  });

  test('interest rate mode', () => {
    expect(
      (
        new AnnuityLoanModel({
          amount: 300000,
          payment: 8991.2691,
          periodInterestRate: 0.05 / 12,
          periodCount: 36,
          mode: AnnuityLoanModelModes.interestRate,
        }).result as { interestRate: number }
      ).interestRate,
    ).toBeCloseTo(0.05);
  });
});
