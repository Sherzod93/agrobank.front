import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import '../../../styles/index.scss';
import { Icon as IconComponent, IconCode } from './icon';

export default {
  title: 'Components/Icon',
  component: IconComponent,
} as ComponentMeta<typeof IconComponent>;

const Icon: ComponentStory<typeof IconComponent> = ({ ...args }) => <IconComponent {...args} />;

Icon.args = {
  className: 'className',
  code: IconCode.expandArrow,
};

export { Icon };
