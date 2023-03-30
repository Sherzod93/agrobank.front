import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { prepareProductData } from '../../../interfaces/classes/helpers';
import { store } from '../../../services/store';
import { products } from '../../../stories-data';
import { ProductOffersBlock as ProductOffersBlockComponent } from './product-offers-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Product Offers Block',
  component: ProductOffersBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof ProductOffersBlockComponent>;

const ProductOffersBlock: ComponentStory<typeof ProductOffersBlockComponent> = (
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
            <ProductOffersBlockComponent
              {...props}
              items={props.items.map((item) => ({
                ...item,
                product: prepareProductData(item.product),
              }))}
            />
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

ProductOffersBlock.args = {
  items: products.map((product) => ({
    product,
    title: 'Вклад «{0}» соберет на учебу детям',
  })),
};

export { ProductOffersBlock };
