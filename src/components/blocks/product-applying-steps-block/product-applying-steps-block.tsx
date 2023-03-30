import cs from 'classnames';
import React, { FC } from 'react';
import { BaseBackgroundColorContext, useBaseBackgroundColor } from '../../../contexts';
import { getProductTypeBaseBackgroundColor } from '../../../helpers';
import {
  AbstractBlockProps,
  BlockWithItemsComponentProps,
  BlockWithProductTypeComponentProps,
  BlockWithTitleComponentProps,
} from '../../../interfaces';
import productApplyingStepsBlockStyles from './style.module.scss';

const productApplyingStepsBlockClassname = 'product-applying-steps-block';

export interface ProductApplyingBlockProps
  extends AbstractBlockProps,
    BlockWithItemsComponentProps<string>,
    Partial<BlockWithProductTypeComponentProps>,
    BlockWithTitleComponentProps {}

const ProductApplyingStepsBlock: FC<ProductApplyingBlockProps> = ({
  className,
  items,
  productType,
  title: titleFromProps = '',
}) => {
  const { baseBackgroundColor: baseBackgroundColorFromContext } = useBaseBackgroundColor();
  const baseBackgroundColor = productType
    ? getProductTypeBaseBackgroundColor(productType)
    : baseBackgroundColorFromContext;
  const title = (productType ? titleFromProps : '').trim();
  const isTitleEmpty = title.length === 0;

  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(
          productApplyingStepsBlockStyles[productApplyingStepsBlockClassname],
          productApplyingStepsBlockStyles[
            `${productApplyingStepsBlockClassname}_base-background-color_${baseBackgroundColor}`
          ],
          {
            [productApplyingStepsBlockStyles[`${productApplyingStepsBlockClassname}_with-product-type`]]: productType,
            [productApplyingStepsBlockStyles[`${productApplyingStepsBlockClassname}_product-type_${productType}`]]:
              productType,
            [productApplyingStepsBlockStyles[`${productApplyingStepsBlockClassname}_with-title`]]: !isTitleEmpty,
          },
          className,
        )}
      >
        {!isTitleEmpty ? (
          <h2
            className={productApplyingStepsBlockStyles[`${productApplyingStepsBlockClassname}__title`]}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        ) : null}
        <ol className={productApplyingStepsBlockStyles[`${productApplyingStepsBlockClassname}__steps`]}>
          {items.map((step, index) => (
            <li key={step} className={productApplyingStepsBlockStyles[`${productApplyingStepsBlockClassname}__step`]}>
              <div className={productApplyingStepsBlockStyles[`${productApplyingStepsBlockClassname}__step-number`]}>
                {index + 1}
              </div>
              <div
                className={productApplyingStepsBlockStyles[`${productApplyingStepsBlockClassname}__step-title`]}
                dangerouslySetInnerHTML={{ __html: step }}
              />
            </li>
          ))}
        </ol>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

export { ProductApplyingStepsBlock };
