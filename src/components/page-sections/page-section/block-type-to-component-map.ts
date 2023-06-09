import { BlockType } from '../../../interfaces';
import {
  AdviceItemBlock,
  AdviceListBlock,
  BankCellRentalBlock,
  CalculatorBlock,
  CallCenterBlock,
  CarouselBlock,
  ChronologyBlock,
  CompactProductBannerBlock,
  ContactsBlock,
  CurrencyRatesBlock,
  FaqBlock,
  FileDownloadBlock,
  FoldablePersonListBlock,
  HeaderBlock,
  ImageBlock,
  InfoCardsBlock,
  InformationBlock,
  VideoBlock,
  LinkBlock,
  LinkListBlock,
  ListBlock,
  MainProductBannerBlock,
  MobileBankBlock,
  NavigateBlock,
  NewsBlock,
  NewsItemBlock,
  NewsListBlock,
  NextNewsItemBlock,
  OtherVacanciesBlock,
  PersonListBlock,
  PointsOfServiceBlock,
  ProductAdvantagesBlock,
  ProductApplyingStepsBlock,
  ProductBannerBlock,
  ProductListBlock,
  ProductOffersBlock,
  ProductPropertiesBlock,
  QuoteBlock,
  SearchBlock,
  ShareBlock,
  StaffExperienceBlock,
  StatisticsBlock,
  TableBlock,
  TabsBlock,
  TagsBlock,
  TextBannerBlock,
  TextBlock,
  TickerBlock,
  TilesListBlock,
  VacancyItemBlock,
  VacancyListBlock,
  PollsListBlock, VoteBlock, VoteResultBlock, ChartColumnBlock, ChartPieBlock,
} from '../../blocks';
import { ProductApplyingBlock } from '../blocks/product-applying-block/product-applying-block';
import { ControlApplyingBlock } from '../blocks/control-applying-block/control-applying-block';
import { CurrencyCalculatorBlock } from '../../blocks/currency-calculator-block/currency-calculator-block';
import { SiteMapBlock } from '../../blocks/site-map-block/site-map-block';
import { ReceptionFormBlock } from '../../blocks/reception-form/reception-form';
import { PageStatisticBlock } from '../../blocks/page-statistic-block/page-statistic-block';

const pageSectionBlockTypeToComponentMap = {
  [BlockType.adviceItem]: AdviceItemBlock,
  [BlockType.adviceList]: AdviceListBlock,
  [BlockType.bankCellRental]: BankCellRentalBlock,
  [BlockType.calculator]: CalculatorBlock,
  [BlockType.callCenter]: CallCenterBlock,
  [BlockType.carousel]: CarouselBlock,
  [BlockType.chronology]: ChronologyBlock,
  [BlockType.compactProductBanner]: CompactProductBannerBlock,
  [BlockType.contacts]: ContactsBlock,
  [BlockType.currencyRates]: CurrencyRatesBlock,
  [BlockType.faq]: FaqBlock,
  [BlockType.fileDownload]: FileDownloadBlock,
  [BlockType.foldablePersonList]: FoldablePersonListBlock,
  [BlockType.header]: HeaderBlock,
  [BlockType.image]: ImageBlock,
  [BlockType.infoCards]: InfoCardsBlock,
  [BlockType.information]: InformationBlock,
  [BlockType.link]: LinkBlock,
  [BlockType.linkList]: LinkListBlock,
  [BlockType.list]: ListBlock,
  [BlockType.mainProductBanner]: MainProductBannerBlock,
  [BlockType.mobileBank]: MobileBankBlock,
  [BlockType.navigate]: NavigateBlock,
  [BlockType.news]: NewsBlock,
  [BlockType.newsItem]: NewsItemBlock,
  [BlockType.newsList]: NewsListBlock,
  [BlockType.nextNewsItem]: NextNewsItemBlock,
  [BlockType.otherVacancies]: OtherVacanciesBlock,
  [BlockType.personList]: PersonListBlock,
  [BlockType.pointsOfService]: PointsOfServiceBlock,
  [BlockType.productAdvantages]: ProductAdvantagesBlock,
  [BlockType.productApplying]: ProductApplyingBlock,
  [BlockType.productApplyingSteps]: ProductApplyingStepsBlock,
  [BlockType.productBanner]: ProductBannerBlock,
  [BlockType.productList]: ProductListBlock,
  [BlockType.productProperties]: ProductPropertiesBlock,
  [BlockType.productOffers]: ProductOffersBlock,
  [BlockType.quote]: QuoteBlock,
  [BlockType.search]: SearchBlock,
  [BlockType.share]: ShareBlock,
  [BlockType.staffExperience]: StaffExperienceBlock,
  [BlockType.statistics]: StatisticsBlock,
  [BlockType.textBanner]: TextBannerBlock,
  [BlockType.table]: TableBlock,
  [BlockType.tabs]: TabsBlock,
  [BlockType.tags]: TagsBlock,
  [BlockType.text]: TextBlock,
  [BlockType.ticker]: TickerBlock,
  [BlockType.tilesList]: TilesListBlock,
  [BlockType.vacancyItem]: VacancyItemBlock,
  [BlockType.vacancyList]: VacancyListBlock,
  [BlockType.video]: VideoBlock,
  [BlockType.controlApplying]: ControlApplyingBlock,
  [BlockType.currencyCalculator]: CurrencyCalculatorBlock,
  [BlockType.siteMap]: SiteMapBlock,
  [BlockType.receptionForm]: ReceptionFormBlock,
  [BlockType.pollsList]: PollsListBlock,
  [BlockType.vote]: VoteBlock,
  [BlockType.voteResult]: VoteResultBlock,
  [BlockType.chartColumn]: ChartColumnBlock,
  [BlockType.chartPie]: ChartPieBlock,
  [BlockType.pageStatistic]: PageStatisticBlock,
};

export { pageSectionBlockTypeToComponentMap };
