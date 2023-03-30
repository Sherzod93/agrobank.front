import { TextProductTagData } from '../../interfaces';
import { mobileApplication } from '../../stories-data';
import { searchTags } from '../../stories-data/search';

export const createApplication = async (formData: FormData): Promise<any> => {
  const fetchResponse = await fetch('/api/v1/?action=productApplying', {
    body: formData,
    method: 'POST',
  });
  const response = await fetchResponse.json();

  if (response.success !== true) {
    if (response.error) {
      return Promise.reject(response.error);
    }

    throw new Error(response.message);
  }
};

export const fetchCurrencies = async (): Promise<any> => {
  return {
    RUB: {
      code: 'RUB',
      symbol: '₽',
    },
    USD: {
      code: 'USD',
      symbol: '$',
    },
    UZS: {
      code: 'UZS',
      symbol: '',
    },
  };
};

export const fetchFooter = async (): Promise<any> => {
  return {
    mobileApplicationLinks: mobileApplication.links,
    socialNetworksLinks: [
      { title: 'Facebook', type: 'facebook', url: 'https://www.facebook.com/agrobankuzbekistan' },
      { title: 'Instagram', type: 'instagram', url: 'https://www.instagram.com/agrobank_uz/' },
      { title: 'Telegram', type: 'telegram', url: 'https://t.me/AgrobankChannel' },
    ],
    visitors: '',
  };
};

export const fetchMenu = async (): Promise<any> => {
  return {
    en: {
      'internet-bank': [
        {
          text: 'Internet-bank',
          path: 'internet-bank',
          externalLink: 'https://my.agrobank.uz/',
        },
      ],
    },
    ru: {
      'internet-bank': [
        {
          text: 'Интернет-банк',
          path: 'internet-bank',
          externalLink: 'https://my.agrobank.uz/',
        },
      ],
      footer: [
        {
          text: 'О&nbsp;банке',
          path: '/ru/about',
        },
        {
          text: 'Отделения и&nbsp;банкоматы',
          path: '/ru/on-map',
        },
        {
          text: 'Связь с&nbsp;банком',
          path: '/ru/contacts',
        },
      ],
    },
    uz: {
      'internet-bank': [
        {
          text: 'Internet-bank',
          path: 'internet-bank',
          externalLink: 'https://my.agrobank.uz/',
        },
      ],
    },
  };
};

export const fetchNews = async (): Promise<any> => {
  throw new Error('Not implemented');
};

export const fetchPageContent = async (url: string): Promise<any> => {
  switch (url) {
    case '/0':
    case '/404':
    case '/500':
      return Promise.reject({ status: Number(url.substr(1)) });
    default:
      throw new Error('Not implemented');
  }
};

export const fetchPointsOfService = async (): Promise<any> => {
  return {
    items: [
      {
        id: 59,
        title: 'Шайхантаурский филиал',
        type: 'atm',
        address: 'г. Ташкент, Шайхантаурский район, ул. А. Кадирий,  дом 9',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [41.319923279583, 69.262052924019],
        countryId: 84,
        regionId: 85,
      },
      {
        id: 60,
        title: 'Янгибазарский филиал',
        type: 'office',
        address: 'г. Ташкент, Янгибазарский район, улица Ж.Мангуберди 14-дом',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [41.345217721565, 69.331699932192],
        countryId: 84,
        regionId: 85,
      },
      {
        id: 61,
        title: 'Нукусский филиал',
        type: 'office',
        address: 'г. Ташкент, Нукусский район, улица,Дарсан, 40-дом',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [55.726688866816, 37.681198730469],
        countryId: 84,
        regionId: 86,
      },
      {
        id: 613,
        title: 'Банкомат 1',
        type: 'atm',
        address: 'г. Ташкент, Нукусский район, улица,Дарсан, 40-дом',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [40.991560513812, 71.683970602335],
        countryId: 84,
        regionId: 86,
      },
      {
        id: 614,
        title: 'Банкомат 2',
        type: 'atm',
        address: 'г. Ташкент, Нукусский район, улица,Дарсан, 40-дом',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [41.0206893905, 71.652663858713],
        countryId: 84,
        regionId: 86,
      },
      {
        id: 615,
        title: 'Банкомат 3',
        type: 'atm',
        address: 'г. Ташкент, Нукусский район, улица,Дарсан, 40-дом',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [40.790687443245, 72.370487364115],
        countryId: 84,
        regionId: 86,
      },
      {
        id: 616,
        title: 'Банкомат 4',
        type: 'atm',
        address: 'г. Ташкент, Нукусский район, улица,Дарсан, 40-дом',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [40.743331682328, 72.756885294969],
        countryId: 84,
        regionId: 86,
      },
      {
        id: 617,
        title: 'Банкомат 5',
        type: 'atm',
        address: 'г. Ташкент, Нукусский район, улица,Дарсан, 40-дом',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [41.016004439785, 71.612699682619],
        countryId: 84,
        regionId: 86,
      },
      {
        id: 618,
        title: 'Банкомат 6',
        type: 'atm',
        address: 'г. Ташкент, Нукусский район, улица,Дарсан, 40-дом',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [40.532899791754, 70.948992426302],
        countryId: 84,
        regionId: 86,
      },
      {
        id: 619,
        title: 'Банкомат 7',
        type: 'atm',
        address: 'г. Ташкент, Нукусский район, улица,Дарсан, 40-дом',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [40.550186405055, 70.934508497622],
        countryId: 84,
        regionId: 86,
      },
      {
        id: 620,
        title: 'Банкомат 8',
        type: 'atm',
        address: 'г. Ташкент, Нукусский район, улица,Дарсан, 40-дом',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [40.520062883355, 70.79951828232],
        countryId: 84,
        regionId: 86,
      },
      {
        id: 621,
        title: 'Банкомат 9',
        type: 'atm',
        address: 'г. Ташкент, Нукусский район, улица,Дарсан, 40-дом',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [39.649259987505, 66.917898682673],
        countryId: 84,
        regionId: 86,
      },
      {
        id: 622,
        title: 'Банкомат 10',
        type: 'atm',
        address: 'г. Самарканд, улица,Дарсан, 40-дом',
        phones: [
          {
            hint: '+998 71 244 57 17',
            phoneNumber: '+998712445717',
          },
        ],
        workingTime: 'Понедельник-пятница<br />\n9:00 – 16:00',
        coords: [39.629351898916, 67.027354268153],
        countryId: 84,
        regionId: 86,
      },
    ],
    hasMore: false,
  };
};

export const fetchSearchTags = async ({
  page = 1,
  pageSize = 100,
}: {
  page?: number;
  pageSize?: number;
}): Promise<{ hasMore: boolean; items: TextProductTagData[] }> => {
  const items = searchTags;

  return {
    hasMore: page * pageSize < items.length,
    items: items.slice((page - 1) * pageSize, page * pageSize),
  };
};

// todo: reducer
export const fetchSearchResult = async (
  query: string,
  { mapCode, page, pageSize }: { mapCode?: string; page?: number; pageSize?: number } = {},
): Promise<any> => {
  const items: any[] = [
    {
      code: 'person',
      items: [],
      nav: {
        currentPage: null,
        totalPages: null,
        totalItems: 0,
        pageSize: 5,
        isLastPage: true,
      },
    },
    {
      code: 'business',
      items: [],
      nav: {
        currentPage: null,
        totalPages: null,
        totalItems: 0,
        pageSize: 5,
        isLastPage: true,
      },
    },
    {
      code: 'pressCenter',
      items: [
        {
          id: '167',
          itemId: '70',
          title: 'Мега акция от Агробанк и “O’zbekinvest&quot; по <b>вкладам</b>',
          description: '',
          url: '/ru/about/press-center/mega-aktsiya-ot-agrobank-i-o-zbekinvest-po-vkladam',
          contextProduct: {
            backgroundPicture: {
              alt: '',
              size: {
                height: 555,
                width: 555,
              },
              srcSets: [
                {
                  src: '/upload/iblock/d69/4ahafgccq72eird1ohapaz45mhpr81tz.png',
                  type: 'image/png',
                },
                {
                  src: '/upload/iblock/d69/4ahafgccq72eird1ohapaz45mhpr81tz.png.webp',
                  type: 'image/webp',
                },
              ],
            },
            tags: [
              {
                type: 'text',
                value: 'Новости',
              },
              {
                type: 'date',
                value: '2021-09-10T00:00:00+0300',
              },
            ],
          },
        },
      ],
      nav: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
        pageSize: 5,
        isLastPage: true,
      },
    },
    {
      code: 'advice',
      items: [
        {
          id: '218',
          itemId: 'S138',
          title: '<b>Вклады</b>',
          description: '',
          url: '',
          contextProduct: {
            backgroundPicture: null,
          },
        },
        {
          id: '225',
          itemId: 'S322',
          title: 'UZ: <b>Вклады</b>',
          description: '',
          url: '',
          contextProduct: {
            backgroundPicture: null,
          },
        },
        {
          id: '204',
          itemId: '489',
          title: 'Ли проценты по <b>вкладу</b>',
          description: '',
          url: '/ru/about/knowledge-base/li-protsenty-po-vkladu-',
          contextProduct: {
            backgroundPicture: {
              alt: '',
              size: {
                height: 738,
                width: 1170,
              },
              srcSets: [
                {
                  src: '/upload/iblock/643/rkfa2564l7gegnwhsh0s7wgccld9q39l.png',
                  type: 'image/png',
                },
                {
                  src: '/upload/iblock/643/rkfa2564l7gegnwhsh0s7wgccld9q39l.png.webp',
                  type: 'image/webp',
                },
              ],
            },
          },
        },
        {
          id: '205',
          itemId: '490',
          title: 'Выбрать наиболее выгодный <b>вклад</b> как',
          description: '',
          url: '/ru/about/knowledge-base/vybrat-naibolee-vygodnyy-vklad-kak',
          contextProduct: {
            backgroundPicture: {
              alt: '',
              size: {
                height: 2731,
                width: 4096,
              },
              srcSets: [
                {
                  src: '/upload/iblock/1a7/e7995nwkohxykiudkkcqed3wmsr220md.jpg',
                  type: 'image/jpeg',
                },
                {
                  src: '/upload/iblock/1a7/e7995nwkohxykiudkkcqed3wmsr220md.jpg.webp',
                  type: 'image/webp',
                },
              ],
            },
          },
        },
        {
          id: '214',
          itemId: '500',
          title: 'Сравнение предложений по <b>вкладам</b>',
          description: '',
          url: '/ru/about/knowledge-base/sravnenie-predlozheniy-po-vkladam',
          contextProduct: {
            backgroundPicture: {
              alt: '',
              size: {
                height: 2731,
                width: 4096,
              },
              srcSets: [
                {
                  src: '/upload/iblock/1a7/e7995nwkohxykiudkkcqed3wmsr220md.jpg',
                  type: 'image/jpeg',
                },
                {
                  src: '/upload/iblock/1a7/e7995nwkohxykiudkkcqed3wmsr220md.jpg.webp',
                  type: 'image/webp',
                },
              ],
            },
          },
        },
      ],
      nav: {
        currentPage: 1,
        totalPages: 2,
        totalItems: 10,
        pageSize: 5,
        isLastPage: false,
      },
    },
    {
      code: 'vacancy',
      items: [],
      nav: {
        currentPage: null,
        totalPages: null,
        totalItems: 0,
        pageSize: 5,
        isLastPage: true,
      },
    },
    {
      code: 'people',
      items: [],
      nav: {
        currentPage: null,
        totalPages: null,
        totalItems: 0,
        pageSize: 5,
        isLastPage: true,
      },
    },
    {
      code: 'office',
      items: [],
      nav: {
        currentPage: null,
        totalPages: null,
        totalItems: 0,
        pageSize: 5,
        isLastPage: true,
      },
    },
  ];
  return items;
};

export const fetchPlaces = async (): Promise<any> => {
  return [
    {
      id: 5,
      regionId: 1,
      name: 'Пахтаабадский филиал',
    },
    {
      id: 6,
      regionId: 1,
      name: 'Асакинский филиал',
    },
    {
      id: 7,
      regionId: 1,
      name: 'Мархаматский филиал',
    },
    {
      id: 8,
      regionId: 1,
      name: 'Шахриханский филиал',
    },
    {
      id: 9,
      regionId: 1,
      name: 'Жалакудукский филиал',
    },
    {
      id: 10,
      regionId: 1,
      name: 'Хужаабадский филиал',
    },
    {
      id: 11,
      regionId: 1,
      name: 'Избосканский филиал',
    },
    {
      id: 12,
      regionId: 1,
      name: 'Олтинкульский филиал',
    },
    {
      id: 13,
      regionId: 1,
      name: 'Бузский филиал',
    },
    {
      id: 14,
      regionId: 1,
      name: 'Улугнарский филиал',
    },
    {
      id: 15,
      regionId: 1,
      name: 'Кургантепинский филиал',
    },
    {
      id: 16,
      regionId: 1,
      name: 'Андижанский филиал',
    },
    {
      id: 17,
      regionId: 1,
      name: 'Булакбашинский филиал',
    },
    {
      id: 18,
      regionId: 1,
      name: 'Баликчиский филиал ',
    },
    {
      id: 19,
      regionId: 1,
      name: 'Региональный филиал',
    },
    {
      id: 20,
      regionId: 2,
      name: 'Региональный филиал',
    },
    {
      id: 21,
      regionId: 2,
      name: 'Алатский филиал',
    },
    {
      id: 22,
      regionId: 2,
      name: 'Вобкентский филиал',
    },
    {
      id: 23,
      regionId: 2,
      name: 'Гиждуванский филиал',
    },
    {
      id: 24,
      regionId: 2,
      name: 'Шафирканский филиал',
    },
    {
      id: 25,
      regionId: 2,
      name: 'Каракульский филиал',
    },
    {
      id: 26,
      regionId: 2,
      name: 'Рамитанский филиал',
    },
    {
      id: 27,
      regionId: 2,
      name: 'Жондорский филиал',
    },
    {
      id: 28,
      regionId: 2,
      name: 'Бухарский филиал (Галаосие)',
    },
    {
      id: 29,
      regionId: 2,
      name: 'Пешкуинский филиал',
    },
    {
      id: 30,
      regionId: 2,
      name: 'Караулбазарский филиал',
    },
    {
      id: 35,
      regionId: 3,
      name: 'Региональный филиал',
    },
    {
      id: 36,
      regionId: 3,
      name: 'Джизакский филиал',
    },
    {
      id: 37,
      regionId: 3,
      name: 'Арнасайский филиал',
    },
    {
      id: 38,
      regionId: 3,
      name: 'Зарбдарский филиал',
    },
    {
      id: 39,
      regionId: 3,
      name: 'Пахтакорский филиал',
    },
    {
      id: 40,
      regionId: 3,
      name: 'Галлааралский филиал',
    },
    {
      id: 41,
      regionId: 3,
      name: 'Дустликский филиал',
    },
    {
      id: 42,
      regionId: 3,
      name: 'Мирзачульский филиал',
    },
    {
      id: 43,
      regionId: 3,
      name: 'Заминский филиал',
    },
    {
      id: 44,
      regionId: 3,
      name: 'Бахмальский филиал',
    },
    {
      id: 45,
      regionId: 3,
      name: 'Фаришский филиал',
    },
    {
      id: 46,
      regionId: 3,
      name: 'Зафарабадский филиал',
    },
    {
      id: 48,
      regionId: 4,
      name: 'Региональный филиал',
    },
    {
      id: 49,
      regionId: 4,
      name: 'Гузарский филиал',
    },
    {
      id: 51,
      regionId: 4,
      name: 'Дехканабадский филиал',
    },
    {
      id: 52,
      regionId: 4,
      name: 'Камашинский филиал',
    },
    {
      id: 53,
      regionId: 4,
      name: 'Косонский филиал',
    },
    {
      id: 55,
      regionId: 4,
      name: 'Шахрисабзский филиал',
    },
    {
      id: 56,
      regionId: 4,
      name: 'Яккабагский филиал',
    },
    {
      id: 57,
      regionId: 4,
      name: 'Каршинский филиал',
    },
    {
      id: 59,
      regionId: 4,
      name: 'Чирокчинский филиал',
    },
    {
      id: 60,
      regionId: 4,
      name: 'Китабский филиал',
    },
    {
      id: 62,
      regionId: 4,
      name: 'Касбинский филиал',
    },
    {
      id: 63,
      regionId: 4,
      name: 'Нишанский филиал',
    },
    {
      id: 64,
      regionId: 4,
      name: 'Батошский филиал',
    },
    {
      id: 65,
      regionId: 4,
      name: 'Миришкорский филиал',
    },
    {
      id: 67,
      regionId: 4,
      name: 'Муборакский филиал',
    },
    {
      id: 69,
      regionId: 5,
      name: 'Региональный филиал',
    },
    {
      id: 70,
      regionId: 5,
      name: 'Конимехский филиал',
    },
    {
      id: 75,
      regionId: 5,
      name: 'Карманенский филиал',
    },
    {
      id: 76,
      regionId: 5,
      name: 'Кизилтепинский филиал',
    },
    {
      id: 77,
      regionId: 5,
      name: 'Нуратинский филиал ',
    },
    {
      id: 79,
      regionId: 5,
      name: 'Томдийский филиал ',
    },
    {
      id: 80,
      regionId: 5,
      name: 'Навбахорский филиал',
    },
    {
      id: 82,
      regionId: 5,
      name: 'Хатирчинский филиал',
    },
    {
      id: 84,
      regionId: 14,
      name: 'Ташкентский городской филиал',
    },
    {
      id: 92,
      regionId: 6,
      name: 'Региональный филиал',
    },
    {
      id: 94,
      regionId: 6,
      name: 'Мингбулакский филиал',
    },
    {
      id: 95,
      regionId: 6,
      name: 'Косонсайский филиал',
    },
    {
      id: 97,
      regionId: 6,
      name: 'Норинский филиал',
    },
    {
      id: 98,
      regionId: 6,
      name: 'Попский филиал',
    },
    {
      id: 99,
      regionId: 6,
      name: 'Туракурганский филиал',
    },
    {
      id: 104,
      regionId: 6,
      name: 'Уйчинский филиал',
    },
    {
      id: 105,
      regionId: 6,
      name: 'Учкурганский филиал',
    },
    {
      id: 106,
      regionId: 6,
      name: 'Янгикурганский филиал',
    },
    {
      id: 107,
      regionId: 6,
      name: 'Наманганский филиал',
    },
    {
      id: 108,
      regionId: 6,
      name: 'Чортокский филиал',
    },
    {
      id: 109,
      regionId: 6,
      name: 'Давлатабадский филиал',
    },
    {
      id: 110,
      regionId: 7,
      name: 'Акдарьинский филиал',
    },
    {
      id: 111,
      regionId: 7,
      name: 'Нарпайский филиал',
    },
    {
      id: 112,
      regionId: 7,
      name: 'Жомбойский филиал',
    },
    {
      id: 113,
      regionId: 7,
      name: 'Пастдаргамский филиал',
    },
    {
      id: 114,
      regionId: 7,
      name: 'Пайшанбинский филиал',
    },
    {
      id: 115,
      regionId: 7,
      name: 'Самаркандский региональный филиал',
    },
    {
      id: 116,
      regionId: 7,
      name: 'Сиябский филиал',
    },
    {
      id: 117,
      regionId: 7,
      name: 'Булунгурский филиал',
    },
    {
      id: 118,
      regionId: 7,
      name: 'Нурабадский филиал',
    },
    {
      id: 119,
      regionId: 7,
      name: 'Пайарыкский филиал',
    },
    {
      id: 120,
      regionId: 7,
      name: 'Пахтачинский филиал',
    },
    {
      id: 121,
      regionId: 7,
      name: 'Ургутский филиал',
    },
    {
      id: 122,
      regionId: 7,
      name: 'Пастдаргамский филиал',
    },
    {
      id: 123,
      regionId: 7,
      name: 'Иштиханский филиал',
    },
    {
      id: 124,
      regionId: 7,
      name: 'Кушрабадский филиал',
    },
    {
      id: 125,
      regionId: 7,
      name: 'Каттакурганский филиал',
    },
    {
      id: 126,
      regionId: 7,
      name: 'Пайарыкский филиал',
    },
    {
      id: 127,
      regionId: 7,
      name: 'Тайлакский филиал',
    },
    {
      id: 128,
      regionId: 7,
      name: 'Самаркандский район',
    },
    {
      id: 132,
      regionId: 8,
      name: 'Региональный филиал',
    },
    {
      id: 133,
      regionId: 8,
      name: 'Бойсунский филиал',
    },
    {
      id: 135,
      regionId: 8,
      name: 'Жаркурганский филиал',
    },
    {
      id: 136,
      regionId: 8,
      name: 'Музрабадский филиал',
    },
    {
      id: 137,
      regionId: 8,
      name: 'Шерабадский филиал',
    },
    {
      id: 138,
      regionId: 8,
      name: 'Шурчинский филиал',
    },
    {
      id: 140,
      regionId: 8,
      name: 'Узунский филиал',
    },
    {
      id: 141,
      regionId: 8,
      name: 'Ангарский филиал',
    },
    {
      id: 142,
      regionId: 8,
      name: 'Кизирыкский филиал',
    },
    {
      id: 144,
      regionId: 8,
      name: 'Кумкурганский филиал',
    },
    {
      id: 145,
      regionId: 8,
      name: 'Термезский филиал',
    },
    {
      id: 146,
      regionId: 8,
      name: 'Алтынсайский филиал',
    },
    {
      id: 147,
      regionId: 8,
      name: 'Сариосийский филиал',
    },
    {
      id: 148,
      regionId: 8,
      name: 'Денавский филиал',
    },
    {
      id: 164,
      regionId: 9,
      name: 'Региональный филиал',
    },
    {
      id: 165,
      regionId: 9,
      name: 'Сардобинский филиал',
    },
    {
      id: 166,
      regionId: 9,
      name: 'Сырдарьинский филиал',
    },
    {
      id: 167,
      regionId: 9,
      name: 'Янгиерский филиал',
    },
    {
      id: 168,
      regionId: 9,
      name: 'Боёвутский филиал',
    },
    {
      id: 169,
      regionId: 9,
      name: 'Ширинский филиал',
    },
    {
      id: 170,
      regionId: 9,
      name: 'Гулистанский филиал',
    },
    {
      id: 171,
      regionId: 9,
      name: 'Сайхунабадский филиал',
    },
    {
      id: 172,
      regionId: 9,
      name: 'Акалтынский филиал',
    },
    {
      id: 173,
      regionId: 9,
      name: 'Мирзаабадский филиал',
    },
    {
      id: 174,
      regionId: 9,
      name: 'Ховосский филиал',
    },
    {
      id: 175,
      regionId: 14,
      name: 'Шайхантаурский филиал',
    },
    {
      id: 176,
      regionId: 10,
      name: 'Ахангаранский филиал',
    },
    {
      id: 177,
      regionId: 10,
      name: 'Аккурганский филиал ',
    },
    {
      id: 178,
      regionId: 10,
      name: 'Букинский филиал',
    },
    {
      id: 179,
      regionId: 10,
      name: 'Бекабадский филиал',
    },
    {
      id: 180,
      regionId: 10,
      name: 'Пскентский филиал',
    },
    {
      id: 181,
      regionId: 10,
      name: 'Куйичирчикский филиал ',
    },
    {
      id: 182,
      regionId: 10,
      name: 'Региональный филиал (Уртачирчикский)',
    },
    {
      id: 183,
      regionId: 10,
      name: 'Чиназский филиал',
    },
    {
      id: 184,
      regionId: 10,
      name: 'Юкаричирчикский филиал',
    },
    {
      id: 185,
      regionId: 10,
      name: 'Паркентский филиал',
    },
    {
      id: 186,
      regionId: 10,
      name: 'Янгийулский филиал',
    },
    {
      id: 187,
      regionId: 11,
      name: 'Региональный филиал',
    },
    {
      id: 188,
      regionId: 11,
      name: 'Алтиарыкский филиал',
    },
    {
      id: 189,
      regionId: 11,
      name: 'Багдадский филиал',
    },
    {
      id: 190,
      regionId: 11,
      name: 'Ферганский филиал',
    },
    {
      id: 191,
      regionId: 11,
      name: 'Дангаринский филиал',
    },
    {
      id: 192,
      regionId: 11,
      name: 'Учкуприкский филиал',
    },
    {
      id: 193,
      regionId: 11,
      name: 'Бешарыкский филиал',
    },
    {
      id: 194,
      regionId: 11,
      name: 'Куштепинский филиал',
    },
    {
      id: 195,
      regionId: 11,
      name: 'Қувасайский филиал',
    },
    {
      id: 196,
      regionId: 11,
      name: 'Риштанский филиал',
    },
    {
      id: 197,
      regionId: 11,
      name: 'Ташлакский филиал',
    },
    {
      id: 198,
      regionId: 11,
      name: 'Бувайдинский филиал',
    },
    {
      id: 199,
      regionId: 11,
      name: 'Маргиланский филиал',
    },
    {
      id: 200,
      regionId: 11,
      name: 'Кувинский филиал',
    },
    {
      id: 201,
      regionId: 11,
      name: 'Узбекистанский филиал',
    },
    {
      id: 202,
      regionId: 11,
      name: 'Ёзьяванский филиал',
    },
    {
      id: 203,
      regionId: 11,
      name: 'Сухский филиал',
    },
    {
      id: 204,
      regionId: 11,
      name: 'Фуркатский филиал',
    },
    {
      id: 205,
      regionId: 11,
      name: 'Какандский филиал',
    },
    {
      id: 206,
      regionId: 12,
      name: 'Региональный филиал',
    },
    {
      id: 207,
      regionId: 12,
      name: 'Гурланский филиал',
    },
    {
      id: 208,
      regionId: 12,
      name: 'Боғотский филиал',
    },
    {
      id: 209,
      regionId: 12,
      name: 'Хазорасп филиал',
    },
    {
      id: 210,
      regionId: 12,
      name: 'Хонқа филиал',
    },
    {
      id: 211,
      regionId: 12,
      name: 'Янгиариқ филиал',
    },
    {
      id: 212,
      regionId: 12,
      name: 'Қўшкўпир филиал',
    },
    {
      id: 213,
      regionId: 12,
      name: 'Шовотский филиал',
    },
    {
      id: 214,
      regionId: 12,
      name: 'Урганч филиал',
    },
    {
      id: 215,
      regionId: 12,
      name: 'Питнак филиал',
    },
    {
      id: 216,
      regionId: 12,
      name: 'Янгибазарский филиал',
    },
    {
      id: 218,
      regionId: 13,
      name: 'Региональный филиал',
    },
    {
      id: 219,
      regionId: 13,
      name: 'Кегейлиский филиал',
    },
    {
      id: 220,
      regionId: 13,
      name: 'Шуманайский филиал',
    },
    {
      id: 221,
      regionId: 13,
      name: 'Курнгратский филиал',
    },
    {
      id: 222,
      regionId: 13,
      name: 'Муйнакский филиал',
    },
    {
      id: 223,
      regionId: 13,
      name: 'Нукусский филиал',
    },
    {
      id: 224,
      regionId: 13,
      name: 'Тахтакупирский филиал',
    },
    {
      id: 225,
      regionId: 13,
      name: 'Турткульский филиал',
    },
    {
      id: 226,
      regionId: 13,
      name: 'Хужайлиский филиал',
    },
    {
      id: 227,
      regionId: 13,
      name: 'Чимбайский филиал',
    },
    {
      id: 228,
      regionId: 13,
      name: 'Берунийский филиал',
    },
    {
      id: 229,
      regionId: 13,
      name: 'Канликульский филиал',
    },
    {
      id: 230,
      regionId: 13,
      name: 'Кораузакский филиал',
    },
    {
      id: 231,
      regionId: 13,
      name: 'Элликкальинский филиал',
    },
    {
      id: 232,
      regionId: 13,
      name: 'Амударьинский филиал',
    },
    {
      id: 235,
      regionId: 6,
      name: 'Чустский филиал',
    },
  ];
};

export const fetchRegions = async (): Promise<any> => {
  return [
    {
      id: 1,
      name: 'Андижанская область ',
    },
    {
      id: 2,
      name: 'Бухарская область',
    },
    {
      id: 3,
      name: 'Джизакская область',
    },
    {
      id: 4,
      name: 'Кашкадарьинская область',
    },
    {
      id: 5,
      name: 'Навоийская область',
    },
    {
      id: 6,
      name: 'Наманганская область',
    },
    {
      id: 7,
      name: 'Самаркандская область',
    },
    {
      id: 8,
      name: 'Сурхандарьинская область',
    },
    {
      id: 9,
      name: 'Сырдарьинская область',
    },
    {
      id: 10,
      name: 'Ташкентская область',
    },
    {
      id: 11,
      name: 'Ферганская область',
    },
    {
      id: 12,
      name: 'Хорезмская область',
    },
    {
      id: 13,
      name: 'Республика Каракалпакстан',
    },
    {
      id: 14,
      name: 'г. Ташкент',
    },
  ];
};

export const fetchSettings = async (): Promise<any> => {
  return {
    map: {
      center: [41.311151, 69.279737],
      isGeolocationAllowed: true,
      yandexMapsApiKey: process.env.REACT_APP_YANDEX_MAP_API_DEVELOPER_KEY,
    },
  };
};

export const fetchVacancies = async (): Promise<any> => {
  throw new Error('Not implemented');
};
