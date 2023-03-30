import { AdviceListBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectAdviceListBlockProps = DirectBlockProps<AdviceListBlockProps>;

export class AdviceListBlockData extends AbstractBlockData implements DirectAdviceListBlockProps {
  readonly filters;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectAdviceListBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { filters },
    } = data;

    this.filters = filters;
  }
}
