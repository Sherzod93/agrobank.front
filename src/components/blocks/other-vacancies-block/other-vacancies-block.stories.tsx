import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { prepareVacancyData } from '../../../interfaces/classes/helpers';
import { vacancies, vacancyRegions } from '../../../stories-data';
import { OtherVacanciesBlock as OtherVacanciesBlockComponent } from './other-vacancies-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Other Vacancies Block',
  component: OtherVacanciesBlockComponent,
} as ComponentMeta<typeof OtherVacanciesBlockComponent>;

const OtherVacanciesBlock: ComponentStory<typeof OtherVacanciesBlockComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => {
  return (
    <Router>
      <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
        <div
          className={cs(
            templateStyles['template'],
            templateStyles[`template_base-background-color_${baseBackgroundColor}`],
          )}
        >
          <div className={templateStyles['template__layout']}>
            <OtherVacanciesBlockComponent {...props} items={props.items.map(prepareVacancyData)} />
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

OtherVacanciesBlock.args = {
  items: vacancies,
  regions: vacancyRegions,
};

export { OtherVacanciesBlock };
