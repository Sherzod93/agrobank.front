import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { ComponentRenderType } from '../../../interfaces';
import { addresses } from '../../../stories-data';
import { Address as AddressComponent } from './address';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Components/Addresses/Address',
  component: AddressComponent,
} as ComponentMeta<typeof AddressComponent>;

const Address: ComponentStory<typeof AddressComponent> = (props, { globals: { baseBackgroundColor } }) => {
  const WrapperTagName = props.renderType === ComponentRenderType.default ? 'div' : 'ul';

  return (
    <Router>
      <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
        <WrapperTagName
          className={cs(
            templateStyles.template,
            templateStyles[`template_base-background-color_${baseBackgroundColor}`],
          )}
        >
          <div className={templateStyles['template__layout']}>
            <AddressComponent {...props} />
          </div>
        </WrapperTagName>
      </BaseBackgroundColorContext.Provider>
    </Router>
  );
};

Address.args = {
  address: addresses[0],
  renderType: ComponentRenderType.default,
};

export { Address };
