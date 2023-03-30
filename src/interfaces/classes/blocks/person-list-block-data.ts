import { PersonListBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { preparePersonData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectPersonListBlockProps = DirectBlockProps<PersonListBlockProps>;

export class PersonListBlockData extends AbstractBlockData implements DirectPersonListBlockProps {
  readonly items: DirectPersonListBlockProps['items'];

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectPersonListBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { items },
    } = data;

    this.items = items.map(preparePersonData);
  }
}
