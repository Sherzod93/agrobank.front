import { ProductBannerBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareProductData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectProductBannerBlockProps = DirectBlockProps<ProductBannerBlockProps>;

export class ProductBannerBlockData extends AbstractBlockData implements DirectProductBannerBlockProps {
  readonly buttonTitle;
  readonly product: DirectProductBannerBlockProps['product'];
  readonly title;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectProductBannerBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { buttonTitle, product, title },
    } = data;

    if (buttonTitle) {
      this.buttonTitle = buttonTitle;
    }

    this.product = product;

    if (this.product) {
      this.product = prepareProductData(this.product);
    }

    this.title = title;
  }
}
