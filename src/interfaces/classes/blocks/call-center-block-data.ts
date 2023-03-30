import { CallCenterBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectCallCenterBlockProps = DirectBlockProps<CallCenterBlockProps>;

export class CallCenterBlockData extends AbstractBlockData implements DirectCallCenterBlockProps {
  readonly phone;
  readonly productType;
  readonly text;
  readonly title;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectCallCenterBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { phone, productType, text, title },
    } = data;

    this.phone = phone;
    this.productType = productType;
    this.text = text;
    this.title = title;
  }
}
