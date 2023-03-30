import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../../../contexts';
import { ProductData, ProductType } from '../../../../../interfaces';
import { prepareProductData } from '../../../../../interfaces/classes/helpers';
import { store } from '../../../../../services/store';
import { products } from '../../../../../stories-data';
import '../../../../../styles/index.scss';
import { ProductListItem as ProductListItemComponent } from './product-list-item';
import templateStyles from './style.stories.module.scss';

const productTypeToProductDataMap = [ProductType.card, ProductType.loan, ProductType.deposit].reduce(
  (result, projectType) => {
    const product = products.find(({ type }) => type === projectType);

    if (product) {
      result[projectType] = product;
    }

    return result;
  },
  {} as Record<ProductType, ProductData>,
);

export default {
  argTypes: {
    product: {
      control: { type: 'select' },
      defaultValue: ProductType.card,
      options: Object.keys(productTypeToProductDataMap),
      mapping: productTypeToProductDataMap,
    },
  },
  title: 'Blocks/Product List Block/Product List Item',
  component: ProductListItemComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof ProductListItemComponent>;

export const ProductListItem: ComponentStory<typeof ProductListItemComponent> = (
  { buttonTitle, product },
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
          {product ? (
            <>
              <ProductListItemComponent
                buttonTitle={buttonTitle}
                product={{ ...prepareProductData(product), promoted: true }}
              />
              <br />
              <ProductListItemComponent
                buttonTitle={buttonTitle}
                product={{ ...prepareProductData(product), promoted: false }}
              />
            </>
          ) : null}
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};
