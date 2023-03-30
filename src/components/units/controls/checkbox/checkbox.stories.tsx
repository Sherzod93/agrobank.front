import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React, { useCallback } from 'react';
import { BaseBackgroundColorContext } from '../../../../contexts';
import '../../../../styles/index.scss';
import { Checkbox as CheckboxComponent } from './checkbox';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Controls/Checkbox',
  component: CheckboxComponent,
} as ComponentMeta<typeof CheckboxComponent>;

const Checkbox: ComponentStory<typeof CheckboxComponent> = (
  { children, ...restArgs },
  { globals: { baseBackgroundColor } },
) => {
  const onChangeHandler = useCallback(() => {}, []);

  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <div className={templateStyles['template__layout']}>
          <div>
            <CheckboxComponent {...restArgs} checked={false} onChange={onChangeHandler}>
              {children || 'unchecked'}
            </CheckboxComponent>
          </div>
          <div>
            <CheckboxComponent {...restArgs} checked={true} onChange={onChangeHandler}>
              {children || 'checked'}
            </CheckboxComponent>
          </div>
          <div>
            <CheckboxComponent {...restArgs} checked={true} indeterminate={true} onChange={onChangeHandler}>
              {children || 'indeterminate'}
            </CheckboxComponent>
          </div>
          <div>
            <CheckboxComponent {...restArgs} disabled={true} checked={false} onChange={onChangeHandler}>
              {children || 'disabled unchecked'}
            </CheckboxComponent>
          </div>
          <div>
            <CheckboxComponent {...restArgs} disabled={true} checked={true} onChange={onChangeHandler}>
              {children || 'disabled checked'}
            </CheckboxComponent>
          </div>
          <div>
            <CheckboxComponent
              {...restArgs}
              checked={true}
              disabled={true}
              indeterminate={true}
              onChange={onChangeHandler}
            >
              {children || 'disabled indeterminate'}
            </CheckboxComponent>
          </div>
          <div>
            <CheckboxComponent {...restArgs} onChange={onChangeHandler}>
              {children || 'live'}
            </CheckboxComponent>
          </div>
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

Checkbox.args = {};

export { Checkbox };
