import { CalculatorBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareProductData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectCalculatorBlockProps = DirectBlockProps<CalculatorBlockProps>;

export class CalculatorBlockData extends AbstractBlockData implements DirectCalculatorBlockProps {
  readonly product: DirectCalculatorBlockProps['product'];
  readonly title;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectCalculatorBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { title, product },
    } = data;

    this.product = product;

    if (this.product) {
      this.product = prepareProductData(this.product);
    }

    this.title = title;
  }
}
