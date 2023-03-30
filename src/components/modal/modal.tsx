import cs from 'classnames';
import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useModalContext } from '../../contexts';
import { WithClassNameComponentProps } from '../../interfaces';
import modalStyles from './style.module.scss';

const modalClassname = 'modal';
const noScrollClassname = 'no-scroll';

const Modal: FC<WithClassNameComponentProps> = ({ children }) => {
  const { isModalShown, closeModal } = useModalContext();
  const paddingRight = window.innerWidth - document.documentElement.clientWidth;

  useEffect(() => {
    if (!isModalShown) {
      return;
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.body.classList.add(noScrollClassname);
    document.body.style.paddingRight = `${paddingRight}px`;
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      document.body.classList.remove(noScrollClassname);
      document.body.style.paddingRight = 'initial';
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [closeModal, isModalShown, paddingRight]);

  return ReactDOM.createPortal(
    <div className={cs(modalStyles[modalClassname], 'container')}>{children}</div>,
    document.body,
  );
};

export { Modal };
