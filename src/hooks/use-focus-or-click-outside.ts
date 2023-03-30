import { RefObject, useEffect } from 'react';

const useFocusOrClickOutside = (elementRef: RefObject<HTMLElement>, isActive: boolean, callback: () => void) => {
  useEffect(() => {
    const { current: componentElement } = elementRef;

    if (!componentElement) {
      return;
    }

    if (!isActive) {
      return;
    }

    const focusOrClickHandler = ({ target }: Event) => {
      if (!componentElement.contains(target as HTMLLIElement)) {
        callback();
      }
    };

    document.addEventListener('focus', focusOrClickHandler, { capture: true, passive: true });
    document.addEventListener('click', focusOrClickHandler, { capture: true, passive: true });

    return () => {
      document.removeEventListener('focus', focusOrClickHandler);
      document.removeEventListener('click', focusOrClickHandler);
    };
  }, [callback, elementRef, isActive]);
};

export { useFocusOrClickOutside };
