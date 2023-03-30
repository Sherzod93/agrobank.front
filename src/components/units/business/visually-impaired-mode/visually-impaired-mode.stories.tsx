import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../../contexts';
import '../../../../styles/index.scss';
import templateStyles from './style.stories.module.scss';
import { VisuallyImpairedMode as VisuallyImpairedModeComponent } from './visually-impaired-mode';

export default {
  title: 'Components/Visually Impaired Mode',
  component: VisuallyImpairedModeComponent,
} as ComponentMeta<typeof VisuallyImpairedModeComponent>;

const VisuallyImpairedMode: ComponentStory<typeof VisuallyImpairedModeComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => {
  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <div className={templateStyles['template__layout']}>
          <div>
            <VisuallyImpairedModeComponent {...props} />
          </div>
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

VisuallyImpairedMode.args = {
  withTitle: false,
};

export { VisuallyImpairedMode };
