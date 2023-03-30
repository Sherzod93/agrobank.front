import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { store } from '../../../services/store';
import { SearchBlock as SearchBlockComponent } from './search-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Search/Search Block',
  component: SearchBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Router>
          <Story />
        </Router>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof SearchBlockComponent>;

const SearchBlock: ComponentStory<typeof SearchBlockComponent> = (
  { ...args },
  { globals: { baseBackgroundColor } },
) => (
  <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
    <div
      className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
    >
      <div className={templateStyles['template__layout']}>
        <SearchBlockComponent {...args} />
      </div>
    </div>
  </BaseBackgroundColorContext.Provider>
);

SearchBlock.args = {};

export { SearchBlock };
