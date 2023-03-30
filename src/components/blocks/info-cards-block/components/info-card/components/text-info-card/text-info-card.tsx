import cs from 'classnames';
import React, { FC } from 'react';
import { WithClassNameComponentProps } from '../../../../../../../interfaces';
import { TextInfoCardData } from '../../../../interfaces';
import textInfoCardStyles from './style.module.scss';

const textInfoCardClassname = 'text-info-card';

interface TextInfoCardProps {
  infoCardData: TextInfoCardData;
}

const TextInfoCard: FC<TextInfoCardProps & WithClassNameComponentProps> = ({ className, infoCardData: { text } }) => (
  <div
    className={cs(textInfoCardStyles[textInfoCardClassname], className)}
    dangerouslySetInnerHTML={{ __html: text }}
  />
);

export { TextInfoCard };
