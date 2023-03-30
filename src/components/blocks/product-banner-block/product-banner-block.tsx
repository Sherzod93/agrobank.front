import cs from 'classnames';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { formatString, getProductTypeBaseBackgroundColor, scrollToProductApplyingBlock } from '../../../helpers';
import { useStyleElement } from '../../../hooks';
import {
  AbstractBlockProps,
  BaseBackgroundColor,
  BlockWithProductComponentProps,
  BlockWithTitleComponentProps,
  ProductType,
} from '../../../interfaces';
import { ProductTag } from '../../units/business/product-tag/product-tag';
import { Button } from '../../units/controls/button/button';
import { TagsAndButtons } from '../../units/tags-and-buttons/tags-and-buttons';
import { calcDivisionPoint, calcTilesCount } from '../../units/tiles/helpers';
import { Tiles } from '../../units/tiles/tiles';
import productBannerBlockStyles from './style.module.scss';

const productBannerBlockClassname = 'product-banner-block';
const animationElementClassname = productBannerBlockStyles[`${productBannerBlockClassname}__animation`];
const leftColorElementClassname = productBannerBlockStyles[`${productBannerBlockClassname}__left-color`];
const rightColorElementClassname = productBannerBlockStyles[`${productBannerBlockClassname}__right-color`];

export interface ProductBannerBlockProps
  extends AbstractBlockProps,
    BlockWithProductComponentProps,
    BlockWithTitleComponentProps {
  buttonTitle?: string;
}

const ProductBannerBlock: FC<ProductBannerBlockProps> = ({
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
  const product = useMemo(() => {
    return productFromBlock || productFromContext;
  }, [productFromBlock, productFromContext]);
  const componentElementRef = useRef<HTMLDivElement>(null);
  const [styleElementRef, styleElementCssScope] = useStyleElement();
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);
  const baseBackgroundColorContextValue = useMemo(
    () => ({
      baseBackgroundColor: product?.type
        ? getProductTypeBaseBackgroundColor(product?.type)
        : BaseBackgroundColor.default,
    }),
    [product?.type],
  );

  useEffect(() => {
    const { current: componentElement } = componentElementRef;
    const { current: styleElement } = styleElementRef;

    if (!componentElement || !styleElement) {
      return;
    }

    const { sheet: cssSheet } = styleElement;

    if (!cssSheet) {
      return;
    }

    const leftColor = window.getComputedStyle(
      componentElement.querySelector(`.${leftColorElementClassname}`)!,
    ).backgroundColor;
    const rightColor = window.getComputedStyle(
      componentElement.querySelector(`.${rightColorElementClassname}`)!,
    ).backgroundColor;
    const backgroundSize = 460;
    const resizeObserver = new ResizeObserver(
      ([
        {
          target: { clientHeight: height, clientWidth: width },
        },
      ]) => {
        const count = calcTilesCount(width, backgroundSize);
        const actualBackgroundSize = width / count;
        const divisionPointInPixels = calcDivisionPoint(actualBackgroundSize, count);
        const leftVerticalPointInPixels = width - divisionPointInPixels;
        const leftVerticalPointInPercent = `${(leftVerticalPointInPixels / height) * 100}%`;
        const rightVerticalPointInPercent = `${(divisionPointInPixels / height) * 100}%`;
        const divisionPoint = `${(divisionPointInPixels / width) * 100}%`;

        Array.from(cssSheet.cssRules).forEach(() => cssSheet.removeRule(0));

        cssSheet.insertRule(`.${productBannerBlockStyles[productBannerBlockClassname]}_${styleElementCssScope} .${animationElementClassname} {
          clip-path: polygon(0% 0%, 100% 0%, 100% ${leftVerticalPointInPercent}, ${divisionPoint} 0%, 0% ${rightVerticalPointInPercent});   
        }`);
        cssSheet.insertRule(`.${productBannerBlockStyles[productBannerBlockClassname]}_${styleElementCssScope} .${animationElementClassname}::before {
          background: linear-gradient(to right, ${leftColor}, ${leftColor} ${divisionPoint}, ${rightColor} ${divisionPoint}, ${rightColor});
        }`);
      },
    );

    resizeObserver.observe(componentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [product?.type, styleElementCssScope, styleElementRef]);

  if (!product) {
    return null;
  }

  const {
    backgroundPicture: productBackgroundPicture,
    bannerPicture: productBannerPicture,
    tags: productTags,
    title: productTitle,
    url: productUrl,
  } = product;
  const productButtonTitle = buttonTitle ? buttonTitle : t(`product-button.${product?.type}`, '');
  let { type: productType } = product;

  if (productType === ProductType.bankCell) {
    productType = ProductType.card;
  }

  return (
    <div
      ref={componentElementRef}
      className={cs(
        productBannerBlockStyles[productBannerBlockClassname],
        `${productBannerBlockStyles[productBannerBlockClassname]}_${styleElementCssScope}`,
        productBannerBlockStyles[`${productBannerBlockClassname}_product-type_${productType}`],
        className,
      )}
      onMouseEnter={() => setAreTilesAnimated(true)}
      onMouseLeave={() => setAreTilesAnimated(false)}
    >
      <div className={productBannerBlockStyles[`${productBannerBlockClassname}__left-color`]} />
      <div className={productBannerBlockStyles[`${productBannerBlockClassname}__right-color`]} />
      <div
        className={productBannerBlockStyles[`${productBannerBlockClassname}__background-image`]}
        style={{ backgroundImage: `url(${productBannerPicture?.src || productBackgroundPicture.src})` }}
      />
      <Tiles
        animated={areTilesAnimated}
        className={productBannerBlockStyles[`${productBannerBlockClassname}__animation`]}
      />
      <div
        className={productBannerBlockStyles[`${productBannerBlockClassname}__title`]}
        dangerouslySetInnerHTML={{ __html: bannerTitle ? formatString(bannerTitle, productTitle) : productTitle }}
      />
      <BaseBackgroundColorContext.Provider value={baseBackgroundColorContextValue}>
        <TagsAndButtons
          className={productBannerBlockStyles[`${productBannerBlockClassname}__tags-and-buttons`]}
          withoutBreak={true}
        >
          {productTags.map((productTag, index) => (
            <ProductTag key={index} productTag={productTag} />
          ))}
          {productButtonTitle && product.canBeApplied ? (
            <Button onClick={() => scrollToProductApplyingBlock(navigate, productUrl)} withArrow={true}>
              <span dangerouslySetInnerHTML={{ __html: productButtonTitle }} />
            </Button>
          ) : null}
        </TagsAndButtons>
      </BaseBackgroundColorContext.Provider>
    </div>
  );
};

export { ProductBannerBlock };
