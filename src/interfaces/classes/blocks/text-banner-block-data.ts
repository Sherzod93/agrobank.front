import { TextBannerBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectTextBannerBlockProps = DirectBlockProps<TextBannerBlockProps>;

export class TextBannerBlockData extends AbstractBlockData implements DirectTextBannerBlockProps {
  readonly productType;
  readonly text;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectTextBannerBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { productType, text },
    } = data;

    this.productType = productType;
    this.text = text;
  }
}
