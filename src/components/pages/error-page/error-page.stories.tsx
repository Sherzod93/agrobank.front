import { ComponentMeta, ComponentStory } from '@storybook/react';
import cs from 'classnames';
import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import useState from 'storybook-addon-state';
import { BaseBackgroundColorContext } from '../../../contexts';
import { fetchPageContent, PageContentFetchState } from '../../../services/reducers';
import { store, useAppDispatch, useAppSelector } from '../../../services/store';
import templateStyles from '../../units/controls/checkbox/style.stories.module.scss';
import { ErrorPage as ErrorPageComponent } from './error-page';

export default {
  argTypes: {
    url: {
      control: {
        type: 'select',
        options: [0, 404, 500],
        labels: {
          0: 'Неизвестная ошибка',
          404: 'Страница не найдена',
          500: 'Ошибка сервера',
        },
      },
      defaultValue: 404,
    },
  },
  title: 'Pages/Error Page',
  component: ErrorPageComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Router>
          <HelmetProvider>
            <Story />
          </HelmetProvider>
        </Router>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof ErrorPageComponent>;

const ErrorPage: ComponentStory<typeof ErrorPageComponent> = (props, { globals: { baseBackgroundColor } }) => {
  const { requestPhase: pageContentRequestPhase } = useAppSelector((state) => state.pageContent);
  const dispatch = useAppDispatch();
  const { url } = props as unknown as { url: number };
  const [prevUrl, setPrevUrl] = useState('prevUrl', url);

  useEffect(() => {
    if (
      ![PageContentFetchState.fulfilled, PageContentFetchState.pending, PageContentFetchState.rejected].includes(
        pageContentRequestPhase,
      ) ||
      prevUrl !== url
    ) {
      setPrevUrl(url);
      dispatch(fetchPageContent(`/${url}`));
    }
  }, [dispatch, pageContentRequestPhase, prevUrl, url]);

  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor }}>
      <div
        key={(props as any).status}
        className={cs(templateStyles.template, templateStyles[`template_base-background-color_${baseBackgroundColor}`])}
      >
        <ErrorPageComponent {...props} />
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

export { ErrorPage };
