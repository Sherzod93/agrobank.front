import cs from 'classnames';
import React, { FC } from 'react';
import { FilterData, WithClassNameComponentProps } from '../../../interfaces';
import { Filter } from './components';
import filtersStyles from './style.module.scss';

const filtersClassname = 'filters';

interface FiltersProps {
  filters: FilterData[];
  lexemePrefix?: string;
  onChange: (filterValue: { code: string; id: number | null }) => void;
}

const Filters: FC<FiltersProps & WithClassNameComponentProps> = ({ lexemePrefix, className, filters, onChange }) => {
  if (filters.length === 0) {
    return null;
  }

  return (
    <ul className={cs(filtersStyles[filtersClassname], className)}>
      {filters.map((filter) => (
        <Filter
          key={filter.code}
          className={filtersStyles[`${filtersClassname}__item`]}
          filter={filter}
          lexemePrefix={lexemePrefix}
          onChange={onChange}
        />
      ))}
    </ul>
  );
};

export { Filters };
