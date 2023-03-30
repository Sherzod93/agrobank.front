import cs from 'classnames';
import React, { FC } from 'react';
import {
  AbstractBlockProps,
  BlockWithItemsComponentProps,
  ItemsAlignmentType,
  ProductTagData,
} from '../../../interfaces';
import { ProductTag } from '../../units/business/product-tag/product-tag';
import { TagSize } from '../../units/tag/tag';
import { TagsAndButtons } from '../../units/tags-and-buttons/tags-and-buttons';
import tagsBlockStyles from './style.module.scss';

const tagsBlockClassname = 'tags-block';

export interface TagsBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<ProductTagData> {
  tagsAlignment?: ItemsAlignmentType;
}

const TagsBlock: FC<TagsBlockProps> = ({ className, items, tagsAlignment = ItemsAlignmentType.start }) => (
  <TagsAndButtons
    className={cs(
      tagsBlockStyles[tagsBlockClassname],
      tagsBlockStyles[`${tagsBlockClassname}_alignment_${tagsAlignment}`],
      className,
    )}
  >
    {items.map((productTag, index) => (
      <ProductTag key={index} size={TagSize.small} productTag={productTag} />
    ))}
  </TagsAndButtons>
);

export { TagsBlock };
