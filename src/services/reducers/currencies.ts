import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CurrencyRecord } from '../../interfaces';
import { fetchCurrencies as apiFetchCurrencies } from '../api';

export enum CurrenciesFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  currencyCodeToCurrencyRecordMap?: Record<string, CurrencyRecord>;
  requestPhase: CurrenciesFetchState;
}> = {
  requestPhase: CurrenciesFetchState.initial,
};

export const fetchCurrencies = createAsyncThunk('currencies/fetchCurrencies', apiFetchCurrencies);

const slice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state) => {
      delete state.currencyCodeToCurrencyRecordMap;
      state.requestPhase = CurrenciesFetchState.pending;
    });
    builder.addCase(fetchCurrencies.fulfilled, (state, { payload: currencyCodeToCurrencyRecordMap }) => {
      state.currencyCodeToCurrencyRecordMap = currencyCodeToCurrencyRecordMap;
      state.requestPhase = CurrenciesFetchState.fulfilled;
    });
    builder.addCase(fetchCurrencies.rejected, (state) => {
      delete state.currencyCodeToCurrencyRecordMap;
      state.requestPhase = CurrenciesFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as currencies };
