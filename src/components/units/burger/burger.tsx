import cs from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useModalContext } from '../../../contexts';
import { WithClassNameComponentProps } from '../../../interfaces';
import burgerStyles from './style.module.scss';

const burgerClassname = 'burger';

interface BurgerProps {
  isExpanded?: boolean;
  onClick?: () => void;
}

const Burger: FC<BurgerProps & WithClassNameComponentProps> = ({ isExpanded = false, onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isFocusedElement } = useModalContext();
  const [isItActsAsExpanded, setIsItActsAsExpanded] = useState(!isExpanded);

  useEffect(() => {
    if (isFocusedElement) {
      buttonRef.current?.focus();
    }

    const timeoutId = setTimeout(() => {
      setIsItActsAsExpanded(isExpanded);
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isExpanded, isFocusedElement]);

  return (
    <div
      className={cs(burgerStyles[burgerClassname], {
        [burgerStyles[`${burgerClassname}_expanded`]]: isItActsAsExpanded,
      })}
    >
      <button
        aria-expanded={isExpanded}
        className={burgerStyles[`${burgerClassname}__container`]}
        onClick={onClick}
        ref={buttonRef}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={burgerStyles[`${burgerClassname}__bar`]} />
        ))}
      </button>
    </div>
  );
};

export { Burger };
