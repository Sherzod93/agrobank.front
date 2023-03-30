export interface CurrencyData {
  alpha3: string;
  sign: string;
  title: string;
}

export interface CurrencyRate {
  alpha3: string;
  buy: number;
  rate: number;
  sale: number;
  updated: string;
}

export interface CurrencyRecord {
  code: string;
  symbol: string;
}
