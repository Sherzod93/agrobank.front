import cs from 'classnames';
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { provideForwardRef } from '../../../../../helpers';
import { WithClassNameComponentProps } from '../../../../../interfaces';
import rangeStyles from './style.module.scss';

const rangeClassname = 'range';

const Range = React.forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { valueOnTheBar?: string } & WithClassNameComponentProps
>(({ className = 1, valueOnTheBar, ...restProps }, forwardRef) => {
  const barElementRef = useRef<HTMLDivElement>(null);
  const inputElementRef = useRef<HTMLInputElement | null>(null);
  const trackElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current: barElement } = barElementRef;
    const { current: inputElement } = inputElementRef;
    const { current: trackElement } = trackElementRef;

    if (!barElement || !inputElement || !trackElement) {
      return;
    }

    const widths = {
      bar: 0,
      track: 0,
    };

    const updateBarPosition = () => {
      const { max: maxFromProps = 100, min: minFromProps = 0 } = restProps;
      const max = Number(maxFromProps);
      const min = Number(minFromProps);
      const value = Number(inputElement.value);
      const relativePosition = (value - min) / (max - min);
      barElement.style.left = `${relativePosition * (widths.track - widths.bar)}px`;
    };

    const resizeObserver = new ResizeObserver(() => {
      const { width: barWidth } = barElement.getBoundingClientRect();
      const { width: trackWidth } = trackElement.getBoundingClientRect();

      widths.bar = barWidth;
      widths.track = trackWidth;

      updateBarPosition();
    });

    resizeObserver.observe(trackElement);

    inputElement.addEventListener('input', updateBarPosition);

    return () => {
      resizeObserver.disconnect();
      inputElement.removeEventListener('input', updateBarPosition);
    };
  }, [restProps]);

  return (
    <div className={cs(rangeStyles[rangeClassname], className)}>
      <input
        className={rangeStyles[`${rangeClassname}__native-input`]}
        {...restProps}
        ref={(element) => {
          inputElementRef.current = element;
          provideForwardRef(element, forwardRef as React.ForwardedRef<HTMLElement>);
        }}
        type="range"
      />
      <div ref={trackElementRef} className={rangeStyles[`${rangeClassname}__track`]}>
        <div ref={barElementRef} className={rangeStyles[`${rangeClassname}__bar`]}>
          {valueOnTheBar ? <span className={rangeStyles[`${rangeClassname}__value`]}>{valueOnTheBar}</span> : null}
        </div>
      </div>
    </div>
  );
});

export { Range };
