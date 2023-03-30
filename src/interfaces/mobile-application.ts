import { ImageInfo } from './classes';

export enum StoreType {
  apple = 'apple',
  google = 'google',
}

export interface MobileApplicationLink {
  picture?: ImageInfo;
  storeType: StoreType;
  title: string;
  url: string;
}

export interface MobileApplicationData {
  description: string;
  links: MobileApplicationLink[];
  screenshots: ImageInfo[];
  title: string;
}
