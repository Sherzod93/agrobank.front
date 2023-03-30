import { StatisticsBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectStatisticsBlockProps = DirectBlockProps<StatisticsBlockProps>;

export class StatisticsBlockData extends AbstractBlockData implements DirectStatisticsBlockProps {
  readonly title;
  readonly items;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectStatisticsBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { items, title },
    } = data;

    this.items = items;
    this.title = title;
  }
}
