import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AbstractBlockProps } from '../../../../../interfaces';
import { Button } from '../../../../units/controls/button/button';
import { SearchResultItem, SearchResultItemData } from '../search-result-item/search-result-item';
import searchResultListStyles from './style.module.scss';

const searchResultListClassname = 'search-result-list';

export interface SearchResultNavigation {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
  isLastPage: boolean;
}

export interface SearchResultListData extends AbstractBlockProps {
  code: string;
  items: SearchResultItemData[];
  nav: SearchResultNavigation;
}

export interface SearchResultListProps extends AbstractBlockProps {
  data: SearchResultListData;
  onLoadMore: Function;
}

const SearchResultList: FC<SearchResultListProps> = ({ className, data, onLoadMore }) => {
  const {
    i18n: { t },
  } = useTranslation();

  return (
    <div className={cs(searchResultListStyles[`${searchResultListClassname}`], className)}>
      <div
        className={cs(searchResultListStyles[`${searchResultListClassname}__title`])}
        dangerouslySetInnerHTML={{ __html: t(`search.${data.code}`) }}
      />
      <ul className={cs(searchResultListStyles[`${searchResultListClassname}__list`])}>
        {data.items.map((item: SearchResultItemData) => {
          return (
            <SearchResultItem
              key={item.id}
              className={cs(searchResultListStyles[`${searchResultListClassname}__item`])}
              item={item}
            />
          );
        })}
      </ul>

      {!data.nav.isLastPage && (
        <div className={cs(searchResultListStyles[`${searchResultListClassname}__load-more_wrapper`])}>
          <Button
            onClick={() => onLoadMore(data.code, data.nav.currentPage + 1, data.nav.pageSize)}
            className={cs(searchResultListStyles[`${searchResultListClassname}__load-more`])}
          >
            {t('search.load-more')}
          </Button>
        </div>
      )}
    </div>
  );
};

export { SearchResultList };
