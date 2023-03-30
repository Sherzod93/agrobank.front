import cs from 'classnames';
import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { AbstractBlockProps } from '../../../interfaces';
import { fetchSearchResult } from '../../../services/api';
import { fetchMoreSearchTags, SearchTagsFetchState, setSearchTagsLanguage } from '../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { Button, ButtonSize } from '../../units/controls/button/button';
import { Icon, IconCode } from '../../units/icon/icon';
import { Tag, TagDomElement } from '../../units/tag/tag';
import { TagsAndButtons } from '../../units/tags-and-buttons/tags-and-buttons';
import { SearchResultList, SearchResultListData } from './components/search-result-list/search-result-list';
import searchBlockStyles from './style.module.scss';

const searchBlockClassname = 'search-block';

export interface SearchBlockProps extends AbstractBlockProps {}

const SearchBlock: FC<SearchBlockProps> = ({ className }) => {
  const {
    i18n: { language, t },
  } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { hasMore: hasMoreTags, items: searchTags, requestPhase } = useAppSelector((state) => state.searchTags);

  const dispatch = useAppDispatch();

  const inputElementRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>('');
  const [searchData, setSearchData] = useState<SearchResultListData[]>([]);
  const [resultCount, setResultCount] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(
      setSearchTagsLanguage({
        language,
      }),
    );
  }, [dispatch, language]);

  useEffect(() => {
    if (requestPhase === SearchTagsFetchState.initial) {
      dispatch(fetchMoreSearchTags());
    }
  }, [dispatch, requestPhase]);

  const search = (query: string) => {
    setIsLoading(true);

    fetchSearchResult(query).then((data) => {
      setIsLoading(false);
      setResultCount(
        data.reduce((counter: number, item: SearchResultListData) => counter + (item?.nav.totalItems || 0), 0),
      );

      setSearchData(data);
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    searchParams.set('query', query);
    setSearchParams(searchParams, { replace: true });
  };

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim();

    setQuery(query);
  };

  const handleReset = () => {
    setQuery('');
    if (inputElementRef.current) {
      inputElementRef.current.focus();
      inputElementRef.current.value = '';
    }
    searchParams.delete('query');
    setSearchParams(searchParams, { replace: true });
    setResultCount(null);
    setSearchData([]);
  };

  const searchByTag = (value: string) => {
    const trimmedValue = value.trim();
    const query = trimmedValue && trimmedValue[0].toUpperCase() + trimmedValue.slice(1);

    searchParams.set('query', query);
    setSearchParams(searchParams, { replace: true });
  };

  const initQueryParams = useCallback(() => {
    const queryParam = searchParams.get('query');

    const query = queryParam?.trim() || '';
    setQuery(query);

    if (inputElementRef.current) {
      inputElementRef.current.value = query;
    }

    if (query) {
      search(query);
    } else {
      setResultCount(null);
      setSearchData([]);
    }
  }, [searchParams]);

  // при загрузке страницы: устанавливаем значение инпута, производим поиск
  useEffect(initQueryParams, [initQueryParams]);

  // todo: за это должен отвечать reducer
  const loadMore = (mapCode: string, page: number, pageSize: number) => {
    fetchSearchResult(query, { mapCode, page, pageSize }).then((data) => {
      const result = [...searchData];

      const index = result.findIndex((item) => item.code === mapCode);
      result[index].nav = data[0].nav;
      result[index].items = [...result[index].items, ...data[0].items];

      setSearchData(result);
    });
  };

  return (
    <div className={cs(searchBlockStyles[`${searchBlockClassname}`], className)}>
      <form
        className={cs(searchBlockStyles[`${searchBlockClassname}`], searchBlockStyles[`${searchBlockClassname}__form`])}
        onSubmit={handleSubmit}
      >
        <label className={cs(searchBlockStyles[`${searchBlockClassname}__label`])}>
          <input
            className={cs(searchBlockStyles[`${searchBlockClassname}__search-input`])}
            disabled={isLoading}
            onChange={handleChange}
            placeholder={t('search.placeholder')}
            ref={inputElementRef}
            type="text"
          />
          <Icon
            code={IconCode.magnifyingGlass}
            className={searchBlockStyles[`${searchBlockClassname}__magnifying-glass`]}
          />
        </label>
        {query.length > 0 && (
          <React.Fragment>
            <Button
              className={searchBlockStyles[`${searchBlockClassname}__submit`]}
              disabled={isLoading}
              size={ButtonSize.small}
              type="submit"
            >
              {t('search.search')}
            </Button>

            <button
              className={searchBlockStyles[`${searchBlockClassname}__reset`]}
              disabled={isLoading}
              onClick={handleReset}
              type="reset"
            >
              <Icon code={IconCode.clearCross} className={searchBlockStyles[`${searchBlockClassname}__clear-cross`]} />
            </button>
          </React.Fragment>
        )}
      </form>

      {resultCount === 0 && (
        <div
          className={cs(searchBlockStyles[`${searchBlockClassname}__result_empty`], 'h4')}
          dangerouslySetInnerHTML={{ __html: t('search.empty-result') }}
        />
      )}

      {resultCount != null && resultCount > 0 && (
        <React.Fragment>
          <div
            className={searchBlockStyles[`${searchBlockClassname}__result_count`]}
            dangerouslySetInnerHTML={{
              __html: [
                t('search.before-count', { count: resultCount }),
                resultCount,
                t('search.after-count', { count: resultCount }),
              ]
                .filter((el) => el.toString() !== '')
                .join(' '),
            }}
          />

          {searchData
            .filter((data) => !!data.items?.length)
            .map((data) => (
              <SearchResultList
                key={data.code}
                className={cs(searchBlockStyles[`${searchBlockClassname}__result`])}
                data={data}
                onLoadMore={loadMore}
              />
            ))}
        </React.Fragment>
      )}

      {!resultCount && (
        <TagsAndButtons className={searchBlockStyles[`${searchBlockClassname}__tags-and-buttons`]}>
          {searchTags.map((tag, index) => (
            <Tag
              key={index}
              className={searchBlockStyles[`${searchBlockClassname}__tag`]}
              title={tag.value}
              tagDomElement={TagDomElement.button}
              onClick={() => searchByTag(tag.value!)}
            />
          ))}
          {hasMoreTags && (
            <Button
              onClick={() => dispatch(fetchMoreSearchTags())}
              className={searchBlockStyles[`${searchBlockClassname}__button`]}
            >
              {t('global.more')}
            </Button>
          )}
        </TagsAndButtons>
      )}
    </div>
  );
};

export { SearchBlock };
