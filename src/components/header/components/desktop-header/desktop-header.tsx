import cs from 'classnames';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useMenu } from '../../../../hooks';
import { WithClassNameComponentProps } from '../../../../interfaces';
import { Logo } from '../../../units/business/logo/logo';
import { MenuType } from '../../../units/menu/interfaces';
import { Menu } from '../../../units/menu/menu';
import { headerClassname } from '../../contstants';
import headerStyles from '../../style.module.scss';
import { HeaderControls } from './components';

const DesktopHeader: FC<WithClassNameComponentProps> = ({ className }) => {
  const mainMenu = useMenu('main');
  const { pathname } = useLocation();
  const subMenu = mainMenu?.find(({ path }) => path === pathname.split('/')[2])?.children ?? null;

  return (
    <header className={cs(headerStyles[headerClassname], className)}>
      <div className={headerStyles[`${headerClassname}__main-menu-wrapper`]}>
        {mainMenu && mainMenu.length ? (
          <Menu
            className={headerStyles[`${headerClassname}__main-menu`]}
            menuType={MenuType.main}
            menuItems={mainMenu}
          />
        ) : null}
        <HeaderControls className={headerStyles[`${headerClassname}__header-controls`]} />
      </div>
      <div className={headerStyles[`${headerClassname}__sub-menu-wrapper`]}>
        <Logo className={headerStyles[`${headerClassname}__logo`]} />
        {subMenu && subMenu.length ? (
          <Menu
            className={headerStyles[`${headerClassname}__sub-menu`]}
            menuType={MenuType.submenu}
            menuItems={subMenu}
          />
        ) : null}
      </div>
    </header>
  );
};

export { DesktopHeader };
