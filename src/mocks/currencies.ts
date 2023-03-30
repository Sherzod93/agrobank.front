import { CurrencyData } from '../components/blocks';
import { ExtendedList } from '../interfaces';

const currenciesFromServer: CurrencyData[] = [
  {
    alpha3: 'EUR',
    sign: 'EUR',
    title: 'EUR',
  },
  {
    alpha3: 'RUB',
    sign: 'RUB',
    title: 'RUB',
  },
  {
    alpha3: 'USD',
    sign: 'USD',
    title: 'USD',
  },
];

export const currencies = new ExtendedList(
  currenciesFromServer.map((currency) => ({ ...currency, id: currency.alpha3 })),
);
