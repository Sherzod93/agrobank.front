import { CurrencyRatesBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectCurrencyRatesBlockProps = DirectBlockProps<CurrencyRatesBlockProps>;

export class CurrencyRatesBlockData extends AbstractBlockData implements DirectCurrencyRatesBlockProps {
  readonly items;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectCurrencyRatesBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { items },
    } = data;

    this.items = items;
  }
}
