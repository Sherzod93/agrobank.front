import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React, { useCallback } from 'react';
import { BaseBackgroundColorContext } from '../../../../contexts';
import '../../../../styles/index.scss';
import { Radio as RadioComponent } from './radio';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Controls/Radio',
  component: RadioComponent,
} as ComponentMeta<typeof RadioComponent>;

const Radio: ComponentStory<typeof RadioComponent> = (
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
            <RadioComponent {...restArgs} checked={false} onChange={onChangeHandler}>
              {children || 'unchecked'}
            </RadioComponent>
          </div>
          <div>
            <RadioComponent {...restArgs} checked={true} onChange={onChangeHandler}>
              {children || 'checked'}
            </RadioComponent>
          </div>
          <div>
            <RadioComponent {...restArgs} disabled={true} checked={false} onChange={onChangeHandler}>
              {children || 'disabled unchecked'}
            </RadioComponent>
          </div>
          <div>
            <RadioComponent {...restArgs} disabled={true} checked={true} onChange={onChangeHandler}>
              {children || 'disabled checked'}
            </RadioComponent>
          </div>
        </div>
        <div className={templateStyles['template__layout']}>
          <div>
            <RadioComponent {...restArgs} name="mess" onChange={onChangeHandler}>
              {children || 'live 1'}
            </RadioComponent>
          </div>
          <div>
            <RadioComponent {...restArgs} name="mess" onChange={onChangeHandler}>
              {children || 'live 2'}
            </RadioComponent>
          </div>
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

Radio.args = {};

export { Radio };
