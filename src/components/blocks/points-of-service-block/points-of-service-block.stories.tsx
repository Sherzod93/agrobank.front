import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { store } from '../../../services/store';
import { PointsOfServiceBlock as PointsOfServiceBlockComponent } from './points-of-service-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Points Of Service Block',
  component: PointsOfServiceBlockComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof PointsOfServiceBlockComponent>;

const PointsOfServiceBlock: ComponentStory<typeof PointsOfServiceBlockComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => (
  <Router>
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(
          templateStyles['template'],
          templateStyles[`template_base-background-color_${baseBackgroundColor}`],
        )}
      >
        <div className={templateStyles['template__layout']}>
          <PointsOfServiceBlockComponent {...props} />
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  </Router>
);

PointsOfServiceBlock.args = {
  countries: [
    {
      id: 84,
      code: 'uzbekistan',
      title: 'Узбекистан',
      regions: [
        {
          id: 85,
          code: 'andizhanskaya-oblast',
          title: 'Андижанская область',
        },
        {
          id: 86,
          code: 'drugaya-oblast',
          title: 'Другая область',
        },
      ],
    },
  ],
  isCompact: false,
  posType: null,
  withCategoryFilter: false,
};

export { PointsOfServiceBlock };
