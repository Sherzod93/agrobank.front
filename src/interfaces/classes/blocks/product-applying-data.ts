import { ProductApplyingBlockProps } from '../../../components/page-sections/blocks/product-applying-block/product-applying-block';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

export class ProductApplyingBlockData extends AbstractBlockData implements ProductApplyingBlockProps {
  readonly fields;
  readonly titles;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: ProductApplyingBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { fields, titles },
    } = data;

    this.fields = fields;
    this.titles = titles;
  }
}
