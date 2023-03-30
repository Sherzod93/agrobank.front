import cs from 'classnames';
import React, { FC } from 'react';
import { AbstractBlockProps, BlockWithItemsComponentProps } from '../../../interfaces';
import { TilingModes } from '../../units/tiles/tiles';
import { StaffExperienceItem } from './components';
import { CommentData } from './interfaces';
import staffExperienceBlockStyles from './style.module.scss';

const staffExperienceBlockClassname = 'staff-experience-block';

export interface StaffExperienceBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<CommentData> {}

const StaffExperienceBlock: FC<StaffExperienceBlockProps> = ({ className, items }) => {
  return (
    <ul className={cs(staffExperienceBlockStyles[staffExperienceBlockClassname], className)}>
      {items.map((item, index) => (
        <StaffExperienceItem
          key={item.id}
          item={item}
          tilingMode={index % 2 ? TilingModes.rightTopCorner : TilingModes.leftTopCorner}
        />
      ))}
    </ul>
  );
};

export { StaffExperienceBlock };
