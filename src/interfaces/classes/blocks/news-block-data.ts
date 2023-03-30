import { NewsBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareNewsItemData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectNewsBlockProps = DirectBlockProps<NewsBlockProps>;

export class NewsBlockData extends AbstractBlockData implements DirectNewsBlockProps {
  readonly items: NewsBlockProps['items'];

  constructor(data: Pick<AbstractBlockData, 'type'> & { content: DirectNewsBlockProps }, contextProduct?: ProductData) {
    super(data, contextProduct);

    const {
      content: { items },
    } = data;

    this.items = items.map(prepareNewsItemData);
  }
}
