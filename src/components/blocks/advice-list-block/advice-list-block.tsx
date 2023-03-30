import cs from 'classnames';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { buildFilterItemIdToFilterItemMap } from '../../../helpers';
import {
  AbstractBlockProps,
  ComponentRenderType,
  EmptyResultType,
  FilterData,
  PageSectionTitleAlignment,
  PageSectionTitleSize,
} from '../../../interfaces';
import { AbstractBlockData, AdviceItemBlockData } from '../../../interfaces/classes/blocks';
import { AdvicesFetchState, fetchMoreAdvices, setAdvicesFilters, setAdvicesLanguage } from '../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import PageSection from '../../page-sections/page-section/page-section';
import { Button, ButtonType } from '../../units/controls/button/button';
import { Filters } from '../../units/filters/filters';
import { generateGroupTuples } from '../helpers';
import { InformationBlock } from '../information-block/information-block';
import adviceListBlockStyles from './style.module.scss';

export const adviceListBlockClassname = 'advice-list-block';

export interface AdviceListBlockProps extends AbstractBlockProps {
  filters: FilterData[];
}

const AdviceListBlock: FC<AdviceListBlockProps> = ({
  className,
  hiddenTabClassname,
  filters: filtersFromBlock,
  nestedBlocks = [],
}) => {
  const {
    i18n: { language, t },
  } = useTranslation();
  const {
    adviceItemBlocks,
    filters: filtersFromState,
    hasMore,
    requestPhase,
  } = useAppSelector((state) => state.advices);
  const dispatch = useAppDispatch();
  const filters: FilterData[] = useMemo(() => {
    return filtersFromBlock.map((filter) => {
      filter.withAllOption = true;

      return filter;
    });
  }, [filtersFromBlock]);
  const sectionIdToSectionMap = useMemo(
    () => buildFilterItemIdToFilterItemMap(filters.find(({ code }) => code === 'sectionId')!.items),
    [filters],
  );

  useEffect(() => {
    dispatch(
      setAdvicesLanguage({
        language,
        sectionIdToSectionMap,
      }),
    );
  }, [dispatch, language, sectionIdToSectionMap]);

  useEffect(() => {
    if (requestPhase === AdvicesFetchState.initial) {
      dispatch(fetchMoreAdvices({ sectionIdToSectionMap }));
    }
  }, [dispatch, requestPhase, sectionIdToSectionMap]);

  const groupTuples: [string, AdviceItemBlockData[], AbstractBlockData[]][] = useMemo(() => {
    const filtersValues = Object.values(filtersFromState);
    const withNestedBlocks = filtersValues.every((value) => value == null) && nestedBlocks?.length > 0;
    const idPrefix = filtersValues.join('-');

    if (withNestedBlocks) {
      return generateGroupTuples<AdviceItemBlockData>(adviceItemBlocks, nestedBlocks, [2, 1, 1], idPrefix);
    } else {
      const id = `${idPrefix}-${adviceItemBlocks[0]?.id ?? null}`;

      return [[id, adviceItemBlocks, []]];
    }
  }, [filtersFromState, nestedBlocks, adviceItemBlocks]);
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
      if (filtersFromState[filterCode] !== filterOptionId) {
        dispatch(
          setAdvicesFilters({
            filters: Object.assign({}, filtersFromState, {
              [filterCode]: filterOptionId,
            }),
            sectionIdToSectionMap,
          }),
        );
      }
    },
    [dispatch, filtersFromState, sectionIdToSectionMap],
  );

  return (
    <>
      <Filters
        className={cs(
          adviceListBlockStyles[adviceListBlockClassname],
          adviceListBlockStyles[`${adviceListBlockClassname}_filters-wrapper`],
          {
            [adviceListBlockStyles[`${adviceListBlockClassname}_hidden`]]:
              emptyResultType === EmptyResultType.withoutFilters,
          },
          className,
        )}
        lexemePrefix="advice-list-block"
        filters={filters}
        onChange={filtersChangeHandler}
      />
      {emptyResultType === null ? (
        <>
          {[AdvicesFetchState.fulfilled, AdvicesFetchState.pending].includes(requestPhase)
            ? groupTuples.map(([id, items, blockDataList]) => (
                <React.Fragment key={id}>
                  <ul className={cs(adviceListBlockStyles[adviceListBlockClassname], className)}>
                    <PageSection
                      blockRenderType={ComponentRenderType.listItem}
                      hiddenTabClassname={hiddenTabClassname}
                      onlyBlocks={true}
                      section={{
                        blocks: items,
                        id: `${id}-advice-list`,
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
                adviceListBlockStyles[adviceListBlockClassname],
                adviceListBlockStyles[`${adviceListBlockClassname}_load-more-button-wrapper`],
                className,
              )}
            >
              <Button
                buttonType={ButtonType.secondary}
                onClick={() => {
                  dispatch(fetchMoreAdvices({ sectionIdToSectionMap }));
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: t('block-advice-list.load-more') }} />
              </Button>
            </div>
          ) : null}
        </>
      ) : (
        <>
          {requestPhase === AdvicesFetchState.fulfilled ? (
            <div
              className={cs(
                adviceListBlockStyles[adviceListBlockClassname],
                adviceListBlockStyles[`${adviceListBlockClassname}_information-wrapper`],
                className,
              )}
            >
              <InformationBlock
                className={adviceListBlockStyles[`${adviceListBlockClassname}__information`]}
                description={t(`block-advice-list.empty-result-description_${emptyResultType}`)}
                title={t(`block-advice-list.empty-result-title_${emptyResultType}`)}
              />
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export { AdviceListBlock };
