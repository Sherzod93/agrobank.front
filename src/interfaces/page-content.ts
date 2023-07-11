import { PageSectionData } from './classes';
import { ProductData } from './product';

export interface PageContentData {
  contextProduct?: ProductData;
  isMainPage: boolean;
  isPageForBusiness: boolean;
  mainPageUrl: string;
  sections: PageSectionData[];
  seo: {
    description?: string;
    keywords?: string;
    og: {
      description?: string;
      image?: {
        src: string;
        width?: number;
        height?: number;
      };
      title?: string;
      url?: string;
    };
    title?: string;
  };
  lastUpdatedDate: string;
  statistic:any;
}
