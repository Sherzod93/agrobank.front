import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { BlockType, ProductData, ProductType } from '../../../interfaces';
import { ProductListBlockData } from '../../../interfaces/classes/blocks';
import { store } from '../../../services/store';
import { products, productsCategories } from '../../../stories-data';
import { ProductListBlock as ProductListBlockComponent } from './product-list-block';
import templateStyles from './style.stories.module.scss';

const productTypeToProductDataListMap = [
  ProductType.card,
  ProductType.loan,
  ProductType.deposit,
  ProductType.remittance,
].reduce((result, projectType) => {
  result[projectType] = products.filter(({ type }) => type === projectType);

  return result;
}, {} as Record<ProductType, ProductData[]>);

export default {
  argTypes: {
    products: {
      control: { type: 'select' },
      defaultValue: Object.keys(productTypeToProductDataListMap)[0],
      options: Object.keys(productTypeToProductDataListMap),
      mapping: productTypeToProductDataListMap,
    },
  },
  title: 'Blocks/Product List Block',
  component: ProductListBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof ProductListBlockComponent>;

const ProductListBlock: ComponentStory<typeof ProductListBlockComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => {
  const { categories, products: items } = props as any;

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
            <ProductListBlockComponent
              {...new ProductListBlockData({
                content: {
                  buttonTitle: props.buttonTitle,
                  items,
                  categories,
                  defaultCountries: ['UZB', '000'],
                },
                type: BlockType.productList,
              })}
              tabsClassname={templateStyles.tabs}
            />
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

ProductListBlock.args = {
  categories: productsCategories,
};

export { ProductListBlock };
