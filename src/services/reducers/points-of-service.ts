import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterItemData, PointOfServiceAddress } from '../../interfaces';
import { fetchPointsOfService as apiFetchPointsOfService } from '../api';
import { RootState } from '../store';

export enum PointsOfServiceFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  filters: Record<string, any>;
  language: string | null;
  pointsOfService: PointOfServiceAddress[];
  hasMore: boolean;
  page: number;
  requestPhase: PointsOfServiceFetchState;
}> = {
  filters: {},
  language: null,
  pointsOfService: [],
  hasMore: false,
  page: 0,
  requestPhase: PointsOfServiceFetchState.initial,
};

const fetchPointsOfService = createAsyncThunk(
  'pointsOfService/fetchPointsOfServices',
  async ({
    filters,
    language,
    page,
    pageSize,
  }: {
    filters: Record<string, any>;
    language: string;
    page?: number;
    pageSize?: number;
  }) =>
    await apiFetchPointsOfService({
      language,
      filters,
      page,
      pageSize,
    }),
);

export const fetchMorePointsOfService = createAsyncThunk(
  'pointsOfService/fetchMorePointsOfServices',
  async (_, { dispatch, getState }): Promise<void> => {
    const state = getState() as RootState;

    if (state.pointsOfService.requestPhase !== PointsOfServiceFetchState.pending) {
      await dispatch(
        fetchPointsOfService({
          filters: state.pointsOfService.filters,
          language: state.pointsOfService.language!,
          page: state.pointsOfService.page,
          pageSize: 10,
        }),
      );
    }
  },
);

export const setPointsOfServiceLanguage = createAsyncThunk(
  'pointsOfService/setLanguage',
  async (
    {
      language,
    }: {
      language: string;
    },
    { dispatch },
  ) => {
    if (language) {
      await dispatch(slice.actions.setLanguage(language));
      await dispatch(fetchMorePointsOfService());
    }
  },
);

export const setPointsOfServiceFilters = createAsyncThunk(
  'pointsOfService/setFilters',
  async (
    {
      filters,
      sectionIdToSectionMap,
    }: {
      filters: Record<string, any>;
      sectionIdToSectionMap: Map<number, FilterItemData>;
    },
    { dispatch },
  ) => {
    await dispatch(slice.actions.setFilters(filters));
    await dispatch(fetchMorePointsOfService());
  },
);

const slice = createSlice({
  name: 'pointsOfService',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<typeof initialState.language>) {
      state.pointsOfService = [];
      state.language = action.payload;
      state.page = 1;
    },
    setFilters(state, action: PayloadAction<typeof initialState.filters>) {
      state.pointsOfService = [];
      state.filters = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPointsOfService.pending, (state) => {
      state.requestPhase = PointsOfServiceFetchState.pending;
    });
    builder.addCase(fetchPointsOfService.fulfilled, (state, { payload: { items, hasMore } }) => {
      state.pointsOfService = [...state.pointsOfService, ...items];
      state.page += 1;
      state.hasMore = hasMore;
      state.requestPhase = PointsOfServiceFetchState.fulfilled;
    });
    builder.addCase(fetchPointsOfService.rejected, (state) => {
      state.pointsOfService = [];
      state.requestPhase = PointsOfServiceFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as pointsOfService };
