import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../../../helpers';
import {
  AbstractBlockProps,
  BlockWithProductComponentProps,
  ImageInfoData,
  ProductData,
  ProductTagTypes,
} from '../../../../../interfaces';
import { buildImageInfo } from '../../../../../interfaces/classes/helpers';
import { Image } from '../../../../units/image/image';
import { Tag, TagSize } from '../../../../units/tag/tag';
import { TagsAndButtons } from '../../../../units/tags-and-buttons/tags-and-buttons';
import searchResultItemStyles from './style.module.scss';

const searchResultItemClassname = 'search-result-item';

export interface SearchResultItemData extends BlockWithProductComponentProps {
  contextProduct?: ProductData;
  description?: string;
  id: number;
  itemId: number;
  title: string;
  url: string;
}

export interface SearchResultItemProps extends AbstractBlockProps {
  item: SearchResultItemData;
}

const SearchResultItem: FC<SearchResultItemProps> = ({ className, item }) => {
  const {
    i18n: { language },
  } = useTranslation();

  const description = item.description || item.contextProduct?.description;
  const image =
    item.contextProduct && item.contextProduct.backgroundPicture
      ? buildImageInfo(item.contextProduct.backgroundPicture as unknown as ImageInfoData)
      : null;

  return (
    <li key={item.id} className={cs(searchResultItemStyles[`${searchResultItemClassname}`], className)}>
      {image && (
        <div className={cs(searchResultItemStyles[`${searchResultItemClassname}__image`])}>
          <Image image={image}></Image>
        </div>
      )}

      <div className={searchResultItemStyles[`${searchResultItemClassname}__body-wrapper`]}>
        <Link
          className={cs(searchResultItemStyles[`${searchResultItemClassname}__title`])}
          to={item.url}
          dangerouslySetInnerHTML={{ __html: item.title }}
        />

        {!!description && (
          <div
            className={cs(searchResultItemStyles[`${searchResultItemClassname}__description`])}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {(item.contextProduct?.tags ?? []).length > 0 && (
          <div className={searchResultItemStyles[`${searchResultItemClassname}__tags-wrapper`]}>
            <TagsAndButtons className={searchResultItemStyles[`${searchResultItemClassname}__tags`]}>
              {item.contextProduct!.tags.map((tag, index) => {
                if (!tag.value) {
                  return <></>;
                }

                if (tag.type === ProductTagTypes.date) {
                  return <Tag key={index} size={TagSize.small} value={formatDate(new Date(tag.value), language)} />;
                }

                return <Tag key={index} size={TagSize.small} value={tag.value.toString()} />;
              })}
            </TagsAndButtons>
          </div>
        )}
      </div>
    </li>
  );
};

export { SearchResultItem };
