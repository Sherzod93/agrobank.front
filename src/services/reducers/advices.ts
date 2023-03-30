import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlockType, FilterItemData } from '../../interfaces';
import { AdviceItemBlockData } from '../../interfaces/classes/blocks';
import { fetchAdvices as apiFetchAdvices } from '../api';
import { RootState } from '../store';

export enum AdvicesFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  filters: Record<string, any>;
  language: string | null;
  adviceItemBlocks: AdviceItemBlockData[];
  hasMore: boolean;
  page: number;
  requestPhase: AdvicesFetchState;
}> = {
  filters: {},
  language: null,
  adviceItemBlocks: [],
  hasMore: false,
  page: 0,
  requestPhase: AdvicesFetchState.initial,
};

const fetchAdvices = createAsyncThunk(
  'advice/fetchAdvices',
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
    await apiFetchAdvices({
      language,
      filters,
      page,
      pageSize,
    }),
);

let sectionIdToSectionMapGlobal: Map<number, FilterItemData>;

export const fetchMoreAdvices = createAsyncThunk(
  'advices/fetchMoreAdvices',
  async (
    { sectionIdToSectionMap }: { sectionIdToSectionMap: Map<number, FilterItemData> },
    { dispatch, getState },
  ): Promise<void> => {
    const state = getState() as RootState;

    sectionIdToSectionMapGlobal = sectionIdToSectionMap;

    if (state.advices.requestPhase !== AdvicesFetchState.pending) {
      await dispatch(
        fetchAdvices({
          filters: state.advices.filters,
          language: state.advices.language!,
          page: state.advices.page,
          pageSize: 15,
        }),
      );
    }
  },
);

export const setAdvicesLanguage = createAsyncThunk(
  'advices/setLanguage',
  async (
    {
      language,
      sectionIdToSectionMap,
    }: {
      language: string;
      sectionIdToSectionMap: Map<number, FilterItemData>;
    },
    { dispatch },
  ) => {
    if (language) {
      await dispatch(slice.actions.setLanguage(language));
      await dispatch(fetchMoreAdvices({ sectionIdToSectionMap }));
    }
  },
);

export const setAdvicesFilters = createAsyncThunk(
  'advices/setFilters',
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
    await dispatch(fetchMoreAdvices({ sectionIdToSectionMap }));
  },
);

const slice = createSlice({
  name: 'advices',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<typeof initialState.language>) {
      state.adviceItemBlocks = [];
      state.language = action.payload;
      state.page = 1;
    },
    setFilters(state, action: PayloadAction<typeof initialState.filters>) {
      state.adviceItemBlocks = [];
      state.filters = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdvices.pending, (state) => {
      state.requestPhase = AdvicesFetchState.pending;
    });
    builder.addCase(fetchAdvices.fulfilled, (state, { payload: { items, hasMore } }) => {
      const adviceItems: AdviceItemBlockData[] = [];

      while (items.length > 0) {
        adviceItems.push(
          new AdviceItemBlockData({
            type: BlockType.adviceItem,
            content: {
              items: items.splice(0, 3),
              sectionIdToSectionMap: sectionIdToSectionMapGlobal,
            },
          }),
        );
      }

      state.adviceItemBlocks = [...state.adviceItemBlocks, ...adviceItems];
      state.page += 1;
      state.hasMore = hasMore;
      state.requestPhase = AdvicesFetchState.fulfilled;
    });
    builder.addCase(fetchAdvices.rejected, (state) => {
      state.adviceItemBlocks = [];
      state.requestPhase = AdvicesFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as advices };
