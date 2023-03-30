import { ImageInfoData, SocialNetwork } from '../../interfaces';
import { mobileApplication } from '../mobile-application';

export const footer = {
  bankCopyrights: [
    '2005-2020 © Barcha huquqlar himoyalangan. Barcha xizmatlar litsenziyalangan',
    '“Agrobank” aksiyadorlik tijorat banki 2014-yil 29-avgustda O‘zbekiston Respublikasi Markaziy banki tomonidan 78-son bilan ro‘yxatga olingan',
  ],
  alsCopyrights: {
    designedBy: 'Tomonidan ishlab chiqilgan ',
    ALSUrl: {
      title: 'Art. Lebedev studiyasi',
      url: 'https://artlebedev.ru',
    },
    announceUrl: {
      title: 'Sayt haqida malumot',
      url: 'https://artlebedev.ru/',
    },
  },
  isMainPage: true,
  links: [
    {
      title: 'Bank haqida',
      url: '/bank',
    },
    {
      title: 'Boglanish',
      url: '/contacts',
    },
    {
      title: 'Filiallar va bankomatlar',
      url: '/atms',
    },
  ],
  mobileApplicationLinks: mobileApplication.links.map((link) => ({
    ...link,
    picture: link.picture as unknown as ImageInfoData,
  })),
  phone: {
    hint: 'Call-center',
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
