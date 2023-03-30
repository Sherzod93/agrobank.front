import cs from 'classnames';
import React, { FC } from 'react';
import { AbstractBlockProps, BlockWithItemsComponentProps } from '../../../interfaces';
import { InfoCard } from './components';
import { InfoCardData } from './interfaces';
import infoCardsBlockStyles from './style.module.scss';

const infoCardsBlockClassname = 'info-cards-block';

export interface InfoCardsBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<InfoCardData> {}

const InfoCardsBlock: FC<InfoCardsBlockProps> = ({ className, items }) => {
  const isCollapsable = items.length > 2;

  return (
    <ul
      className={cs(
        infoCardsBlockStyles[infoCardsBlockClassname],
        {
          [infoCardsBlockStyles[`${infoCardsBlockClassname}_collapsable`]]: isCollapsable,
        },
        className,
      )}
    >
      {items.map((card, index) => (
        <InfoCard key={index} infoCardData={card} />
      ))}
    </ul>
  );
};

export { InfoCardsBlock };
