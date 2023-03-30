import { ImageInfo } from './classes';
import { TextProductTagData } from './product-tag';

export enum NewsListSourceType {
  common = 'common',
  government = 'government',
}

export interface NewsItemData {
  code: string;
  date: Date;
  id: number;
  isPromoted?: boolean;
  photo?: ImageInfo;
  sectionId: number;
  title: string;
  url: string;
}

export interface ExtendedNewsItemData extends NewsItemData {
  tag: TextProductTagData;
}
