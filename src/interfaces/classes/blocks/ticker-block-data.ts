import { TickerBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectTickerBlockProps = DirectBlockProps<TickerBlockProps>;

export class TickerBlockData extends AbstractBlockData implements DirectTickerBlockProps {
  readonly isLayering;
  readonly items;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectTickerBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { isLayering, items },
    } = data;

    this.isLayering = isLayering;
    this.items = items;
  }
}
