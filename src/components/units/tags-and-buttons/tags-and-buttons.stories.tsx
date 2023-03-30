import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import '../../../styles/index.scss';
import { Button, ButtonSize } from '../controls/button/button';
import { Tag, TagSize } from '../tag/tag';
import templateStyles from './style.stories.module.scss';
import { TagsAndButtons as TagsAndButtonsComponent } from './tags-and-buttons';

export default {
  title: 'Controls/Tags And Buttons',
  component: TagsAndButtonsComponent,
} as ComponentMeta<typeof TagsAndButtonsComponent>;

const TagsAndButtons: ComponentStory<typeof TagsAndButtonsComponent> = (_, { globals: { baseBackgroundColor } }) => {
  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(
          templateStyles['template'],
          templateStyles[`template_base-background-color_${baseBackgroundColor}`],
        )}
      >
        <div className={templateStyles['template__layout']}>
          <TagsAndButtonsComponent>
            <Tag title={'a tag'} />
            <Tag title={'another tag'} />
            <Tag title={'another one tag'} />
            <Tag title={'a button'} />
            <Button>button</Button>
          </TagsAndButtonsComponent>
          <TagsAndButtonsComponent>
            <Tag title={'a tag'} size={TagSize.small} />
            <Tag title={'another tag'} size={TagSize.small} />
            <Tag title={'another one tag'} size={TagSize.small} />
            <Tag title={'another one tag'} size={TagSize.small} />
            <Button size={ButtonSize.small}>button</Button>
          </TagsAndButtonsComponent>
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

TagsAndButtons.args = {};

export { TagsAndButtons };
