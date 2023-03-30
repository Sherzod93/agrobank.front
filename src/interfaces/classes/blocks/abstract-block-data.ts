import { nanoid } from 'nanoid';
import { BlockType } from '../../enums';
import { ProductData } from '../../product';
import { prepareProductData } from '../helpers';
import { UtilityBlockType } from './index';

export class AbstractBlockData {
  readonly nestedBlocks: AbstractBlockData[];
  readonly contextProduct?: ProductData;
  readonly id: string;
  readonly type: BlockType | UtilityBlockType;

  constructor(
    data: { type: BlockType | UtilityBlockType },
    contextProduct?: ProductData,
    childBlocks: AbstractBlockData[] = [],
  ) {
    this.nestedBlocks = childBlocks;
    this.contextProduct = contextProduct;

    if (this.contextProduct) {
      this.contextProduct = prepareProductData(this.contextProduct);
    }

    this.id = nanoid();
    this.type = data.type;
  }
}
