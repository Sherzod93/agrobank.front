import cs from 'classnames';
import React, { FC, useState } from 'react';
import { useBaseBackgroundColor } from '../../../contexts';
import { Breakpoints, breakpointsToMediaQuery } from '../../../helpers';
import { useMatchMedia } from '../../../hooks';
import { AbstractBlockProps, MobileApplicationData } from '../../../interfaces';
import {
  MobileApplicationIconType,
  MobileApplicationLinks,
  Size,
} from '../../units/business/mobile-application-links/mobile-application-links';
import { Image } from '../../units/image/image';
import { Tiles } from '../../units/tiles/tiles';
import mobileFrameImage from './resources/mobile-frame.png';
import mobileBankBlockStyles from './styles.module.scss';

const mobileBankBlockClassname = 'mobile-bank-block';

export interface MobileBankBlockProps extends AbstractBlockProps {
  applicationInfo: MobileApplicationData;
}

const MobileBankBlock: FC<MobileBankBlockProps> = ({
  applicationInfo: { description, links, screenshots, title },
  className,
}) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);
  const [isMobileView, setIsMobileView] = useState(true);

  useMatchMedia({
    callback: setIsMobileView,
    mediaQuery: breakpointsToMediaQuery({ to: Breakpoints.md }),
  });

  return (
    <div
      className={cs(
        mobileBankBlockStyles[mobileBankBlockClassname],
        mobileBankBlockStyles[`${mobileBankBlockClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
      onMouseEnter={() => setAreTilesAnimated(true)}
      onMouseLeave={() => setAreTilesAnimated(false)}
    >
      <Tiles animated={areTilesAnimated} className={mobileBankBlockStyles[`${mobileBankBlockClassname}__animation`]} />
      <div className={mobileBankBlockStyles[`${mobileBankBlockClassname}__content`]}>
        <div
          className={mobileBankBlockStyles[`${mobileBankBlockClassname}__title`]}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className={mobileBankBlockStyles[`${mobileBankBlockClassname}__description`]}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <MobileApplicationLinks
          className={mobileBankBlockStyles[`${mobileBankBlockClassname}__links`]}
          links={links}
          size={isMobileView ? Size.small : Size.default}
          iconType={MobileApplicationIconType.badge}
        />
        <div className={mobileBankBlockStyles[`${mobileBankBlockClassname}__wrapper`]}>
          <img
            alt=""
            aria-hidden={true}
            className={mobileBankBlockStyles[`${mobileBankBlockClassname}__frame`]}
            src={mobileFrameImage}
          />
          <div className={mobileBankBlockStyles[`${mobileBankBlockClassname}__overflow`]}>
            <Image className={mobileBankBlockStyles[`${mobileBankBlockClassname}__image`]} image={screenshots[0]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { MobileBankBlock };
