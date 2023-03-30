import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { prepareMobileApplicationData } from '../../../../interfaces/classes/helpers';
import { mobileApplication } from '../../../../stories-data';
import '../../../../styles/index.scss';
import {
  MobileApplicationIconType,
  MobileApplicationLinks as MobileApplicationLinksComponent,
  Size,
} from './mobile-application-links';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Components/Mobile Application Links',
  component: MobileApplicationLinksComponent,
} as ComponentMeta<typeof MobileApplicationLinksComponent>;

const MobileApplicationLinks: ComponentStory<typeof MobileApplicationLinksComponent> = (
  { ...args },
  { globals: { baseBackgroundColor } },
) => (
  <div
    className={cs(templateStyles['template'], templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
  >
    <div className={templateStyles['template__layout']}>
      <MobileApplicationLinksComponent {...args} />
    </div>
    <div className={templateStyles['template__layout']}>
      <MobileApplicationLinksComponent {...args} iconType={MobileApplicationIconType.badge} />
    </div>
  </div>
);

MobileApplicationLinks.args = {
  iconType: MobileApplicationIconType.default,
  links: prepareMobileApplicationData(mobileApplication).links,
  size: Size.default,
};

export { MobileApplicationLinks };
