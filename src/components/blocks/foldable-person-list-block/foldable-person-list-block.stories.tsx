import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { preparePersonData } from '../../../interfaces/classes/helpers';
import { persons } from '../../../stories-data';
import '../../../styles/index.scss';
import { FoldablePersonListBlock as FoldablePersonListBlockComponent } from './foldable-person-list-block';

export default {
  title: 'Blocks/Foldable Person List Block',
  component: FoldablePersonListBlockComponent,
} as ComponentMeta<typeof FoldablePersonListBlockComponent>;

const FoldablePersonListBlock: ComponentStory<typeof FoldablePersonListBlockComponent> = (props) => (
  <Router>
    <FoldablePersonListBlockComponent {...props} items={props.items.map(preparePersonData)} />
  </Router>
);

FoldablePersonListBlock.args = {
  items: persons.filter(({ bio }) => !!bio),
};

export { FoldablePersonListBlock };
