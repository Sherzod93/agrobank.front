import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { ProductType } from '../../../interfaces';
import { prepareProductData } from '../../../interfaces/classes/helpers';
import { store } from '../../../services/store';
import { products } from '../../../stories-data';
import templateStyles from '../bank-cell-rental-block/style.stories.module.scss';
import {
  CompactProductBannerBlock as CompactProductBannerBlockComponent,
  CompactProductBannerBlockType,
} from './compact-product-banner-block';

export default {
  title: 'Blocks/Compact Product Banner Block',
  component: CompactProductBannerBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof CompactProductBannerBlockComponent>;

const CompactProductBannerBlock: ComponentStory<typeof CompactProductBannerBlockComponent> = (
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
            <CompactProductBannerBlockComponent
              {...props}
              product={
                props.bannerType !== CompactProductBannerBlockType.link && props.product
                  ? prepareProductData(props.product)
                  : undefined
              }
            />
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

CompactProductBannerBlock.args = {
  bannerType: CompactProductBannerBlockType.withImage,
  product: products[4],
  productType: ProductType.loan,
  link: {
    title: 'Link title',
    url: '/',
  },
  title: 'Продукт «{0}» поможет увидеть мир',
};

export { CompactProductBannerBlock };
