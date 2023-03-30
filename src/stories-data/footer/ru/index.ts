import { SocialNetwork } from '../../../interfaces';
import { mobileApplication } from '../../mobile-application';

export const footer = {
  bankCopyrights: [
    '2005-2020 © Все права защищены. Все услуги лицензированы',
    'Акционерный коммерческий банк «Агробанк» зарегистрирован 29 августа 2014 года Центральным банком Республики Узбекистан под номером 78',
  ],
  alsCopyrights: {
    designedBy: 'Задизайнено в ',
    ALSUrl: {
      title: 'Студии Артемия Лебедева',
      url: 'https://artlebedev.ru',
    },
    announceUrl: {
      title: 'Информация о сайте',
      url: 'https://artlebedev.ru/',
    },
  },
  isMainPage: true,
  links: [
    {
      title: 'Про банк',
      url: '/bank',
    },
    {
      title: 'Связь с банком',
      url: '/contacts',
    },
    {
      title: 'Отделения и банкоматы',
      url: '/atms',
    },
  ],
  mobileApplicationLinks: mobileApplication.links,
  phone: {
    hint: 'Бесплатно по Узбекистану',
    phoneNumber: '+998712038888',
  },
  socialNetworksLinks: [
    {
      title: '',
      type: SocialNetwork.facebook,
      url: '',
    },
    {
      title: '',
      type: SocialNetwork.instagram,
      url: '',
    },
    {
      title: '',
      type: SocialNetwork.telegram,
      url: '',
    },
  ],
};
