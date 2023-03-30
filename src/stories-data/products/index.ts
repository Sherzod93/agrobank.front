import {
  CalculationParameterValueType,
  FilterItemData,
  ImageInfoData,
  ProductData,
  ProductTagTypes,
  ProductType,
} from '../../interfaces';
import { advantages } from '../advantages';
import backgroundDemoImage from './resources/background-demo.png';
import productDemoImage2 from './resources/background-demo.png';
import cardImage from './resources/card.png';
import productDemoImage from './resources/product-example.png';

export const products: ProductData[] = [
  {
    advantages,
    backgroundPicture: {
      size: {
        height: 1150,
        width: 1798,
      },
      srcSets: [
        {
          src: productDemoImage2,
          type: 'image/png',
        },
      ],
    } as ImageInfoData as any,
    calculationParams: {
      amount: {
        max: 1_560_000_000,
        min: 592_000,
        step: 1_000,
        title: 'Хочу взять',
        type: CalculationParameterValueType.variable,
      },
      interestRate: {
        title: 'Ставка',
        type: CalculationParameterValueType.fixed,
        value: 17,
      },
      monthCount: {
        title: 'Срок',
        type: CalculationParameterValueType.fixed,
        value: 13,
      },
    },
    canBeApplied: true,
    categoryIds: [],
    code: 'deposit-product-code',
    currency: 'RUB',
    customResultValueFunctionBodies: [
      'const years = Math.floor((Math.random() * 10));' +
        'return {title: "Специальное значение!", type: "text", value: years + " " + t("block-calculator.year", {count: years})};',
    ],
    description:
      'Классическая сумовая карта для оплаты покупок, коммунальных платежей, перевода денег на карты любых банков',
    id: 1,
    properties: [
      {
        title: '26,99 %',
        description: 'ставка по кредиту',
      },
      {
        title: 'Бесплатно',
        description: 'стоимость обслуживания',
      },
      {
        title: '1%',
        description: 'комиссия за снятие наличных в банкоматах Агробанка',
      },
      {
        title: '36 750 сумов',
        description: 'стоимость оформления или замены в случае утери или окончания срока действия',
      },
      {
        title: '4 зарплаты',
        description: 'размер кредитного лимита',
      },
      {
        title: '2 года',
        description: 'срок действия карты',
      },
    ],
    tags: [
      { title: 'Кешбек', type: ProductTagTypes.percent, value: 5 },
      { title: 'Снятие наличных', type: ProductTagTypes.text, value: 'Бесплатно' },
    ],
    title: 'Фаровон',
    type: ProductType.deposit,
    url: '/',
    updatedDate: '',
  },
  {
    advantages,
    backgroundPicture: {
      size: {
        height: 555,
        width: 555,
      },
      srcSets: [
        {
          src: productDemoImage,
          type: 'image/png',
        },
      ],
    } as ImageInfoData as any,
    categoryIds: [1, 2],
    code: 'card-product-code',
    description:
      'Классическая сумовая карта для оплаты покупок, коммунальных платежей, перевода денег на карты любых банков',
    id: 2,
    picture: {
      size: {
        width: 272,
        height: 174,
      },
      srcSets: [
        {
          src: cardImage,
          type: 'image/png',
        },
      ],
    } as ImageInfoData as any,
    properties: [
      {
        title: '26,99 %',
        description: 'ставка по кредиту',
      },
      {
        title: 'Бесплатно',
        description: 'стоимость обслуживания',
      },
      {
        title: '1%',
        description: 'комиссия за снятие наличных в банкоматах Агробанка',
      },
      {
        title: '36 750 сумов',
        description: 'стоимость оформления или замены в случае утери или окончания срока действия',
      },
      {
        title: '4 зарплаты',
        description: 'размер кредитного лимита',
      },
      {
        title: '2 года',
        description: 'срок действия карты',
      },
    ],
    tags: [
      { title: 'Кешбек', type: ProductTagTypes.percent, value: 5 },
      { title: 'Снятие наличных', type: ProductTagTypes.text, value: 'Бесплатно' },
    ],
    title: 'Другой',
    type: ProductType.card,
    url: '/',
    updatedDate: '',
  },
  {
    advantages,
    backgroundPicture: {
      size: {
        height: 290,
        width: 188,
      },
      srcSets: [
        {
          src: cardImage,
          type: 'image/png',
        },
      ],
    } as ImageInfoData as any,
    categoryIds: [1],
    code: 'code',
    description:
      'Классическая сумовая карта для оплаты покупок, коммунальных платежей, перевода денег на карты любых банков',
    id: 3,
    picture: {
      size: {
        height: 290,
        width: 188,
      },
      srcSets: [
        {
          src: cardImage,
          type: 'image/png',
        },
      ],
    } as ImageInfoData as any,
    tags: [
      {
        title: 'Комиссия',
        type: ProductTagTypes.percent,
        value: 0.5,
      },
      {
        title: 'Оформление',
        type: ProductTagTypes.amount,
        value: {
          amount: 36750,
          currency: 'UZS',
        },
      },
    ],
    title: 'Сумовая карта UzCard',
    type: ProductType.card,
    url: '/',
    updatedDate: '',
  },
  {
    advantages,
    backgroundPicture: {
      size: {
        height: 959,
        width: 1439,
      },
      srcSets: [
        {
          src: backgroundDemoImage,
          type: 'image/jpeg',
        },
      ],
    } as ImageInfoData as any,
    calculationParams: {
      amount: {
        max: 1_560_000_000,
        min: 592_000,
        title: 'Хочу вложить',
        type: CalculationParameterValueType.variable,
      },
      interestRate: {
        title: 'Ставка',
        type: CalculationParameterValueType.fixed,
        value: 17,
      },
      monthCount: {
        title: 'Срок',
        type: CalculationParameterValueType.fixed,
        value: 13,
      },
    },
    canBeApplied: true,
    categoryIds: [],
    code: 'deposit-product-code',
    currency: 'UZS',
    description: '',
    id: 4,
    title: 'Эркин',
    tags: [
      {
        title: 'Ставка',
        type: ProductTagTypes.percent,
        value: 17,
      },
      {
        title: 'Срок',
        type: ProductTagTypes.text,
        value: '13 мес.',
      },
    ],
    type: ProductType.deposit,
    url: '/',
    updatedDate: '',
  },
  {
    advantages,
    backgroundPicture: {
      size: {
        height: 675,
        width: 675,
      },
      srcSets: [
        {
          src: productDemoImage,
          type: 'image/png',
        },
      ],
    } as ImageInfoData as any,
    categoryIds: [],
    code: 'code',
    description:
      'Классическая сумовая карта для оплаты покупок, коммунальных платежей, перевода денег на карты любых банков',
    id: 5,
    picture: {
      size: {
        height: 290,
        width: 188,
      },
      srcSets: [
        {
          src: cardImage,
          type: 'image/png',
        },
      ],
    } as ImageInfoData as any,
    promoted: true,
    tags: [
      {
        title: 'Комиссия',
        type: ProductTagTypes.percent,
        value: 0.5,
      },
      {
        title: 'Оформление',
        type: ProductTagTypes.amount,
        value: {
          amount: 36750,
          currency: 'UZS',
        },
      },
    ],
    title: 'Сумовая карта UzCard',
    type: ProductType.card,
    url: '/',
    updatedDate: '',
  },
  {
    backgroundPicture: {
      size: {
        height: 675,
        width: 675,
      },
      srcSets: [
        {
          src: productDemoImage,
          type: 'image/png',
        },
      ],
    } as ImageInfoData as any,
    calculationParams: {
      amount: {
        max: 320_000_000,
        min: 50_000_000,
        step: 1_000,
        title: 'Стоимость недвижимости',
        type: CalculationParameterValueType.variable,
      },
      initialPayment: {
        max: 90,
        min: 25,
        step: 5,
        title: 'Первоначальный взнос',
        type: CalculationParameterValueType.variable,
      },
      interestRate: {
        title: 'Ставка',
        value: 18,
        type: CalculationParameterValueType.fixed,
      },
      monthCount: {
        title: 'Срок',
        value: 240,
        type: CalculationParameterValueType.fixed,
      },
    },
    canBeApplied: true,
    categoryIds: [],
    code: 'code',
    currency: 'USD',
    description:
      'Классическая сумовая карта для оплаты покупок, коммунальных платежей, перевода денег на карты любых банков',
    id: 6,
    promoted: true,
    tags: [
      {
        title: 'Комиссия',
        type: ProductTagTypes.percent,
        value: 0.5,
      },
      {
        title: 'Оформление',
        type: ProductTagTypes.amount,
        value: {
          amount: 36750,
          currency: 'UZS',
        },
      },
    ],
    title: 'Сумовая карта UzCard',
    type: ProductType.loan,
    url: '/',
    updatedDate: '',
  },
  {
    backgroundPicture: {
      size: {
        height: 1150,
        width: 1798,
      },
      srcSets: [
        {
          src: productDemoImage2,
          type: 'image/png',
        },
      ],
    } as ImageInfoData as any,
    code: 'sber',
    countries: [
      ['RUS', 'UZB'],
      ['UZB', 'RUS'],
    ],
    id: 7,
    title: 'Перевод клиенту Сбербанка',
    type: ProductType.remittance,
    tags: [
      {
        title: 'Комиссия',
        type: ProductTagTypes.text,
        value: '0%',
      },
      {
        title: 'Сумма',
        type: ProductTagTypes.text,
        value: 'до 150 000 рублей в сутки',
      },
    ],
    url: '/',
    updatedDate: '',
  },
  {
    backgroundPicture: {
      size: {
        height: 1150,
        width: 1798,
      },
      srcSets: [
        {
          src: productDemoImage2,
          type: 'image/png',
        },
      ],
    } as ImageInfoData as any,
    code: 'golden',
    countries: [
      ['UZB', '000'],
      ['UZB', '001'],
    ],
    description:
      'Классическая сумовая карта для оплаты покупок, коммунальных платежей, перевода денег на карты любых банков',
    id: 8,
    title: 'Перевод через Золотую Корону',
    type: ProductType.remittance,
    tags: [
      {
        title: 'Комиссия',
        type: ProductTagTypes.text,
        value: '1%',
      },
      {
        title: 'Сумма',
        type: ProductTagTypes.text,
        value: 'до 150 000 рублей в сутки',
      },
    ],
    url: '/',
    updatedDate: '',
  },
  {
    backgroundPicture: {
      size: {
        height: 1150,
        width: 1798,
      },
      srcSets: [
        {
          src: productDemoImage2,
          type: 'image/png',
        },
      ],
    } as ImageInfoData,
    code: 'aexp',
    countries: [['RUS', 'USA']],
    id: 9,
    title: 'Перевод через Агро Экспресс',
    type: ProductType.remittance,
    tags: [
      {
        title: 'Комиссия',
        type: ProductTagTypes.text,
        value: '0%',
      },
      {
        title: 'Сумма',
        type: ProductTagTypes.text,
        value: 'до 150 000 рублей в сутки',
      },
    ],
    url: '/',
    updatedDate: '',
  },
];

export const productsCategories: FilterItemData[] = [
  {
    id: 1,
    code: 'code-1',
    title: 'Кэшбек',
  },
  {
    id: 2,
    code: 'code-2',
    title: 'Бесплатный выпуск',
  },
];
