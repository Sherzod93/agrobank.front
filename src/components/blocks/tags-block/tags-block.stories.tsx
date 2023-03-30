import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { Provider } from 'react-redux';
import { BaseBackgroundColorContext } from '../../../contexts';
import { ItemsAlignmentType, ProductTagData, ProductTagTypes } from '../../../interfaces';
import { prepareProductTagData } from '../../../interfaces/classes/helpers';
import { store } from '../../../services/store';
import '../../../styles/index.scss';
import templateStyles from './style.stories.module.scss';
import { TagsBlock as TagsBlockComponent } from './tags-block';

export default {
  title: 'Blocks/Tags Block',
  component: TagsBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof TagsBlockComponent>;

const TagsBlock: ComponentStory<typeof TagsBlockComponent> = (props, { globals: { baseBackgroundColor } }) => (
  <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
    <div
      className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
    >
      <div className={templateStyles['template__layout']}>
        <TagsBlockComponent {...props} items={props.items.map(prepareProductTagData)} />
      </div>
    </div>
  </BaseBackgroundColorContext.Provider>
);

TagsBlock.args = {
  items: [
    ...[
      'android',
      'git',
      'ios',
      'sqlite',
      'bloc',
      'provider',
      'react',
      'solidity',
      'java',
      'javascript',
      'go',
      'php',
      'python',
      'mathematica',
    ].map((text) => ({ type: ProductTagTypes.text, value: text })),
    { type: ProductTagTypes.date, value: new Date().toISOString() },
  ] as ProductTagData[],
  tagsAlignment: ItemsAlignmentType.center,
};

export { TagsBlock };
