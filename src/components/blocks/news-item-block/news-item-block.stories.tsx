import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { ComponentRenderType } from '../../../interfaces';
import { extendedNews } from '../../../stories-data';
import '../../../styles/index.scss';
import { NewsItemBlock as NewsItemBlockComponent } from './news-item-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/News Item Block',
  component: NewsItemBlockComponent,
} as ComponentMeta<typeof NewsItemBlockComponent>;

const NewsItemBlock: ComponentStory<typeof NewsItemBlockComponent> = (
  { newsItem, ...args },
  { globals: { baseBackgroundColor } },
) => (
  <Router>
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <div className={templateStyles['template__layout']}>
          {newsItem ? (
            <NewsItemBlockComponent newsItem={newsItem} {...args} blockRenderType={ComponentRenderType.default} />
          ) : (
            <ul className={templateStyles['template__list']}>
              {extendedNews.map((newsItem) => (
                <NewsItemBlockComponent key={newsItem.id} newsItem={newsItem} {...args} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  </Router>
);

NewsItemBlock.args = {};

export { NewsItemBlock };
