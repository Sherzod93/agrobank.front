import cs from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { buildFilterItemIdToFilterItemMap } from '../../../helpers';
import {
  AbstractBlockProps,
  ComponentRenderType,
  EmptyResultType,
  FilterData,
  NewsListSourceType,
  PageSectionTitleAlignment,
  PageSectionTitleSize,
} from '../../../interfaces';
import { AbstractBlockData, NewsItemBlockData } from '../../../interfaces/classes/blocks';
import { fetchMoreNews, NewsFetchState, setNewsFilters, setNewsLanguage } from '../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import PageSection from '../../page-sections/page-section/page-section';
import { Button, ButtonType } from '../../units/controls/button/button';
import { Filters } from '../../units/filters/filters';
import { generateGroupTuples } from '../helpers';
import { InformationBlock } from '../information-block/information-block';
import newsListBlockStyles from './style.module.scss';

export const newsListBlockClassname = 'news-list-block';

export interface NewsListBlockProps extends AbstractBlockProps {
  filters: FilterData[];
  sourceType?: NewsListSourceType;
}

const NewsListBlock: FC<NewsListBlockProps> = ({
  className,
  filters: filtersFromBlock,
  hiddenTabClassname,
  nestedBlocks = [],
  sourceType = NewsListSourceType.common,
}) => {
  const {
    i18n: { language, t },
  } = useTranslation();
  const filterRef = useRef<Record<string, any>>();
  const {
    filters: filtersFromState,
    newsItemsBlocks,
    hasMore,
    requestPhase,
    promotedNewsItemBlock,
  } = useAppSelector((state) => state.news);
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
      setNewsLanguage({
        language,
        sectionIdToSectionMap,
        sourceType,
      }),
    );
  }, [dispatch, language, sectionIdToSectionMap, sourceType]);

  useEffect(() => {
    if (requestPhase === NewsFetchState.initial) {
      dispatch(fetchMoreNews({ sectionIdToSectionMap, sourceType }));
    }
  }, [dispatch, requestPhase, sectionIdToSectionMap, sourceType]);

  const groupTuples: [string, NewsItemBlockData[], AbstractBlockData[]][] = useMemo(() => {
    const filtersValues = Object.values(filtersFromState);
    const withNestedBlocks =
      filtersValues.every((value) => value == null) && (nestedBlocks?.length > 0 || promotedNewsItemBlock);
    const idPrefix = filtersValues.join('-');

    if (withNestedBlocks) {
      const nestedBlocksCopy = [...nestedBlocks];

      if (promotedNewsItemBlock) {
        nestedBlocksCopy.unshift(promotedNewsItemBlock);
      }

      return generateGroupTuples<NewsItemBlockData>(newsItemsBlocks, nestedBlocksCopy, [2], idPrefix);
    } else {
      const id = `${idPrefix}-${newsItemsBlocks[0]?.id ?? null}`;

      return [[id, newsItemsBlocks, []]];
    }
  }, [filtersFromState, newsItemsBlocks, nestedBlocks, promotedNewsItemBlock]);

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
        filterRef.current = Object.assign({}, filterRef.current, {
          [filterCode]: filterOptionId,
        });

        dispatch(
          setNewsFilters({
            filters: filterRef.current,
            sectionIdToSectionMap,
            sourceType,
          }),
        );
      }
    },
    [dispatch, filtersFromState, sectionIdToSectionMap, sourceType],
  );

  return (
    <>
      <Filters
        className={cs(
          newsListBlockStyles[newsListBlockClassname],
          newsListBlockStyles[`${newsListBlockClassname}_filters-wrapper`],
          {
            [newsListBlockStyles[`${newsListBlockClassname}_hidden`]]:
              emptyResultType === EmptyResultType.withoutFilters,
          },
          className,
        )}
        lexemePrefix="news-list-block"
        filters={filters}
        onChange={filtersChangeHandler}
      />
      {emptyResultType === null ? (
        <>
          {[NewsFetchState.fulfilled, NewsFetchState.pending].includes(requestPhase)
            ? groupTuples.map(([id, items, blockDataList]) => (
                <React.Fragment key={id}>
                  <ul className={cs(newsListBlockStyles[newsListBlockClassname], className)}>
                    <PageSection
                      blockRenderType={ComponentRenderType.listItem}
                      hiddenTabClassname={hiddenTabClassname}
                      onlyBlocks={true}
                      section={{
                        blocks: items,
                        id: `${id}-news-list`,
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
                newsListBlockStyles[newsListBlockClassname],
                newsListBlockStyles[`${newsListBlockClassname}_load-more-button-wrapper`],
                className,
              )}
            >
              <Button
                buttonType={ButtonType.secondary}
                onClick={() => {
                  dispatch(fetchMoreNews({ sectionIdToSectionMap, sourceType }));
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: t('block-news-list.load-more') }} />
              </Button>
            </div>
          ) : null}
        </>
      ) : (
        <>
          {requestPhase === NewsFetchState.fulfilled ? (
            <div
              className={cs(
                newsListBlockStyles[newsListBlockClassname],
                newsListBlockStyles[`${newsListBlockClassname}_information-wrapper`],
                className,
              )}
            >
              <InformationBlock
                className={newsListBlockStyles[`${newsListBlockClassname}__information`]}
                description={t(`block-news-list.empty-result-description_${emptyResultType}`)}
                title={t(`block-news-list.empty-result-title_${emptyResultType}`)}
              />
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export { NewsListBlock };
