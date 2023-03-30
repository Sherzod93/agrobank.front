import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setAppLanguage as apiSetAppLanguage } from '../api';

export enum LanguageFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  requestPhase: LanguageFetchState;
  url?: string;
}> = {
  requestPhase: LanguageFetchState.initial,
};

export const setLanguage = createAsyncThunk('language/setLanguage', apiSetAppLanguage);

const slice = createSlice({
  name: 'language',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setLanguage.pending, (state) => {
      delete state.url;
      state.requestPhase = LanguageFetchState.pending;
    });
    builder.addCase(setLanguage.fulfilled, (state, { payload: { url } }) => {
      state.url = url;
      state.requestPhase = LanguageFetchState.fulfilled;
    });
    builder.addCase(setLanguage.rejected, (state) => {
      delete state.url;
      state.requestPhase = LanguageFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as language };
