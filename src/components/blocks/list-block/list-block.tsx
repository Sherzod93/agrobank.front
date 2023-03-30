import cs from 'classnames';
import { FC } from 'react';
import { AbstractBlockProps, BlockWithItemsComponentProps } from '../../../interfaces';
import { Icon, IconCode } from '../../units/icon/icon';
import listBlockStyles from './style.module.scss';

const listBlockClassname = 'list-block';

export enum ListType {
  ordered = 'ordered',
  unordered = 'unordered',
}

export interface ListBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<string> {
  listType: ListType;
  startFrom?: number;
}

const ListBlock: FC<ListBlockProps> = ({ className, items, startFrom = 1, listType }) => {
  const ListTag = listType === ListType.unordered ? 'ul' : 'ol';

  return (
    <ListTag
      className={cs(
        listBlockStyles[listBlockClassname],
        listBlockStyles[`${listBlockClassname}_${listType}`],
        className,
      )}
    >
      {items.map((text, index) => (
        <li key={index} className={listBlockStyles[`${listBlockClassname}__item`]}>
          <div className={listBlockStyles[`${listBlockClassname}__bullet-wrapper`]}>
            <span className={listBlockStyles[`${listBlockClassname}__bullet-placeholder`]}>&nbsp;</span>
            <Icon
              className={listBlockStyles[`${listBlockClassname}__bullet`]}
              code={listType === ListType.unordered ? IconCode.unorderedListBullet : IconCode.orderedListBullet}
            />
            {listType === ListType.ordered ? (
              <span className={listBlockStyles[`${listBlockClassname}__number`]}>{startFrom + index}</span>
            ) : null}
          </div>
          <div className={listBlockStyles[`${listBlockClassname}__text`]} dangerouslySetInnerHTML={{ __html: text }} />
        </li>
      ))}
    </ListTag>
  );
};

export { ListBlock };
