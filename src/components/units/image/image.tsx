import cs from 'classnames';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import { provideForwardRef } from '../../../helpers';
import { loadingLazySubscriber } from '../../../helpers/tools';
import { ImageInfo, WithClassNameComponentProps } from '../../../interfaces';
import imageStyles from './style.module.scss';

export interface ImageProps {
  'aria-hidden'?: boolean;
  image: ImageInfo;
}

const imageClassname = 'image';

const { subscribe: subscribeForLoadingLazy, unsubscribe: unsubscribeFromLoadingLazy } = loadingLazySubscriber;

const generatePlaceholderSvg = ({ height, width }: { height: number; width: number }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" height="${height}" viewBox="0 0 ${width} ${height}" width="${width}"/>`;

const Image: FC<ImageProps & WithClassNameComponentProps> = React.forwardRef(
  ({ 'aria-hidden': ariaHidden = false, className, image }, forwardRef) => {
    const componentElementRef = useRef<HTMLImageElement | null>(null);
    const svgPlaceholderDataUrl = useMemo(() => `data:image/svg+xml;utf8,${generatePlaceholderSvg(image)}`, [image]);

    useEffect(() => {
      const { current: componentElement } = componentElementRef;

      if (!componentElement) {
        return;
      }

      const placeholderLoadHandler = (event: any) => {
        if (event.target.src === svgPlaceholderDataUrl) {
          event.stopImmediatePropagation();
        }
      };

      componentElement.addEventListener('load', placeholderLoadHandler, { once: true });

      subscribeForLoadingLazy(componentElement, ({ isIntersecting, target }) => {
        if (isIntersecting) {
          unsubscribeFromLoadingLazy(componentElement);

          (target as HTMLImageElement).src = image.src;
        }
      });

      return () => {
        componentElement.removeEventListener('load', placeholderLoadHandler);
        unsubscribeFromLoadingLazy(componentElement);
      };
    }, [image, svgPlaceholderDataUrl]);

    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img
        ref={(element) => {
          componentElementRef.current = element;
          provideForwardRef(element, forwardRef as React.ForwardedRef<HTMLElement>);
        }}
        aria-hidden={ariaHidden}
        className={cs(imageStyles[imageClassname], className)}
        {...image}
        src={svgPlaceholderDataUrl}
      />
    );
  },
);

export { Image };
