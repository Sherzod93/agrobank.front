import cs from 'classnames';
import React, { FC } from 'react';
import { ItemsAlignmentType, MobileApplicationLink, WithClassNameComponentProps } from '../../../../interfaces';
import { Image } from '../../image/image';
import { Link } from '../../link/link';
import iconsSvgPath from './icons/icons.svg';
import mobileApplicationLinksStyles from './styles.module.scss';

const mobileApplicationLinksClassname = 'mobile-application-links';

export enum Size {
  default = 'default',
  small = 'small',
}

export enum MobileApplicationIconType {
  default = 'default',
  badge = 'badge',
}

interface MobileApplicationLinksProps {
  iconType?: MobileApplicationIconType;
  links: MobileApplicationLink[];
  linksAlignment?: ItemsAlignmentType;
  size?: Size;
}

const MobileApplicationLinks: FC<MobileApplicationLinksProps & WithClassNameComponentProps> = ({
  className,
  iconType = MobileApplicationIconType.default,
  links,
  linksAlignment = ItemsAlignmentType.start,
  size = Size.default,
}) => (
  <ul
    className={cs(
      mobileApplicationLinksStyles[mobileApplicationLinksClassname],
      mobileApplicationLinksStyles[`${mobileApplicationLinksClassname}_alignment_${linksAlignment}`],
      mobileApplicationLinksStyles[`${mobileApplicationLinksClassname}_icon-type_${iconType}`],
      mobileApplicationLinksStyles[`${mobileApplicationLinksClassname}_size_${size}`],
      className,
    )}
  >
    {links.map(({ picture, storeType, title, url }, index) => (
      <li key={index} className={cs(mobileApplicationLinksStyles[`${mobileApplicationLinksClassname}__item`])}>
        <Link
          aria-label={title}
          className={cs(mobileApplicationLinksStyles[`${mobileApplicationLinksClassname}__link`])}
          to={url}
        >
          {iconType === MobileApplicationIconType.badge ? (
            picture ? (
              <Image
                className={mobileApplicationLinksStyles[`${mobileApplicationLinksClassname}__image`]}
                image={picture}
              />
            ) : null
          ) : (
            <svg
              aria-label={title}
              className={mobileApplicationLinksStyles[`${mobileApplicationLinksClassname}__image`]}
              height="50"
              viewBox="0 0 50 50"
              width="50"
            >
              <use href={`${iconsSvgPath}#icon-${storeType}`} />
            </svg>
          )}
        </Link>
      </li>
    ))}
  </ul>
);

export { MobileApplicationLinks };
