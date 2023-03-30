import { MobileApplicationData, ProductType } from '../../../../interfaces';

export enum InfoCardType {
  link = 'link',
  mobileApplication = 'mobile-application',
  mobileTopUp = 'mobile-top-up',
  text = 'text',
  transfer = 'transfer',
}

interface AbstractInfoCardData {
  id: number;
  isFoldable?: boolean;
  productType: ProductType;
  title: string;
}

export interface TextInfoCardData extends AbstractInfoCardData {
  text: string;
  type: InfoCardType.text;
}

export interface LinkInfoCardData extends Omit<TextInfoCardData, 'type'> {
  isTelegramLink?: boolean;
  url: string;
  type: InfoCardType.link;
}

export interface MobileApplicationInfoCardData extends AbstractInfoCardData {
  type: InfoCardType.mobileApplication;
  mobileApplicationData: MobileApplicationData;
}

export interface MobileTopUpInfoCardData extends AbstractInfoCardData {
  type: InfoCardType.mobileTopUp;
}

export interface TransferInfoCardData extends AbstractInfoCardData {
  type: InfoCardType.transfer;
}

export type InfoCardData =
  | LinkInfoCardData
  | MobileApplicationInfoCardData
  | MobileTopUpInfoCardData
  | TransferInfoCardData
  | TextInfoCardData;
