import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import useState from 'storybook-addon-state';
import { BaseBackgroundColorContext } from '../../../contexts';
import '../../../styles/index.scss';
import { Pagination as PaginationComponent } from './pagination';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Controls/Pagination',
  component: PaginationComponent,
} as ComponentMeta<typeof PaginationComponent>;

const Pagination: ComponentStory<typeof PaginationComponent> = (_, { globals: { baseBackgroundColor } }) => {
  const [activeIx, setActiveIx] = useState('activeIx', 0);
  const items = [{ title: 'First item' }, { title: 'Second item' }, { title: 'Third item' }, {}];

  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(
          templateStyles['template'],
          templateStyles[`template_base-background-color_${baseBackgroundColor}`],
        )}
      >
        <div className={templateStyles['template__layout']}>
          <PaginationComponent activeIx={activeIx} handleItemActivation={setActiveIx} items={items} />
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

Pagination.args = {};

export { Pagination };
