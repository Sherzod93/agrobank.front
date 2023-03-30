import cs from 'classnames';
import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useBaseBackgroundColor } from '../../../contexts';
import { useFocusOrClickOutside, useResizeObserver } from '../../../hooks';
import { WithClassNameComponentProps } from '../../../interfaces';
import { PageContentFetchState } from '../../../services/reducers';
import { useAppSelector } from '../../../services/store';
import { Link } from '../link/link';
import { MenuItemData, MenuItemType, MenuType } from './interfaces';
import menuStyles from './style.module.scss';

const menuClassname = 'menu';

interface MenuProps {
  menuItems: MenuItemData[];
  menuType: MenuType;
}

const menuItemClassname = menuStyles[`${menuClassname}__item`];
const menuItemExtraClassname = menuStyles[`${menuClassname}__item_extra`];
const activeMenuItemClassname = menuStyles[`${menuClassname}__item_active`];
const expanderMenuItemClassname = menuStyles[`${menuClassname}__item_expander`];
const menuWithSecondLineClassname = menuStyles[`${menuClassname}_with-second-line`];
const hiddenMenuItemClassname = menuStyles[`${menuClassname}__item_hidden`];
const lastMenuItemClassname = menuStyles[`${menuClassname}__item_last`];
const hiddenMenuItemAttribute = 'data-hidden-from-main-menu';

const listElementToDataMap = new WeakMap<
  HTMLUListElement,
  {
    activeMenuItemElement: HTMLLIElement;
    componentElement: HTMLDivElement;
    expanderMenuItemElement: HTMLLIElement;
    extraListElement: HTMLUListElement;
    linesCountRef: React.MutableRefObject<number>;
    menuItemElements: HTMLLIElement[];
    menuType: MenuType;
  }
>();

const setEffect = (listElement: HTMLUListElement) => {
  const data = listElementToDataMap.get(listElement);
  if (!data) return;

  const { componentElement, extraListElement, linesCountRef, menuType } = data;
  const menuItemElements = Array.from(listElement.querySelectorAll<HTMLLIElement>(`.${menuItemClassname}`));
  const expanderMenuItemElement = menuItemElements.pop()!;
  const activeMenuItemElement = menuItemElements[0];

  listElementToDataMap.set(listElement, {
    activeMenuItemElement,
    componentElement,
    expanderMenuItemElement,
    extraListElement,
    linesCountRef,
    menuItemElements,
    menuType,
  });

  if (linesCountRef.current === 2) {
    componentElement.classList.add(menuWithSecondLineClassname);
  }

  expanderMenuItemElement.classList.add(hiddenMenuItemClassname);

  const lastMenuItemElementIndex = menuItemElements.length - 1;
  const lastMenuItemElement = menuItemElements[lastMenuItemElementIndex];
  const lastMenuItemElementOffsetTop = lastMenuItemElement.offsetTop;

  if (menuType === MenuType.submenu) {
    const isThereTwoLines = lastMenuItemElementOffsetTop > 0;

    componentElement.classList.toggle(menuWithSecondLineClassname, isThereTwoLines);
    linesCountRef.current = isThereTwoLines ? 2 : 1;
  }

  const componentElementClientHeight = componentElement.clientHeight;

  const isThereOverflow = componentElementClientHeight <= lastMenuItemElementOffsetTop;
  if (isThereOverflow) {
    expanderMenuItemElement.classList.remove(hiddenMenuItemClassname);
  }

  const menuItemExtraElements = Array.from(
    extraListElement.querySelectorAll<HTMLLIElement>(`.${menuItemExtraClassname}`),
  );
  const menuItemElementsReversed = [...menuItemElements].reverse();
  const menuItemElementsExtraReversed = [...menuItemExtraElements].reverse();

  let index = -1;
  while (expanderMenuItemElement.offsetTop >= componentElementClientHeight) {
    const len = menuItemElementsReversed.length;
    if (len === 0 || (len === 1 && menuItemElementsReversed[len - 1].classList.contains(activeMenuItemClassname))) {
      break;
    }

    let operateMenuItemElement = menuItemElementsReversed.shift()!;
    index++;

    if (operateMenuItemElement.classList.contains(activeMenuItemClassname)) {
      operateMenuItemElement = menuItemElementsReversed.shift()!;
      index++;
    }

    operateMenuItemElement.classList.add(hiddenMenuItemClassname);

    menuItemElementsExtraReversed[index]?.setAttribute(hiddenMenuItemAttribute, '');
  }

  (listElement.lastChild as HTMLLIElement).classList.add(lastMenuItemClassname);
};

const resetEffect = (listElement: HTMLUListElement) => {
  const data = listElementToDataMap.get(listElement);
  if (!data) {
    return;
  }

  const { componentElement, extraListElement, expanderMenuItemElement, menuItemElements } = data;

  menuItemElements.forEach((menuItemElement) => {
    menuItemElement.classList.remove(hiddenMenuItemClassname);
  });
  expanderMenuItemElement.classList.remove(hiddenMenuItemClassname);
  componentElement.classList.remove(menuWithSecondLineClassname);

  extraListElement
    .querySelectorAll<HTMLLIElement>(`.${menuItemExtraClassname}`)
    .forEach((el) => el.removeAttribute(hiddenMenuItemAttribute));
};

const Menu: FC<MenuProps & WithClassNameComponentProps> = ({ className, menuItems, menuType = MenuType.main }) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const componentElementRef = useRef<HTMLDivElement>(null);
  const extraListElementRef = useRef<HTMLUListElement>(null);
  const listElementRef = useRef<HTMLUListElement>(null);
  const linesCountRef = useRef(1);
  const [activeItemElementIndex, setActiveElementIndex] = useState(0);
  const [isMenuFolded, setIsMenuFolded] = useState(true);
  const { requestPhase: sectionsRequestPhase } = useAppSelector((state) => state.pageContent);
  const isErrorPage = sectionsRequestPhase === PageContentFetchState.rejected;

  menuItems = useMemo(() => {
    // pseudo using the variable to prevent a lint warning
    void language;

    return [
      ...menuItems,
      {
        title: t('menu.more'),
        type: MenuItemType.menuExpander,
      },
    ];
  }, [language, menuItems, t]);

  useEffect(() => {
    setIsMenuFolded(true);
  }, [activeItemElementIndex]);

  const outsideFocusOrClickHandler = useCallback(() => {
    setIsMenuFolded(true);
  }, []);

  useFocusOrClickOutside(componentElementRef, isMenuFolded, outsideFocusOrClickHandler);

  const resizeCallback = useCallback(() => {
    const { current: listElement } = listElementRef;

    if (!listElement) {
      return;
    }

    setIsMenuFolded(true);
    resetEffect(listElement);
    setEffect(listElement);
  }, []);

  useResizeObserver({ elementRef: componentElementRef, callback: resizeCallback });

  useLayoutEffect(() => {
    const { current: componentElement } = componentElementRef;
    const { current: extraListElement } = extraListElementRef;
    const { current: listElement } = listElementRef;

    if (!componentElement || !extraListElement || !listElement) {
      return;
    }

    if (!listElementToDataMap.has(listElement)) {
      const menuItemElements = (
        Array.from(listElement.querySelectorAll(`.${menuItemClassname}`)) as HTMLLIElement[]
      ).map((menuItemElement) => {
        return menuItemElement;
      });
      const expanderMenuItemElement = menuItemElements.pop()!;
      const activeMenuItemElement = menuItemElements[activeItemElementIndex];

      listElementToDataMap.set(listElement, {
        activeMenuItemElement,
        componentElement,
        expanderMenuItemElement,
        extraListElement,
        linesCountRef,
        menuItemElements,
        menuType,
      });
    }

    setEffect(listElement);

    return () => {
      resetEffect(listElement);
    };
  }, [activeItemElementIndex, menuItems, menuType]);

  useLayoutEffect(() => {
    if (isMenuFolded) {
      return;
    }
    const { current: listElement } = listElementRef;

    if (!listElement) {
      return;
    }

    const data = listElementToDataMap.get(listElement);

    if (!data) {
      return;
    }

    const { expanderMenuItemElement, extraListElement } = data;

    extraListElement.style.right = `${
      listElement.offsetWidth - expanderMenuItemElement.offsetLeft - expanderMenuItemElement.offsetWidth
    }px`;
  }, [isMenuFolded]);

  const linkItem = ({
    index,
    menuItemLink,
    menuItemTitle,
  }: {
    index: number;
    menuItemLink?: string;
    menuItemTitle: string;
  }) => {
    return (
      <NavLink
        className={({ isActive }) =>
          cs(menuStyles[`${menuClassname}__item-link`], {
            [menuStyles[`${menuClassname}__item-link_active`]]:
              isErrorPage && menuType === MenuType.submenu ? false : isActive,
          })
        }
        role="menuitem"
        data-router=""
        style={({ isActive }) => {
          if (isActive) {
            setTimeout(() => setActiveElementIndex(index), 0);
          }

          return {};
        }}
        to={`/${language}${menuItemLink!}`}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: menuItemTitle,
          }}
        />
      </NavLink>
    );
  };

  const linkExternalItem = ({ menuItemLink, menuItemTitle }: { menuItemLink?: string; menuItemTitle: string }) => {
    return (
      <Link
        className={menuStyles[`${menuClassname}__item-link`]}
        dangerouslySetInnerHTML={{ __html: `${menuItemTitle} ↗` }}
        isExternal={true}
        to={menuItemLink!}
      />
    );
  };

  return (
    <div
      ref={componentElementRef}
      className={cs(
        menuStyles[menuClassname],
        menuStyles[`${menuClassname}_base-background-color_${baseBackgroundColor}`],
        menuStyles[`${menuClassname}_type_${menuType}`],
        {
          [menuStyles[`${menuClassname}_folded`]]: isMenuFolded,
          [menuWithSecondLineClassname]: linesCountRef.current === 2,
        },
        className,
      )}
      role="presentation"
    >
      <div className={menuStyles[`${menuClassname}__list-wrapper`]} role="presentation">
        <ul ref={listElementRef} className={menuStyles[`${menuClassname}__list`]} role="menubar">
          {menuItems.map(({ link: menuItemLink, title: menuItemTitle, type: menuItemType }, index) => (
            <li
              key={`${index}-${menuItemLink}`}
              className={cs(menuItemClassname, {
                [activeMenuItemClassname]:
                  isErrorPage && menuType === MenuType.submenu ? false : index === activeItemElementIndex,
                [expanderMenuItemClassname]: index === menuItems.length - 1,
              })}
              role="presentation"
            >
              {menuItemType === MenuItemType.default ? linkItem({ index, menuItemLink, menuItemTitle }) : null}
              {menuItemType === MenuItemType.externalLink ? linkExternalItem({ menuItemLink, menuItemTitle }) : null}
              {menuItemType === MenuItemType.menuExpander ? (
                <button
                  aria-expanded={!isMenuFolded}
                  className={cs(
                    menuStyles[`${menuClassname}__item-link`],
                    menuStyles[`${menuClassname}__item-link_button`],
                  )}
                  dangerouslySetInnerHTML={{ __html: menuItemTitle }}
                  onClick={() => setIsMenuFolded((value) => !value)}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      <ul
        ref={extraListElementRef}
        aria-hidden={isMenuFolded}
        role="menu"
        className={cs(menuStyles[`${menuClassname}__list`], menuStyles[`${menuClassname}__list_extra`])}
      >
        {menuItems
          .slice(0, menuItems.length - 1)
          .map(({ link: menuItemLink, title: menuItemTitle, type: menuItemType }, index) => (
            <li
              key={`${index}-${menuItemLink}`}
              className={cs(menuItemClassname, menuItemExtraClassname, {
                [activeMenuItemClassname]:
                  isErrorPage && menuType === MenuType.submenu ? false : index === activeItemElementIndex,
              })}
              role="presentation"
            >
              {menuItemType === MenuItemType.default ? linkItem({ index, menuItemLink, menuItemTitle }) : null}
              {menuItemType === MenuItemType.externalLink ? linkExternalItem({ menuItemLink, menuItemTitle }) : null}
            </li>
          ))}
      </ul>
    </div>
  );
};

export { Menu };
