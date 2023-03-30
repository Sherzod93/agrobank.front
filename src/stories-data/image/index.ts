import { ImageBlockProps } from '../../components/blocks';
import { ImageBlockImageSize, ImageInfoData } from '../../interfaces';
import simpleImage from './resources/simple-image.png';

export const imageData: ImageBlockProps = {
  description: 'Фото правительства банка рандомно определяет, кто победил в акции.',
  image: {
    alt: '',
    size: {
      height: 600,
      width: 1140,
    },
    srcSets: [
      {
        src: simpleImage,
        type: 'image/png',
      },
    ],
  } as ImageInfoData as any,
  size: ImageBlockImageSize.medium,
};
