import cs from 'classnames';
import React, { FC, useState } from 'react';
import { Breakpoints, breakpointsToMediaQuery } from '../../helpers';
import { useMatchMedia } from '../../hooks';
import { WithClassNameComponentProps } from '../../interfaces';
import { useAppSelector } from '../../services/store';
import { footer } from '../../stories-data';
import {
  MobileApplicationIconType,
  MobileApplicationLinks,
  Size,
} from '../units/business/mobile-application-links/mobile-application-links';
import { VisuallyImpairedMode } from '../units/business/visually-impaired-mode/visually-impaired-mode';
import { FooterRightText } from '../units/footer-right-text/footer-right-text';
import { SiteUpdatedDate } from '../units/site-updated-date/site-updated-date';
import { Phone } from '../units/phone/phone';


import { SocialNetworks } from '../units/social-networks/social-networks';
import { ALSCopyright, FooterMenu, LegalInformation } from './components';

import footerStyles from './style.module.scss';
import { VistorsCount } from './components/visitors-count/visitors-count';

const footerClassname = 'footer';

const Footer: FC<WithClassNameComponentProps> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { mobileApplicationLinks, socialNetworksLinks } = useAppSelector((state) => state.footer);
  const { content: { isMainPage = false } = {} } = useAppSelector((state) => state.pageContent);

  const ALSCopyrightWrapperElement = (
    <div className={footerStyles[`${footerClassname}__als-copyright-wrapper`]}>
        {isMainPage ? <ALSCopyright /> : null }
        <div className={footerStyles[`${footerClassname}__display-flex`]} >
            <SiteUpdatedDate />
            <VistorsCount />
        </div>
    </div>
  );

  useMatchMedia({
    callback: setIsMobile,
    mediaQuery: breakpointsToMediaQuery({ to: Breakpoints.md }),
  });

  return (
    <footer className={cs(footerStyles[footerClassname], className)}>
      <div className={footerStyles[`${footerClassname}__footer-menu-wrapper`]}>
        <div className={footerStyles[`${footerClassname}__footer-menu-container`]}>
          <FooterMenu className={footerStyles[`${footerClassname}__footer-menu`]} />
          <VisuallyImpairedMode
            className={footerStyles[`${footerClassname}__visually-impaired-mode-toggle`]}
            withTitle={true}
          />
        </div>
      </div>

      <div className={footerStyles[`${footerClassname}__footer-phone-wrapper`]}>
          <FooterRightText />
          <Phone />
      </div>
      <div className={footerStyles[`${footerClassname}__legal-information-wrapper`]}>
          <LegalInformation />
          {!isMobile ? ALSCopyrightWrapperElement : null}
      </div>
      <div className={footerStyles[`${footerClassname}__social-mobile-links-wrapper`]}>
        <div className={footerStyles[`${footerClassname}__social-mobile-links-container`]}>
          <div className={footerStyles[`${footerClassname}__social-networks-wrapper`]}>
            <SocialNetworks socialNetworkLinks={socialNetworksLinks} />
          </div>
          <div className={footerStyles[`${footerClassname}__mobile-apps-wrapper`]}>
            <MobileApplicationLinks
              iconType={MobileApplicationIconType.badge}
              links={mobileApplicationLinks}
              size={Size.small}
            />
          </div>
        </div>
      </div>
      {isMobile ? ALSCopyrightWrapperElement : null}
    </footer>
  );
};

export { Footer };
