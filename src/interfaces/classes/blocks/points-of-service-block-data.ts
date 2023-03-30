import { PointsOfServiceBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectPointsOfServiceBlockProps = DirectBlockProps<PointsOfServiceBlockProps>;

export class PointsOfServiceBlockData extends AbstractBlockData implements DirectPointsOfServiceBlockProps {
  readonly countries;
  readonly isCompact;
  readonly posType;
  readonly withCategoryFilter;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectPointsOfServiceBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { posType = null, countries, isCompact = true, withCategoryFilter = true },
    } = data;

    this.countries = countries;
    this.isCompact = isCompact;
    this.posType = posType;
    this.withCategoryFilter = withCategoryFilter;
  }
}
