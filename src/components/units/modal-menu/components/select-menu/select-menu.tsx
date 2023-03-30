import cs from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useModalContext } from '../../../../../contexts';
import { useMenu } from '../../../../../hooks';
import { MenuType } from '../../../menu/interfaces';
import { Menu as MobileMenu } from '../../components';
import selectMenuStyles from './style.module.scss';

const selectMenuClassname = 'select-menu';

const SelectMenu = () => {
  const selectDropdownElementRef = useRef<HTMLDivElement>(null);
  const mainMenuItems = useMenu('main');
  const { pathname } = useLocation();
  const { closeModal } = useModalContext();
  const [isMainMobileMenuSelectFolded, setIsMainMobileMenuSelectFolded] = useState(true);
  const defaultItemElementId = useMemo(
    () =>
      mainMenuItems?.find(({ children, path }) => children.length && path === pathname.split('/')[2])?.id ||
      mainMenuItems?.find(({ children }) => children.length)?.id,
    [mainMenuItems, pathname],
  );
  const mainMenuItemsWithChildren = useMemo(
    () => mainMenuItems?.filter(({ children, id }) => children.length && id !== defaultItemElementId) ?? [],
    [defaultItemElementId, mainMenuItems],
  );
  const activeItemElement = useMemo(
    () => mainMenuItems?.find(({ id }) => id === defaultItemElementId),
    [defaultItemElementId, mainMenuItems],
  );
  const [previousActiveItemElementId, setPreviousActiveItemElementId] = useState(defaultItemElementId);
  const subMenuItems = mainMenuItems?.find(({ id }) => id === defaultItemElementId)?.children ?? [];
  const [previousPathname] = useState(pathname);

  useEffect(() => {
    if (pathname !== previousPathname) {
      closeModal();
    }

    if (defaultItemElementId !== previousActiveItemElementId) {
      setPreviousActiveItemElementId(defaultItemElementId);
      setIsMainMobileMenuSelectFolded(true);
    }
  }, [defaultItemElementId, closeModal, pathname, previousActiveItemElementId, previousPathname]);

  useEffect(() => {
    const { current: selectDropdownElement } = selectDropdownElementRef;

    if (!selectDropdownElement) {
      return;
    }

    const keyDownHandler = (event: KeyboardEvent) => {
      const { key } = event;
      const focusedElement = document.querySelector(':focus');

      if (!focusedElement) {
        return;
      }

      if (focusedElement.matches(`.${selectMenuStyles[`${selectMenuClassname}__select-dropdown`]}`)) {
        switch (key) {
          case 'Enter':
          case ' ':
            setIsMainMobileMenuSelectFolded(!isMainMobileMenuSelectFolded);
            event.preventDefault();
            break;
        }
      }
    };

    selectDropdownElement.addEventListener('keydown', keyDownHandler);

    return () => {
      selectDropdownElement.removeEventListener('keydown', keyDownHandler);
    };
  }, [isMainMobileMenuSelectFolded]);

  return (
    <div className={selectMenuStyles[selectMenuClassname]}>
      <div
        className={cs(selectMenuStyles[`${selectMenuClassname}__select`], {
          [selectMenuStyles[`${selectMenuClassname}__select_folded`]]: isMainMobileMenuSelectFolded,
        })}
      >
        {activeItemElement?.title ? (
          <div
            className={selectMenuStyles[`${selectMenuClassname}__select-dropdown`]}
            onClick={() => setIsMainMobileMenuSelectFolded((value) => !value)}
            ref={selectDropdownElementRef}
            tabIndex={0}
          >
            <span dangerouslySetInnerHTML={{ __html: activeItemElement?.title }} />
            <span className={selectMenuStyles[`${selectMenuClassname}__select-dropdown-arrow`]} />
          </div>
        ) : null}
        {mainMenuItemsWithChildren.length && !isMainMobileMenuSelectFolded ? (
          <div className={selectMenuStyles[`${selectMenuClassname}__main-wrapper`]}>
            <MobileMenu menuItems={mainMenuItemsWithChildren} menuType={MenuType.main} />
          </div>
        ) : null}
      </div>
      {subMenuItems.length ? (
        <div className={selectMenuStyles[`${selectMenuClassname}__submenu-wrapper`]}>
          <MobileMenu menuItems={subMenuItems} menuType={MenuType.submenu} />
        </div>
      ) : null}
    </div>
  );
};

export { SelectMenu };
