import { LinkListBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectLinkListBlockProps = DirectBlockProps<LinkListBlockProps>;

export class LinkListBlockData extends AbstractBlockData implements DirectLinkListBlockProps {
  readonly title;
  readonly items;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectLinkListBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { title, items },
    } = data;

    this.items = items;
    this.title = title;
  }
}
