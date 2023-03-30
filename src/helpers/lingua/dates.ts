import { TFunction } from 'react-i18next';
import { zeroTime } from '../../calculators-models/helpers';

export function formatDate(date: Date, lang = 'en') {
  return date.toLocaleDateString(lang);
}

export enum DateKind {
  thisYear = 'this-year',
  today = 'today',
  yesterday = 'yesterday',
  other = 'other',
}

export function getDateKind(date: Date): DateKind {
  const today = zeroTime(new Date());
  const watchDate = zeroTime(new Date(date));

  if (watchDate.getTime() === today.getTime()) {
    return DateKind.today;
  }

  today.setDate(today.getDate() - 1);

  if (watchDate.getTime() === today.getTime()) {
    return DateKind.yesterday;
  }

  if (watchDate.getFullYear() === today.getFullYear()) {
    return DateKind.thisYear;
  }

  return DateKind.other;
}

export function formatDateDetail(date: Date, lang: string = 'en', t: TFunction<'translation'>): string {
  const dateKind = getDateKind(date);

  switch (dateKind) {
    case DateKind.thisYear:
      switch (lang) {
        case 'uz':
          return `${date.getDate()}-${t(`months-uz.${date.getMonth() + 1}`)}`;
        default:
          return date.toLocaleDateString(lang, { month: 'long', day: 'numeric' });
      }
    case DateKind.today:
    case DateKind.yesterday:
      return t(`dates.${dateKind}`);
    case DateKind.other:
      switch (lang) {
        case 'en':
          return formatDate(date, 'en-GB');
        case 'uz':
          return formatDate(date, 'ru');
        default:
          return formatDate(date, lang);
      }
  }
}
