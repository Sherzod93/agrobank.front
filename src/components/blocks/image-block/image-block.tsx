import cs from 'classnames';
import React, { FC } from 'react';
import { AbstractBlockProps, ImageBlockImageSize, ImageInfo } from '../../../interfaces';
import { Image } from '../../units/image/image';
import imageBlockStyles from './style.module.scss';

const imageBlockClassname = 'image-block';

export interface ImageBlockProps extends AbstractBlockProps {
  description?: string;
  image: ImageInfo;
  size?: ImageBlockImageSize;
}

const ImageBlock: FC<ImageBlockProps> = ({ className, description, image, size = ImageBlockImageSize.large }) => (
  <div
    className={cs(
      imageBlockStyles[`${imageBlockClassname}`],
      imageBlockStyles[`${imageBlockClassname}_${size}`],
      className,
    )}
  >
    <Image className={imageBlockStyles[`${imageBlockClassname}__image`]} image={image} />
    {description && (
      <div
        className={imageBlockStyles[`${imageBlockClassname}__description`]}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    )}
  </div>
);

export { ImageBlock };
