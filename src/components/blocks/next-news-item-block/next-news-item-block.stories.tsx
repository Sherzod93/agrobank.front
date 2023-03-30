import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { extendedNews } from '../../../stories-data';
import '../../../styles/index.scss';
import { NextNewsItemBlock as NextNewsItemBlockComponent } from './next-news-item-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Next News Item Block',
  component: NextNewsItemBlockComponent,
} as ComponentMeta<typeof NextNewsItemBlockComponent>;

const NextNewsItemBlock: ComponentStory<typeof NextNewsItemBlockComponent> = (
  { ...args },
  { globals: { baseBackgroundColor } },
) => (
  <Router>
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <div className={templateStyles['template__layout']}>
          <NextNewsItemBlockComponent {...args} />
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  </Router>
);

NextNewsItemBlock.args = {
  newsItem: extendedNews[1],
};

export { NextNewsItemBlock };
