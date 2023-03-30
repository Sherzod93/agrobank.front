import { ImageBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { buildImageInfo } from '../helpers';
import { ImageInfoData } from '../image-info';
import { AbstractBlockData } from './abstract-block-data';

type DirectImageBlockProps = DirectBlockProps<ImageBlockProps>;

export class ImageBlockData extends AbstractBlockData implements DirectImageBlockProps {
  readonly description;
  readonly image;
  readonly size;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectImageBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { description, image, size },
    } = data;

    this.description = description;
    this.image = buildImageInfo(image as unknown as ImageInfoData);
    this.size = size;
  }
}
