import { InfoCardData, InfoCardType } from '../../components/blocks/info-cards-block/interfaces';
import { ProductType, StoreType } from '../../interfaces';

export const infoCardItems: InfoCardData[] = [
  {
    id: 1,
    isFoldable: true,
    mobileApplicationData: {
      title: 'Мобильное приложение Агробанка',
      description:
        'История операций, оплата услуг ЖКХ, мобильной связи, интернета и телевидения через мобильное приложение',
      links: [
        {
          storeType: StoreType.apple,
          title: 'AppStore',
          url: '',
        },
        {
          title: 'GooglePlay',
          storeType: StoreType.google,
          url: '',
        },
      ],
      screenshots: [],
    },
    title: 'Оплата услуг в мобильном банке',
    type: InfoCardType.mobileApplication,
    productType: ProductType.default,
  },
  {
    id: 2,
    isFoldable: true,
    productType: ProductType.remittance,
    title: 'Международные денежные переводы',
    text: 'Золотая корона, АгроЭкспресс, АзияЭкспресс, Сбербанк Онлайн и другие платежные системы',
    type: InfoCardType.text,
  },
  {
    id: 3,
    isFoldable: true,
    title: 'Международные денежные переводы',
    productType: ProductType.card,
    text: 'Золотая корона, АгроЭкспресс, АзияЭкспресс, Сбербанк Онлайн и другие платежные системы',
    type: InfoCardType.link,
    url: 'https://www.yandex.ru',
    isTelegramLink: true,
  },
];
