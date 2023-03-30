import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../../contexts';
import '../../../../styles/index.scss';
import { Button as ButtonComponent, ButtonSize, ButtonType } from './button';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Controls/Button',
  component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

const Button: ComponentStory<typeof ButtonComponent> = (props, { globals: { baseBackgroundColor } }) => {
  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <div className={templateStyles['template__layout']}>
          <div>
            <ButtonComponent {...props}>primary</ButtonComponent>
            <ButtonComponent {...props} withArrow={true}>
              with arrow
            </ButtonComponent>
            <ButtonComponent {...props} size={ButtonSize.small}>
              small
            </ButtonComponent>
            <ButtonComponent {...props} size={ButtonSize.small} withArrow={true}>
              small with arrow
            </ButtonComponent>
          </div>
          <div>
            <ButtonComponent {...props} buttonType={ButtonType.secondary}>
              secondary
            </ButtonComponent>
            <ButtonComponent {...props} buttonType={ButtonType.secondary} withArrow={true}>
              with arrow
            </ButtonComponent>
            <ButtonComponent {...props} size={ButtonSize.small} buttonType={ButtonType.secondary}>
              small
            </ButtonComponent>
            <ButtonComponent {...props} size={ButtonSize.small} buttonType={ButtonType.secondary} withArrow={true}>
              small with arrow
            </ButtonComponent>
          </div>
          <div>
            <ButtonComponent {...props} disabled={true}>
              disabled
            </ButtonComponent>
            <ButtonComponent {...props} disabled={true} withArrow={true}>
              with arrow disabled
            </ButtonComponent>
            <ButtonComponent {...props} size={ButtonSize.small} disabled={true}>
              small disabled
            </ButtonComponent>
            <ButtonComponent {...props} size={ButtonSize.small} disabled={true} withArrow={true}>
              small with arrow disabled
            </ButtonComponent>
          </div>
          <div>
            <ButtonComponent {...props} disabled={true} buttonType={ButtonType.secondary}>
              disabled
            </ButtonComponent>
            <ButtonComponent {...props} disabled={true} buttonType={ButtonType.secondary} withArrow={true}>
              with arrow disabled
            </ButtonComponent>
            <ButtonComponent {...props} size={ButtonSize.small} buttonType={ButtonType.secondary} disabled={true}>
              small disabled
            </ButtonComponent>
            <ButtonComponent
              {...props}
              size={ButtonSize.small}
              buttonType={ButtonType.secondary}
              disabled={true}
              withArrow={true}
            >
              small with arrow disabled
            </ButtonComponent>
          </div>
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

Button.args = {};

export { Button };
