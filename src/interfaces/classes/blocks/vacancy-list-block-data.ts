import { VacancyListBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectVacancyListBlockProps = DirectBlockProps<VacancyListBlockProps>;

export class VacancyListBlockData extends AbstractBlockData implements DirectVacancyListBlockProps {
  readonly filters;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectVacancyListBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { filters = [] },
    } = data;

    this.filters = filters;
  }
}
