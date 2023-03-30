import { AbstractRegisters, PeriodUnits } from './typings';

export function zeroTime(date: Date): Date {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

export function actualizeInterestRateRegisters({
  registers,
  interestRate,
  year,
}: {
  registers: AbstractRegisters;
  interestRate: number;
  year: number;
}) {
  Object.assign(registers, {
    previousYearInterestRatePerDay: getInterestRatePerDay(interestRate, year),
    currentYearInterestRatePerDay: getInterestRatePerDay(interestRate, year + 1),
  });
}

export function addMonths(date: Date, count: number) {
  const newDate = new Date(date);
  const day = newDate.getDate();

  newDate.setDate(1);
  newDate.setMonth(newDate.getMonth() + count);
  newDate.setDate(Math.min(day, getDaysInMonth(newDate.getMonth(), newDate.getFullYear())));

  return newDate;
}

export function areDatesEqual(date1: Date, date2: Date) {
  return date1.getTime() === date2.getTime();
}

export function calcInterest(
  base: number,
  previousDate: Date,
  currentDate: Date,
  previousYearInterestRatePerDay: number,
  currentYearInterestRatePerDay: number,
) {
  let days: [Date, Date][];
  let interestRates: number[];

  if (previousDate.getFullYear() !== currentDate.getFullYear()) {
    const lastDayOfTheYear = new Date(previousDate.getFullYear(), 11, 31);

    days = [
      [previousDate, lastDayOfTheYear],
      [lastDayOfTheYear, currentDate],
    ];
    interestRates = [previousYearInterestRatePerDay, currentYearInterestRatePerDay];
  } else {
    days = [[previousDate, currentDate]];
    interestRates = [currentYearInterestRatePerDay];
  }

  return days
    .map(([a, b]) => daysBetween(a, b))
    .reduce((result, days, index) => result + base * days * interestRates[index], 0);
}

export function carryOnMonday(date: Date) {
  date = new Date(date);

  let day = date.getDay();

  if ([0, 6].includes(day)) {
    if (day === 0) {
      day = 7;
    }

    date.setDate(date.getDate() + (8 - day));
  }

  return date;
}

export function daysBetween(date1: Date, date2: Date) {
  date1 = zeroTime(new Date(date1));
  date2 = zeroTime(new Date(date2));

  return (date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24;
}

export function getDaysInMonth(month: number, year: number) {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

export function getInterestRatePerDay(interestRatePerYear: number, year: number) {
  return interestRatePerYear / (isLeapYear(year) ? 366 : 365);
}

export function getInterestRatePerMonth(interestRatePerYear: number) {
  return interestRatePerYear / 12;
}

export function getMonthCountInPeriod(period: number, periodUnits: PeriodUnits) {
  let monthCount = period;

  if (periodUnits === 'year') {
    monthCount *= 12;
  }

  return monthCount;
}

export function integerifyAmount(amount: number) {
  return Math.trunc(amount * 100);
}

export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function bankersRound(amount: number) {
  const nextDigit = (amount * 10) % 10;

  if (nextDigit < 5) {
    return Math.trunc(amount);
  }

  return Math.trunc(amount) + 1;
}

export function isValidDateObject(date: Date) {
  // eslint-disable-next-line no-self-compare
  return date.getTime() === date.getTime();
}
