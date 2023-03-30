import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import '../../../styles/index.scss';
import { ProductApplyingStepsBlock as ProductApplyingStepsBlockComponent } from './product-applying-steps-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Product Applying Steps Block',
  component: ProductApplyingStepsBlockComponent,
} as ComponentMeta<typeof ProductApplyingStepsBlockComponent>;

const ProductApplyingStepsBlock: ComponentStory<typeof ProductApplyingStepsBlockComponent> = (
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
          <ProductApplyingStepsBlockComponent {...props} />
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

ProductApplyingStepsBlock.args = {
  items: [
    'Заполните заявку на сайте, без посещения отделений',
    'Наш сотрудник перезвонит и расскажет про условия',
    'Карту доставят вам по адресу в Ташкенте или в выбранное отделение',
  ],
};

export { ProductApplyingStepsBlock };
