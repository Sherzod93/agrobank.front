import { ImageInfo } from './classes';
import { FilterItemData } from './filter';
import { ProductType } from './product';
import { TextProductTagData } from './product-tag';

export interface AdviceFilterItemData extends FilterItemData {
  productType?: ProductType;
}

export interface AdviceData {
  date: Date;
  id: number;
  photo: ImageInfo;
  sectionId: number;
  title: string;
  url: string;
}

export interface ExtendedAdviceData extends AdviceData {
  productType: ProductType;
  tag: TextProductTagData;
}
