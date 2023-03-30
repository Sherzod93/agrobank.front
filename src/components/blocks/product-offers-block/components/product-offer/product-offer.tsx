import cs from 'classnames';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatString } from '../../../../../helpers';
import { CardProductData, ProductData, ProductType, WithClassNameComponentProps } from '../../../../../interfaces';
import { Card } from '../../../../units/business/card/card';
import { ProductTag } from '../../../../units/business/product-tag/product-tag';
import { Button, ButtonSize, ButtonType } from '../../../../units/controls/button/button';
import { Image } from '../../../../units/image/image';
import { StyledLink } from '../../../../units/styled-link/styled-link';
import { TagSize } from '../../../../units/tag/tag';
import { TagsAndButtons } from '../../../../units/tags-and-buttons/tags-and-buttons';
import { Tiles, TilingModes } from '../../../../units/tiles/tiles';
import productOfferStyles from './style.module.scss';

const productOfferClassname = 'product-offer';

export interface ProductOfferProps {
  buttonTitle?: string;
  product: ProductData;
  title?: string;
}

const ProductOffer: FC<ProductOfferProps & WithClassNameComponentProps> = ({
  buttonTitle,
  className,
  product,
  title: bannerTitle,
}) => {
  const {
    i18n: { t },
  } = useTranslation();
  const navigate = useNavigate();
  const {
    backgroundPicture: productBackgroundPicture,
    tags: productTags,
    title: productTitle,
    type: productType,
    url: productUrl,
  } = product;
  let picture: CardProductData['picture'];
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);

  if (product.type === ProductType.card) {
    picture = product.picture;
  }

  const productButtonTitle = buttonTitle ? buttonTitle : t(`product-button.${product?.type}`, '');

  return (
    <li
      className={cs(productOfferStyles[`${productOfferClassname}`], className)}
      onMouseEnter={() => setAreTilesAnimated(true)}
      onMouseLeave={() => setAreTilesAnimated(false)}
    >
      <div className={productOfferStyles[`${productOfferClassname}__item`]}>
        <StyledLink className={productOfferStyles[`${productOfferClassname}__link`]} to={productUrl}>
          <div className={productOfferStyles[`${productOfferClassname}__image-wrapper`]}>
            <div>
              <Image
                className={productOfferStyles[`${productOfferClassname}__image`]}
                image={productBackgroundPicture}
              />
              <Tiles
                animated={areTilesAnimated}
                className={productOfferStyles[`${productOfferClassname}__animation`]}
                hovered={areTilesAnimated}
                productType={productType}
                tilingMode={TilingModes.corners}
              />
            </div>
            {product.type === ProductType.card ? (
              <div className={productOfferStyles[`${productOfferClassname}__card-wrapper`]}>
                <Card cardImage={picture!} />
              </div>
            ) : null}
          </div>
          <span
            className={productOfferStyles[`${productOfferClassname}__title`]}
            dangerouslySetInnerHTML={{ __html: bannerTitle ? formatString(bannerTitle, productTitle) : productTitle }}
          />
        </StyledLink>
      </div>
      <TagsAndButtons className={productOfferStyles[`${productOfferClassname}__tags-and-buttons`]}>
        {productTags.map((productTag, index) => (
          <ProductTag key={index} productTag={productTag} size={TagSize.small} />
        ))}
        {productButtonTitle ? (
          <Button
            buttonType={ButtonType.primary}
            onClick={() => navigate(productUrl)}
            size={ButtonSize.small}
            withArrow={true}
          >
            <span dangerouslySetInnerHTML={{ __html: productButtonTitle }} />
          </Button>
        ) : null}
      </TagsAndButtons>
    </li>
  );
};

export { ProductOffer };
