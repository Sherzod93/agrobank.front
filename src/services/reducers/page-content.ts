import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PageContentData, PageSection } from '../../interfaces';
import { fetchPageContent as apiFetchPageContent } from '../api';

export enum PageContentFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  status?: number;
  content?: Omit<PageContentData, 'sections'> & { sections: PageSection[] };
  requestPhase: PageContentFetchState;
}> = {
  requestPhase: PageContentFetchState.initial,
};

export const fetchPageContent = createAsyncThunk(
  'pageContent/fetchPageContent',
  async (url: string, { rejectWithValue }) => {
    try {
      return await apiFetchPageContent(url);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const slice = createSlice({
  name: 'pageContent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPageContent.pending, (state) => {
      delete state.status;
      delete state.content;
      state.requestPhase = PageContentFetchState.pending;
    });
    builder.addCase(fetchPageContent.fulfilled, (state, { payload: content }) => {
      state.content = {
        ...content,
        sections: content.sections
          .map((sectionData) => {
            try {
              return new PageSection(sectionData, content.contextProduct);
            } catch (e) {
              console.warn(e);
            }

            return null;
          })
          .filter((pageSection) => pageSection) as PageSection[],
      };
      state.requestPhase = PageContentFetchState.fulfilled;
    });
    builder.addCase(fetchPageContent.rejected, (state, { payload }) => {
      if (Object.prototype.hasOwnProperty.call(payload, 'status')) {
        state.status = (payload as any).status;
      }

      delete state.content;
      state.requestPhase = PageContentFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as pageContent };
