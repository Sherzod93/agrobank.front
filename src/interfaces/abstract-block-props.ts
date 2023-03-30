import { AbstractBlockData } from './classes/blocks';
import { ComponentRenderType } from './enums';
import { ProductData, ProductType } from './product';
import { WithClassNameComponentProps } from './utility';

export interface AbstractBlockProps extends WithClassNameComponentProps {
  blockRenderType?: ComponentRenderType;
  contextProduct?: ProductData;
  hiddenTabClassname?: string;
  mapClassname?: string;
  nestedBlocks?: AbstractBlockData[];
  tabsClassname?: string;
}

export interface BlockWithItemsComponentProps<T> {
  items: T[];
}

export interface BlockWithProductComponentProps {
  product?: ProductData;
}

export interface BlockWithProductTypeComponentProps {
  productType: ProductType;
}

export interface BlockWithTitleComponentProps {
  title: string;
}

export type DirectBlockProps<T extends AbstractBlockProps> = Omit<
  T,
  | 'blockRenderType'
  | 'className'
  | 'contextProduct'
  | 'hiddenTabClassname'
  | 'mapClassname'
  | 'nestedBlocks'
  | 'tabsClassname'
>;
