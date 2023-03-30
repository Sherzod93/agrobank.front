import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Region } from '../../interfaces';
import { fetchRegions as apiFetchRegions } from '../api';

export enum RegionsFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  regions?: Region[];
  requestPhase: RegionsFetchState;
}> = {
  requestPhase: RegionsFetchState.initial,
};

export const fetchRegions = createAsyncThunk('regions/fetchRegions', apiFetchRegions);

const slice = createSlice({
  name: 'regions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegions.pending, (state) => {
      delete state.regions;
      state.requestPhase = RegionsFetchState.pending;
    });
    builder.addCase(fetchRegions.fulfilled, (state, { payload: region }) => {
      state.regions = region;
      state.requestPhase = RegionsFetchState.fulfilled;
    });
    builder.addCase(fetchRegions.rejected, (state) => {
      delete state.regions;
      state.requestPhase = RegionsFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as regions };
