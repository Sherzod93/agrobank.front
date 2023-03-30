import { throttle } from 'lodash-es';
import { nanoid } from 'nanoid';
import { RefObject, useEffect, useRef } from 'react';
import { useStyleElement } from './use-style-element';

const useTextAutoresize = (elementRef: RefObject<HTMLElement>) => {
  const classNameRef = useRef(`qq_${nanoid()}`);
  const [styleElementRef] = useStyleElement();

  useEffect(() => {
    const { current: componentElement } = elementRef;
    const { current: styleElement } = styleElementRef;
    const { current: className } = classNameRef;

    if (!componentElement || !styleElement) {
      return;
    }

    const { sheet: cssSheet } = styleElement;

    if (!cssSheet) {
      return;
    }

    componentElement.classList.add(className);

    cssSheet.insertRule(
      `.${className} {
        white-space: nowrap;
        width: max-content;
      }`,
    );

    let maxWidthLastValue = 0;

    const resizeHandler = throttle(() => {
      if (!componentElement || !styleElement) {
        return;
      }

      if (cssSheet.rules.length > 1) {
        cssSheet.removeRule(1);
      }

      const iterationLimit = 21;
      const { paddingRight: paddingRightInPx, paddingLeft: paddingLeftInPx } = getComputedStyle(
        componentElement.parentElement!,
      );
      const [paddingRight, paddingLeft] = [paddingRightInPx, paddingLeftInPx].map((value) => Number.parseFloat(value));
      const maxWidth = componentElement.parentElement!.clientWidth - paddingLeft - paddingRight;
      let i = 0;

      if (maxWidthLastValue === maxWidth) {
        return;
      }

      maxWidthLastValue = maxWidth;

      function step() {
        if (!componentElement || !cssSheet) {
          return;
        }

        const fontSize = parseFloat(getComputedStyle(componentElement).fontSize);

        i += 1;

        if (i < iterationLimit && componentElement!.clientWidth > maxWidth) {
          if (cssSheet.rules.length > 1) {
            cssSheet.removeRule(1);
          }

          cssSheet.insertRule(
            `.${className} {
                font-size: ${fontSize * 0.9}px !important;
              }`,
            1,
          );
          window.requestAnimationFrame(step);
        } else {
          // @ts-ignore
          componentElement.style.color = null;
        }
      }

      componentElement.style.color = 'transparent';
      window.requestAnimationFrame(step);
    }, 300);

    resizeHandler();

    window.addEventListener('resize', resizeHandler, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeHandler);
      Array.from(cssSheet.cssRules).forEach(() => cssSheet.removeRule(0));
    };
  }, [elementRef, styleElementRef]);
};

export { useTextAutoresize };
