import { RefObject, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = ({
  elementRef,
  callback,
}: {
  elementRef: RefObject<HTMLElement>;
  callback: ResizeObserverCallback;
}) => {
  useEffect(() => {
    const { current: element } = elementRef;

    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(callback);

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [elementRef, callback]);
};

export { useResizeObserver };
