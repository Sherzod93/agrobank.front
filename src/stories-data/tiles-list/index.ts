import { TileItem, TilesListBlockProps } from '../../components/blocks';

export const tilesList: TileItem[] = [
  {
    code: 'it',
    count: 3,
    id: 1,
    title: 'Информационные технологии',
    url: '/',
  },
  {
    code: 'sales',
    count: 7,
    id: 2,
    title: 'Продажи',
    url: '/',
  },
  {
    code: 'lawyers',
    count: 5,
    id: 3,
    title: 'Юристы',
    url: '/',
  },
  {
    code: 'marketing',
    count: 1,
    id: 4,
    title: 'Маркетинг и реклама',
    url: '/',
  },
  {
    code: 'staff-management',
    count: 2,
    id: 5,
    title: 'Управление персоналом',
    url: '/',
  },
];

export const tilesTotalData: TilesListBlockProps['total'] = {
  itemCount: 221,
  sectionCount: 100,
  url: '/',
};
