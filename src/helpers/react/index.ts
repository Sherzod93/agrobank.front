import { ForwardedRef } from 'react';

export const provideForwardRef = (element: HTMLElement | null, forwardRef: ForwardedRef<HTMLElement>) => {
  if (forwardRef) {
    if (forwardRef instanceof Function) {
      forwardRef(element);
    } else {
      forwardRef.current = element;
    }
  }
};
