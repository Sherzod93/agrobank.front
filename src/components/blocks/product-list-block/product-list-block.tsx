import cs from 'classnames';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AbstractBlockProps,
  BlockWithItemsComponentProps,
  CardProductData,
  DepositProductData,
  FilterItemData,
  LoanProductData,
  ProductData,
  ProductType,
  RemittanceProductData, TariffsProductData,
} from '../../../interfaces';
import { CategoryFilter } from '../../units/category-filter/category-filter';
import { InformationBlock } from '../information-block/information-block';
import { ProductListItem, RemittanceCountriesFilter } from './components';
import productListBlockStyles from './style.module.scss';

const productListBlockClassname = 'product-list-block';

export interface ProductListBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<ProductData> {
  buttonTitle?: string;
  categories?: FilterItemData[];
  defaultCountries?: [string, string];
}

const ProductListBlock: FC<ProductListBlockProps> = ({
  buttonTitle,
  categories = [],
  className,
  defaultCountries,
  items,
  tabsClassname,
}) => {
  const {
    i18n: { t },
  } = useTranslation();

  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [sourceCountryCode, setSourceCountryCode] = useState(defaultCountries?.[0]);

  const [destinationCountryCode, setDestinationCountryCode] = useState(defaultCountries?.[1]);

  const presentedCategories: FilterItemData[] = useMemo(() => {
    if (![ProductType.card, ProductType.deposit, ProductType.loan, ProductType.tariffs].includes(items[0]?.type)) {
      return [];
    }

    const presentedCategoriesIdSet = (
      items as unknown as (CardProductData | DepositProductData | LoanProductData  | TariffsProductData)[]
    ).reduce((result, { categoryIds }) => {
      categoryIds.forEach((categoryId) => result.add(categoryId));

      return result;
    }, new Set<number>());

    return categories.filter(({ id }) => presentedCategoriesIdSet.has(id));
  }, [items, categories]);

  const itemsFiltered = useMemo(() => {
    switch (items[0]?.type) {
      case ProductType.card:
      case ProductType.deposit:
      case ProductType.loan:
      case ProductType.tariffs:
        if (categoryId == null) {
          return items;
        } else {
          return (items as unknown as (CardProductData | DepositProductData | LoanProductData | TariffsProductData)[]).filter(
            ({ categoryIds }) => categoryIds.includes(categoryId),
          );
        }
      case ProductType.remittance:
        if (sourceCountryCode == null && destinationCountryCode == null) {
          return items;
        } else {
          return (items as unknown as RemittanceProductData[]).filter(
            ({ countries }) =>
              countries?.some(
                ([src, dst]) =>
                  (!sourceCountryCode || src === sourceCountryCode) &&
                  (!destinationCountryCode || dst === destinationCountryCode),
              ) ?? true,
          );
        }
    }

    return items;
  }, [categoryId, destinationCountryCode, items, sourceCountryCode]);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {presentedCategories.length > 1 ? (
        <CategoryFilter
          categories={presentedCategories}
          className={cs(
            productListBlockStyles[productListBlockClassname],
            productListBlockStyles[`${productListBlockClassname}_category-filter`],
            tabsClassname,
            className,
          )}
          entityType={items[0].type}
          onChange={setCategoryId}
        />
      ) : null}
      {[ProductType.remittance].includes(items[0].type) ? (
        <RemittanceCountriesFilter
          className={cs(
            productListBlockStyles[productListBlockClassname],
            productListBlockStyles[`${productListBlockClassname}_category-filter`],
            className,
          )}
          defaultCountries={defaultCountries}
          items={items as RemittanceProductData[]}
          onDestinationCountryCodeChange={setDestinationCountryCode}
          onSourceCountryCodeChange={setSourceCountryCode}
        />
      ) : null}
      {itemsFiltered.length > 0 ? (
        <ul
          className={cs(
            productListBlockStyles[productListBlockClassname],
            productListBlockStyles[`${productListBlockClassname}_list`],
            className,
          )}
        >
          {itemsFiltered.map((product) => (
            <ProductListItem
              key={product.id}
              buttonTitle={buttonTitle}
              className={productListBlockStyles[`${productListBlockClassname}__item`]}
              product={product}
            />
          ))}
        </ul>
      ) : (
        <div
          className={cs(
            productListBlockStyles[productListBlockClassname],
            productListBlockStyles[`${productListBlockClassname}_information-wrapper`],
            className,
          )}
        >
          <InformationBlock
            className={productListBlockStyles[`${productListBlockClassname}__information`]}
            description={t('block-product-list.empty-result-description_with-filters')}
            title={t('block-product-list.empty-result-title_with-filters')}
          />
        </div>
      )}
    </>
  );
};

export { ProductListBlock };
