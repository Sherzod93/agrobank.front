import cs from 'classnames';
import React, { FC } from 'react';
import { AbstractBlockProps, BlockWithProductTypeComponentProps, ProductType } from '../../../interfaces';
import textBannerBlockStyles from './style.module.scss';

const textBannerBlockClassname = 'text-banner-block';

export interface TextBannerBlockProps extends AbstractBlockProps, Partial<BlockWithProductTypeComponentProps> {
  text: string;
}

const TextBannerBlock: FC<TextBannerBlockProps> = ({ className, productType = ProductType.default, text }) => (
  <p
    className={cs(
      textBannerBlockStyles[`${textBannerBlockClassname}`],
      textBannerBlockStyles[`${textBannerBlockClassname}_product-type_${productType}`],
      className,
    )}
    dangerouslySetInnerHTML={{ __html: text }}
  />
);

export { TextBannerBlock };
