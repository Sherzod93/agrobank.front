import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export const useClampLines = ({
  elementRef,
  lines = 3,
  text,
}: {
  elementRef: RefObject<HTMLElement>;
  lines?: number;
  text: string;
}) => {
  const [isClamp, setIsClamp] = useState(false);
  const textSplit = useRef<string[]>(text.split(' '));

  const textReduction = useCallback(
    (componentElement: HTMLElement) => {
      textSplit.current.pop();
      componentElement.children[0].innerHTML = textSplit.current.join(' ') + '...';
      setIsClamp(true);
    },
    [textSplit],
  );

  const clampLines = useCallback(() => {
    const { current: componentElement } = elementRef;

    if (!componentElement) {
      return;
    }

    let componentHeight = componentElement.clientHeight;
    const lineHeight = parseInt(window.getComputedStyle(componentElement, null).getPropertyValue('line-height'));
    const maxHeight = (lineHeight + 1) * lines;

    while (componentHeight > maxHeight) {
      textReduction(componentElement);
      componentHeight = componentElement.clientHeight;
    }
  }, [elementRef, lines, textReduction]);

  const resizeClampLines = useCallback(() => {
    const { current: componentElement } = elementRef;

    if (!componentElement) {
      return;
    }

    textSplit.current = text.split(' ');
    componentElement.children[0].innerHTML = textSplit.current.join(' ');
    setIsClamp(false);
    clampLines();
  }, [clampLines, elementRef, text]);

  useEffect(() => {
    clampLines();

    window.addEventListener('resize', resizeClampLines);

    return () => {
      window.removeEventListener('resize', resizeClampLines);
    };
  }, [clampLines, resizeClampLines]);

  return { isClamp };
};
