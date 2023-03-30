import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import useState from 'storybook-addon-state';
import { BaseBackgroundColorContext } from '../../../../contexts';
import '../../../../styles/index.scss';
import templateStyles from './style.stories.module.scss';
import { Tabs as TabsComponent } from './tabs';

export default {
  title: 'Controls/Tabs',
  component: TabsComponent,
} as ComponentMeta<typeof TabsComponent>;

const Tabs: ComponentStory<typeof TabsComponent> = ({ ...restArgs }, { globals: { baseBackgroundColor } }) => {
  const [selectedIx, setSelectedIx] = useState<number>('option', restArgs.selectedOptionIx!);

  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <TabsComponent
          {...restArgs}
          className={templateStyles.tabs}
          selectedOptionIx={selectedIx}
          onSelect={setSelectedIx}
        />
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

Tabs.args = {
  options: ['Все', 'На жилье', 'Льготные', 'Получение онлайн', 'На любые цели'],
};

export { Tabs };
