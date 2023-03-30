import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Place } from '../../interfaces';
import { fetchPlaces as apiFetchPlaces } from '../api';

export enum PlacesFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  places?: Place[];
  requestPhase: PlacesFetchState;
}> = {
  requestPhase: PlacesFetchState.initial,
};

export const fetchPlaces = createAsyncThunk('places/fetchPlaces', apiFetchPlaces);

const slice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.pending, (state) => {
      delete state.places;
      state.requestPhase = PlacesFetchState.pending;
    });
    builder.addCase(fetchPlaces.fulfilled, (state, { payload: place }) => {
      state.places = place;
      state.requestPhase = PlacesFetchState.fulfilled;
    });
    builder.addCase(fetchPlaces.rejected, (state) => {
      delete state.places;
      state.requestPhase = PlacesFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as places };
