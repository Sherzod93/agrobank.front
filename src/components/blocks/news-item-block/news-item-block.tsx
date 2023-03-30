import cs from 'classnames';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseBackgroundColorContext, useBaseBackgroundColor } from '../../../contexts';
import { formatDateDetail } from '../../../helpers';
import {
  AbstractBlockProps,
  BaseBackgroundColor,
  ComponentRenderType,
  ExtendedNewsItemData,
  FilterItemData,
  ImageInfoData,
  ProductType,
} from '../../../interfaces';
import { buildImageInfo } from '../../../interfaces/classes/helpers';
import { Image } from '../../units/image/image';
import { StyledLink } from '../../units/styled-link/styled-link';
import { Tag, TagSize } from '../../units/tag/tag';
import { TagsAndButtons } from '../../units/tags-and-buttons/tags-and-buttons';
import { Tiles, TilingModes } from '../../units/tiles/tiles';
import newsItemBlockStyles from './style.module.scss';

export const newsItemBlockClassname = 'news-item-block';

export interface NewsItemBlockProps extends AbstractBlockProps {
  newsItem: ExtendedNewsItemData;
  section?: FilterItemData;
}

const NewsItemBlock: FC<NewsItemBlockProps> = ({
  className,
  newsItem,
  blockRenderType = ComponentRenderType.listItem,
  section,
}) => {
  const {
    i18n: { language, t },
  } = useTranslation();
  const {
    date: newsDate,
    isPromoted: newsIsPromoted,
    photo: newsPhoto,
    tag: newsTag,
    title: newsTitle,
    url: newsUrl,
  } = newsItem;
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);
  const TagName = blockRenderType === ComponentRenderType.listItem ? 'li' : 'div';
  const { baseBackgroundColor: baseBackgroundColorFromContext } = useBaseBackgroundColor();
  const baseBackgroundColorFromBlock = newsIsPromoted ? BaseBackgroundColor.green : baseBackgroundColorFromContext;
  const baseBackgroundColor = baseBackgroundColorFromBlock ?? BaseBackgroundColor.default;

  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <TagName
        className={cs(
          newsItemBlockStyles[newsItemBlockClassname],
          newsItemBlockStyles[`${newsItemBlockClassname}_base-background-color_${baseBackgroundColor}`],
          {
            [newsItemBlockStyles[`${newsItemBlockClassname}_is-promoted`]]: newsIsPromoted,
          },
          className,
        )}
        onMouseEnter={() => setAreTilesAnimated(true)}
        onMouseLeave={() => setAreTilesAnimated(false)}
      >
        {newsIsPromoted ? (
          <Tiles
            animated={areTilesAnimated}
            animationReversed={true}
            className={newsItemBlockStyles[`${newsItemBlockClassname}__tiles`]}
            productType={ProductType.default}
            tilingMode={TilingModes.cornersWithBackground}
          />
        ) : null}
        {newsPhoto ? (
          <div className={newsItemBlockStyles[`${newsItemBlockClassname}__image-wrapper`]}>
            <Image
              className={newsItemBlockStyles[`${newsItemBlockClassname}__image`]}
              image={buildImageInfo(newsPhoto as unknown as ImageInfoData)}
            />
          </div>
        ) : null}
        <div className={newsItemBlockStyles[`${newsItemBlockClassname}__title-wrapper`]}>
          <StyledLink
            className={newsItemBlockStyles[`${newsItemBlockClassname}__title`]}
            dangerouslySetInnerHTML={{ __html: newsTitle }}
            to={newsUrl}
          />
        </div>
        <div className={newsItemBlockStyles[`${newsItemBlockClassname}__meta`]}>
          <TagsAndButtons className={newsItemBlockStyles[`${newsItemBlockClassname}__tags`]}>
            {newsTag ? <Tag size={TagSize.small} title={newsTag.value} /> : null}
            {section ? <Tag size={TagSize.small} title={section.title} /> : null}
            <Tag size={TagSize.small} title={formatDateDetail(new Date(newsDate), language, t)} />
          </TagsAndButtons>
        </div>
      </TagName>
    </BaseBackgroundColorContext.Provider>
  );
};

export { NewsItemBlock };
