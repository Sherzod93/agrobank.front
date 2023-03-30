import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseBackgroundColorContext } from '../../../contexts';
import { AbstractBlockProps, BaseBackgroundColor, BlockWithItemsComponentProps } from '../../../interfaces';
import { Link } from '../../units/link/link';
import { Tag, TagSize } from '../../units/tag/tag';
import { declOfNum } from '../calculator-block/helpers';
import tilesListBlockStyles from './style.module.scss';

const tilesListBlockClassname = 'tiles-list-block';

export interface TileItem {
  code: string;
  count: number;
  id: number;
  title: string;
  url: string;
}

export interface TilesListBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<TileItem> {
  entityType: string;
  total: {
    sectionCount: number;
    itemCount: number;
    url: string;
  };
}

const TilesListBlock: FC<TilesListBlockProps> = ({ className, entityType, items, total }) => {
  const {
    i18n: { t },
  } = useTranslation();
  const isAllWordHidden = total.itemCount < 3 || (total.itemCount > 20 && total.itemCount % 10 === 1);

  return (
    <ul className={cs(tilesListBlockStyles[tilesListBlockClassname], className)}>
      <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor: BaseBackgroundColor.default }}>
        {items.map(({ count: itemCount, id: itemId, title: itemTitle, url: itemUrl }) => (
          <li key={itemId} className={tilesListBlockStyles[`${tilesListBlockClassname}__item`]}>
            <div className={tilesListBlockStyles[`${tilesListBlockClassname}__align-wrap`]}>
              <Link className={tilesListBlockStyles[`${tilesListBlockClassname}__link`]} to={itemUrl}>
                <div
                  className={tilesListBlockStyles[`${tilesListBlockClassname}__title`]}
                  dangerouslySetInnerHTML={{ __html: itemTitle }}
                />
                <Tag
                  title={`${itemCount} ${t(`block-tiles-list.item_${entityType}`, { count: itemCount })}`}
                  size={TagSize.small}
                />
              </Link>
            </div>
          </li>
        ))}
      </BaseBackgroundColorContext.Provider>
      <li className={tilesListBlockStyles[`${tilesListBlockClassname}__item`]}>
        <div className={tilesListBlockStyles[`${tilesListBlockClassname}__align-wrap`]}>
          <Link className={tilesListBlockStyles[`${tilesListBlockClassname}__link`]} to={total.url}>
            <div
              className={tilesListBlockStyles[`${tilesListBlockClassname}__total-title`]}
              dangerouslySetInnerHTML={{
                __html: `${!isAllWordHidden ? t('block-tiles-list.all') : ''} ${total.itemCount} ${t(
                  `block-tiles-list.item_${entityType}_${declOfNum(total.itemCount)}`,
                )}<br/>${t('block-tiles-list.in') ? t('block-tiles-list.in') + '&nbsp;' : ''}${
                  total.sectionCount
                }&nbsp;${t(`block-tiles-list.section_${entityType}_p_${declOfNum(total.sectionCount)}`)}`,
              }}
            />
          </Link>
        </div>
      </li>
    </ul>
  );
};

export { TilesListBlock };
