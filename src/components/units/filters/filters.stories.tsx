import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React, { useCallback, useState } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { filters } from '../../../stories-data/filters';
import '../../../styles/index.scss';
import { Filters as FiltersComponent } from './filters';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Components/Filters',
  component: FiltersComponent,
} as ComponentMeta<typeof FiltersComponent>;

const Filters: ComponentStory<typeof FiltersComponent> = (props, { globals: { baseBackgroundColor } }) => {
  const [filtersOptions, setFiltersOptions] = useState({});
  const onChangeHandler = useCallback((newValue) => {
    setFiltersOptions((oldValue) =>
      Object.assign({}, oldValue, {
        [newValue.code]: newValue.id,
      }),
    );
  }, []);

  return (
    <Router>
      <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
        <div
          className={cs(
            templateStyles['template'],
            templateStyles[`template_base-background-color_${baseBackgroundColor}`],
          )}
        >
          <div className={templateStyles['template__layout']}>
            <FiltersComponent
              {...props}
              filters={props.filters.slice(0, 2)}
              lexemePrefix="news-list-block"
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className={cs(templateStyles['template'])}>{JSON.stringify(filtersOptions)}</div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};
Filters.args = {
  filters,
};

export { Filters };
