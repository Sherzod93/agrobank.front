import { buildFilterItemIdToFilterItemMap } from '../../../../helpers';
import { AdviceData, AdviceFilterItemData, ExtendedAdviceData } from '../../../advice';
import { FilterItemData } from '../../../filter';
import { ExtendedNewsItemData, NewsItemData } from '../../../news-item';
import { ProductType } from '../../../product';
import { ProductTagTypes } from '../../../product-tag';
import { prepareAdviceData, prepareNewsItemData } from '../../helpers';

interface extendParameters<T extends { date: Date; sectionId: number }, F extends FilterItemData = FilterItemData> {
  items: T[];
  sections?: F[];
  sectionIdToSectionMap?: Map<number, F>;
}

export const extendAdviceDataItems = ({
  items,
  sections,
  sectionIdToSectionMap,
}: extendParameters<AdviceData, AdviceFilterItemData>): ExtendedAdviceData[] => {
  if (!sectionIdToSectionMap && sections) {
    sectionIdToSectionMap = buildFilterItemIdToFilterItemMap(sections);
  }

  return items.map((item) => {
    const preparedAdviceData = prepareAdviceData(item);

    return {
      ...preparedAdviceData,
      productType: sectionIdToSectionMap?.get(item.sectionId)?.productType ?? ProductType.default,
      tag: {
        type: ProductTagTypes.text,
        value: sectionIdToSectionMap?.get(item.sectionId)?.title ?? '',
      },
    };
  });
};

export const extendNewsItems = ({
  items,
  sections,
  sectionIdToSectionMap,
}: extendParameters<NewsItemData>): ExtendedNewsItemData[] => {
  if (!sectionIdToSectionMap && sections) {
    sectionIdToSectionMap = buildFilterItemIdToFilterItemMap(sections);
  }

  return items.map((item) => {
    const preparedNewsItemData = prepareNewsItemData(item);

    const result: ExtendedNewsItemData = {
      ...preparedNewsItemData,
      tag: {
        type: ProductTagTypes.text,
        value: sectionIdToSectionMap?.get(preparedNewsItemData.sectionId)?.title ?? '',
      },
    };

    return result;
  });
};
