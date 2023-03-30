import React, { FC, useEffect, useMemo, useState } from 'react';
import { ModalContext } from '../../contexts';
import { Breakpoints, breakpointsToMediaQuery } from '../../helpers';
import { useMatchMedia } from '../../hooks';
import { WithClassNameComponentProps } from '../../interfaces';
import { Modal } from '../modal/modal';
import { ModalMenu } from '../units/modal-menu/modal-menu';
import { DesktopHeader, MobileHeader } from './components';

const Header: FC<WithClassNameComponentProps> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFocusedElement, setIsFocusedElement] = useState(false);
  const [isMenuModalShown, setIsMenuModalShown] = useState(false);

  useMatchMedia({
    callback: setIsMobile,
    mediaQuery: breakpointsToMediaQuery({ to: Breakpoints.md }),
  });

  useEffect(() => {
    if (!isMobile) {
      setIsMenuModalShown(false);
    }
  }, [isMobile]);

  const modalContextValue = useMemo(
    () => ({
      closeModal: () => setIsMenuModalShown(false),
      isFocusedElement,
      isModalShown: isMenuModalShown,
      openModal: () => setIsMenuModalShown(true),
      setIsFocusedElement,
    }),
    [isFocusedElement, isMenuModalShown],
  );

  return isMobile ? (
    <>
      <ModalContext.Provider value={modalContextValue}>
        {isMenuModalShown ? (
          <Modal>
            <ModalMenu />
          </Modal>
        ) : (
          <MobileHeader />
        )}
      </ModalContext.Provider>
    </>
  ) : (
    <DesktopHeader className={className} />
  );
};

export { Header };
