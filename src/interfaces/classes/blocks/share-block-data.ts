import { ShareBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectShareBlockProps = DirectBlockProps<ShareBlockProps>;

export class ShareBlockData extends AbstractBlockData implements DirectShareBlockProps {
  readonly entityType;
  readonly items;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectShareBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { entityType, items },
    } = data;

    this.entityType = entityType;
    this.items = items;
  }
}
