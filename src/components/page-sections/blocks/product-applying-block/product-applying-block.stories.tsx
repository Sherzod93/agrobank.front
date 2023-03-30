import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../../contexts';
import { store } from '../../../../services/store';
import { products } from '../../../../stories-data';
import { ProductApplyingBlock as ProductApplyingBlockComponent } from './product-applying-block';

export default {
  title: 'Blocks/Product Applying Block',
  component: ProductApplyingBlockComponent,
} as ComponentMeta<typeof ProductApplyingBlockComponent>;

const ProductApplyingBlock: ComponentStory<typeof ProductApplyingBlockComponent> = (
  { ...args },
  { globals: { baseBackgroundColor } },
) => {
  return (
    <Provider store={store}>
      <Router>
        <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
          <ProductApplyingBlockComponent {...args} />
        </BaseBackgroundColorContext.Provider>
      </Router>
    </Provider>
  );
};

ProductApplyingBlock.args = {
  product: products[1],
};

export { ProductApplyingBlock };
