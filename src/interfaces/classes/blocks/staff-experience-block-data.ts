import { StaffExperienceBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { preparePersonData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectStaffExperienceBlockProps = DirectBlockProps<StaffExperienceBlockProps>;

export class StaffExperienceBlockData extends AbstractBlockData implements DirectStaffExperienceBlockProps {
  readonly items: DirectStaffExperienceBlockProps['items'];

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectStaffExperienceBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { items },
    } = data;

    this.items = items.map((item) => ({
      ...item,
      person: preparePersonData(item.person),
    }));
  }
}
