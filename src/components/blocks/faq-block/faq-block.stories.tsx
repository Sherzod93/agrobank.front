import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import { BlockType } from '../../../interfaces';
import { FaqBlockData } from '../../../interfaces/classes/blocks';
import { faqs } from '../../../stories-data';
import { FaqBlock as FaqBlockComponent } from './faq-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Faq Block',
  component: FaqBlockComponent,
} as ComponentMeta<typeof FaqBlockComponent>;

const FaqBlock: ComponentStory<typeof FaqBlockComponent> = (props, { globals: { baseBackgroundColor } }) => {
  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <div className={templateStyles['template__layout']}>
          <FaqBlockComponent {...new FaqBlockData({ type: BlockType.faq, content: { ...props } })} />
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

FaqBlock.args = {
  items: faqs,
};

export { FaqBlock };
