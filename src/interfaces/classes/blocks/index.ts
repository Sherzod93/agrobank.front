import { BlockType } from '../../enums';
import { AdviceItemBlockData } from './advice-item-block-data';
import { AdviceListBlockData } from './advice-list-block-data';
import { BankCellRentalBlockData } from './bank-cell-rental-block-data';
import { CalculatorBlockData } from './calculator-block-data';
import { CallCenterBlockData } from './call-center-block-data';
import { CarouselBlockData } from './carousel-block-data';
import { ChronologyBlockData } from './chronology-block-data';
import { CompactProductBannerBlockData } from './compact-product-banner-block-data';
import { ContactsBlockData } from './contacts-block-data';
import { CurrencyRatesBlockData } from './currency-rates-block-data';
import { FaqBlockData } from './faq-block-data';
import { FileDownloadBlockData } from './file-download-block-data';
import { FoldablePersonListBlockData } from './foldable-person-list-block-data';
import { HeaderBlockData } from './header-block-data';
import { ImageBlockData } from './image-block-data';
import { InfoCardsBlockData } from './info-cards-block-data';
import { InformationBlockData } from './information-block-data';
import { LinkBlockData } from './link-block-data';
import { LinkListBlockData } from './link-list-block-data';
import { ListBlockData } from './list-block-data';
import { MainProductBannerBlockData } from './main-product-banner-block-data';
import { ProductApplyingBlockData } from './product-applying-data';
import { MobileBankBlockData } from './mobile-bank-block-data';
import { NavigateBlockData } from './navigate-block-data';
import { NewsBlockData } from './news-block-data';
import { NewsItemBlockData } from './news-item-block-data';
import { NewsListBlockData } from './news-list-block-data';
import { NextNewsItemBlockData } from './next-news-item-block-data';
import { OtherVacanciesBlockData } from './other-vacancies-data';
import { PersonListBlockData } from './person-list-block-data';
import { PointsOfServiceBlockData } from './points-of-service-block-data';
import { ProductAdvantagesBlockData } from './product-advantages-block-data';
import { ProductApplyingStepsBlockData } from './product-applying-steps-block-data';
import { ProductBannerBlockData } from './product-banner-block-data';
import { ProductListBlockData } from './product-list-block-data';
import { ProductOffersBlockData } from './product-offers-block-data';
import { ProductPropertiesBlockData } from './product-properties-block-data';
import { QuoteBlockData } from './quote-block-data';
import { SearchBlockData } from './search-block-data';
import { ShareBlockData } from './share-block-data';
import { StaffExperienceBlockData } from './staff-experience-block-data';
import { StatisticsBlockData } from './statictics-block-data';
import { TabBlockData } from './tab-block-data';
import { TableBlockData } from './table-block-data';
import { TabsBlockData } from './tabs-block-data';
import { TagsBlockData } from './tags-block-data';
import { TerminatorBlockData } from './terminator-block-data';
import { TextBannerBlockData } from './text-banner-block-data';
import { TextBlockData } from './text-block-data';
import { TickerBlockData } from './ticker-block-data';
import { TilesListBlockData } from './tiles-list-block-data';
import { VacancyListBlockData } from './vacancy-list-block-data';
import { ControlApplyingBlockData } from './control-applying-block-data';
import { CurrencyCalculatorBlockData } from './currency-calculator-block-data';
import { SiteMapData } from './site-map-block-data';
import { ReceptionFormBlockData } from './reception-form-block-data';
import { PollsListBlockData } from './polls-list-data';
import { VoteBlockData } from './vote-block-data';
import { VoteResultBlockData } from './vote-result-data';
import { ChartColumnBlockData } from './chart-column-block-data';
import { ChartPieBlockData } from './chart-pie-block-data';

// if block is presented only on frontend side,
// null must be used as value in following map
export const pageSectionBlockTypeToDataClassMap = {
  [BlockType.adviceItem]: AdviceItemBlockData,
  [BlockType.adviceList]: AdviceListBlockData,
  [BlockType.bankCellRental]: BankCellRentalBlockData,
  [BlockType.calculator]: CalculatorBlockData,
  [BlockType.callCenter]: CallCenterBlockData,
  [BlockType.carousel]: CarouselBlockData,
  [BlockType.chronology]: ChronologyBlockData,
  [BlockType.compactProductBanner]: CompactProductBannerBlockData,
  [BlockType.contacts]: ContactsBlockData,
  [BlockType.currencyRates]: CurrencyRatesBlockData,
  [BlockType.faq]: FaqBlockData,
  [BlockType.fileDownload]: FileDownloadBlockData,
  [BlockType.foldablePersonList]: FoldablePersonListBlockData,
  [BlockType.header]: HeaderBlockData,
  [BlockType.infoCards]: InfoCardsBlockData,
  [BlockType.information]: InformationBlockData,
  [BlockType.image]: ImageBlockData,
  [BlockType.link]: LinkBlockData,
  [BlockType.linkList]: LinkListBlockData,
  [BlockType.list]: ListBlockData,
  [BlockType.mainProductBanner]: MainProductBannerBlockData,
  [BlockType.mobileBank]: MobileBankBlockData,
  [BlockType.navigate]: NavigateBlockData,
  [BlockType.news]: NewsBlockData,
  [BlockType.newsItem]: NewsItemBlockData,
  [BlockType.newsList]: NewsListBlockData,
  [BlockType.nextNewsItem]: NextNewsItemBlockData,
  [BlockType.otherVacancies]: OtherVacanciesBlockData,
  [BlockType.personList]: PersonListBlockData,
  [BlockType.pointsOfService]: PointsOfServiceBlockData,
  [BlockType.productAdvantages]: ProductAdvantagesBlockData,
  [BlockType.productApplying]: ProductApplyingBlockData,
  [BlockType.productApplyingSteps]: ProductApplyingStepsBlockData,
  [BlockType.productBanner]: ProductBannerBlockData,
  [BlockType.productList]: ProductListBlockData,
  [BlockType.productProperties]: ProductPropertiesBlockData,
  [BlockType.productOffers]: ProductOffersBlockData,
  [BlockType.quote]: QuoteBlockData,
  [BlockType.share]: ShareBlockData,
  [BlockType.staffExperience]: StaffExperienceBlockData,
  [BlockType.search]: SearchBlockData,
  [BlockType.statistics]: StatisticsBlockData,
  [BlockType.textBanner]: TextBannerBlockData,
  [BlockType.table]: TableBlockData,
  [BlockType.tabs]: TabsBlockData,
  [BlockType.tags]: TagsBlockData,
  [BlockType.text]: TextBlockData,
  [BlockType.ticker]: TickerBlockData,
  [BlockType.tilesList]: TilesListBlockData,
  [BlockType.vacancyItem]: null,
  [BlockType.vacancyList]: VacancyListBlockData,
  [BlockType.controlApplying]: ControlApplyingBlockData,
  [BlockType.currencyCalculator]: CurrencyCalculatorBlockData,
  [BlockType.siteMap]: SiteMapData,
  [BlockType.receptionForm]: ReceptionFormBlockData,
  [BlockType.pollsList]: PollsListBlockData,
  [BlockType.vote]: VoteBlockData,
  [BlockType.voteResult]: VoteResultBlockData,
  [BlockType.chartColumn]: ChartColumnBlockData,
  [BlockType.chartPie]: ChartPieBlockData,
};

export enum UtilityBlockType {
  tab = 'tab',
  terminator = 'terminator',
}

export const utilityBlockTypeToDataClassMap = {
  [UtilityBlockType.tab]: TabBlockData,
  [UtilityBlockType.terminator]: TerminatorBlockData,
};

export { AbstractBlockData } from './abstract-block-data';

export { AdviceItemBlockData } from './advice-item-block-data';
export { AdviceListBlockData } from './advice-list-block-data';
export { BankCellRentalBlockData } from './bank-cell-rental-block-data';
export { CalculatorBlockData } from './calculator-block-data';
export { CallCenterBlockData } from './call-center-block-data';
export { CarouselBlockData } from './carousel-block-data';
export { ChronologyBlockData } from './chronology-block-data';
export { CompactProductBannerBlockData } from './compact-product-banner-block-data';
export { ContactsBlockData } from './contacts-block-data';
export { CurrencyRatesBlockData } from './currency-rates-block-data';
export { FaqBlockData } from './faq-block-data';
export { FileDownloadBlockData } from './file-download-block-data';
export { FoldablePersonListBlockData } from './foldable-person-list-block-data';
export { ImageBlockData } from './image-block-data';
export { InfoCardsBlockData } from './info-cards-block-data';
export { InformationBlockData } from './information-block-data';
export { LinkBlockData } from './link-block-data';
export { LinkListBlockData } from './link-list-block-data';
export { ListBlockData } from './list-block-data';
export { MainProductBannerBlockData } from './main-product-banner-block-data';
export { MobileBankBlockData } from './mobile-bank-block-data';
export { NavigateBlockData } from './navigate-block-data';
export { NewsBlockData } from './news-block-data';
export { NewsItemBlockData } from './news-item-block-data';
export { NewsListBlockData } from './news-list-block-data';
export { NextNewsItemBlockData } from './next-news-item-block-data';
export { OtherVacanciesBlockData } from './other-vacancies-data';
export { PersonListBlockData } from './person-list-block-data';
export { PointsOfServiceBlockData } from './points-of-service-block-data';
export { ProductAdvantagesBlockData } from './product-advantages-block-data';
export { ProductApplyingBlockData } from './product-applying-data';
export { ProductApplyingStepsBlockData } from './product-applying-steps-block-data';
export { ProductBannerBlockData } from './product-banner-block-data';
export { ProductListBlockData } from './product-list-block-data';
export { ProductOffersBlockData } from './product-offers-block-data';
export { ProductPropertiesBlockData } from './product-properties-block-data';
export { QuoteBlockData } from './quote-block-data';
export { ShareBlockData } from './share-block-data';
export { SearchBlockData } from './search-block-data';
export { StaffExperienceBlockData } from './staff-experience-block-data';
export { StatisticsBlockData } from './statictics-block-data';
export { TabBlockData } from './tab-block-data';
export { TableBlockData } from './table-block-data';
export { TabsBlockData } from './tabs-block-data';
export { TagsBlockData } from './tags-block-data';
export { TerminatorBlockData } from './terminator-block-data';
export { TextBannerBlockData } from './text-banner-block-data';
export { TextBlockData } from './text-block-data';
export { TickerBlockData } from './ticker-block-data';
export { TilesListBlockData } from './tiles-list-block-data';
export { VacancyItemBlockData } from './vacancy-item-block-data';
export { VacancyListBlockData } from './vacancy-list-block-data';
export { ControlApplyingBlockData } from  './control-applying-block-data';
export { SiteMapData } from './site-map-block-data';
export { ReceptionFormBlockData } from './reception-form-block-data';
export { PollsListBlockData } from  './polls-list-data';
export { ChartColumnBlockData } from './chart-column-block-data';

export { extendAdviceDataItems, extendNewsItems } from './helpers';
