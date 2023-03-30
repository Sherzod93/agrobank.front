import cs from 'classnames';
import React, { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { FilterItemData, WithClassNameComponentProps } from '../../../interfaces';
import { Tabs } from '../controls/tabs/tabs';

interface CategoryFilterProps {
  addAllOption?: boolean;
  categories: FilterItemData[];
  categoryUrlParamName?: string;
  entityType?: string;
  onChange: (categoryId: number | null) => void;
}

const CategoryFilter: FC<CategoryFilterProps & WithClassNameComponentProps> = ({
  addAllOption = true,
  categories,
  categoryUrlParamName = 'category',
  className,
  entityType,
  onChange,
}) => {
  const {
    i18n: { t },
  } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterItemsWithAll = useMemo(() => {
    const result = [...categories];

    const titleFallbackValue = t('filters.category_all');

    if (addAllOption) {
      result.unshift({
        code: '',
        id: 0,
        title: t(`filters.category_${entityType}_all`, titleFallbackValue),
      });
    }

    return result;
  }, [addAllOption, categories, entityType, t]);
  const filterTabOptions = useMemo(() => filterItemsWithAll.map(({ title }) => title), [filterItemsWithAll]);
  const filterTabOptionIx = Math.max(
    0,
    filterItemsWithAll.findIndex(({ code }) => code === searchParams.get(categoryUrlParamName)) ?? 0,
  );

  useEffect(() => {
    if (filterTabOptionIx === 0 && searchParams.has(categoryUrlParamName)) {
      searchParams.delete(categoryUrlParamName);
      setSearchParams(searchParams, { replace: true });
    }
  }, [categoryUrlParamName, filterItemsWithAll, filterTabOptionIx, searchParams, setSearchParams]);

  useEffect(() => {
    const filterItem = filterItemsWithAll[filterTabOptionIx];

    onChange(filterItem?.id || null);
  }, [filterItemsWithAll, filterTabOptionIx, onChange]);

  const onTabSelect = (selectedOptionIx: number) => {
    const { code } = filterItemsWithAll[selectedOptionIx];

    if (code) {
      searchParams.set(categoryUrlParamName, code);
    } else {
      searchParams.delete(categoryUrlParamName);
    }

    setSearchParams(searchParams, { replace: true });
  };

  if (filterTabOptions.length < 2) {
    return null;
  }

  return (
    <Tabs
      className={cs(className)}
      onSelect={onTabSelect}
      options={filterTabOptions}
      selectedOptionIx={filterTabOptionIx}
    />
  );
};

export { CategoryFilter };
