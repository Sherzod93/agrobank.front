import { zeroTime } from '../../calculators-models/helpers';
import { DateKind, getDateKind } from './dates';

describe('formatDateDetail', () => {
  test('correct today date testing', () => {
    expect(getDateKind(new Date())).toEqual(DateKind.today);
    expect(getDateKind(zeroTime(new Date()))).toEqual(DateKind.today);
  });

  test('correct yesterday date testing', () => {
    expect(
      (() => {
        const date = new Date();

        date.setDate(date.getDate() - 1);

        return getDateKind(date);
      })(),
    ).toEqual(DateKind.yesterday);

    expect(
      (() => {
        const date = zeroTime(new Date());

        date.setDate(date.getDate() - 1);

        return getDateKind(date);
      })(),
    ).toEqual(DateKind.yesterday);
  });

  test('correct this year date testing', () => {
    expect(
      (() => {
        const today = new Date();
        const date = new Date(today.getFullYear(), 0, 1);

        if (today.getMonth() === 0 && today.getDate() === 1) {
          date.setDate(2);
        }

        return getDateKind(date);
      })(),
    ).toEqual(DateKind.thisYear);

    expect(
      (() => {
        const today = new Date();
        const date = new Date(today.getFullYear(), 11, 31);

        if (today.getMonth() === 11 && today.getDate() === 31) {
          date.setDate(date.getDate() - 5);
        }

        return getDateKind(date);
      })(),
    ).toEqual(DateKind.thisYear);
  });

  test('correct other date testing', () => {
    expect(
      (() => {
        const date = new Date();

        date.setFullYear(date.getFullYear() - 1);

        return getDateKind(date);
      })(),
    ).toEqual(DateKind.other);

    expect(
      (() => {
        const date = new Date();

        date.setFullYear(date.getFullYear() + 1);

        return getDateKind(date);
      })(),
    ).toEqual(DateKind.other);
  });
});
