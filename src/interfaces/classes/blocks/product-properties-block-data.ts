import { ProductPropertiesBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareProductData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectProductPropertiesBlockProps = DirectBlockProps<ProductPropertiesBlockProps>;

export class ProductPropertiesBlockData extends AbstractBlockData implements DirectProductPropertiesBlockProps {
  readonly product: DirectProductPropertiesBlockProps['product'];
  readonly title;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectProductPropertiesBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { product, title },
    } = data;

    this.product = product;

    if (this.product) {
      this.product = prepareProductData(this.product);
    }

    this.title = title;
  }
}
