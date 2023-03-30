import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import { ListBlock as ListBlockComponent, ListType } from './list-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/List Block',
  component: ListBlockComponent,
} as ComponentMeta<typeof ListBlockComponent>;

const ListBlock: ComponentStory<typeof ListBlockComponent> = ({ ...args }, { globals: { baseBackgroundColor } }) => {
  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <ListBlockComponent {...args} />
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

ListBlock.args = {
  items: [
    'Разработка дизайна и кроссплатформенного мобильного приложения с помощью технологии Flutter и языка программирования Dart',
    'Поддержка мобильных приложений',
    'Участие в отладке и тестировании приложений',
    'Размещение приложений в AppStore и Google Play',
    'Предложения по улучшению продукта и оптимизации API',
  ],
  listType: ListType.ordered,
};

export { ListBlock };
