import { NextNewsItemBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { FilterItemData } from '../../filter';
import { NewsItemData } from '../../news-item';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';
import { extendNewsItems } from './helpers';

type DirectNextNewsItemBlockProps = DirectBlockProps<NextNewsItemBlockProps>;

interface BackendContent extends Omit<DirectNextNewsItemBlockProps, 'newsItem'> {
  newsItem: NewsItemData;
  section: FilterItemData;
}

export class NextNewsItemBlockData extends AbstractBlockData implements DirectNextNewsItemBlockProps {
  readonly newsItem: DirectNextNewsItemBlockProps['newsItem'];

  constructor(data: Pick<AbstractBlockData, 'type'> & { content: BackendContent }, contextProduct?: ProductData) {
    super(data, contextProduct);

    const {
      content: { newsItem, section },
    } = data;

    this.newsItem = extendNewsItems({ items: [newsItem], sections: [section] })[0];
  }
}
