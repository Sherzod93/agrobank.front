import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import '../../../styles/index.scss';
import { QuoteBlock as QuoteBlockComponent } from './quote-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Quote Block',
  component: QuoteBlockComponent,
} as ComponentMeta<typeof QuoteBlockComponent>;

const QuoteBlock: ComponentStory<typeof QuoteBlockComponent> = ({ ...args }, { globals: { baseBackgroundColor } }) => (
  <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
    <div
      className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
    >
      <div className={templateStyles['template__layout']}>
        <QuoteBlockComponent {...args} />
      </div>
    </div>
  </BaseBackgroundColorContext.Provider>
);

QuoteBlock.args = {
  description: 'Азамат Тураев, управляющий директор, заместитель председателя правления Агробанка',
  text: 'Мы рады, что смогли сдержать обещание, данное нашим клиентам и предоставить возможность перевода денег из национальных банковских карт на карты Сбербанка. Данная услуга позволяет мгновенно осуществлять переводы на карты Сбербанка. Услуга будет полезна как родителям, чьи дети обучаются в Российской Федерации, так и родственникам наших соотечественников.',
};

export { QuoteBlock };
