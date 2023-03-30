import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { addresses } from '../../../stories-data';
import { Addresses as AddressesComponent } from './addresses';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Components/Addresses',
  component: AddressesComponent,
} as ComponentMeta<typeof AddressesComponent>;

const Addresses: ComponentStory<typeof AddressesComponent> = (props, { globals: { baseBackgroundColor } }) => {
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
            <AddressesComponent {...props} />
          </div>
        </div>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

Addresses.args = {
  items: addresses,
};

export { Addresses };
