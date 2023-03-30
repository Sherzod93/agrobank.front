import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { WithClassNameComponentProps } from '../../../../../interfaces';
import { Link } from '../../../link/link';
import { MenuItemData as MenuItemInterface, MenuItemType, MenuType } from '../../../menu/interfaces';
import menuStyles from './style.module.scss';

const menuClassname = 'menu';

interface MenuProps {
  menuItems: MenuItemInterface[];
  menuType: MenuType;
}

const Menu: FC<MenuProps & WithClassNameComponentProps> = ({ className, menuItems, menuType = MenuType.main }) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <ul className={cs(menuStyles[menuClassname], menuStyles[`${menuClassname}_${menuType}`], className)}>
      {menuItems.map(({ id: menuItemId, link: menuItemLink, title: menuItemTitle, type: menuItemType }) => (
        <li key={menuItemId} className={menuStyles[`${menuClassname}__item`]}>
          {menuItemType === MenuItemType.default ? (
            <NavLink
              className={({ isActive }) =>
                cs(menuStyles[`${menuClassname}__link`], {
                  [menuStyles[`${menuClassname}__link_active`]]: isActive,
                })
              }
              data-router=""
              to={`/${language}${menuItemLink!}`}
            >
              <span
                className={menuStyles[`${menuClassname}__link-title`]}
                dangerouslySetInnerHTML={{
                  __html: menuItemTitle,
                }}
              />
            </NavLink>
          ) : null}
          {menuItemType === MenuItemType.externalLink ? (
            <Link
              className={menuStyles[`${menuClassname}__link`]}
              isExternal={true}
              dangerouslySetInnerHTML={{
                __html: menuItemType === MenuItemType.externalLink ? menuItemTitle + ' ↗' : menuItemTitle,
              }}
              to={menuItemLink!}
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export { Menu };
