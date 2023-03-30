import { ProductApplyingBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectProductApplyingBlockProps = DirectBlockProps<ProductApplyingBlockProps>;

export class ProductApplyingStepsBlockData extends AbstractBlockData implements DirectProductApplyingBlockProps {
  readonly title;
  readonly items;
  readonly productType;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectProductApplyingBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { items, productType, title },
    } = data;

    this.items = items;
    this.productType = productType;
    this.title = title;
  }
}
