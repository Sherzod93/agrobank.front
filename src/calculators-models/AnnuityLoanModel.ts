import { getInterestRatePerMonth } from './helpers';
import { AnnuityLoanModelModes } from './typings';

export class AnnuityLoanModel {
  private static startPeriodRate = getInterestRatePerMonth(10 / 100);
  private static paymentEpsilon = 1;
  public readonly result:
    | { error: true }
    | { amount: number }
    | { payment: number }
    | { period: number }
    | { interestRate: number; payment: number };

  constructor(
    params:
      | {
          mode: AnnuityLoanModelModes.amount;
          periodInterestRate: number;
          payment: number;
          periodCount: number;
        }
      | {
          mode: AnnuityLoanModelModes.interestRate;
          amount: number;
          payment: number;
          periodCount: number;
          periodInterestRate: number;
        }
      | {
          mode: AnnuityLoanModelModes.payment;
          amount: number;
          periodInterestRate: number;
          periodCount: number;
        }
      | {
          mode: AnnuityLoanModelModes.period;
          amount: number;
          periodInterestRate: number;
          payment: number;
        },
  ) {
    switch (params.mode) {
      case AnnuityLoanModelModes.amount: {
        const { periodInterestRate, payment, periodCount } = params;

        this.result = {
          amount:
            (payment *
              Math.pow(periodInterestRate + 1, -periodCount) *
              (Math.pow(periodInterestRate + 1, periodCount) - 1)) /
            periodInterestRate,
        };
        break;
      }
      case AnnuityLoanModelModes.payment: {
        const { amount, periodInterestRate, periodCount } = params;

        this.result = {
          payment:
            amount *
            ((periodInterestRate * Math.pow(1 + periodInterestRate, periodCount)) /
              (Math.pow(1 + periodInterestRate, periodCount) - 1)),
        };
        break;
      }
      case AnnuityLoanModelModes.interestRate: {
        const { amount, payment, periodCount } = params;
        let found = false;
        let findingMax = true;
        let periodInterestRate = AnnuityLoanModel.startPeriodRate;
        let payment2: number = payment;
        let bottomBound = 0;
        let topBound = 0;

        let limit = 50;

        do {
          limit -= 1;
          payment2 = (
            new AnnuityLoanModel({
              amount,
              mode: AnnuityLoanModelModes.payment,
              periodInterestRate,
              periodCount,
            }).result as { payment: number }
          ).payment;

          const delta = payment2 - payment;

          if (delta < 0 && findingMax) {
            bottomBound = periodInterestRate;
            periodInterestRate *= 2;
            continue;
          }

          if (delta > 0) {
            topBound = periodInterestRate;
            periodInterestRate /= 2;
            findingMax = false;
            continue;
          }

          if (Math.abs(delta) < AnnuityLoanModel.paymentEpsilon) {
            found = true;
            break;
          } else {
            const halfLength = (topBound - bottomBound) / 2;
            const rightRate = bottomBound + halfLength + halfLength / 2;
            const paymentRight = (
              new AnnuityLoanModel({
                amount,
                mode: AnnuityLoanModelModes.payment,
                periodInterestRate: rightRate,
                periodCount,
              }).result as { payment: number }
            ).payment;

            if (paymentRight < payment) {
              bottomBound = rightRate;
              periodInterestRate = bottomBound + (topBound - bottomBound) / 2;
              continue;
            }

            if (paymentRight > payment) {
              topBound = rightRate;
              periodInterestRate = bottomBound + (topBound - bottomBound) / 2;
            }
          }
        } while (limit && !found);

        if (found) {
          periodInterestRate = Math.floor(periodInterestRate * 12 * 10000) / 12 / 10000;

          this.result = {
            interestRate: periodInterestRate * 12,
            payment: (
              new AnnuityLoanModel({
                amount,
                mode: AnnuityLoanModelModes.payment,
                periodInterestRate,
                periodCount,
              }).result as { payment: number }
            ).payment,
          };
        } else {
          this.result = { error: true };
        }
        break;
      }
      case AnnuityLoanModelModes.period: {
        const { amount, payment, periodInterestRate } = params;

        this.result = {
          period: Math.ceil(
            Math.log(payment / (payment - periodInterestRate * amount)) / Math.log(periodInterestRate + 1),
          ),
        };
        break;
      }
    }
  }
}
