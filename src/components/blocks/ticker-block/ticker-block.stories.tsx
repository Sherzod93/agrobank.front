import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import productDemoImage from '../../../stories-data/products/resources/background-demo.png';
import '../../../styles/index.scss';
import templateStyles from './style.stories.module.scss';
import { TickerBlock as TickerComponent } from './ticker-block';

export default {
  title: 'Blocks/Ticker Block',
  component: TickerComponent,
} as ComponentMeta<typeof TickerComponent>;

const TickerBlock: ComponentStory<typeof TickerComponent> = ({ ...args }, { globals: { baseBackgroundColor } }) => (
  <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
    <div
      className={cs(
        templateStyles['template'],
        templateStyles[`template_base-background-color_${baseBackgroundColor}`],
      )}
    >
      <TickerComponent {...args} />
      <div
        className={cs(
          templateStyles['template__image-wrapper'],
          templateStyles[`template_base-background-color_${baseBackgroundColor}`],
        )}
      >
        <img className={templateStyles['template__image']} src={productDemoImage} alt="example" />
      </div>
      <TickerComponent isLayering={true} {...args} />
      <div
        className={cs(
          templateStyles['template__image-wrapper'],
          templateStyles[`template_base-background-color_${baseBackgroundColor}`],
        )}
      >
        <img className={templateStyles['template__image']} src={productDemoImage} alt="example" />
      </div>
    </div>
  </BaseBackgroundColorContext.Provider>
);

TickerBlock.args = {
  className: templateStyles['template__ticker-block'],
  items: ['выбирайте вакансию', 'проходите интервью', 'получайте приглашение на работу', 'знакомьтесь с командой'],
};

export { TickerBlock };
