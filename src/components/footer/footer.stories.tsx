import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { fetchFooter, FooterFetchState } from '../../services/reducers';
import { store, useAppDispatch, useAppSelector } from '../../services/store';
import { Footer as FooterComponent } from './footer';

export default {
  title: 'Components/Footer',
  component: FooterComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof FooterComponent>;

const Footer: ComponentStory<typeof FooterComponent> = (props) => {
  const { requestPhase: footerRequestState } = useAppSelector((state) => state.footer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (footerRequestState === FooterFetchState.initial) {
      dispatch(fetchFooter());
    }
  }, [dispatch, footerRequestState]);

  return <Router>{footerRequestState === FooterFetchState.fulfilled ? <FooterComponent {...props} /> : null}</Router>;
};

export { Footer };
