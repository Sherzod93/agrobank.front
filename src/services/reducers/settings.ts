import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppSettings } from '../../interfaces';
import { fetchSettings as apiFetchSettings } from '../api';

export enum SettingsFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  settings?: AppSettings;
  requestPhase: SettingsFetchState;
}> = {
  requestPhase: SettingsFetchState.initial,
};

export const fetchSettings = createAsyncThunk('settings/fetchSettings', apiFetchSettings);

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.pending, (state) => {
      delete state.settings;
      state.requestPhase = SettingsFetchState.pending;
    });
    builder.addCase(fetchSettings.fulfilled, (state, { payload: settings }) => {
      state.settings = settings;
      state.requestPhase = SettingsFetchState.fulfilled;
    });
    builder.addCase(fetchSettings.rejected, (state) => {
      delete state.settings;
      state.requestPhase = SettingsFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as settings };
