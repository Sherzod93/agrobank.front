import { NewsItemBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectNewsItemBlockProps = DirectBlockProps<NewsItemBlockProps>;

export class NewsItemBlockData extends AbstractBlockData implements DirectNewsItemBlockProps {
  readonly newsItem;
  readonly section;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectNewsItemBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { newsItem, section },
    } = data;

    this.newsItem = newsItem;
    this.section = section;
  }
}
