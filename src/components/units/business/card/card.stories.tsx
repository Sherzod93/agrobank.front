import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { CardProductData } from '../../../../interfaces';
import { prepareProductData } from '../../../../interfaces/classes/helpers';
import { products } from '../../../../stories-data';
import '../../../../styles/index.scss';
import { Card as CardComponent } from './card';

export default {
  title: 'Components/Card',
  component: CardComponent,
} as ComponentMeta<typeof CardComponent>;

const Card: ComponentStory<typeof CardComponent> = ({ cardImage }) => {
  return <CardComponent cardImage={cardImage} />;
};

Card.args = {
  cardImage: (prepareProductData(products[1]) as CardProductData).picture,
};

export { Card };
