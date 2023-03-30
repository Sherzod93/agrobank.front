import cs from 'classnames';
import React, { FC, InputHTMLAttributes, useRef } from 'react';
import { useBaseBackgroundColor } from '../../../../contexts';
import { WithClassNameComponentProps } from '../../../../interfaces';
import radioStyles from './style.module.scss';

const radioClassname = 'radio';

interface RadioProps {
  isChecked?: boolean;
  isSolidBackgroundView?: boolean;
  onClick?: any;
}

const Radio: FC<InputHTMLAttributes<HTMLInputElement> & RadioProps & WithClassNameComponentProps> = ({
  className,
  children,
  disabled,
  isChecked = false,
  isSolidBackgroundView = false,
  onClick,
  ...otherProps
}) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const inputElementRef = useRef<HTMLInputElement>(null);

  return (
    <label
      className={cs(
        radioStyles[radioClassname],
        radioStyles[`${radioClassname}_base-background-color_${baseBackgroundColor}`],
        {
          [radioStyles[`${radioClassname}_disabled`]]: disabled,
          [radioStyles[`${radioClassname}_solid`]]: isSolidBackgroundView,
          [radioStyles[`${radioClassname}_checked`]]: isChecked,
        },
        className,
      )}
    >
      <input
        ref={inputElementRef}
        className={radioStyles[`${radioClassname}__input`]}
        defaultChecked={isChecked}
        disabled={disabled}
        onClick={() => onClick && onClick()}
        type="radio"
        {...otherProps}
      />
      <span className={radioStyles[`${radioClassname}__box`]}>
        <span className={radioStyles[`${radioClassname}__inner-point`]} />
      </span>
      {children}
    </label>
  );
};

export { Radio };
