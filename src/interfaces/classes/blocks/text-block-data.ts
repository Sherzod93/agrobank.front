import { TextBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectTextBlockProps = DirectBlockProps<TextBlockProps>;

export class TextBlockData extends AbstractBlockData implements DirectTextBlockProps {
  readonly text;

  constructor(data: Pick<AbstractBlockData, 'type'> & { content: DirectTextBlockProps }, contextProduct?: ProductData) {
    super(data, contextProduct);

    const {
      content: { text },
    } = data;

    this.text = text;
  }
}
