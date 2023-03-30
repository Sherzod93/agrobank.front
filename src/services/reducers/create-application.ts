import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApplication as apiCreateApplication } from '../api';

export enum CreateApplicationFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  formData?: FormData;
  requestPhase: CreateApplicationFetchState;
  errorData?: {
    error: any;
    fieldName: string;
    success: boolean;
  };
}> = {
  requestPhase: CreateApplicationFetchState.initial,
};

export const fetchApplication = createAsyncThunk('create-application/createApplication', apiCreateApplication);

const slice = createSlice({
  name: 'createApplication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApplication.pending, (state) => {
      delete state.errorData;
      state.requestPhase = CreateApplicationFetchState.pending;
    });
    builder.addCase(fetchApplication.fulfilled, (state, { payload }) => {
      state.formData = payload;
      state.requestPhase = CreateApplicationFetchState.fulfilled;
    });
    builder.addCase(fetchApplication.rejected, (state, payload) => {
      // @ts-ignore
      state.errorData = payload;
      state.requestPhase = CreateApplicationFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as createApplication };
