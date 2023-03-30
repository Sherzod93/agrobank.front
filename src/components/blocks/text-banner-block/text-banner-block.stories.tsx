import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ProductType } from '../../../interfaces';
import '../../../styles/index.scss';
import { TextBannerBlock as TextBannerBlockComponent } from './text-banner-block';

export default {
  title: 'Blocks/Text Banner Block',
  component: TextBannerBlockComponent,
} as ComponentMeta<typeof TextBannerBlockComponent>;

const TextBannerBlock: ComponentStory<typeof TextBannerBlockComponent> = ({ ...args }) => (
  <TextBannerBlockComponent {...args} />
);

TextBannerBlock.args = {
  text: 'Text',
  productType: ProductType.default,
};

export { TextBannerBlock };
