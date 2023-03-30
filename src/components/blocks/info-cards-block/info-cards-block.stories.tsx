import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { infoCardItems } from '../../../stories-data';
import { InfoCardsBlock as InfoCardsBlockComponent } from './info-cards-block';

export default {
  title: 'Blocks/Info Cards Block',
  component: InfoCardsBlockComponent,
} as ComponentMeta<typeof InfoCardsBlockComponent>;

const InfoCardsBlock: ComponentStory<typeof InfoCardsBlockComponent> = (props) => {
  return (
    <Router>
      <InfoCardsBlockComponent {...props} />
    </Router>
  );
};

InfoCardsBlock.args = {
  items: infoCardItems,
};

export { InfoCardsBlock };
