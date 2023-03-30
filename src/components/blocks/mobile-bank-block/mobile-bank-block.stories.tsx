import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import { prepareMobileApplicationData } from '../../../interfaces/classes/helpers';
import { mobileApplication } from '../../../stories-data';
import '../../../styles/index.scss';
import { MobileBankBlock as MobileBankComponent } from './mobile-bank-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Mobile Bank Block',
  component: MobileBankComponent,
} as ComponentMeta<typeof MobileBankComponent>;

const MobileBankBlock: ComponentStory<typeof MobileBankComponent> = (props, { globals: { baseBackgroundColor } }) => (
  <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
    <div
      className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
    >
      <div className={templateStyles['template__layout']}>
        <MobileBankComponent {...props} applicationInfo={prepareMobileApplicationData(mobileApplication)} />
      </div>
    </div>
  </BaseBackgroundColorContext.Provider>
);

MobileBankBlock.args = {
  applicationInfo: mobileApplication,
};

export { MobileBankBlock };
