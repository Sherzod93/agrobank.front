import cs from 'classnames';
import React, { FC } from 'react';
import { ImageInfo, WithClassNameComponentProps } from '../../../../interfaces';
import cardStyles from './style.module.scss';

const cardClassname = 'card';

interface CardProps {
  cardImage: ImageInfo;
}

const Card: FC<CardProps & WithClassNameComponentProps> = ({ cardImage, className }) => (
  <div
    className={cs(cardStyles[cardClassname], className)}
    style={{
      backgroundImage: `url(${cardImage.src})`,
    }}
  />
);

export { Card };
