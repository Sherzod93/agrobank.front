import { ProductAdvantagesBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareProductData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectProductAdvantagesBlockProps = DirectBlockProps<ProductAdvantagesBlockProps>;

export class ProductAdvantagesBlockData extends AbstractBlockData implements DirectProductAdvantagesBlockProps {
  readonly product: DirectProductAdvantagesBlockProps['product'];

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectProductAdvantagesBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { product },
    } = data;

    this.product = product;

    if (this.product) {
      this.product = prepareProductData(this.product);
    }
  }
}
