import { VacancyItemBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareVacancyData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectVacancyItemBlockProps = DirectBlockProps<VacancyItemBlockProps>;

export class VacancyItemBlockData extends AbstractBlockData implements DirectVacancyItemBlockProps {
  readonly vacancyItem: DirectVacancyItemBlockProps['vacancyItem'];

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectVacancyItemBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { vacancyItem },
    } = data;

    this.vacancyItem = {
      ...vacancyItem,
      items: vacancyItem.items.map(prepareVacancyData),
    };
  }
}
