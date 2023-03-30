import { MainProductBannerBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareProductData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectMainProductBannerBlockProps = DirectBlockProps<MainProductBannerBlockProps>;

export class MainProductBannerBlockData extends AbstractBlockData implements DirectMainProductBannerBlockProps {
  readonly buttonTitle;
  readonly product: DirectMainProductBannerBlockProps['product'];
  readonly title;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectMainProductBannerBlockProps },
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
