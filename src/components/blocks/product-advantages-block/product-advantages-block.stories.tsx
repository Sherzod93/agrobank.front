import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import { prepareProductData } from '../../../interfaces/classes/helpers';
import { products } from '../../../stories-data';
import { ProductAdvantagesBlock as ProductAdvantagesBlockComponent } from './product-advantages-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Product Advantages Block',
  component: ProductAdvantagesBlockComponent,
} as ComponentMeta<typeof ProductAdvantagesBlockComponent>;

const ProductAdvantagesBlock: ComponentStory<typeof ProductAdvantagesBlockComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => (
  <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
    <div
      className={cs(
        templateStyles['template'],
        templateStyles[`template_base-background-color_${baseBackgroundColor}`],
      )}
    >
      <div className={templateStyles['template__layout']}>
        <ProductAdvantagesBlockComponent {...props} product={prepareProductData(props.product!)} />
      </div>
    </div>
  </BaseBackgroundColorContext.Provider>
);

ProductAdvantagesBlock.args = {
  product: products[0],
};

export { ProductAdvantagesBlock };
