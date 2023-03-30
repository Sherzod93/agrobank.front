import { BaseBackgroundColor, FilterItemData, ProductType } from '../../interfaces';

export const getProductTypeBaseBackgroundColor = (productType: ProductType) => {
  switch (productType) {
    case ProductType.business:
      return BaseBackgroundColor.deepBlueOnDeepBlue;
    case ProductType.bankCell:
    case ProductType.card:
      return BaseBackgroundColor.darkBlue;
    case ProductType.default:
      return BaseBackgroundColor.green;
    case ProductType.deposit:
      return BaseBackgroundColor.orange;
    case ProductType.loan:
      return BaseBackgroundColor.semiRed;
    case ProductType.remittance:
      return BaseBackgroundColor.blue;
  }

  return BaseBackgroundColor.default;
};

export const buildFilterItemIdToFilterItemMap = <T extends FilterItemData = FilterItemData>(
  filterItemDataItems: T[],
): Map<number, T> =>
  filterItemDataItems.reduce((result, filterItem) => {
    result.set(filterItem.id, filterItem);

    return result;
  }, new Map());
