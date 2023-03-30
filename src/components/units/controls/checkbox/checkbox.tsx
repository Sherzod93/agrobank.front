import cs from 'classnames';
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useBaseBackgroundColor } from '../../../../contexts';
import { provideForwardRef } from '../../../../helpers';
import { WithClassNameComponentProps } from '../../../../interfaces';
import checkboxStyles from './style.module.scss';

const checkboxClassname = 'checkbox';

interface CheckboxProps {
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<
  HTMLElement,
  InputHTMLAttributes<HTMLInputElement> & CheckboxProps & WithClassNameComponentProps
>(({ className, children, disabled, indeterminate = false, onChange, ...otherProps }, forwardRef) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const inputElementRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const { current: inputElement } = inputElementRef;

    if (inputElement) {
      inputElement.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      className={cs(
        checkboxStyles[checkboxClassname],
        checkboxStyles[`${checkboxClassname}_base-background-color_${baseBackgroundColor}`],
        {
          [checkboxStyles[`${checkboxClassname}_disabled`]]: disabled,
        },
        className,
      )}
    >
      <input
        ref={(element) => {
          inputElementRef.current = element;
          provideForwardRef(element, forwardRef);
        }}
        className={checkboxStyles[`${checkboxClassname}__input`]}
        disabled={disabled}
        onChange={(event: any) => (onChange ? onChange(event.target.checked) : false)}
        type="checkbox"
        {...otherProps}
      />
      <span className={checkboxStyles[`${checkboxClassname}__box`]}>
        <svg
          aria-hidden={true}
          className={checkboxStyles[`${checkboxClassname}__icons`]}
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path className={checkboxStyles[`${checkboxClassname}__check`]} d="M10 15.512L18.5081 24L35 8" />
          <path className={checkboxStyles[`${checkboxClassname}__dash`]} d="M8 19H30" />
        </svg>
      </span>
      {children}
    </label>
  );
});

export { Checkbox };
