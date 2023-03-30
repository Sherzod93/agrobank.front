import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { FilterItemData } from '../../../interfaces';
import { prepareVacancyData } from '../../../interfaces/classes/helpers';
import { vacancyItems, vacancyRegions } from '../../../stories-data';
import { VacanciesListBlockContext } from '../../page-sections/contexts';
import templateStyles from '../bank-cell-rental-block/style.stories.module.scss';
import { VacancyItemBlock as VacancyItemBlockComponent } from './vacancy-item-block';

const vacanciesListBlockContextValue = {
  regionIdToRegionMap: vacancyRegions.reduce((result, item) => {
    result.set(item.id, item);

    return result;
  }, new Map<number, FilterItemData>()),
};

export default {
  title: 'Blocks/Vacancy Item Block',
  component: VacancyItemBlockComponent,
} as ComponentMeta<typeof VacancyItemBlockComponent>;

const VacancyItemBlock: ComponentStory<typeof VacancyItemBlockComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => {
  return (
    <Router>
      <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
        <div
          className={cs(
            templateStyles.template,
            templateStyles[`template_base-background-color_${baseBackgroundColor}`],
          )}
        >
          <div className={templateStyles['template__layout']}>
            <VacanciesListBlockContext.Provider value={vacanciesListBlockContextValue}>
              <VacancyItemBlockComponent
                {...props}
                vacancyItem={{
                  ...props.vacancyItem,
                  items: props.vacancyItem.items.map(prepareVacancyData),
                }}
              />
            </VacanciesListBlockContext.Provider>
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

VacancyItemBlock.args = {
  vacancyItem: vacancyItems[6],
};

export { VacancyItemBlock };
