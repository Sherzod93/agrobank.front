import { ListBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectListBlockProps = DirectBlockProps<ListBlockProps>;

export class ListBlockData extends AbstractBlockData implements DirectListBlockProps {
  readonly items;
  readonly listType;
  readonly startFrom;

  constructor(data: Pick<AbstractBlockData, 'type'> & { content: DirectListBlockProps }, contextProduct?: ProductData) {
    super(data, contextProduct);

    const {
      content: { items, listType, startFrom },
    } = data;

    this.items = items;
    this.listType = listType;
    this.startFrom = startFrom;
  }
}
