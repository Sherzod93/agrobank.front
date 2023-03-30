import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../../contexts';
import { ALSCopyright as ALSCopyrightComponent } from './als-copyright';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Components/ALS Copyright',
  component: ALSCopyrightComponent,
} as ComponentMeta<typeof ALSCopyrightComponent>;

const ALSCopyright: ComponentStory<typeof ALSCopyrightComponent> = (_, { globals: { baseBackgroundColor } }) => {
  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <div className={templateStyles['template__layout']}>
          <div>
            <ALSCopyrightComponent />
          </div>
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

ALSCopyright.args = {};

export { ALSCopyright };
