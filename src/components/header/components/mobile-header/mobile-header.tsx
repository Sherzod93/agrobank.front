import cs from 'classnames';
import React, { FC } from 'react';
import { useModalContext } from '../../../../contexts';
import { WithClassNameComponentProps } from '../../../../interfaces';
import { Burger } from '../../../units/burger/burger';
import { Logo } from '../../../units/business/logo/logo';
import { headerClassname } from '../../contstants';
import headerStyles from '../../style.module.scss';

const MobileHeader: FC<WithClassNameComponentProps> = ({ className }) => {
  const { closeModal, isModalShown, openModal, setIsFocusedElement } = useModalContext();

  const clickHandler = () => {
    const focusedElement = document.querySelector(':focus-visible');

    if (!focusedElement) {
      return;
    }

    setIsFocusedElement(true);
  };

  return (
    <header className={cs(headerStyles[headerClassname], className)}>
      <Logo />
      <Burger
        isExpanded={isModalShown}
        onClick={() => {
          if (isModalShown) {
            closeModal();
          } else {
            clickHandler();
            openModal();
          }
        }}
      />
    </header>
  );
};

export { MobileHeader };
