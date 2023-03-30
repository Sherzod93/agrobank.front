import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { tilesList, tilesTotalData } from '../../../stories-data';
import templateStyles from '../text-block/style.stories.module.scss';
import { TilesListBlock as TilesListBlockComponent } from './tiles-list-block';

export default {
  title: 'Blocks/Tiles List Block',
  component: TilesListBlockComponent,
} as ComponentMeta<typeof TilesListBlockComponent>;

const TilesListBlock: ComponentStory<typeof TilesListBlockComponent> = (
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
            <TilesListBlockComponent {...props} />
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

TilesListBlock.args = {
  entityType: 'vacancies',
  items: tilesList,
  total: tilesTotalData,
};

export { TilesListBlock };
