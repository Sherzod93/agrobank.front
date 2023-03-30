import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import templateStyles from '../bank-cell-rental-block/style.stories.module.scss';
import { InformationBlock as InformationBlockComponent } from './information-block';

export default {
  title: 'Blocks/Information Block',
  component: InformationBlockComponent,
} as ComponentMeta<typeof InformationBlockComponent>;

const InformationBlock: ComponentStory<typeof InformationBlockComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => {
  return (
    <Router>
      <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
        <div
          className={cs(
            templateStyles.template,
            templateStyles[`template_base-background-color_${baseBackgroundColor}`],
          )}
        >
          <div className={templateStyles['template__layout']}>
            <InformationBlockComponent {...props} />
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

InformationBlock.args = {
  description: 'Если это произошло случайно, возвращайтесь.',
  title: 'Вы отписаны',
};

export { InformationBlock };
