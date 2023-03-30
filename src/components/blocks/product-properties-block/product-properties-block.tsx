import cs from 'classnames';
import React, { FC, useMemo } from 'react';
import { useBaseBackgroundColor } from '../../../contexts';
import { AbstractBlockProps, BlockWithProductComponentProps, BlockWithTitleComponentProps } from '../../../interfaces';
import productPropertiesBlockStyles from './style.module.scss';

const productPropertiesBlock = 'product-properties-block';

export interface ProductProperty {
  title: string;
  description: string;
}

export interface ProductPropertiesBlockProps
  extends AbstractBlockProps,
    BlockWithProductComponentProps,
    BlockWithTitleComponentProps {}

const ProductPropertiesBlock: FC<ProductPropertiesBlockProps> = ({
  className,
  contextProduct: productFromContext,
  product: productFromBlock,
  title: titleFromProps = '',
}) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const product = useMemo(() => {
    return productFromBlock || productFromContext;
  }, [productFromBlock, productFromContext]);
  const title = titleFromProps.trim();
  const isTitleEmpty = title.length === 0;

  if (!product || !product.properties) {
    return null;
  }

  return (
    <div
      className={cs(
        productPropertiesBlockStyles[productPropertiesBlock],
        productPropertiesBlockStyles[`${productPropertiesBlock}_base-background-color_${baseBackgroundColor}`],
        {
          [productPropertiesBlockStyles[`${productPropertiesBlock}_without-title`]]: isTitleEmpty,
        },
        className,
      )}
    >
      {!isTitleEmpty ? (
        <h2
          className={productPropertiesBlockStyles[`${productPropertiesBlock}__title`]}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      ) : null}
      <ul className={productPropertiesBlockStyles[`${productPropertiesBlock}__properties`]}>
        {product.properties.map(({ title, description }) => (
          <li key={title} className={productPropertiesBlockStyles[`${productPropertiesBlock}__property`]}>
            <div
              className={productPropertiesBlockStyles[`${productPropertiesBlock}__property-title`]}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <div
              className={productPropertiesBlockStyles[`${productPropertiesBlock}__property-description`]}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ProductPropertiesBlock };
