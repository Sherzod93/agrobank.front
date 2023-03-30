import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlockType } from '../../interfaces';
import { VacancyItemBlockData } from '../../interfaces/classes/blocks';
import { fetchVacancies as apiFetchVacancies } from '../api';
import { RootState } from '../store';

export enum VacanciesFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  filters: Record<string, any>;
  language: string | null;
  vacanciesItemsBlocks: VacancyItemBlockData[];
  hasMore: boolean;
  page: number;
  requestPhase: VacanciesFetchState;
}> = {
  filters: {},
  language: null,
  vacanciesItemsBlocks: [],
  hasMore: false,
  page: 0,
  requestPhase: VacanciesFetchState.initial,
};

const fetchVacancies = createAsyncThunk(
  'vacancies/fetchVacancies',
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
    await apiFetchVacancies({
      language,
      filters,
      page,
      pageSize,
    }),
);

export const fetchMoreVacancies = createAsyncThunk(
  'vacancies/fetchMoreVacancies',
  async (_, { dispatch, getState }): Promise<void> => {
    const state = getState() as RootState;

    if (state.vacancies.requestPhase !== VacanciesFetchState.pending) {
      await dispatch(
        fetchVacancies({
          filters: state.vacancies.filters,
          language: state.vacancies.language!,
          page: state.vacancies.page,
        }),
      );
    }
  },
);

export const setVacanciesLanguage = createAsyncThunk(
  'vacancies/setLanguage',
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
      await dispatch(fetchMoreVacancies());
    }
  },
);

export const setVacanciesFilters = createAsyncThunk(
  'vacancies/setFilters',
  async (
    {
      filters,
    }: {
      filters: Record<string, any>;
    },
    { dispatch },
  ) => {
    await dispatch(slice.actions.setFilters(filters));
    await dispatch(fetchMoreVacancies());
  },
);

const slice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<typeof initialState.language>) {
      state.vacanciesItemsBlocks = [];
      state.language = action.payload;
      state.page = 1;
    },
    setFilters(state, action: PayloadAction<typeof initialState.filters>) {
      state.vacanciesItemsBlocks = [];
      state.filters = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVacancies.pending, (state) => {
      state.requestPhase = VacanciesFetchState.pending;
    });
    builder.addCase(fetchVacancies.fulfilled, (state, { payload: { items, hasMore } }) => {
      const vacanciesItems = items.map(
        (vacancyItem) =>
          new VacancyItemBlockData({
            type: BlockType.vacancyItem,
            content: {
              vacancyItem,
            },
          }),
      );

      state.vacanciesItemsBlocks = [...state.vacanciesItemsBlocks, ...vacanciesItems];
      state.page += 1;
      state.hasMore = hasMore;
      state.requestPhase = VacanciesFetchState.fulfilled;
    });
    builder.addCase(fetchVacancies.rejected, (state) => {
      state.vacanciesItemsBlocks = [];
      state.requestPhase = VacanciesFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as vacancies };
