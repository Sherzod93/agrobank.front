import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import templateStyles from './style.stories.module.scss';
import { SubscriptionBlock as SubscriptionBlockComponent } from './subscription-block';

export default {
  title: 'Blocks/Subscription Block',
  component: SubscriptionBlockComponent,
} as ComponentMeta<typeof SubscriptionBlockComponent>;

const SubscriptionBlock: ComponentStory<typeof SubscriptionBlockComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => (
  <Router>
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <div className={templateStyles['template__layout']}>
          <SubscriptionBlockComponent {...props} tabsClassname={templateStyles.tabs} />
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  </Router>
);

SubscriptionBlock.args = {
  buttonTitle: 'Подписаться',
  subtitle: 'Подпишитесь, чтобы не пропускать запуск новых услуг и старт новых акций.',
  title: 'Подписка на новости',
};

export { SubscriptionBlock };
