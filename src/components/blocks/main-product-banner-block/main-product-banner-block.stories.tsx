import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router';
import { BaseBackgroundColorContext } from '../../../contexts';
import { ProductType } from '../../../interfaces';
import { prepareProductData } from '../../../interfaces/classes/helpers';
import { store } from '../../../services/store';
import { products } from '../../../stories-data';
import { MainProductBannerBlock as MainProductBannerBlockComponent } from './main-product-banner-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Main Product Banner Block',
  component: MainProductBannerBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof MainProductBannerBlockComponent>;

const MainProductBannerBlock: ComponentStory<typeof MainProductBannerBlockComponent> = (
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
          <MainProductBannerBlockComponent {...props} product={prepareProductData(props.product!)} />
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

MainProductBannerBlock.args = {
  product: {
    ...products[4],
    type: ProductType.advice,
    productType: ProductType.loan,
  },
  title: 'Продукт «{0}» поможет увидеть мир',
};

export { MainProductBannerBlock };
