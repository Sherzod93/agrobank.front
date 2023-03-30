import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Menu } from '../../interfaces/classes/menu';
import { fetchMenu as apiFetchMenu } from '../api';

export enum MenuFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  menu?: Menu;
  requestPhase: MenuFetchState;
}> = {
  requestPhase: MenuFetchState.initial,
};

export const fetchMenu = createAsyncThunk('menu/fetchMenu', apiFetchMenu);

const slice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.pending, (state) => {
      delete state.menu;
      state.requestPhase = MenuFetchState.pending;
    });
    builder.addCase(fetchMenu.fulfilled, (state, { payload: menuData }) => {
      state.menu = new Menu(menuData);
      state.requestPhase = MenuFetchState.fulfilled;
    });
    builder.addCase(fetchMenu.rejected, (state) => {
      delete state.menu;
      state.requestPhase = MenuFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as menu };
