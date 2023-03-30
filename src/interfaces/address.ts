import { FilterItemData } from './filter';

export enum PointOfServiceType {
  atm = 'atm',
  office = 'office',
}

export interface AddressData {
  additionalNumber?: string;
  address: string;
  id: number;
  mfo?: string;
  phones?: PhoneInfo[];
  postCode?: string;
  title: string;
  workingTime: string;
}

export interface Country extends FilterItemData {
  regions: FilterItemData[];
}

export interface PhoneInfo {
  hint: string;
  phoneNumber: string;
  title?: string;
  phoneNumber2?: string;

}

export interface PointOfServiceAddress extends AddressData {
  coords: [number, number];
  countryId: number;
  regionId: number;
  type: PointOfServiceType;
}
