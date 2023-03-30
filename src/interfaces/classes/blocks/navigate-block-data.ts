import { NavigateBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectNewsBlockProps = DirectBlockProps<NavigateBlockProps>;

export class NavigateBlockData extends AbstractBlockData implements DirectNewsBlockProps {
  readonly url;

  constructor(data: Pick<AbstractBlockData, 'type'> & { content: DirectNewsBlockProps }, contextProduct?: ProductData) {
    super(data, contextProduct);

    const {
      content: { url },
    } = data;

    this.url = url;
  }
}
