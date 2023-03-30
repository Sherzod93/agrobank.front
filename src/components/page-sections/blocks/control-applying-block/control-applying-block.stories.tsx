import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../../contexts';
import { store } from '../../../../services/store';
import { products } from '../../../../stories-data';
import { ControlApplyingBlock as ControlApplyingBlockComponent } from './control-applying-block';

export default {
  title: 'Blocks/Product Applying Block',
  component: ControlApplyingBlockComponent,
} as ComponentMeta<typeof ControlApplyingBlockComponent>;

const ControlApplyingBlock: ComponentStory<typeof ControlApplyingBlockComponent> = (
  { ...args },
  { globals: { baseBackgroundColor } },
) => {
  return (
    <Provider store={store}>
      <Router>
        <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
          <ControlApplyingBlockComponent {...args} />
        </BaseBackgroundColorContext.Provider>
      </Router>
    </Provider>
  );
};

ControlApplyingBlock.args = {
  product: products[1],
};

export { ControlApplyingBlock };
