import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { store } from '../../../services/store';
import { extendedAdvices } from '../../../stories-data';
import { AdviceItemBlock as AdviceItemBlockComponent } from './advice-item-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Advice Item Block',
  component: AdviceItemBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof AdviceItemBlockComponent>;

const AdviceItemBlock: ComponentStory<typeof AdviceItemBlockComponent> = (
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
            <AdviceItemBlockComponent {...props} />
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

AdviceItemBlock.args = {
  items: extendedAdvices,
};

export { AdviceItemBlock };
