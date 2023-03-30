import { ImageInfoData, MobileApplicationData, StoreType } from '../../interfaces';
import appStorePicture from './resources/app-store-badge.svg';
import googlePlayPicture from './resources/google-play-badge.svg';
import mobileBankExampleImage from './resources/mobile-bank-example.png';

export const mobileApplication: MobileApplicationData = {
  description: 'История операций по карте, график расходов, управление лимитами, блокировка и перевыпуск онлайн',
  links: [
    {
      picture: {
        size: {
          width: 174,
          height: 50,
        },
        srcSets: [
          {
            src: appStorePicture,
            type: 'image/svg+xml',
          },
        ],
      } as ImageInfoData as any,
      storeType: StoreType.apple,
      title: 'AppStore',
      url: '',
    },
    {
      picture: {
        size: {
          width: 174,
          height: 50,
        },
        srcSets: [
          {
            src: googlePlayPicture,
            type: 'image/svg+xml',
          },
        ],
      } as ImageInfoData as any,
      storeType: StoreType.google,
      title: 'GooglePlay',
      url: '',
    },
  ],
  screenshots: [
    {
      size: {
        width: 705,
        height: 733,
      },
      srcSets: [
        {
          src: mobileBankExampleImage,
          type: 'image/png',
        },
      ],
    } as ImageInfoData as any,
  ],
  title: 'Мобильный Агробанк',
};
