import { LinkBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectLinkBlockProps = DirectBlockProps<LinkBlockProps>;

export class LinkBlockData extends AbstractBlockData implements DirectLinkBlockProps {
  readonly link;
  readonly withArrow;

  constructor(data: Pick<AbstractBlockData, 'type'> & { content: DirectLinkBlockProps }, contextProduct?: ProductData) {
    super(data, contextProduct);

    const {
      content: { link, withArrow = false },
    } = data;

    this.link = link;
    this.withArrow = withArrow;
  }
}
