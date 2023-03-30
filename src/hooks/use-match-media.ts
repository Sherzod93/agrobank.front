import { useCallback, useEffect } from 'react';
import { useCallbackOnChange } from './use-callback-on-change';

const useMatchMedia = ({ mediaQuery, callback }: { callback: (matches: boolean) => void; mediaQuery: string }) => {
  const { setValue, provideCallback } = useCallbackOnChange();
  const handler = useCallback(({ matches }: MediaQueryListEvent) => setValue(matches), [setValue]);

  useEffect(() => {
    provideCallback(callback);
  }, [callback, provideCallback]);

  useEffect(() => {
    const observer = window.matchMedia(mediaQuery);
    const isCompatibilityMode = !observer.addEventListener;

    setValue(observer.matches);

    if (isCompatibilityMode) {
      observer.addListener(handler);
    } else {
      observer.addEventListener('change', handler, { passive: true });
    }

    return () => {
      if (isCompatibilityMode) {
        observer.removeListener(handler);
      } else {
        observer.removeEventListener('change', handler);
      }
    };
  }, [handler, mediaQuery, setValue]);
};

export { useMatchMedia };
