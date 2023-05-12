import { VideoBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectVideoBlockProps = DirectBlockProps<VideoBlockProps>;

export class VideoBlockData extends AbstractBlockData implements DirectVideoBlockProps {
  readonly description;
  readonly title;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectVideoBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { description, title },
    } = data;

    this.description = description;
    this.title = title;

  }
}
