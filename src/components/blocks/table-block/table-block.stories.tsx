import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { tableData } from '../../../stories-data';
import templateStyles from './style.stories.module.scss';
import { TableBlock as TableBlockComponent } from './table-block';

export default {
  title: 'Blocks/Table Block',
  component: TableBlockComponent,
} as ComponentMeta<typeof TableBlockComponent>;

const TableBlock: ComponentStory<typeof TableBlockComponent> = (props, { globals: { baseBackgroundColor } }) => {
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
            <TableBlockComponent {...props} />
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

TableBlock.args = {
  table: tableData.table,
  title: tableData.title,
};

export { TableBlock };
