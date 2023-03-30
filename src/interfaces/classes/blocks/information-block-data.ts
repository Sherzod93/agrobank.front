import { InformationBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectInformationBlockProps = DirectBlockProps<InformationBlockProps>;

export class InformationBlockData extends AbstractBlockData implements DirectInformationBlockProps {
  readonly description;
  readonly title;
  readonly informationType;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectInformationBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { description, title, informationType },
    } = data;

    this.description = description;
    this.title = title;
    this.informationType = informationType;
  }
}
