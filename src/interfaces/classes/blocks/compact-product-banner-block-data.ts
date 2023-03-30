import { CompactProductBannerBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareProductData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectCompactProductBannerBlockProps = DirectBlockProps<CompactProductBannerBlockProps>;

export class CompactProductBannerBlockData extends AbstractBlockData implements DirectCompactProductBannerBlockProps {
  readonly bannerType;
  readonly buttonTitle;
  readonly indentLeft;
  readonly link;
  readonly product;
  readonly productType;
  readonly title;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectCompactProductBannerBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { bannerType, buttonTitle, link, indentLeft, product, productType, title },
    } = data;

    this.bannerType = bannerType;

    if (buttonTitle) {
      this.buttonTitle = buttonTitle;
    }

    this.indentLeft = indentLeft;
    this.link = link;
    this.product = product;

    if (this.product) {
      this.product = prepareProductData(this.product);
    }

    this.productType = productType;
    this.title = title;
  }
}
