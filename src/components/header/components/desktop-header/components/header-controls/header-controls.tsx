import cs from 'classnames';
import React, { FC } from 'react';
import { WithClassNameComponentProps } from '../../../../../../interfaces';
import { LanguageSelector } from '../../../../../units/business/language-selector/language-selector';
import { SearchLink } from '../../../../../units/business/search-link/search-link';
import { VisuallyImpairedMode } from '../../../../../units/business/visually-impaired-mode/visually-impaired-mode';
import { InternetBankMenu } from '../../../../../units/internet-bank-menu/internet-bank-menu';
import headerControlsStyles from './style.module.scss';

const headerControlsClassname = 'header-controls';

const HeaderControls: FC<WithClassNameComponentProps> = ({ className }) => {
  return (
    <div className={cs(headerControlsStyles[headerControlsClassname], className)}>
      <div className={headerControlsStyles[`${headerControlsClassname}__commands`]}>
        <LanguageSelector />
        <VisuallyImpairedMode />
        <SearchLink />
        <InternetBankMenu />
      </div>
    </div>
  );
};

export { HeaderControls };
