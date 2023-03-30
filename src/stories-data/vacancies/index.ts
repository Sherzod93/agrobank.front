import { VacancyItemData } from '../../components/blocks';
import { FilterItemData } from '../../interfaces';

export const vacancyItems: VacancyItemData[] = [
  {
    id: 1,
    title: 'Информационные технологии',
    items: [
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 1,
        regionId: 1,
        title: 'Flutter разработчик (мобильных приложений) в проектную группу',
        url: '/',
      },
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 2,
        regionId: 1,
        title: 'Программист/ИТ-аналитик',
        url: '/',
      },
    ],
  },
  {
    id: 2,
    title: 'Продажи',
    items: [
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 1,
        regionId: 1,
        title: 'Специалист колл-центра',
        url: '/',
      },
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 2,
        regionId: 1,
        title: 'Начальник управления продаж',
        url: '/',
      },
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 3,
        regionId: 1,
        title: 'Менеджер по продажам',
        url: '/',
      },
    ],
  },
  {
    id: 3,
    title: 'Сельское хозяйство',
    items: [
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 1,
        regionId: 1,
        title: 'Специалист по защите растений',
        url: '/',
      },
    ],
  },
  {
    id: 4,
    title: 'Маркетинг и реклама',
    items: [
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 1,
        regionId: 1,
        title: 'Контент-менеджер',
        url: '/',
      },
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 2,
        regionId: 1,
        title: 'Продакт маркетинг менеджер',
        url: '/',
      },
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 3,
        regionId: 1,
        title: 'Таргетолог',
        url: '/',
      },
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 4,
        regionId: 1,
        title: 'Бренд-менеджер',
        url: '/',
      },
    ],
  },
  {
    id: 5,
    title: 'Управление персоналом',
    items: [
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 1,
        regionId: 1,
        title: 'Ведущий специалист по KPI',
        url: '/',
      },
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 2,
        regionId: 1,
        title: 'Региональный куратор',
        url: '/',
      },
    ],
  },
  {
    id: 6,
    title: 'Юристы',
    items: [
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 1,
        regionId: 1,
        title: 'Комплаенс-Менеджер',
        url: '/',
      },
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 2,
        regionId: 1,
        title: 'Главный юрисконсульт',
        url: '/',
      },
    ],
  },
  {
    id: 7,
    title: 'Инвестиции и лизинг',
    items: [
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 1,
        regionId: 1,
        title: 'Начальник отдела разработки продуктов',
        url: '/',
      },
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 2,
        regionId: 1,
        title: 'Product owner (Транзакционные продукты)',
        url: '/',
      },
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 3,
        regionId: 1,
        title: 'Product owner (Кредитные продукты)',
        url: '/',
      },
      {
        code: 'some-code',
        date: '2022-04-04T22:52:33.907' as any,
        id: 4,
        regionId: 1,
        title: 'Ведущий специалист отдела управления корреспондентских отношений и документарных операций',
        url: '/',
      },
    ],
  },
];

export const vacancyRegions: FilterItemData[] = [
  {
    code: 'tashkent',
    id: 1,
    title: 'Ташкент',
  },
];
