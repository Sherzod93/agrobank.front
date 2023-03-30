import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../services/store';

export const useMenu = (type: string) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { menu } = useAppSelector((store) => store.menu);

  if (!menu) {
    return null;
  }

  return menu?.getMenu(type, language);
};
