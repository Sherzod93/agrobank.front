import { buildFilterItemIdToFilterItemMap } from '../../helpers';
import { ExtendedNewsItemData, FilterItemData, ImageInfoData, NewsItemData } from '../../interfaces';
import { extendNewsItems } from '../../interfaces/classes/blocks';
import newsItemPhoto from './resourses/news-item-photo.png';
import promotedNewsItemPhoto from './resourses/promoted-news-item-photo.png';

export const newsSections: FilterItemData[] = [
  {
    code: 'code',
    id: 1,
    title: 'Новости',
  },
  {
    code: 'code',
    id: 2,
    title: 'Тендеры и конкурсы',
  },
  {
    code: 'code',
    id: 3,
    title: 'Пресс-релиз',
  },
];

const sectionIdToSectionMap = buildFilterItemIdToFilterItemMap(newsSections);

export const news: NewsItemData[] = [
  {
    code: 'some-code',
    date: new Date(),
    id: 1,
    photo: {
      size: {
        height: 452,
        width: 980,
      },
      srcSets: [
        {
          src: promotedNewsItemPhoto,
          type: 'image/jpeg',
        },
      ],
    } as ImageInfoData as any,
    isPromoted: true,
    sectionId: 1,
    title: 'Акция от Агробанка: вместе с&nbsp;Visa раздаем подарки всем клиентам',
    url: '/',
  },
  {
    code: 'some-code',
    date: '2022-04-11T18:05:10.052' as any,
    id: 2,
    sectionId: 1,
    title: 'Акция от Агробанка: вместе с&nbsp;Mastercard раздаем подарки всем клиентам',
    url: '/',
  },
  {
    code: 'some-code',
    date: '2022-04-04T18:05:10.052' as any,
    id: 3,
    sectionId: 2,
    title: 'Акция от Агробанка: вместе с&nbsp;Bitcoin раздаем подарки всем клиентам',
    url: '/',
  },
  {
    code: 'some-code',
    date: '2022-04-04T18:05:10.052' as any,
    id: 4,
    sectionId: 3,
    title: 'Акция от Агробанка: вместе с&nbsp;Mastercard раздаем подарки всем клиентам',
    url: '/',
  },
  {
    code: 'some-code',
    date: '2022-04-04T18:05:10.052' as any,
    id: 5,
    photo: {
      size: {
        height: 1024,
        width: 2280,
      },
      srcSets: [
        {
          src: newsItemPhoto,
          type: 'image/jpeg',
        },
      ],
    } as ImageInfoData as any,
    sectionId: 2,
    title: 'Акция от Агробанка: вместе с&nbsp;Visa раздаем подарки всем клиентам',
    url: '/',
  },
];

export const extendedNews: ExtendedNewsItemData[] = extendNewsItems({ items: news, sectionIdToSectionMap });
