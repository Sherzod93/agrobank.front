import cs from 'classnames';
import React, { FC } from 'react';
import { useBaseBackgroundColor } from '../../../contexts';
import { WithClassNameComponentProps } from '../../../interfaces';
import { Icon, IconCode } from '../icon/icon';
import paginationStyles from './style.module.scss';

const paginationClassname = 'pagination';

interface PaginationItem {
  title?: string;
}

interface PaginationProps {
  activeIx: number;
  handleItemActivation?: (index: number) => void;
  items: PaginationItem[];
}

const Pagination: FC<PaginationProps & WithClassNameComponentProps> = ({
  activeIx,
  className,
  handleItemActivation,
  items,
}) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();

  if (items.length === 0) {
    return null;
  }

  return (
    <ul
      className={cs(
        paginationStyles[paginationClassname],
        paginationStyles[`${paginationClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      {items.map(({ title }, index) => {
        const isActive = index === activeIx;
        const iconCode = isActive ? IconCode.paginationIconSolid : IconCode.paginationIconBorder;

        return (
          <li
            key={index}
            className={cs(paginationStyles[`${paginationClassname}__item`], {
              [paginationStyles[`${paginationClassname}__item_active`]]: isActive,
            })}
          >
            <button
              aria-label={title}
              aria-pressed={isActive}
              className={paginationStyles[`${paginationClassname}__button`]}
              onClick={() => handleItemActivation && handleItemActivation(index)}
            >
              <Icon className={paginationStyles[`${paginationClassname}__icon`]} code={iconCode} />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export { Pagination };
