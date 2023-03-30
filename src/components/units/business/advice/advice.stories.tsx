import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../../contexts';
import { store } from '../../../../services/store';
import { extendedAdvices } from '../../../../stories-data';
import { Advice as AdviceComponent } from './advice';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Components/Advice',
  component: AdviceComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof AdviceComponent>;

const Advice: ComponentStory<typeof AdviceComponent> = (props, { globals: { baseBackgroundColor } }) => {
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
            <AdviceComponent {...props} />
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

Advice.args = {
  item: extendedAdvices[0],
};

export { Advice };
