export enum ProductTagTypes {
  amount = 'amount',
  date = 'date',
  percent = 'percent',
  text = 'text',
}

interface AbstractProductTagData {
  title?: string;
}

export interface AmountProductTagData extends AbstractProductTagData {
  type: ProductTagTypes.amount;
  value: {
    amount: number;
    currency?: string;
  };
}

export interface DateProductTagData extends AbstractProductTagData {
  type: ProductTagTypes.date;
  value: Date;
}

export interface PercentProductTagData extends AbstractProductTagData {
  type: ProductTagTypes.percent;
  value: number;
}

export interface TextProductTagData extends AbstractProductTagData {
  type: ProductTagTypes.text;
  value: string;
}

export type ProductTagData = AmountProductTagData | DateProductTagData | PercentProductTagData | TextProductTagData;
