import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlockType, FilterItemData, NewsListSourceType } from '../../interfaces';
import { extendNewsItems, NewsItemBlockData } from '../../interfaces/classes/blocks';
import { fetchNews as apiFetchNews } from '../api';
import { RootState } from '../store';

export enum NewsFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  filters: Record<string, any>;
  language: string | null;
  newsItemsBlocks: NewsItemBlockData[];
  hasMore: boolean;
  page: number;
  promotedNewsItemBlock?: NewsItemBlockData;
  requestPhase: NewsFetchState;
}> = {
  filters: {},
  language: null,
  newsItemsBlocks: [],
  hasMore: false,
  page: 0,
  requestPhase: NewsFetchState.initial,
};

const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (params: {
    filters: Record<string, any>;
    language: string;
    page?: number;
    pageSize?: number;
    sourceType: NewsListSourceType;
  }) => await apiFetchNews(params),
);

let sectionIdToSectionMapGlobal: Map<number, FilterItemData>;

export const fetchMoreNews = createAsyncThunk(
  'news/fetchMoreNews',
  async (
    {
      sectionIdToSectionMap,
      sourceType,
    }: { sectionIdToSectionMap: Map<number, FilterItemData>; sourceType: NewsListSourceType },
    { dispatch, getState },
  ): Promise<void> => {
    const state = getState() as RootState;

    sectionIdToSectionMapGlobal = sectionIdToSectionMap;

    if (state.news.requestPhase !== NewsFetchState.pending) {
      await dispatch(
        fetchNews({
          filters: state.news.filters,
          language: state.news.language!,
          page: state.news.page,
          sourceType,
        }),
      );
    }
  },
);

export const setNewsLanguage = createAsyncThunk(
  'news/setLanguage',
  async (
    {
      language,
      sectionIdToSectionMap,
      sourceType,
    }: {
      language: string;
      sectionIdToSectionMap: Map<number, FilterItemData>;
      sourceType: NewsListSourceType;
    },
    { dispatch },
  ) => {
    if (language) {
      await dispatch(slice.actions.setLanguage(language));
      await dispatch(fetchMoreNews({ sectionIdToSectionMap, sourceType }));
    }
  },
);

export const setNewsFilters = createAsyncThunk(
  'news/setFilters',
  async (
    {
      filters,
      sectionIdToSectionMap,
      sourceType,
    }: {
      filters: Record<string, any>;
      sectionIdToSectionMap: Map<number, FilterItemData>;
      sourceType: NewsListSourceType;
    },
    { dispatch },
  ) => {
    await dispatch(slice.actions.setFilters(filters));
    await dispatch(fetchMoreNews({ sectionIdToSectionMap, sourceType }));
  },
);

const slice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.newsItemsBlocks = [];
      state.language = action.payload;
      state.page = 1;
    },
    setFilters(state, action: PayloadAction<typeof initialState.filters>) {
      state.newsItemsBlocks = [];
      state.filters = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.requestPhase = NewsFetchState.pending;
    });
    builder.addCase(fetchNews.fulfilled, (state, { payload: { items, hasMore, promotedNewsItem } }) => {
      const extendedNewsItems = items.map(
        (item) =>
          new NewsItemBlockData({
            type: BlockType.newsItem,
            content: {
              newsItem: extendNewsItems({
                items: [item],
                sectionIdToSectionMap: sectionIdToSectionMapGlobal,
              })[0],
            },
          }),
      );

      if (promotedNewsItem) {
        state.promotedNewsItemBlock = new NewsItemBlockData({
          type: BlockType.newsItem,
          content: {
            newsItem: extendNewsItems({
              items: [promotedNewsItem],
              sectionIdToSectionMap: sectionIdToSectionMapGlobal,
            })[0],
          },
        });
      }

      state.newsItemsBlocks = [...state.newsItemsBlocks, ...extendedNewsItems];
      state.page += 1;
      state.hasMore = hasMore;
      state.requestPhase = NewsFetchState.fulfilled;
    });
    builder.addCase(fetchNews.rejected, (state) => {
      state.newsItemsBlocks = [];
      state.requestPhase = NewsFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as news };
