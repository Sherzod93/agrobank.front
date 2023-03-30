import cs from 'classnames';
import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../../contexts';
import { WithClassNameComponentProps } from '../../../interfaces';
import { fetchMoreSearchTags, SearchTagsFetchState, setSearchTagsLanguage } from '../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { Button, ButtonSize } from '../controls/button/button';
import { Icon, IconCode } from '../icon/icon';
import { Tag, TagSize } from '../tag/tag';
import { TagsAndButtons } from '../tags-and-buttons/tags-and-buttons';
import searchStyles from './style.module.scss';

const searchClassname = 'search';

interface SearchProps {
  query?: string;
}

const Search: FC<SearchProps & WithClassNameComponentProps> = ({ className, query: queryFromProps = '' }) => {
  const {
    i18n: { language, t },
  } = useTranslation();

  const { items: searchTagsItems, requestPhase: searchTagsRequestPhase } = useAppSelector((state) => state.searchTags);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModalContext();
  const inputElementRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(queryFromProps);

  const clearSearchForm = () => {
    inputElementRef.current?.focus();
    setQuery('');
  };

  const goLink = (language: string, value: string) => {
    const searchParams = new URLSearchParams();

    searchParams.set('query', value);

    navigate({
      pathname: `/${language}/search`,
      search: String(searchParams),
    });
    closeModal();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    goLink(language, query);
  };

  const handleTagClick = (value: string) => {
    goLink(language, value);
  };

  useEffect(() => {
    dispatch(
      setSearchTagsLanguage({
        language,
      }),
    );
  }, [dispatch, language]);

  useEffect(() => {
    if (searchTagsRequestPhase === SearchTagsFetchState.initial) {
      dispatch(fetchMoreSearchTags());
    }
  }, [dispatch, language, searchTagsRequestPhase]);

  return (
    <div
      className={cs(
        searchStyles[searchClassname],
        {
          [searchStyles[`${searchClassname}_is-focused`]]: isFocused,
        },
        className,
      )}
    >
      <form onSubmit={handleSubmit}>
        <div className={searchStyles[`${searchClassname}__container`]}>
          <div>
            <Icon className={searchStyles[`${searchClassname}__magnifying-glass`]} code={IconCode.magnifyingGlass} />
          </div>
          <input
            ref={inputElementRef}
            autoComplete="off"
            className={searchStyles[`${searchClassname}__input`]}
            name="query"
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() => {
              setIsFocused(false);
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            placeholder={t('search.placeholder')}
            type="text"
            value={query}
          />
          {query ? (
            <>
              <Button size={ButtonSize.xSmall}>
                <span dangerouslySetInnerHTML={{ __html: t('search.search') }} />
              </Button>
              <div onClick={clearSearchForm}>
                <Icon className={searchStyles[`${searchClassname}__clear-cross`]} code={IconCode.clearCross} />
              </div>
            </>
          ) : null}
        </div>
      </form>
      {searchTagsItems.length ? (
        <TagsAndButtons className={searchStyles[`${searchClassname}__tags-and-buttons`]}>
          {searchTagsItems.map((item, index) => (
            <Tag
              key={index}
              className={searchStyles[`${searchClassname}__tag`]}
              onClick={() => handleTagClick(item.value!)}
              size={TagSize.small}
              title={item.value}
            />
          ))}
        </TagsAndButtons>
      ) : null}
    </div>
  );
};

export { Search };
