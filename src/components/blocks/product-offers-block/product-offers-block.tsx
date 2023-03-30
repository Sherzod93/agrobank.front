import cs from 'classnames';
import React, { FC } from 'react';
import { AbstractBlockProps, BlockWithItemsComponentProps } from '../../../interfaces';
import { ProductOffer, ProductOfferProps } from './components';
import productOffersBlockStyles from './style.module.scss';

const productOffersBlockClassname = 'product-offers-block';

export interface ProductOffersBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<ProductOfferProps> {
  buttonTitle?: string;
}

const ProductOffersBlock: FC<ProductOffersBlockProps> = ({ buttonTitle, className, items }) => (
  <ul className={cs(productOffersBlockStyles[`${productOffersBlockClassname}`], className)}>
    {items.map((item) => (
      <ProductOffer key={item.product.id} {...item} buttonTitle={buttonTitle} />
    ))}
  </ul>
);

export { ProductOffersBlock };
