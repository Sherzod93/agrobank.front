import { MobileBankBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareMobileApplicationData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectMobileBankBlockProps = DirectBlockProps<MobileBankBlockProps>;

export class MobileBankBlockData extends AbstractBlockData implements DirectMobileBankBlockProps {
  readonly applicationInfo;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectMobileBankBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { applicationInfo },
    } = data;

    this.applicationInfo = prepareMobileApplicationData(applicationInfo);
  }
}
