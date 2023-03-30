import cs from 'classnames';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatString, scrollToProductApplyingBlock } from '../../../helpers';
import {
  AbstractBlockProps,
  AdviceProductData,
  BlockWithProductComponentProps,
  BlockWithTitleComponentProps,
  CardProductData,
  ProductType,
} from '../../../interfaces';
import { Card } from '../../units/business/card/card';
import { ProductTag } from '../../units/business/product-tag/product-tag';
import { Button, ButtonSize } from '../../units/controls/button/button';
import { Image } from '../../units/image/image';
import { TagSize } from '../../units/tag/tag';
import { TagsAndButtons } from '../../units/tags-and-buttons/tags-and-buttons';
import { Tiles, TilingModes } from '../../units/tiles/tiles';
import mainProductBannerBlockStyles from './style.module.scss';

const mainProductBannerBlockClassname = 'main-product-banner-block';

export interface MainProductBannerBlockProps
  extends AbstractBlockProps,
    BlockWithProductComponentProps,
    BlockWithTitleComponentProps {
  buttonTitle?: string;
  title: string;
}

const MainProductBannerBlock: FC<MainProductBannerBlockProps> = ({
  buttonTitle,
  className,
  contextProduct: productFromContext,
  product: productFromBlock,
  title: bannerTitle,
}) => {
  const {
    i18n: { t },
  } = useTranslation();
  const navigate = useNavigate();
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);
  const product = useMemo(() => {
    return productFromBlock || productFromContext;
  }, [productFromBlock, productFromContext]);

  if (!product) {
    return null;
  }

  const {
    backgroundPicture: productBackgroundPicture,
    description: productDescription,
    mainBannerPicture: productMainBannerPicture,
    title: productTitle,
    url: productUrl,
  } = product;
  let picture: CardProductData['picture'];

  if (product.type === ProductType.card) {
    picture = product.picture;
  }

  let productType =
    product.type === ProductType.advice
      ? (product as AdviceProductData).productType ?? ProductType.default
      : product.type;

  if (productType === ProductType.bankCell) {
    productType = ProductType.card;
  }

  const productButtonTitle = buttonTitle ? buttonTitle : t(`product-button.${product?.type}`, '');

  return (
    <div
      className={cs(
        mainProductBannerBlockStyles[mainProductBannerBlockClassname],
        mainProductBannerBlockStyles[`${mainProductBannerBlockClassname}_product-type_${productType}`],
        {
          [mainProductBannerBlockStyles[`${mainProductBannerBlockClassname}_advice`]]:
            product.type === ProductType.advice,
        },
        className,
      )}
      onMouseEnter={() => setAreTilesAnimated(true)}
      onMouseLeave={() => setAreTilesAnimated(false)}
    >
      <div className={mainProductBannerBlockStyles[`${mainProductBannerBlockClassname}__image-wrapper`]}>
        {product.type === ProductType.advice ? (
          <Tiles
            animated={true}
            animationReversed={true}
            className={mainProductBannerBlockStyles[`${mainProductBannerBlockClassname}__tiles`]}
            hovered={areTilesAnimated}
            tilingMode={TilingModes.solidCorners}
          />
        ) : (
          <Tiles
            animated={true}
            className={mainProductBannerBlockStyles[`${mainProductBannerBlockClassname}__tiles`]}
            hovered={true}
            tilingMode={TilingModes.corners}
          />
        )}
        <Image
          aria-hidden={true}
          className={mainProductBannerBlockStyles[`${mainProductBannerBlockClassname}__image`]}
          image={productMainBannerPicture || productBackgroundPicture}
        />
        {product.type === ProductType.card && (
          <div className={mainProductBannerBlockStyles[`${mainProductBannerBlockClassname}__card-wrapper`]}>
            <Card cardImage={picture!} />
          </div>
        )}
      </div>
      <div className={mainProductBannerBlockStyles[`${mainProductBannerBlockClassname}__info`]}>
        <div
          className={mainProductBannerBlockStyles[`${mainProductBannerBlockClassname}__title`]}
          dangerouslySetInnerHTML={{ __html: bannerTitle ? formatString(bannerTitle, productTitle) : productTitle }}
        />
        {productDescription ? (
          <div
            className={mainProductBannerBlockStyles[`${mainProductBannerBlockClassname}__description`]}
            dangerouslySetInnerHTML={{ __html: productDescription }}
          />
        ) : null}
        <TagsAndButtons
          className={mainProductBannerBlockStyles[`${mainProductBannerBlockClassname}__tags-and-buttons`]}
        >
          {product.type === ProductType.advice
            ? product.tags.map((productTag, index) => (
                <ProductTag key={index} productTag={productTag} size={TagSize.small} />
              ))
            : null}
          {product.type !== ProductType.advice && productButtonTitle && productFromContext?.canBeApplied ? (
            <Button
              onClick={() => scrollToProductApplyingBlock(navigate, productUrl)}
              size={product.tags.length > 0 ? ButtonSize.small : ButtonSize.default}
              withArrow={true}
            >
              <span dangerouslySetInnerHTML={{ __html: productButtonTitle }} />
            </Button>
          ) : null}
        </TagsAndButtons>
      </div>
    </div>
  );
};

export { MainProductBannerBlock };
