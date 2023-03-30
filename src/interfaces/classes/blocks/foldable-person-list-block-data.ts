import { FoldablePersonListBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { preparePersonData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectFoldablePersonListBlockProps = DirectBlockProps<FoldablePersonListBlockProps>;

export class FoldablePersonListBlockData extends AbstractBlockData implements DirectFoldablePersonListBlockProps {
  readonly items: DirectFoldablePersonListBlockProps['items'];

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectFoldablePersonListBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { items },
    } = data;

    this.items = items.map(preparePersonData);
  }
}
