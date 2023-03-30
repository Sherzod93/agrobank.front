import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { linkListItems } from '../../../stories-data';
import { LinkListBlock as LinkListBlockComponent } from './link-list-block';

export default {
  title: 'Blocks/Link List Block',
  component: LinkListBlockComponent,
} as ComponentMeta<typeof LinkListBlockComponent>;

const LinkListBlock: ComponentStory<typeof LinkListBlockComponent> = (props) => {
  return (
    <Router>
      <LinkListBlockComponent {...props} />
    </Router>
  );
};

LinkListBlock.args = {
  title: 'Миссия и ценности',
  items: linkListItems,
};

export { LinkListBlock };
