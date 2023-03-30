import { NewsListBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectNewsListBlockProps = DirectBlockProps<NewsListBlockProps>;

export class NewsListBlockData extends AbstractBlockData implements DirectNewsListBlockProps {
  readonly filters;
  readonly sourceType;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectNewsListBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { filters, sourceType },
    } = data;

    this.filters = filters;
    this.sourceType = sourceType;
  }
}
