import { TilesListBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectTilesListBlockProps = DirectBlockProps<TilesListBlockProps>;

export class TilesListBlockData extends AbstractBlockData implements DirectTilesListBlockProps {
  readonly entityType;
  readonly items;
  readonly total;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectTilesListBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { entityType, items, total },
    } = data;

    this.entityType = entityType;
    this.items = items;
    this.total = total;
  }
}
