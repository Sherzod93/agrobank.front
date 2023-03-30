import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import '../../../styles/index.scss';
import templateStyles from '../../blocks/share-block/style.stories.module.scss';
import { SocialNetwork, SocialNetworks as SocialNetworksComponent } from './social-networks';

export default {
  title: 'Components/Social Networks',
  component: SocialNetworksComponent,
} as ComponentMeta<typeof SocialNetworksComponent>;

const SocialNetworks: ComponentStory<typeof SocialNetworksComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => (
  <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
    <div
      className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
    >
      <div className={templateStyles['template__layout']}>
        <SocialNetworksComponent {...props} />
      </div>
    </div>
  </BaseBackgroundColorContext.Provider>
);

SocialNetworks.args = {
  className: 'className',
  socialNetworkLinks: [
    {
      title: '',
      type: SocialNetwork.facebook,
      url: '',
    },
    {
      title: '',
      type: SocialNetwork.instagram,
      url: '',
    },
    {
      title: '',
      type: SocialNetwork.telegram,
      url: '',
    },
    {
      title: '',
      type: SocialNetwork.share,
      url: '',
    },
  ],
};

export { SocialNetworks };
