import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { preparePersonData } from '../../../interfaces/classes/helpers';
import { persons } from '../../../stories-data';
import { PersonListBlock as PersonListBlockComponent } from './person-list-block';

export default {
  title: 'Blocks/Person List Block',
  component: PersonListBlockComponent,
} as ComponentMeta<typeof PersonListBlockComponent>;

const PersonListBlock: ComponentStory<typeof PersonListBlockComponent> = ({ items }) => (
  <PersonListBlockComponent items={items.map(preparePersonData)} />
);

PersonListBlock.args = {
  items: persons,
};

export { PersonListBlock };
