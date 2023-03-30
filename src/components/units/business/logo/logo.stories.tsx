import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../../contexts';
import '../../../../styles/index.scss';
import { Logo as LogoComponent } from './logo';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Components/Logo',
  component: LogoComponent,
} as ComponentMeta<typeof LogoComponent>;

const Logo: ComponentStory<typeof LogoComponent> = ({ ...restArgs }, { globals: { baseBackgroundColor } }) => (
  <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
    <div
      className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
    >
      <div className={templateStyles['template__layout']}>
        <LogoComponent />
      </div>
    </div>
  </BaseBackgroundColorContext.Provider>
);

Logo.args = {};

export { Logo };
