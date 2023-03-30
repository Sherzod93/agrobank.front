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
import { CalculatorBlock as CalculatorBlockComponent } from './calculator-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Calculator Block',
  component: CalculatorBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof CalculatorBlockComponent>;

const loanAndDepositProductPair = [ProductType.loan, ProductType.deposit]
  .map((productType) => products.find(({ type }) => type === productType)!)
  .map(prepareProductData);

const CalculatorBlock: ComponentStory<typeof CalculatorBlockComponent> = (
  { ...args },
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
          {args.product ? (
            <div key={args.product.type} className={templateStyles['template__layout']}>
              <CalculatorBlockComponent {...args} />
            </div>
          ) : (
            loanAndDepositProductPair.map((product) => (
              <div key={product.type} className={templateStyles['template__layout']}>
                <CalculatorBlockComponent {...args} product={product} />
              </div>
            ))
          )}
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

CalculatorBlock.args = {
  title: 'Расчёт по продукту',
};

export { CalculatorBlock };
