import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import '../../../styles/index.scss';
import templateStyles from './style.stories.module.scss';
import { Tag as TagComponent, TagSize } from './tag';

export default {
  title: 'Controls/Tag',
  component: TagComponent,
} as ComponentMeta<typeof TagComponent>;

const Tag: ComponentStory<typeof TagComponent> = ({ title, size, value }, { globals: { baseBackgroundColor } }) => {
  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(
          templateStyles['template'],
          templateStyles[`template_base-background-color_${baseBackgroundColor}`],
        )}
      >
        <div className={templateStyles['template__layout']}>
          <div>
            <TagComponent title={title} size={size ?? TagSize.default} />
          </div>
          <div>
            <TagComponent title={title} size={size ?? TagSize.small} />
          </div>
          <div>
            <TagComponent title={title} size={size ?? TagSize.default} value={value} />
          </div>
          <div>
            <TagComponent title={title} size={size ?? TagSize.small} value={value} />
          </div>
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

Tag.args = {
  title: 'title',
  value: 'value',
};

export { Tag };
