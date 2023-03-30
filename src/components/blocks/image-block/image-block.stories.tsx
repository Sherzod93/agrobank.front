import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ImageInfoData } from '../../../interfaces';
import { buildImageInfo } from '../../../interfaces/classes/helpers';
import { imageData } from '../../../stories-data';
import { ImageBlock as ImageBlockComponent } from './image-block';

export default {
  title: 'Blocks/Image Block',
  component: ImageBlockComponent,
} as ComponentMeta<typeof ImageBlockComponent>;

const ImageBlock: ComponentStory<typeof ImageBlockComponent> = ({ ...args }) => {
  return (
    <Router>
      <ImageBlockComponent {...args} />
    </Router>
  );
};

ImageBlock.args = {
  ...imageData,
  image: buildImageInfo(imageData.image as unknown as ImageInfoData),
};

export { ImageBlock };
