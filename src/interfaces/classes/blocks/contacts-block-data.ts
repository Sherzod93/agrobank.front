import { ContactsBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectContactsBlockProps = DirectBlockProps<ContactsBlockProps>;

export class ContactsBlockData extends AbstractBlockData implements DirectContactsBlockProps {
  readonly email;
  readonly phone;
  readonly productType;
  readonly title;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectContactsBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { email, phone, productType, title },
    } = data;

    this.email = email;
    this.phone = phone;
    this.productType = productType;
    this.title = title;
  }
}
