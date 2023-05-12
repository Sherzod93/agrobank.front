import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import templateStyles from '../bank-cell-rental-block/style.stories.module.scss';
import { VideoBlock as VideoBlockComponent } from './video-block';

export default {
  title: 'Blocks/Information Block',
  component: VideoBlockComponent,
} as ComponentMeta<typeof VideoBlockComponent>;

const VideoBlock: ComponentStory<typeof VideoBlockComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => {
  return (
    <Router>
      <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
        <div
          className={cs(
            templateStyles.template,
            templateStyles[`template_base-background-color_${baseBackgroundColor}`],
          )}
        >
          <div className={templateStyles['template__layout']}>
            <VideoBlockComponent {...props} />
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

VideoBlock.args = {
  description: 'Если это произошло случайно, возвращайтесь.',
  title: 'Вы отписаны',
};

export { VideoBlock };
