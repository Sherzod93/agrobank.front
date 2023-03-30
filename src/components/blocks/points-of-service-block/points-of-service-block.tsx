import cs from 'classnames';
import React, { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PointOfServiceAddress, PointOfServiceType } from '../../../interfaces';
import {
  fetchMorePointsOfService,
  PointsOfServiceFetchState,
  setPointsOfServiceLanguage,
} from '../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { CategoryFilter } from '../../units/category-filter/category-filter';
import { PointsOfServiceCompactBlock, PointsOfServiceFullBlock } from './components';
import { pointsOfServiceBlockClassname } from './constants';
import { useCategories } from './hooks';
import { PointsOfServiceBlockProps } from './interfaces';
import pointsOfServiceBlockStyles from './style.module.scss';

const PointsOfServiceBlock: FC<PointsOfServiceBlockProps> = (props) => {
  const {
    className,
    posType = null,
    isCompact = true,
    tabsClassname,
    withCategoryFilter: isComponentWithCategoryFilter = true,
  } = props;
  const {
    i18n: { language },
  } = useTranslation();

  const { pointsOfService, requestPhase: pointsOfServiceRequestState } = useAppSelector(
    (state) => state.pointsOfService,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setPointsOfServiceLanguage({
        language,
      }),
    );
  }, [dispatch, language]);

  useEffect(() => {
    if (pointsOfServiceRequestState === PointsOfServiceFetchState.initial) {
      dispatch(fetchMorePointsOfService());
    }
  }, [dispatch, pointsOfServiceRequestState]);

  const [categoriesForFilter, chosenCategory, setChosenCategory] = useCategories(pointsOfService, posType);

  useEffect(() => {
    if (posType) {
      setChosenCategory(posType);
    }
  }, [posType, setChosenCategory]);

  const filteredPointsOfService: PointOfServiceAddress[] = useMemo(() => {
    if (!chosenCategory) {
      return pointsOfService;
    }

    return pointsOfService.filter(({ type }) => type === chosenCategory);
  }, [chosenCategory, pointsOfService]);

  if (pointsOfServiceRequestState !== PointsOfServiceFetchState.fulfilled) {
    return null;
  }

  return (
    <>
      {isComponentWithCategoryFilter && categoriesForFilter?.length ? (
        <CategoryFilter
          addAllOption={false}
          categories={categoriesForFilter}
          categoryUrlParamName={'points-of-service'}
          className={cs(
            pointsOfServiceBlockStyles[pointsOfServiceBlockClassname],
            pointsOfServiceBlockStyles[`${pointsOfServiceBlockClassname}_category-filter`],
            tabsClassname,
            className,
          )}
          onChange={(categoryId) => {
            setChosenCategory(categoriesForFilter.find(({ id }) => id === categoryId)!.code as PointOfServiceType);
          }}
        />
      ) : null}
      {isCompact ? <PointsOfServiceCompactBlock {...props} pointsOfService={filteredPointsOfService} /> : null}
      {!isCompact ? <PointsOfServiceFullBlock {...props} pointsOfService={filteredPointsOfService} /> : null}
    </>
  );
};

export { PointsOfServiceBlock };
export type { PointsOfServiceBlockProps } from './interfaces';
