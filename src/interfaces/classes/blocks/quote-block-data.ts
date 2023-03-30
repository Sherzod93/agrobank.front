import { QuoteBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectQuoteBlockProps = DirectBlockProps<QuoteBlockProps>;

export class QuoteBlockData extends AbstractBlockData implements DirectQuoteBlockProps {
  readonly description;
  readonly text;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectQuoteBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { description, text },
    } = data;

    this.description = description;
    this.text = text;
  }
}
