import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TextProductTagData } from '../../interfaces';
import { fetchSearchTags as apiFetchSearchTags } from '../api';
import { RootState } from '../store';

export enum SearchTagsFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  hasMore: boolean;
  items: TextProductTagData[];
  language: string | null;
  page: number;
  requestPhase: SearchTagsFetchState;
}> = {
  hasMore: false,
  items: [],
  language: null,
  page: 0,
  requestPhase: SearchTagsFetchState.initial,
};

const fetchSearchTags = createAsyncThunk(
  'searchTags/fetchSearchTags',
  async ({ language, page, pageSize }: { language: string; page?: number; pageSize?: number }) =>
    await apiFetchSearchTags({
      language,
      page,
      pageSize,
    }),
);

export const fetchMoreSearchTags = createAsyncThunk(
  'searchTags/fetchMoreSearchTags',
  async (_, { dispatch, getState }): Promise<void> => {
    const state = getState() as RootState;

    if (state.searchTags.requestPhase !== SearchTagsFetchState.pending) {
      await dispatch(
        fetchSearchTags({
          language: state.searchTags.language!,
          page: state.searchTags.page,
        }),
      );
    }
  },
);

export const setSearchTagsLanguage = createAsyncThunk(
  'searchTags/setLanguage',
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
      await dispatch(fetchMoreSearchTags());
    }
  },
);

const slice = createSlice({
  name: 'searchTags',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<typeof initialState.language>) {
      state.items = [];
      state.language = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchTags.pending, (state) => {
      state.requestPhase = SearchTagsFetchState.pending;
    });
    builder.addCase(fetchSearchTags.fulfilled, (state, { payload: { items, hasMore } }) => {
      state.items = [...state.items, ...items];
      state.page += 1;
      state.hasMore = hasMore;
      state.requestPhase = SearchTagsFetchState.fulfilled;
    });
    builder.addCase(fetchSearchTags.rejected, (state) => {
      state.items = [];
      state.requestPhase = SearchTagsFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as searchTags };
