import { useCallback, useRef } from 'react';

const useCallbackOnChange = (initialValue?: any) => {
  const valueRef = useRef(initialValue);
  const callbackRef = useRef<Function | null>();
  const provideCallback = useCallback((setter) => {
    callbackRef.current = setter;
  }, []);
  const setValue = useCallback((value) => {
    const { current: callback } = callbackRef;

    if (value instanceof Function) {
      value = value(valueRef.current);
    }

    if (value !== valueRef.current && callback instanceof Function) {
      callback(value);
      valueRef.current = value;
    }
  }, []);

  return {
    setValue,
    provideCallback,
  };
};

export { useCallbackOnChange };
