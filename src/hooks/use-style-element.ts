import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';

const useStyleElement = () => {
  const styleElementRef = useRef<HTMLStyleElement | null>(null);
  const [styleElementCssScope] = useState(() => nanoid());

  useEffect(() => {
    const styleElement = document.createElement('style');

    document.head.appendChild(styleElement);
    styleElementRef.current = styleElement;

    return () => {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  return [styleElementRef, styleElementCssScope] as [typeof styleElementRef, typeof styleElementCssScope];
};

export { useStyleElement };
