import { BaseBackgroundColor } from '../src/interfaces';
import { i18n } from './i18n';

export const parameters = {
  i18n,
  locale: "ru",
  locales: {
    ru: {title: "Russian", left: '🇷🇺'},
    uz: {title: "Uzbek", left: '🇺🇿'},
    en: {title: "English", left: '🇺🇸'},
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  baseBackgroundColor: {
    name: 'BBC',
    description: 'This value will be provided by BackgroundBaseColorContext',
    defaultValue: BaseBackgroundColor.default,
    toolbar: {
      icon: 'grow',
      // Array of plain string values or MenuItem shape (see below)
      items: [
        BaseBackgroundColor.default,
        BaseBackgroundColor.blue,
        BaseBackgroundColor.darkBlue,
        BaseBackgroundColor.deepBlue,
        BaseBackgroundColor.green,
        BaseBackgroundColor.orange,
        BaseBackgroundColor.semiRed,
      ],
    },
  },
};
