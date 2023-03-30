import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { chronologyList } from '../../../stories-data';
import { ChronologyBlock as ChronologyBlockComponent } from './chronology-block';

export default {
  title: 'Blocks/Chronology Block',
  component: ChronologyBlockComponent,
} as ComponentMeta<typeof ChronologyBlockComponent>;

const ChronologyBlock: ComponentStory<typeof ChronologyBlockComponent> = (props) => {
  return (
    <Router>
      <ChronologyBlockComponent {...props} />
    </Router>
  );
};

ChronologyBlock.args = chronologyList;

export { ChronologyBlock };
