import cs from 'classnames';
import React, { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useBaseBackgroundColor } from '../../../contexts';
import { SocialNetwork, SocialNetworkLink, WithClassNameComponentProps } from '../../../interfaces';
import { Link } from '../link/link';
import iconsSvgPath from './icons.svg';
import socialNetworksStyles from './style.module.scss';

const socialNetworksClassname = 'social-networks';
const hintShowClassname = socialNetworksStyles[`${socialNetworksClassname}__hint_show`];
const hintDisplayTime = 1500;

interface SocialNetworksProps {
  socialNetworkLinks: SocialNetworkLink[];
}

const SocialNetworks: FC<SocialNetworksProps & WithClassNameComponentProps> = ({ socialNetworkLinks, className }) => {
  const {
    i18n: { language,t },
  } = useTranslation();
  const hintRef = useRef<HTMLDivElement>(null);
  const { baseBackgroundColor } = useBaseBackgroundColor();

  const clickHandler = () => {
    hintRef.current?.classList.add(hintShowClassname);

    setTimeout(() => {
      hintRef.current?.classList.remove(hintShowClassname);
    }, hintDisplayTime);

    try {
      navigator.clipboard.writeText(String(window.location)).catch(console.error);
    } catch {}
  };

  return (
    <ul
      className={cs(
        socialNetworksStyles[socialNetworksClassname],
        socialNetworksStyles[`${socialNetworksClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      {socialNetworkLinks.map(({ title, type, url }, index) => {
        const logo = (
          <svg
            aria-hidden={true}
            className={socialNetworksStyles[`${socialNetworksClassname}__icon`]}
            fill="none"
            height="61"
            viewBox="0 0 61 61"
            width="61"
          >
            <use href={`${iconsSvgPath}#social-network-border`} />
            <use href={`${iconsSvgPath}#social-network-icon-${type}`} />
          </svg>
        );

        return (
          <li key={index} className={cs(socialNetworksStyles[`${socialNetworksClassname}__item`])}>
            {type === SocialNetwork.share ? (
              <div className={socialNetworksStyles[`${socialNetworksClassname}__button-wrapper`]}>
                <div className={socialNetworksStyles[`${socialNetworksClassname}__hint`]} ref={hintRef}>
                  {t('block-share.link-copy')}
                </div>
                <button
                  aria-label={title}
                  className={socialNetworksStyles[`${socialNetworksClassname}__button`]}
                  onClick={clickHandler}
                >
                  {logo}
                </button>
              </div>
            ) : (
              <Link
                aria-label={title}
                className={socialNetworksStyles[`${socialNetworksClassname}__link`]}
                isExternal={true}
                to={url==='https://dev.agrobank.uz/rss/'?url+language+'/':url}
              >
                {logo}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export { SocialNetworks, SocialNetwork };
