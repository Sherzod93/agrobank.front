import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { infoCardItems } from '../../../../../stories-data';
import { InfoCard as InfoCardComponent } from './info-card';

export default {
  title: 'Components/Info Card',
  component: InfoCardComponent,
} as ComponentMeta<typeof InfoCardComponent>;

const InfoCard: ComponentStory<typeof InfoCardComponent> = (props) => {
  return (
    <Router>
      <InfoCardComponent {...props} isStandalone={true} />
    </Router>
  );
};

InfoCard.args = {
  infoCardData: infoCardItems[2],
};

export { InfoCard };
