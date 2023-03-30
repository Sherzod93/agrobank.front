import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDateDetail } from '../../../helpers';
import { AbstractBlockProps, BlockWithItemsComponentProps, NewsItemData } from '../../../interfaces';
import { StyledLink } from '../../units/styled-link/styled-link';
import newsBlockStyles from './style.module.scss';

const newsBlockClassname = 'news-block';

export interface NewsBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<NewsItemData> {}

const NewsBlock: FC<NewsBlockProps> = ({ items, className }) => {
  const {
    i18n: { language, t },
  } = useTranslation();

  return (
    <ul className={cs(newsBlockStyles[`${newsBlockClassname}`], className)}>
      {items.map(({ date: itemDate, id: itemId, title: itemTitle, url: itemUrl }) => (
        <li key={itemId} className={newsBlockStyles[`${newsBlockClassname}__item`]}>
          <div
            className={newsBlockStyles[`${newsBlockClassname}__date`]}
            dangerouslySetInnerHTML={{ __html: formatDateDetail(new Date(itemDate), language, t) }}
          />
          <StyledLink
            className={newsBlockStyles[`${newsBlockClassname}__title`]}
            dangerouslySetInnerHTML={{ __html: itemTitle }}
            to={itemUrl}
          />
        </li>
      ))}
    </ul>
  );
};

export { NewsBlock };
