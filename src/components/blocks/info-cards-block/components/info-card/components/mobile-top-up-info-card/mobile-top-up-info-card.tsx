import cs from 'classnames';
import React, { FC } from 'react';
import { WithClassNameComponentProps } from '../../../../../../../interfaces';
import { MobileTopUpInfoCardData } from '../../../../interfaces';
import mobileTopUpInfoCardStyles from './style.module.scss';

const mobileTopUpInfoCardClassname = 'mobile-top-up-info-card';

interface MobileTopUpInfoCardProps {
  infoCardData: MobileTopUpInfoCardData;
}

const MobileTopUpInfoCard: FC<MobileTopUpInfoCardProps & WithClassNameComponentProps> = ({ className }) => (
  <div className={cs(mobileTopUpInfoCardStyles[mobileTopUpInfoCardClassname], 'not-implemented', className)} />
);

export { MobileTopUpInfoCard };
