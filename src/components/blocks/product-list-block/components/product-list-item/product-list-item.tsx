import cs from 'classnames';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BaseBackgroundColorContext, useBaseBackgroundColor } from '../../../../../contexts';
import { getProductTypeBaseBackgroundColor } from '../../../../../helpers';
import { CardProductData, ProductData, ProductType, WithClassNameComponentProps } from '../../../../../interfaces';
import { Card } from '../../../../units/business/card/card';
import { ProductTag } from '../../../../units/business/product-tag/product-tag';
import { Button, ButtonSize } from '../../../../units/controls/button/button';
import { Image } from '../../../../units/image/image';
import { StyledLink } from '../../../../units/styled-link/styled-link';
import { TagSize } from '../../../../units/tag/tag';
import { TagsAndButtons } from '../../../../units/tags-and-buttons/tags-and-buttons';
import { Tiles, TilingModes } from '../../../../units/tiles/tiles';
import productListItemStyles from './style.module.scss';

const productListItemClassname = 'product-list-item';

interface CardListItemProps {
  buttonTitle?: string;
  product: ProductData;
}

const ProductListItem: FC<CardListItemProps & WithClassNameComponentProps> = ({ buttonTitle, className, product }) => {
  const {
    i18n: { t },
  } = useTranslation();
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);
  const {
    description: productDescription,
    promoted: isProductPromoted,
    tags: productTags,
    title: productTitle,
    type: productType,
    url: productUrl,
  } = product;
  const navigate = useNavigate();
  const picture = useMemo(() => {
    switch (productType) {
      case ProductType.card:
        return <Card cardImage={(product as CardProductData).picture} />;
      case ProductType.deposit:
      case ProductType.loan:
      case ProductType.remittance:
        return (
          <Image
            className={productListItemStyles[`${productListItemClassname}__image`]}
            image={(product as CardProductData).backgroundPicture}
          />
        );
    }
  }, [product, productType]);
  const baseBackgroundColorContextValue = useMemo(
    () => ({ baseBackgroundColor: getProductTypeBaseBackgroundColor(productType) }),
    [productType],
  );
  const productButtonTitle = buttonTitle ? buttonTitle : t(`product-button.${product?.type}`, '');
  const cardListItem = (
    <div
      className={cs(
        productListItemStyles[productListItemClassname],
        productListItemStyles[`${productListItemClassname}_base-background-color_${baseBackgroundColor}`],
        productListItemStyles[`${productListItemClassname}_product-type_${productType}`],
        {
          [productListItemStyles[`${productListItemClassname}_promoted`]]: isProductPromoted,
        },
        className,
      )}
      onMouseEnter={() => setAreTilesAnimated(true)}
      onMouseLeave={() => setAreTilesAnimated(false)}
    >
      <Tiles
        animated={areTilesAnimated}
        className={productListItemStyles[`${productListItemClassname}__animation`]}
        hovered={!isProductPromoted && areTilesAnimated}
        productType={productType}
        tilingMode={isProductPromoted ? TilingModes.default : TilingModes.corners}
      />
      <div className={productListItemStyles[`${productListItemClassname}__picture-wrapper`]}>{picture}</div>
      <div className={productListItemStyles[`${productListItemClassname}__info-wrapper`]}>
        <StyledLink
          className={productListItemStyles[`${productListItemClassname}__title`]}
          dangerouslySetInnerHTML={{ __html: productTitle }}
          to={productUrl}
        />
        {productDescription ? (
          <div
            className={productListItemStyles[`${productListItemClassname}__description`]}
            dangerouslySetInnerHTML={{ __html: productDescription }}
          />
        ) : null}
        <TagsAndButtons className={productListItemStyles[`${productListItemClassname}__tags-and-buttons`]}>
          {productTags.map((tag, index) => (
            <ProductTag
              key={index}
              className={productListItemStyles[`${productListItemClassname}__tag`]}
              productTag={tag}
              size={TagSize.small}
            />
          ))}
          {productButtonTitle ? (
            <Button
              className={productListItemStyles[`${productListItemClassname}__button`]}
              size={ButtonSize.small}
              onClick={() => navigate(productUrl)}
              withArrow={true}
            >
              <span dangerouslySetInnerHTML={{ __html: productButtonTitle }} />
            </Button>
          ) : null}
        </TagsAndButtons>
      </div>
    </div>
  );

  return isProductPromoted ? (
    <BaseBackgroundColorContext.Provider value={baseBackgroundColorContextValue}>
      {cardListItem}
    </BaseBackgroundColorContext.Provider>
  ) : (
    cardListItem
  );
};

export { ProductListItem };
