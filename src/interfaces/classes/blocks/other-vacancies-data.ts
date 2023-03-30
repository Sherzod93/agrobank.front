import { OtherVacanciesBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareVacancyData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectOtherVacanciesBlockProps = DirectBlockProps<OtherVacanciesBlockProps>;

export class OtherVacanciesBlockData extends AbstractBlockData implements DirectOtherVacanciesBlockProps {
  readonly items: DirectOtherVacanciesBlockProps['items'];
  readonly regions;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectOtherVacanciesBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { items, regions },
    } = data;

    this.items = items.map(prepareVacancyData);

    this.regions = regions;
  }
}
