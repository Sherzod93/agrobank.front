import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router';
import { BaseBackgroundColorContext } from '../../../contexts';
import { store } from '../../../services/store';
import { callCenter } from '../../../stories-data';
import { CallCenterBlock as CallCenterBlockComponent } from './call-center-block';

export default {
  title: 'Blocks/Call Center Block',
  component: CallCenterBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Router>
          <Story />
        </Router>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof CallCenterBlockComponent>;

const CallCenterBlock: ComponentStory<typeof CallCenterBlockComponent> = (
  { phone, productType, text, title },
  { globals: { baseBackgroundColor } },
) => {
  return (
    <BaseBackgroundColorContext.Provider value={baseBackgroundColor}>
      <CallCenterBlockComponent phone={phone} productType={productType} text={text} title={title} />
    </BaseBackgroundColorContext.Provider>
  );
};

CallCenterBlock.args = callCenter;

export { CallCenterBlock };
