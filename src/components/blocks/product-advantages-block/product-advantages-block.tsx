import cs from 'classnames';
import React, { FC, useMemo, useState } from 'react';
import { Breakpoints, breakpointsToMediaQuery } from '../../../helpers';
import { useMatchMedia } from '../../../hooks';
import { AbstractBlockProps, ComponentRenderType, BlockWithProductComponentProps } from '../../../interfaces';
import { DescriptionSize, ProductAdvantage } from './components';
import productAdvantagesBlockStyles from './style.module.scss';

const productAdvantagesBlockClassname = 'product-advantages-block';

export interface ProductAdvantagesBlockProps extends AbstractBlockProps, BlockWithProductComponentProps {}

const [oneElementInARowModifier, twoElementsInARowModifier] = ['one-element-in-a-row', 'two-elements-in-a-row'].map(
  (suffix) => productAdvantagesBlockStyles[`${productAdvantagesBlockClassname}__item_${suffix}`],
);
const [firstElementInAPair, secondElementInAPair] = ['first-element-in-a-pair', 'second-element-in-a-pair'].map(
  (suffix) => productAdvantagesBlockStyles[`${productAdvantagesBlockClassname}__item_${suffix}`],
);

const ProductAdvantagesBlock: FC<ProductAdvantagesBlockProps> = ({
  className,
  contextProduct: productFromContext,
  product: productFromBlock,
}) => {
  const product = useMemo(() => {
    return productFromBlock || productFromContext;
  }, [productFromBlock, productFromContext]);

  const [isMobileView, setIsMobileView] = useState(true);

  useMatchMedia({
    callback: setIsMobileView,
    mediaQuery: breakpointsToMediaQuery({ to: Breakpoints.md }),
  });

  if (!product || !product.advantages) {
    return null;
  }

  const productAdvantagesCount = product.advantages.length;
  const isSpecialRender = !isMobileView && [1, 2, 4].includes(product.advantages.length);
  const restCount = productAdvantagesCount % (isMobileView ? 2 : 3);
  const commonCount = productAdvantagesCount - restCount;

  return (
    <ul
      className={cs(
        productAdvantagesBlockStyles[productAdvantagesBlockClassname],
        isSpecialRender
          ? productAdvantagesBlockStyles[`${productAdvantagesBlockClassname}_special`]
          : productAdvantagesBlockStyles[`${productAdvantagesBlockClassname}_ordinary`],
        className,
      )}
    >
      {product.advantages.map((advantage, index) => (
        <ProductAdvantage
          key={index}
          className={cs(
            productAdvantagesBlockStyles[`${productAdvantagesBlockClassname}__item`],
            isSpecialRender
              ? productAdvantagesCount % 2 === 0
                ? [twoElementsInARowModifier, index % 2 === 0 ? firstElementInAPair : secondElementInAPair]
                : oneElementInARowModifier
              : commonCount <= index
              ? [
                  restCount === 2
                    ? [twoElementsInARowModifier, index === commonCount ? firstElementInAPair : secondElementInAPair]
                    : oneElementInARowModifier,
                ]
              : null,
          )}
          descriptionSize={isSpecialRender ? DescriptionSize.big : DescriptionSize.default}
          productAdvantage={advantage}
          renderType={ComponentRenderType.listItem}
        />
      ))}
    </ul>
  );
};

export { ProductAdvantagesBlock };
