import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../../services/store';
import { extendedAdvices } from '../../../stories-data';
import { CarouselBlock as CarouselBlockComponent } from './carousel-block';

export default {
  title: 'Blocks/Carousel Block',
  component: CarouselBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof CarouselBlockComponent>;

const CarouselBlock: ComponentStory<typeof CarouselBlockComponent> = ({ ...args }) => {
  return (
    <Router>
      <CarouselBlockComponent {...args} />
    </Router>
  );
};

CarouselBlock.args = {
  items: extendedAdvices,
  linkToAllItems: {
    title: 'Все статьи',
    url: '/',
  },
};

export { CarouselBlock };
