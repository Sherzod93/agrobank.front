import cs from 'classnames';
import React, { ButtonHTMLAttributes, FC } from 'react';
import { useBaseBackgroundColor } from '../../../../contexts';
import { WithClassNameComponentProps } from '../../../../interfaces';
import buttonStyles from './style.module.scss';

export const buttonClassname = 'button';

export enum ButtonSize {
  default = 'default',
  small = 'small',
  xSmall = 'x-small',
}

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

interface ButtonProps {
  buttonType?: ButtonType;
  size?: ButtonSize;
  withArrow?: boolean;
}

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps & WithClassNameComponentProps> = ({
  className,
  children,
  size = ButtonSize.default,
  buttonType = ButtonType.primary,
  withArrow = false,
  ...buttonProps
}) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();

  return (
    <button
      className={cs(
        buttonStyles[buttonClassname],
        buttonStyles[`${buttonClassname}_base-background-color_${baseBackgroundColor}`],
        buttonStyles[`${buttonClassname}_buttonType_${buttonType}`],
        buttonStyles[`${buttonClassname}_buttonSize_${size}`],
        {
          [buttonStyles[`${buttonClassname}_withArrow`]]: withArrow,
          [buttonStyles[`${buttonClassname}_disabled`]]: buttonProps.disabled,
        },
        className,
      )}
      {...buttonProps}
    >
      {children}
      {withArrow ? '\xA0\xA0→' : ''}
    </button>
  );
};

export { Button };
