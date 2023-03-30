import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import '../../../styles/index.scss';
import { LinkBlock as LinkBlockComponent } from './link-block';

export default {
  title: 'Blocks/Link Block',
  component: LinkBlockComponent,
} as ComponentMeta<typeof LinkBlockComponent>;

const LinkBlock: ComponentStory<typeof LinkBlockComponent> = (props) => (
  <Router>
    <LinkBlockComponent {...props} />
  </Router>
);

LinkBlock.args = {
  link: {
    title: 'смотреть вакансии',
    url: '',
  },
};

export { LinkBlock };
