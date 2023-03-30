import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import { prepareProductData } from '../../../interfaces/classes/helpers';
import { products } from '../../../stories-data';
import { ProductPropertiesBlock as ProductPropertiesBlockComponent } from './product-properties-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Product Properties Block',
  component: ProductPropertiesBlockComponent,
} as ComponentMeta<typeof ProductPropertiesBlockComponent>;

const ProductPropertiesBlock: ComponentStory<typeof ProductPropertiesBlockComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => {
  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(
          templateStyles['template'],
          templateStyles[`template_base-background-color_${baseBackgroundColor}`],
        )}
      >
        <div className={templateStyles['template__layout']}>
          <ProductPropertiesBlockComponent {...props} product={prepareProductData(props.product!)} />
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

ProductPropertiesBlock.args = {
  product: products[0],
  title: 'Преимущества продукта',
};
export { ProductPropertiesBlock };
