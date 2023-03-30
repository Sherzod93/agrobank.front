import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import '../../../styles/index.scss';
import templateStyles from './style.stories.module.scss';
import { TextBlock as TextBlockComponent } from './text-block';

export default {
  title: 'Blocks/Text Block',
  component: TextBlockComponent,
} as ComponentMeta<typeof TextBlockComponent>;

const TextBlock: ComponentStory<typeof TextBlockComponent> = ({ ...args }, { globals: { baseBackgroundColor } }) => (
  <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
    <div
      className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
    >
      <div className={templateStyles['template__layout']}>
        <TextBlockComponent {...args} />
        <TextBlockComponent {...{ ...args, text: `<b>${args.text}</b>` }} />
      </div>
    </div>
  </BaseBackgroundColorContext.Provider>
);

TextBlock.args = {
  text: 'Не смотря, на то, что пандемия короновируса ограничивает полноценные контакты с международными партнерами и требует необходимости приспосабливаться к реалиям карантина, интерес зарубежных партнеров к нашей Республики не угасает и данная церемония подписания важного для обоих банков Соглашения, является явным тому примером. ',
};

export { TextBlock };
