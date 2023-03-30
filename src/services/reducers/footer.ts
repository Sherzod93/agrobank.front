import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ImageInfoData, MobileApplicationLink, SocialNetworkLink } from '../../interfaces';
import { buildImageInfo } from '../../interfaces/classes/helpers';
import { fetchFooter as apiFetchFooter } from '../api';

export enum FooterFetchState {
  initial,
  pending,
  fulfilled,
  rejected,
}

const initialState: Readonly<{
  mobileApplicationLinks: MobileApplicationLink[];
  socialNetworksLinks: SocialNetworkLink[];
  visitors: number;
  requestPhase: FooterFetchState;
}> = {
  mobileApplicationLinks: [],
  socialNetworksLinks: [],
  visitors: 0,
  requestPhase: FooterFetchState.initial,
};

export const fetchFooter = createAsyncThunk('footer/fetchFooter', apiFetchFooter);

const slice = createSlice({
  name: 'footer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFooter.pending, (state) => {
      state.mobileApplicationLinks = [];
      state.socialNetworksLinks = [];
      state.visitors = 0;
      state.requestPhase = FooterFetchState.pending;
    });
    builder.addCase(fetchFooter.fulfilled, (state, { payload: { mobileApplicationLinks, socialNetworksLinks,visitors } }) => {
      state.mobileApplicationLinks = mobileApplicationLinks.map((item) => ({
        ...item,
        picture: buildImageInfo(item.picture as unknown as ImageInfoData),
      }));
      state.socialNetworksLinks = socialNetworksLinks;
      state.visitors = visitors;
      state.requestPhase = FooterFetchState.fulfilled;
    });

    builder.addCase(fetchFooter.rejected, (state) => {
      state.mobileApplicationLinks = [];
      state.socialNetworksLinks = [];
      state.visitors = 0;
      state.requestPhase = FooterFetchState.rejected;
    });
  },
});

const { reducer } = slice;

export { reducer as footer };
