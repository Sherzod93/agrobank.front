import React, { useMemo } from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import { useMenu } from '../../../hooks';
import { BaseBackgroundColor } from '../../../interfaces';
import { MobileHeader } from '../../header/components';
import { LanguageSelector } from '../business/language-selector/language-selector';
import { VisuallyImpairedMode } from '../business/visually-impaired-mode/visually-impaired-mode';
import { InternetBankMenu } from '../internet-bank-menu/internet-bank-menu';
import { MenuType } from '../menu/interfaces';
import { Phone } from '../phone/phone';
import { Search } from '../search/search';
import { Menu as MobileMenu } from './components';
import { SelectMenu } from './components/select-menu/select-menu';
import modalMenuStyles from './style.module.scss';

const modalMenuClassname = 'modal-menu';

const ModalMenu = () => {
  const mainMenuItems = useMenu('main');
  const mainMenuItemsWithoutChildren = useMemo(
    () => mainMenuItems?.filter(({ children }) => !children.length) ?? [],
    [mainMenuItems],
  );

  return (
    <BaseBackgroundColorContext.Provider value={{ baseBackgroundColor: BaseBackgroundColor.default }}>
      <MobileHeader />
      <div className={modalMenuStyles[modalMenuClassname]}>
        <div className={modalMenuStyles[`${modalMenuClassname}__search-wrapper`]}>
          <Search />
        </div>
        <div className={modalMenuStyles[`${modalMenuClassname}__select-menu-wrapper`]}>
          <SelectMenu />
        </div>
        <div className={modalMenuStyles[`${modalMenuClassname}__internet-bank-menu-wrapper`]}>
          <InternetBankMenu />
        </div>
        {mainMenuItemsWithoutChildren.length ? (
          <MobileMenu menuItems={mainMenuItemsWithoutChildren} menuType={MenuType.main} />
        ) : null}
        <div className={modalMenuStyles[`${modalMenuClassname}__phone-wrapper`]}>
          <Phone className={modalMenuStyles[`${modalMenuClassname}__phone`]} />
        </div>
        <div className={modalMenuStyles[`${modalMenuClassname}__visually-impaired-mode-wrapper`]}>
          <VisuallyImpairedMode withTitle={true} />
        </div>
        <div className={modalMenuStyles[`${modalMenuClassname}__language-selector-wrapper`]}>
          <LanguageSelector />
        </div>
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

export { ModalMenu };
