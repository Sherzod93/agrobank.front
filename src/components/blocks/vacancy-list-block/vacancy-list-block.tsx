import cs from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AbstractBlockProps,
  ComponentRenderType,
  EmptyResultType,
  FilterData,
  FilterItemData,
  PageSectionTitleAlignment,
  PageSectionTitleSize,
} from '../../../interfaces';
import { AbstractBlockData, VacancyItemBlockData } from '../../../interfaces/classes/blocks';
import {
  fetchMoreVacancies,
  setVacanciesFilters,
  setVacanciesLanguage,
  VacanciesFetchState,
} from '../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { VacanciesListBlockContext } from '../../page-sections/contexts';
import PageSection from '../../page-sections/page-section/page-section';
import { Button, ButtonType } from '../../units/controls/button/button';
import { Filters } from '../../units/filters/filters';
import { generateGroupTuples } from '../helpers';
import { InformationBlock } from '../information-block/information-block';
import vacancyListBlockStyles from './style.module.scss';

export const vacancyListBlockClassname = 'vacancy-list-block';

export interface VacancyListBlockProps extends AbstractBlockProps {
  filters: FilterData[];
}

const VacancyListBlock: FC<VacancyListBlockProps> = ({
  className,
  filters: filtersFromBlock,
  hiddenTabClassname,
  nestedBlocks = [],
}) => {
  const {
    i18n: { language, t },
  } = useTranslation();
  const filterRef = useRef<Record<string, any>>();
  const {
    filters: filtersFromState,
    hasMore,
    requestPhase,
    vacanciesItemsBlocks,
  } = useAppSelector((state) => state.vacancies);
  const dispatch = useAppDispatch();
  const filters: FilterData[] = useMemo(() => {
    return filtersFromBlock.map((filter) => {
      filter.withAllOption = true;

      return filter;
    });
  }, [filtersFromBlock]);
  const vacanciesListBlockContextValue = useMemo(
    () => ({
      regionIdToRegionMap:
        filters
          .find(({ code }) => code === 'regionId')
          ?.items?.reduce((result, item) => {
            result.set(item.id, item);

            return result;
          }, new Map<number, FilterItemData>()) ?? new Map(),
    }),
    [filters],
  );

  useEffect(() => {
    dispatch(
      setVacanciesLanguage({
        language,
      }),
    );
  }, [dispatch, language]);

  useEffect(() => {
    if (requestPhase === VacanciesFetchState.initial) {
      dispatch(fetchMoreVacancies());
    }
  }, [dispatch, requestPhase]);

  const groupTuples: [string, VacancyItemBlockData[], AbstractBlockData[]][] = useMemo(() => {
    const filtersValues = Object.values(filtersFromState);
    const withNestedBlocks = filtersValues.every((value) => value == null) && nestedBlocks?.length > 0;
    const idPrefix = filtersValues.join('-');

    if (withNestedBlocks) {
      return generateGroupTuples(vacanciesItemsBlocks, nestedBlocks, [3, 1, 1], idPrefix);
    } else {
      const id = `${idPrefix}-${vacanciesItemsBlocks[0]?.id ?? null}`;

      return [[id, vacanciesItemsBlocks, []]];
    }
  }, [filtersFromState, nestedBlocks, vacanciesItemsBlocks]);

  const emptyResultType: EmptyResultType | null = useMemo(() => {
    const isResultIsEmpty = groupTuples.length > 0 && groupTuples[0][1].length === 0;
    const filtersValues = Object.values(filtersFromState);
    const isFiltersPresented = filtersValues.length > 0 && filtersValues.some((filtersValue) => filtersValue != null);

    if (isResultIsEmpty) {
      if (isFiltersPresented) {
        return EmptyResultType.withFilters;
      }

      return EmptyResultType.withoutFilters;
    }

    return null;
  }, [filtersFromState, groupTuples]);

  const filtersChangeHandler = useCallback(
    ({ code: filterCode, id: filterOptionId }) => {
      filterRef.current = Object.assign({}, filterRef.current, {
        [filterCode]: filterOptionId,
      });
      if (filtersFromState[filterCode] !== filterOptionId) {
        dispatch(
          setVacanciesFilters({
            filters: filterRef.current,
          }),
        );
      }
    },
    [dispatch, filtersFromState],
  );

  return (
    <>
      <Filters
        className={cs(
          vacancyListBlockStyles[vacancyListBlockClassname],
          vacancyListBlockStyles[`${vacancyListBlockClassname}_filters-wrapper`],
          {
            [vacancyListBlockStyles[`${vacancyListBlockClassname}_hidden`]]:
              emptyResultType === EmptyResultType.withoutFilters,
          },
          className,
        )}
        lexemePrefix="vacancy-list-block"
        filters={filters}
        onChange={filtersChangeHandler}
      />
      {emptyResultType === null ? (
        <VacanciesListBlockContext.Provider value={vacanciesListBlockContextValue}>
          {[VacanciesFetchState.fulfilled, VacanciesFetchState.pending].includes(requestPhase)
            ? groupTuples.map(([id, items, blockDataList]) => (
                <React.Fragment key={id}>
                  <ul className={cs(vacancyListBlockStyles[vacancyListBlockClassname], className)}>
                    <PageSection
                      blockRenderType={ComponentRenderType.listItem}
                      hiddenTabClassname={hiddenTabClassname}
                      onlyBlocks={true}
                      section={{
                        blocks: items,
                        id: `${id}-vacancy-list`,
                        titleSize: PageSectionTitleSize.medium,
                        titleAlignment: PageSectionTitleAlignment.center,
                      }}
                    />
                  </ul>
                  <PageSection
                    hiddenTabClassname={hiddenTabClassname}
                    onlyBlocks={true}
                    section={{
                      blocks: blockDataList,
                      id: `${id}-nested-blocks`,
                      titleSize: PageSectionTitleSize.medium,
                      titleAlignment: PageSectionTitleAlignment.center,
                    }}
                  />
                </React.Fragment>
              ))
            : null}
          {hasMore ? (
            <div
              className={cs(
                vacancyListBlockStyles[vacancyListBlockClassname],
                vacancyListBlockStyles[`${vacancyListBlockClassname}_load-more-button-wrapper`],
                className,
              )}
            >
              <Button
                buttonType={ButtonType.secondary}
                onClick={() => {
                  dispatch(fetchMoreVacancies());
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: t('block-vacancy-list.load-more') }} />
              </Button>
            </div>
          ) : null}
        </VacanciesListBlockContext.Provider>
      ) : (
        <>
          {requestPhase === VacanciesFetchState.fulfilled ? (
            <div
              className={cs(
                vacancyListBlockStyles[vacancyListBlockClassname],
                vacancyListBlockStyles[`${vacancyListBlockClassname}_information-wrapper`],
                className,
              )}
            >
              <InformationBlock
                className={vacancyListBlockStyles[`${vacancyListBlockClassname}__information`]}
                description={t(`block-vacancy-list.empty-result-description_${emptyResultType}`)}
                title={t(`block-vacancy-list.empty-result-title_${emptyResultType}`)}
              />
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export { VacancyListBlock };
