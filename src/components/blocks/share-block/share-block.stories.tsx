import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import { SocialNetwork } from '../../../interfaces';
import '../../../styles/index.scss';
import { ShareBlock as ShareBlockComponent } from './share-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Share Block',
  component: ShareBlockComponent,
} as ComponentMeta<typeof ShareBlockComponent>;

const ShareBlock: ComponentStory<typeof ShareBlockComponent> = ({ ...args }, { globals: { baseBackgroundColor } }) => (
  <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
    <div
      className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
    >
      <div className={templateStyles['template__layout']}>
        <ShareBlockComponent {...args} />
      </div>
    </div>
  </BaseBackgroundColorContext.Provider>
);

ShareBlock.args = {
  items: [
    {
      title: '',
      type: SocialNetwork.facebook,
      url: 'https://facebook.com/share.php?u={0}',
    },
    {
      title: '',
      type: SocialNetwork.vk,
      url: 'https://vk.com/share.php?url={0}',
    },
    {
      title: '',
      type: SocialNetwork.twitter,
      url: 'https://twitter.com/intent/tweet?url={0}',
    },
    {
      title: '',
      type: SocialNetwork.telegram,
      url: 'https://t.me/share/url?url={0}',
    },
    {
      title: '',
      type: SocialNetwork.instagram,
      url: 'https://t.me/share/url?url={0}',
    },
  ],
};

export { ShareBlock };
