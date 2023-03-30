import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { YMaps } from 'react-yandex-maps';
import { FeaturesContext, useFeaturesContextValue } from '../../contexts/features';
import { useBrowserDetect } from '../../hooks';
import {
  CurrenciesFetchState,
  fetchCurrencies,
  fetchFooter,
  fetchMenu,
  fetchSettings,
  FooterFetchState,
  MenuFetchState,
  SettingsFetchState,
} from '../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { PageContent } from '../page-content/page-content';
import { Page } from '../page/page';
import { PageLayout } from './page-layout/page-layout';
import appStyles from './style.module.scss';
// import Snowfall from 'react-snowfall';

function App() {
  useBrowserDetect();
  const {
    i18n: { language },
  } = useTranslation();
  const { requestPhase: currenciesRequestPhase } = useAppSelector((state) => state.currencies);
  const { requestPhase: footerRequestPhase } = useAppSelector((state) => state.footer);
  const { requestPhase: menuRequestPhase } = useAppSelector((state) => state.menu);
  const { settings, requestPhase: settingsRequestPhase } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const featuresContextValue = useFeaturesContextValue();

  useEffect(() => {
    if (currenciesRequestPhase === CurrenciesFetchState.initial) {
      dispatch(fetchCurrencies());
    }

    if (footerRequestPhase === FooterFetchState.initial) {
      dispatch(fetchFooter());
    }

    if (menuRequestPhase === MenuFetchState.initial) {
      dispatch(fetchMenu());
    }

    if (settingsRequestPhase === SettingsFetchState.initial) {
      dispatch(fetchSettings());
    }
  }, [currenciesRequestPhase, dispatch, footerRequestPhase, menuRequestPhase, settingsRequestPhase]);

  if (
    currenciesRequestPhase !== CurrenciesFetchState.fulfilled ||
    footerRequestPhase !== FooterFetchState.fulfilled ||
    menuRequestPhase !== MenuFetchState.fulfilled ||
    settingsRequestPhase !== SettingsFetchState.fulfilled
  ) {
    return null;
  }

  return (
    <HelmetProvider>
      <Router>
        <FeaturesContext.Provider value={featuresContextValue}>
          <YMaps
            query={{
              apikey:
                (process.env.NODE_ENV === 'development'
                  ? process.env.REACT_APP_YANDEX_MAP_API_DEVELOPER_KEY
                  : settings?.map.yandexMapsApiKey) ?? '',
            }}
            version="2.1"
          >

            <Page className={appStyles.app}>
              {/*<Snowfall
                  snowflakeCount={100}
                  style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                  }}
              />*/}
              <Routes>
                <Route path="/" element={<PageLayout />}>
                  <Route path="" element={<Navigate to={`${language}`} replace={true} />} />
                  <Route path=":languagePlaceholder/*" element={<PageContent />} />
                </Route>
              </Routes>
            </Page>
          </YMaps>
        </FeaturesContext.Provider>
      </Router>
    </HelmetProvider>
  );
}

export { App };
