import { buildFilterItemIdToFilterItemMap } from '../../helpers';
import { AdviceData, AdviceFilterItemData, ExtendedAdviceData, ImageInfoData, ProductType } from '../../interfaces';
import { extendAdviceDataItems } from '../../interfaces/classes/blocks';
import carouselItemDemoImage from './resources/carousel-item-demo.jpg';

const photo = {
  size: {
    height: 959,
    width: 1439,
  },
  srcSets: [
    {
      src: carouselItemDemoImage,
      type: 'image/jpeg',
    },
  ],
};

export const adviceSections: AdviceFilterItemData[] = [
  {
    code: 'code',
    id: 1,
    title: 'кредиты',
    productType: ProductType.loan,
  },
  {
    code: 'code',
    id: 2,
    title: 'карты',
    productType: ProductType.deposit,
  },
  {
    code: 'code',
    id: 3,
    title: 'вклады',
    productType: ProductType.remittance,
  },
];

const sectionIdToSectionMap = buildFilterItemIdToFilterItemMap(adviceSections);

export const advices: AdviceData[] = [
  {
    date: '2021-10-16T21:00:00.000' as any,
    id: 1,
    photo: photo as ImageInfoData as any,
    sectionId: 1,
    title: '«Человек, которому не все равно»: кто такой медиа менеджер, и как им стать',
    url: '#',
  },
  {
    date: '2021-10-16T21:00:00.000' as any,
    id: 2,
    photo: photo as ImageInfoData as any,
    sectionId: 2,
    title: '«Человек, которому не все равно»: кто такой медиа менеджер, и как им стать',
    url: '#',
  },
  {
    date: '2021-10-16T21:00:00.000' as any,
    id: 3,
    photo: photo as ImageInfoData as any,
    sectionId: 3,
    title: '«Человек, которому не все равно»: кто такой медиа менеджер, и как им стать',
    url: '#',
  },
  {
    date: '2021-10-16T21:00:00.000' as any,
    id: 4,
    photo: photo as ImageInfoData as any,
    sectionId: 2,
    title: '«Человек, которому не все равно»: кто такой медиа менеджер, и как им стать',
    url: '#',
  },
  {
    date: '2021-10-16T21:00:00.000' as any,
    id: 5,
    photo: photo as ImageInfoData as any,
    sectionId: 2,
    title: 'Все новейшие профессии будущего: где учиться киберспорту и обслуживанию космических туристов',
    url: '#',
  },
  {
    date: '2021-10-16T21:00:00.000' as any,
    id: 6,
    photo: photo as ImageInfoData as any,
    sectionId: 1,
    title: 'Профессии будущего: где учиться киберспорту и обслуживанию космических туристов',
    url: '#',
  },
  {
    date: '2021-10-16T21:00:00.000' as any,
    id: 7,
    photo: photo as ImageInfoData as any,
    sectionId: 1,
    title: 'Профессии будущего: где учиться киберспорту и обслуживанию космических туристов',
    url: '#',
  },
  {
    date: '2021-10-16T21:00:00.000' as any,
    id: 8,
    photo: photo as ImageInfoData as any,
    sectionId: 3,
    title: 'Профессии будущего: где учиться киберспорту и обслуживанию космических туристов last',
    url: '#',
  },
];

export const extendedAdvices: ExtendedAdviceData[] = extendAdviceDataItems({ items: advices, sectionIdToSectionMap });
