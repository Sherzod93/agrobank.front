import cs from 'classnames';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { formatString, getProductTypeBaseBackgroundColor } from '../../../helpers';
import {
  AbstractBlockProps,
  BlockWithProductComponentProps,
  BlockWithTitleComponentProps,
  LinkData,
  ProductType,
} from '../../../interfaces';
import { ProductTag } from '../../units/business/product-tag/product-tag';
import { Button, ButtonSize, ButtonType } from '../../units/controls/button/button';
import { Image } from '../../units/image/image';
import { StyledLink } from '../../units/styled-link/styled-link';
import { TagSize } from '../../units/tag/tag';
import { TagsAndButtons } from '../../units/tags-and-buttons/tags-and-buttons';
import { Tiles } from '../../units/tiles/tiles';
import compactProductBannerBlockStyles from './style.module.scss';

const compactProductBannerBlockClassname = 'compact-product-banner-block';

export enum CompactProductBannerBlockType {
  link = 'link',
  withImage = 'with-image',
  withTags = 'with-tags',
  withoutImage = 'without-image',
}

export interface CompactProductBannerBlockProps
  extends AbstractBlockProps,
    BlockWithProductComponentProps,
    BlockWithTitleComponentProps {
  bannerType:
    | CompactProductBannerBlockType.link
    | CompactProductBannerBlockType.withImage
    | CompactProductBannerBlockType.withoutImage
    | CompactProductBannerBlockType.withTags;
  buttonTitle?: string;
  indentLeft?: boolean;
  link?: LinkData;
  productType?: ProductType;
}

const CompactProductBannerBlock: FC<CompactProductBannerBlockProps> = (props) => {
  const {
    bannerType,
    buttonTitle,
    className,
    contextProduct: productFromContext,
    link,
    indentLeft,
    product: productFromBlock,
    productType: productTypeFromBlock,
    title: bannerTitle,
  } = props;
  const {
    i18n: { t },
  } = useTranslation();
  const navigate = useNavigate();
  const product = useMemo(() => {
    return productFromBlock || productFromContext;
  }, [productFromBlock, productFromContext]);
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);
  const isLinkType = bannerType === CompactProductBannerBlockType.link;
  const isTagsType = bannerType === CompactProductBannerBlockType.withTags;
  const isImageType = bannerType === CompactProductBannerBlockType.withImage;
  const {
    backgroundPicture: productBackgroundPicture,
    description: productDescription,
    tags: productTags,
    url: productUrl,
  } = product ?? {};
  const hasTags = isTagsType && (productTags ?? []).length > 0;
  const title =
    bannerType === CompactProductBannerBlockType.link
      ? link?.title
      : bannerTitle
      ? formatString(bannerTitle, product?.title ?? '')
      : product?.title ?? '';
  const linkUrl = (bannerType === CompactProductBannerBlockType.link ? link!.url : productUrl) ?? '#';
  const productButtonTitle = buttonTitle ? buttonTitle : t(`product-button.${product?.type}`, '');
  let productType =
    (bannerType === CompactProductBannerBlockType.link ? productTypeFromBlock : product?.type) ?? ProductType.default;

  const baseBackgroundColor = getProductTypeBaseBackgroundColor(productType);
  if (productType === ProductType.bankCell) {
    productType = ProductType.card;
  }

  return (
    <div
      className={cs(
        compactProductBannerBlockStyles[compactProductBannerBlockClassname],
        compactProductBannerBlockStyles[`${compactProductBannerBlockClassname}_product-type_${productType}`],
        compactProductBannerBlockStyles[`${compactProductBannerBlockClassname}_banner-type_${bannerType}`],
        {
          [compactProductBannerBlockStyles[`${compactProductBannerBlockClassname}_indent-left`]]: indentLeft,
        },
        className,
      )}
      onMouseEnter={() => setAreTilesAnimated(true)}
      onMouseLeave={() => setAreTilesAnimated(false)}
    >
      <Tiles
        animated={areTilesAnimated}
        className={compactProductBannerBlockStyles[`${compactProductBannerBlockClassname}__tiles`]}
        productType={productType}
      />

      {isImageType && productBackgroundPicture ? (
        <div className={compactProductBannerBlockStyles[`${compactProductBannerBlockClassname}__image-wrapper`]}>
          <Image
            className={compactProductBannerBlockStyles[`${compactProductBannerBlockClassname}__image`]}
            image={productBackgroundPicture}
          />
        </div>
      ) : null}

      <div className={compactProductBannerBlockStyles[`${compactProductBannerBlockClassname}__body`]}>
        {title ? (
          <StyledLink
            className={compactProductBannerBlockStyles[`${compactProductBannerBlockClassname}__title`]}
            dangerouslySetInnerHTML={{ __html: title }}
            to={linkUrl}
          />
        ) : null}
        {!isLinkType && productDescription ? (
          <div
            className={compactProductBannerBlockStyles[`${compactProductBannerBlockClassname}__text`]}
            dangerouslySetInnerHTML={{ __html: productDescription }}
          />
        ) : null}
      </div>

      {!isLinkType ? (
        <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
          <TagsAndButtons
            className={compactProductBannerBlockStyles[`${compactProductBannerBlockClassname}__tags-and-buttons`]}
          >
            {hasTags
              ? productTags!.map((tag, index) => (
                  <ProductTag
                    key={index}
                    className={compactProductBannerBlockStyles[`${compactProductBannerBlockClassname}__tag`]}
                    productTag={tag}
                    size={TagSize.small}
                  />
                ))
              : null}
            {productButtonTitle ? (
              <Button
                buttonType={ButtonType.primary}
                className={compactProductBannerBlockStyles[`${compactProductBannerBlockClassname}__button`]}
                onClick={() => navigate(linkUrl)}
                size={ButtonSize.small}
                withArrow={true}
              >
                <span dangerouslySetInnerHTML={{ __html: productButtonTitle }} />
              </Button>
            ) : null}
          </TagsAndButtons>
        </BaseBackgroundColorContext.Provider>
      ) : null}
    </div>
  );
};

export { CompactProductBannerBlock };
