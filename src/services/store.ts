import { configureStore } from '@reduxjs/toolkit';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  advices,
  createApplication,
  currencies,
  footer,
  language,
  menu,
  news,
  pageContent,
  places,
  pointsOfService,
  regions,
  searchTags,
  settings,
  vacancies,
} from './reducers';

const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  reducer: {
    advices,
    createApplication,
    currencies,
    footer,
    language,
    menu,
    news,
    pageContent,
    places,
    pointsOfService,
    regions,
    searchTags,
    settings,
    vacancies,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(func: (state: RootState) => T, cmp?: typeof shallowEqual): T =>
  useSelector(func, cmp);

export { store };
