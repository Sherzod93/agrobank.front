import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { BaseBackgroundColorContext } from '../../../contexts';
import { fetchMenu, MenuFetchState } from '../../../services/reducers';
import { store, useAppDispatch, useAppSelector } from '../../../services/store';
import '../../../styles/index.scss';
import { InternetBankMenu as InternetBankButtonComponent } from './internet-bank-menu';
import templateStyles from './style.stories.module.scss';

export default {
  title: 'Components/Internet Bank Button',
  component: InternetBankButtonComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Router>
          <Story />
        </Router>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof InternetBankButtonComponent>;

const InternetBankButton: ComponentStory<typeof InternetBankButtonComponent> = (
  props,
  { globals: { baseBackgroundColor } },
) => {
  const { requestPhase } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (requestPhase === MenuFetchState.initial) {
      dispatch(fetchMenu());
    }
  }, [dispatch, requestPhase]);

  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <div className={templateStyles['template__layout']}>
          <div>{requestPhase === MenuFetchState.fulfilled ? <InternetBankButtonComponent /> : null}</div>
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

export { InternetBankButton };
