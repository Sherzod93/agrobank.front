import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../../../contexts';
import { prepareProductData } from '../../../../../interfaces/classes/helpers';
import { store } from '../../../../../services/store';
import { products } from '../../../../../stories-data';
import { ProductOffer as ProductOfferComponent } from './product-offer';

export default {
  title: 'Blocks/Product Offers Block/Product Offer',
  component: ProductOfferComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof ProductOfferComponent>;

const ProductOffer: ComponentStory<typeof ProductOfferComponent> = (props, { globals: { baseBackgroundColor } }) => {
  return (
    <Router>
      <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
        <ProductOfferComponent {...props} product={prepareProductData(props.product)} />
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

ProductOffer.args = {
  product: products[0],
  title: 'Вклад «{0}» соберет на учебу детям',
};

export { ProductOffer };
