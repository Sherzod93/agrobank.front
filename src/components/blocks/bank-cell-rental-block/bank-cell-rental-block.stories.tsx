import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import { bankCellRentalSizes } from '../../../stories-data';
import '../../../styles/index.scss';
import { BankCellRentalBlock as BankCellRentalBlockComponent } from './bank-cell-rental-block';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Blocks/Bank Cell Rental Block',
  component: BankCellRentalBlockComponent,
} as ComponentMeta<typeof BankCellRentalBlockComponent>;

const BankCellRentalBlock: ComponentStory<typeof BankCellRentalBlockComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => (
  <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
    <div
      className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
    >
      <div className={templateStyles['template__layout']}>
        <BankCellRentalBlockComponent {...props} />
      </div>
    </div>
  </BaseBackgroundColorContext.Provider>
);

BankCellRentalBlock.args = {
  buttonTitle: 'Арендовать',
  bankCellSizes: bankCellRentalSizes,
  title: 'Расчёт стоимости аренды сейфа',
};

export { BankCellRentalBlock };
