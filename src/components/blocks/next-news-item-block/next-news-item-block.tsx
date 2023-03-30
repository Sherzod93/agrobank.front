import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AbstractBlockProps, ComponentRenderType, ExtendedNewsItemData } from '../../../interfaces';
import { NewsItemBlock } from '../news-item-block/news-item-block';
import nextNewsItemBlockStyles from './style.module.scss';

const nextNewsItemBlockClassname = 'next-news-item-block';

export interface NextNewsItemBlockProps extends AbstractBlockProps {
  newsItem: ExtendedNewsItemData;
}

const NextNewsItemBlock: FC<NextNewsItemBlockProps> = ({ className, newsItem }) => {
  const {
    i18n: { t },
  } = useTranslation();

  return (
    <div className={cs(nextNewsItemBlockStyles[nextNewsItemBlockClassname], className)}>
      <div
        className={nextNewsItemBlockStyles[`${nextNewsItemBlockClassname}__title`]}
        dangerouslySetInnerHTML={{ __html: t('block-next-news-item.next') }}
      />
      <NewsItemBlock
        className={nextNewsItemBlockStyles[`${nextNewsItemBlockClassname}__next-news-item`]}
        blockRenderType={ComponentRenderType.default}
        newsItem={newsItem}
      />
    </div>
  );
};

export { NextNewsItemBlock };
