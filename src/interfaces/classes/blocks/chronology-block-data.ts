import { ChronologyBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectChronologyBlockProps = DirectBlockProps<ChronologyBlockProps>;

export class ChronologyBlockData extends AbstractBlockData implements DirectChronologyBlockProps {
  readonly items;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectChronologyBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { items },
    } = data;

    this.items = items;
  }
}
