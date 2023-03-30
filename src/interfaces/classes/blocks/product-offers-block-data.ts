import { ProductOffersBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareProductData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectProductOffersBlockProps = DirectBlockProps<ProductOffersBlockProps>;

export class ProductOffersBlockData extends AbstractBlockData implements DirectProductOffersBlockProps {
  readonly buttonTitle;
  readonly items: DirectProductOffersBlockProps['items'];

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectProductOffersBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { buttonTitle, items },
    } = data;

    if (buttonTitle) {
      this.buttonTitle = buttonTitle;
    }

    this.items = items.map((item) => ({
      ...item,
      product: prepareProductData(item.product),
    }));
  }
}
