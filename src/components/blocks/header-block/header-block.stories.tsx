import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { PageSectionTitleAlignment, PageSectionTitleSize } from '../../../interfaces';
import { store } from '../../../services/store';
import { HeaderBlock as HeaderBlockComponent } from './header-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Header Block',
  component: HeaderBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Router>
          <Story />
        </Router>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof HeaderBlockComponent>;

const HeaderBlock: ComponentStory<typeof HeaderBlockComponent> = (props, { globals: { baseBackgroundColor } }) => {
  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <div className={templateStyles['template__layout']}>
          <HeaderBlockComponent {...props} />
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

HeaderBlock.args = {
  title: 'Заголовок секции',
  titleAlignment: PageSectionTitleAlignment.center,
  titleSize: PageSectionTitleSize.medium,
};

export { HeaderBlock };
