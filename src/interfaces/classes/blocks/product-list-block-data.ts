import { ProductListBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareProductData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectProductListBlockProps = DirectBlockProps<ProductListBlockProps>;

export class ProductListBlockData extends AbstractBlockData implements DirectProductListBlockProps {
  readonly buttonTitle;
  readonly categories;
  readonly defaultCountries;
  readonly items: DirectProductListBlockProps['items'];

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectProductListBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { buttonTitle, categories = [], defaultCountries, items },
    } = data;

    if (buttonTitle) {
      this.buttonTitle = buttonTitle;
    }

    this.categories = categories;
    this.defaultCountries = defaultCountries;
    this.items = items.map(prepareProductData);
  }
}
