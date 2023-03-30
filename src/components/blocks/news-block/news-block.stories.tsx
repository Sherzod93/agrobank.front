import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { prepareNewsItemData } from '../../../interfaces/classes/helpers';
import { news } from '../../../stories-data';
import { NewsBlock as NewsBlockComponent } from './news-block';

export default {
  title: 'Blocks/News Block',
  component: NewsBlockComponent,
} as ComponentMeta<typeof NewsBlockComponent>;

const NewsBlock: ComponentStory<typeof NewsBlockComponent> = (props) => {
  return (
    <Router>
      <NewsBlockComponent {...props} items={props.items.map(prepareNewsItemData)} />
    </Router>
  );
};

NewsBlock.args = {
  items: news,
};

export { NewsBlock };
