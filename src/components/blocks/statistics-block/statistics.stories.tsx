import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import { statistics } from '../../../stories-data';
import { StatisticsBlock as StatisticsBlockComponent } from './statistics-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Statistics Block',
  component: StatisticsBlockComponent,
} as ComponentMeta<typeof StatisticsBlockComponent>;

const StatisticsBlock: ComponentStory<typeof StatisticsBlockComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => (
  <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
    <div
      className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
    >
      <div className={templateStyles['template__layout']}>
        <StatisticsBlockComponent {...props} />
      </div>
    </div>
  </BaseBackgroundColorContext.Provider>
);

StatisticsBlock.args = statistics;

export { StatisticsBlock };
