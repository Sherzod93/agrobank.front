import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { advantages } from '../../../../../stories-data';
import '../../../../../styles/index.scss';
import { ProductAdvantage as AdvantageComponent } from './product-advantage';

export default {
  title: 'Components/Advantage',
  component: AdvantageComponent,
} as ComponentMeta<typeof AdvantageComponent>;

const Advantage: ComponentStory<typeof AdvantageComponent> = ({ ...args }) => <AdvantageComponent {...args} />;

Advantage.args = {
  productAdvantage: advantages[0],
};

export { Advantage };
