import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterItemData, PointOfServiceAddress, PointOfServiceType } from '../../../../interfaces';

export const useCategories = (
  pointsOfService: PointOfServiceAddress[],
  defaultCategoryCode: PointOfServiceType | null = null,
): [FilterItemData[], PointOfServiceType | null, Dispatch<SetStateAction<PointOfServiceType | null>>] => {
  const {
    i18n: { t },
  } = useTranslation();

  //TODO: (mellonis) order categories according to lexemes order

  const categories = [
    ...pointsOfService.reduce((result, { type }) => {
      result.add(type);

      return result;
    }, new Set<PointOfServiceType>()),
  ].map((pointType, index) => ({
    code: pointType,
    id: index + 1,
    title: t(`block-points-of-service.point-type_${pointType}`),
  }));

  const [chosenCategory, setChosenCategory] = useState<PointOfServiceType | null>(
    categories.find(({ code }) => code === defaultCategoryCode)?.code ?? null,
  );

  return [categories, chosenCategory, setChosenCategory];
};
