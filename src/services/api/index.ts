import { UnwrapPromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { VacancyItemData } from '../../components/blocks';
import {
  AdviceData,
  AppSettings,
  CurrencyRecord,
  MobileApplicationLink,
  NewsItemData,
  NewsListSourceType,
  PageContentData,
  Place,
  PointOfServiceAddress,
  Region,
  SocialNetworkLink,
  TextProductTagData,
} from '../../interfaces';
import { BackendMenuData } from '../../interfaces/classes/menu';

export const createApplication = async (formData: FormData): Promise<any> => {
  const fetchResponse = await fetch('/api/v1/?action=productApplying', {
    body: formData,
    method: 'POST',
  });

  const response = await fetchResponse.json();

  if (response.success !== true) {
    return response;
    // if (response.error) {
    //   return Promise.reject(response.error);
    // }
    //
    // throw new Error(response.message);
  }
};

function addFiltersParams(urlSearchParams: URLSearchParams, filters: Record<string, any> = {}) {
  Object.entries(filters).forEach(([key, value]) => {
    if (value != null) {
      urlSearchParams.append(key, String(value));
    }
  });
}

export const fetchAdvices = async ({
  filters,
  language,
  page = 0,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  language: string;
  page?: number;
  pageSize?: number;
}): Promise<{ hasMore: boolean; items: AdviceData[] }> => {
  const urlSearchParams = new URLSearchParams('action=advice.getList');

  addFiltersParams(urlSearchParams, filters);

  if (language != null) {
    urlSearchParams.append('lang', language);
  }

  if (page != null) {
    urlSearchParams.append('page', String(page));
  }

  if (pageSize != null) {
    urlSearchParams.append('pageSize', String(pageSize));
  }

  const fetchResponse = await fetch(`/api/v1/?${urlSearchParams}`);
  const response = await fetchResponse.json();

  if (response.success !== true) {
    throw new Error(response.message);
  }

  return {
    hasMore: response.data.hasMore,
    items: response.data.items,
  };
};

export const fetchCurrencies = async (): Promise<Record<string, CurrencyRecord>> => {
  const fetchResponse = await fetch('/api/v1/?action=currencies');
  const response = await fetchResponse.json();

  if (response.success !== true) {
    throw new Error(response.message);
  }

  return Object.entries(response.data as Record<string, CurrencyRecord>).reduce(
    (result, [code, { symbol }]) => Object.assign(result, { [code]: { code, symbol } }),
    {},
  );
};

export const fetchFooter = async (): Promise<{
  mobileApplicationLinks: MobileApplicationLink[];
  socialNetworksLinks: SocialNetworkLink[];
  visitors: number,
}> => {
  const fetchResponse = await fetch('/api/v1/?action=footer');
  const response = await fetchResponse.json();

  if (!response.success) {
    throw new Error('Cannot get footer data');
  }

  return {
    mobileApplicationLinks: response.data.mobileApplicationLinks,
    socialNetworksLinks: response.data.socialNetworksLinks,
    visitors: response.data.visitors,
  };
};

export const fetchMenu = async (): Promise<BackendMenuData> => {
  const response = await fetch('/api/v1/menu.json');

  if (!response.ok) {
    throw new Error('Cannot get menu');
  }

  return await response.json();
};

export const fetchNews = async ({
  filters,
  language,
  page = 0,
  pageSize = 10,
  sourceType,
}: {
  filters?: Record<string, any>;
  language: string;
  page?: number;
  pageSize?: number;
  sourceType: NewsListSourceType;
}): Promise<{ hasMore: boolean; promotedNewsItem?: NewsItemData; items: NewsItemData[] }> => {
  const sourceTypeToActionMap = {
    [NewsListSourceType.common]: 'pressCenter.getList',
    [NewsListSourceType.government]: 'government.getList',
  };

  const urlSearchParams = new URLSearchParams();

  urlSearchParams.append('action', sourceTypeToActionMap[sourceType]);

  addFiltersParams(urlSearchParams, filters);

  if (language != null) {
    urlSearchParams.append('lang', language);
  }

  if (page != null) {
    urlSearchParams.append('page', String(page));
  }

  if (pageSize != null) {
    urlSearchParams.append('pageSize', String(pageSize));
  }

  const fetchResponse = await fetch(`/api/v1/?${urlSearchParams}`);
  const response = await fetchResponse.json();

  if (response.success !== true) {
    throw new Error(response.message);
  }

  const result: UnwrapPromise<ReturnType<typeof fetchNews>> = {
    hasMore: response.data.hasMore,
    items: response.data.items,
  };

  if (response.data.promotedNewsItem) {
    result.promotedNewsItem = response.data.promotedNewsItem;
  }

  return result;
};

export const fetchPageContent = async (url: string): Promise<PageContentData> => {
  const fetchResponse = await fetch(`/api/v1/?action=pages&code=${encodeURIComponent(url.slice(1))}`);
  const response = await fetchResponse.json();

  if (response.success !== true) {
    if (response.data?.status) {
      return Promise.reject({ status: response.data.status });
    }

    throw new Error(response.message);
  }

  const result: UnwrapPromise<ReturnType<typeof fetchPageContent>> = {
    isMainPage: response.data.isMainPage,
    isPageForBusiness: response.data.isPageForBusiness,
    mainPageUrl: response.data.mainPageUrl,
    sections: response.data.sections,
    seo: response.data.seo,
    lastUpdatedDate: response.data.lastUpdatedDate,
    statistic:response.data.statistic,
  };

  if (response.data.contextProduct) {
    result.contextProduct = response.data.contextProduct;
  }

  return result;
};

export const fetchSearchResult = async (
  query: string,
  { mapCode, page, pageSize }: { mapCode?: string; page?: number; pageSize?: number } = {},
): Promise<any> => {
  const urlSearchParams = new URLSearchParams('action=search');

  urlSearchParams.append('query', query);

  if (mapCode != null) {
    urlSearchParams.append('mapCode', mapCode);
  }

  if (page != null) {
    urlSearchParams.append('page', String(page));
  }

  if (pageSize != null) {
    urlSearchParams.append('pageSize', String(pageSize));
  }

  const fetchResponse = await fetch(`/api/v1/?${urlSearchParams}`);
  const response = await fetchResponse.json();

  if (response.success !== true) {
    throw new Error(response.message);
  }

  return response.data.items;
};

export const fetchPointsOfService = async ({
  filters,
  language,
  page = 0,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  language: string;
  page?: number;
  pageSize?: number;
}): Promise<{ hasMore: boolean; items: PointOfServiceAddress[] }> => {
  const urlSearchParams = new URLSearchParams('action=pos.getList');

  addFiltersParams(urlSearchParams, filters);

  if (language != null) {
    urlSearchParams.append('lang', language);
  }

  if (page != null) {
    urlSearchParams.append('page', String(page));
  }

  if (pageSize != null) {
    urlSearchParams.append('pageSize', String(pageSize));
  }

  const fetchResponse = await fetch(`/api/v1/?${urlSearchParams}`);
  const response = await fetchResponse.json();

  if (response.success !== true) {
    throw new Error(response.message);
  }

  return {
    hasMore: response.data.hasMore,
    items: response.data.items,
  };
};

export const fetchSearchTags = async ({
  language,
  page = 1,
  pageSize = 12,
}: {
  language: string;
  page?: number;
  pageSize?: number;
}): Promise<{ hasMore: boolean; items: TextProductTagData[] }> => {
  const urlSearchParams = new URLSearchParams('action=searchTags.getList');

  if (language != null) {
    urlSearchParams.append('lang', language);
  }

  if (page != null) {
    urlSearchParams.append('page', String(page));
  }

  if (pageSize != null) {
    urlSearchParams.append('pageSize', String(pageSize));
  }

  const fetchResponse = await fetch(`/api/v1/?${urlSearchParams}`);
  const response = await fetchResponse.json();

  if (response.success !== true) {
    throw new Error(response.message);
  }

  return {
    hasMore: response.data.hasMore,
    items: response.data.items,
  };
};

export const fetchSettings = async (): Promise<AppSettings> => {
  const fetchResponse = await fetch('/api/v1/?action=settings');
  const response = await fetchResponse.json();

  if (response.success !== true) {
    throw new Error(response.message);
  }

  return response.data;
};

export const fetchVacancies = async ({
  filters,
  language,
  page = 0,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  language: string;
  page?: number;
  pageSize?: number;
}): Promise<{ hasMore: boolean; items: VacancyItemData[] }> => {
  const urlSearchParams = new URLSearchParams('action=vacancy.getList');

  addFiltersParams(urlSearchParams, filters);
  if (language != null) {
    urlSearchParams.append('lang', language);
  }

  if (page != null) {
    urlSearchParams.append('page', String(page));
  }

  if (pageSize != null) {
    urlSearchParams.append('pageSize', String(pageSize));
  }

  const fetchResponse = await fetch(`/api/v1/?${urlSearchParams}`);
  const response = await fetchResponse.json();

  if (response.success !== true) {
    throw new Error(response.message);
  }

  return {
    hasMore: response.data.hasMore,
    items: response.data.items,
  };
};

export const fetchRegions = async (lang = 'ru'): Promise<Region[]> => {
  const fetchResponse = await fetch(`/api/v1/?action=productApplying&method=getRegions&lang=${lang}`);
  const response = await fetchResponse.json();

  if (response.success !== true) {
    throw new Error(response.message);
  }

  return response.data;
};

export const fetchPlaces = async (lang = 'ru'): Promise<Place[]> => {
  const fetchResponse = await fetch(`/api/v1/?action=productApplying&method=getPlaces&lang=${lang}`);
  const response = await fetchResponse.json();

  if (response.success !== true) {
    throw new Error(response.message);
  }

  return response.data;
};

export const setAppLanguage = async ({
  language,
  url,
}: {
  language: string;
  url: string;
}): Promise<{ url: string }> => {
  const urlSearchParams = new URLSearchParams();

  urlSearchParams.append('action', 'language.change');

  const fetchResponse = await fetch(`/api/v1/?${urlSearchParams}`, {
    body: JSON.stringify({
      lang: language,
      url,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  const response = await fetchResponse.json();

  if (response.success !== true) {
    throw new Error(response.message);
  }

  return {
    url: response.data.url,
  };
};

