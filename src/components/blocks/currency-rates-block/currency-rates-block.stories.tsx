import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { currencyRates } from '../../../stories-data';
import { CurrencyRatesBlock as CurrencyRatesBlockComponent } from './currency-rates-block';

export default {
  title: 'Blocks/Currency Rates Block',
  component: CurrencyRatesBlockComponent,
} as ComponentMeta<typeof CurrencyRatesBlockComponent>;

const CurrencyRatesBlock: ComponentStory<typeof CurrencyRatesBlockComponent> = (props) => {
  return (
    <Router>
      <CurrencyRatesBlockComponent {...props} />
    </Router>
  );
};

CurrencyRatesBlock.args = {
  items: currencyRates,
};

export { CurrencyRatesBlock };
