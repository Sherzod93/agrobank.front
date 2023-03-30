import cs from 'classnames';
import React, { FC } from 'react';
import { WithClassNameComponentProps } from '../../../../../../../interfaces';
import { TransferInfoCardData } from '../../../../interfaces';
import mobileTopUpInfoCardStyles from '../mobile-top-up-info-card/style.module.scss';

const transferInfoCardClassname = 'transfer-info-card';

interface TransferInfoCardProps {
  infoCardData: TransferInfoCardData;
}

const TransferInfoCard: FC<TransferInfoCardProps & WithClassNameComponentProps> = ({ className }) => (
  <div className={cs(mobileTopUpInfoCardStyles[transferInfoCardClassname], 'not-implemented', className)} />
);

export { TransferInfoCard };
