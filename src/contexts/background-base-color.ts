import React, { useCallback, useContext, useState } from 'react';
import pageStyles from '../components/page/style.module.scss';
import { BaseBackgroundColor } from '../interfaces';

export const BaseBackgroundColorContext = React.createContext<{
  baseBackgroundColor: BaseBackgroundColor;
  setPageBaseBackgroundColor?: (baseBackgroundColor: BaseBackgroundColor) => void;
}>({
  baseBackgroundColor: BaseBackgroundColor.default,
});

export const useBaseBackgroundColor = () => {
  return useContext(BaseBackgroundColorContext);
};

export const useBaseBackgroundColorContextValue = (baseBackgroundColor: BaseBackgroundColor) => {
  const [localBaseBackgroundColor, setLocalBaseBackgroundColor] = useState(baseBackgroundColor);

  const setPageBaseBackgroundColor = useCallback((baseBackgroundColor: BaseBackgroundColor): void => {
    setLocalBaseBackgroundColor(baseBackgroundColor);

    setTimeout(() => {
      document.body.style.backgroundColor = window.getComputedStyle(
        document.querySelector(`.${pageStyles['page']}`)!,
      ).backgroundColor;
    }, 0);
  }, []);

  return {
    baseBackgroundColor: localBaseBackgroundColor,
    setPageBaseBackgroundColor,
  };
};
