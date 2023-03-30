import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import { nanoid } from 'nanoid';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { BlockType } from '../../../interfaces';
import { TabBlockData, TextBlockData, UtilityBlockType } from '../../../interfaces/classes/blocks';
import '../../../styles/index.scss';
import templateStyles from './style.stories.module.scss';
import { TabsBlock as TabsBlockComponent } from './tabs-block';

export default {
  title: 'Blocks/Tabs Block',
  component: TabsBlockComponent,
} as ComponentMeta<typeof TabsBlockComponent>;

const TabsBlock: ComponentStory<typeof TabsBlockComponent> = (props, { globals: { baseBackgroundColor } }) => (
  <Router>
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <div className={templateStyles['template__layout']}>
          <TabsBlockComponent {...props} tabsClassname={templateStyles.tabs} />
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  </Router>
);

TabsBlock.args = {
  code: 'tabs-code',
  nestedBlocks: [
    {
      code: 'first',
      id: nanoid(),
      nestedBlocks: [
        new TextBlockData({
          type: BlockType.textBanner,
          content: {
            text: 'First tab content',
          },
        }),
      ],
      title: 'First tab',
      type: UtilityBlockType.tab,
    } as TabBlockData,
    {
      code: 'second',
      id: nanoid(),
      nestedBlocks: [
        new TextBlockData({
          type: BlockType.textBanner,
          content: {
            text: 'Second tab content',
          },
        }),
      ],
      title: 'Second tab',
      type: UtilityBlockType.tab,
    } as TabBlockData,
  ],
};

export { TabsBlock };
