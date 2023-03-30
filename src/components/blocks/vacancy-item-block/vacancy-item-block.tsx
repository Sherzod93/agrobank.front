import cs from 'classnames';
import React, { FC } from 'react';
import { AbstractBlockProps, ComponentRenderType } from '../../../interfaces';
import { VacancyData } from '../../../interfaces/vacancy';
import { Vacancy } from './components';
import vacancyItemBlockStyles from './style.module.scss';

const vacanciesBlockClassname = 'vacancy-item-block';

export interface VacancyItemData {
  id: number;
  items: VacancyData[];
  title: string;
}

export interface VacancyItemBlockProps extends AbstractBlockProps {
  vacancyItem: VacancyItemData;
}

const VacancyItemBlock: FC<VacancyItemBlockProps> = ({ blockRenderType, className, vacancyItem }) => {
  const { items, title } = vacancyItem;
  const TagName = blockRenderType === ComponentRenderType.listItem ? 'li' : 'div';

  return (
    <TagName className={cs(vacancyItemBlockStyles[`${vacanciesBlockClassname}`], className)}>
      <h3
        className={cs(vacancyItemBlockStyles[`${vacanciesBlockClassname}__title`])}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      <ul className={cs(vacancyItemBlockStyles[`${vacanciesBlockClassname}__list`])}>
        {items.map((vacancy) => (
          <Vacancy
            key={vacancy.id}
            className={vacancyItemBlockStyles[`${vacanciesBlockClassname}__item`]}
            vacancy={vacancy}
          />
        ))}
      </ul>
    </TagName>
  );
};
export { VacancyItemBlock };
