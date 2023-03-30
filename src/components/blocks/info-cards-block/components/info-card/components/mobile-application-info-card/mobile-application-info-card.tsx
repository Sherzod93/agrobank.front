import cs from 'classnames';
import React, { FC } from 'react';
import { WithClassNameComponentProps } from '../../../../../../../interfaces';
import { MobileApplicationLinks } from '../../../../../../units/business/mobile-application-links/mobile-application-links';
import { MobileApplicationInfoCardData } from '../../../../interfaces';
import mobileApplicationInfoCardStyles from './style.module.scss';

const mobileApplicationInfoCardClassname = 'mobile-application-info-card';

interface MobileApplicationInfoCardProps {
  infoCardData: MobileApplicationInfoCardData;
}

const MobileApplicationInfoCard: FC<MobileApplicationInfoCardProps & WithClassNameComponentProps> = ({
  className,
  infoCardData: {
    mobileApplicationData: { description, links },
  },
}) => (
  <div className={cs(mobileApplicationInfoCardStyles[mobileApplicationInfoCardClassname], className)}>
    <div dangerouslySetInnerHTML={{ __html: description }} />
    <MobileApplicationLinks
      className={mobileApplicationInfoCardStyles[`${mobileApplicationInfoCardClassname}__links`]}
      links={links}
    />
  </div>
);

export { MobileApplicationInfoCard };
