import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { prepareProductData } from '../../../interfaces/classes/helpers';
import { store } from '../../../services/store';
import { products } from '../../../stories-data';
import '../../../styles/index.scss';
import { ProductBannerBlock as ProductBannerBlockComponent } from './product-banner-block';

export default {
  title: 'Blocks/Product Banner Block',
  component: ProductBannerBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof ProductBannerBlockComponent>;

const ProductBannerBlock: ComponentStory<typeof ProductBannerBlockComponent> = (props) => {
  return (
    <Router>
      <ProductBannerBlockComponent {...props} product={prepareProductData(props.product!)} />
    </Router>
  );
};

ProductBannerBlock.args = {
  buttonTitle: 'Открыть вклад',
  product: products[3],
  title: 'Вклад «{0}» поможет увидеть мир',
};

export { ProductBannerBlock };
