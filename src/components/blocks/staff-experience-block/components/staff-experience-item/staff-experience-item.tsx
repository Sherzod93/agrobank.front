import cs from 'classnames';
import React, { FC, useState } from 'react';
import { WithClassNameComponentProps } from '../../../../../interfaces';
import { Image } from '../../../../units/image/image';
import { Tiles, TilingModes } from '../../../../units/tiles/tiles';
import { CommentData } from '../../interfaces';
import staffExperienceItemStyles from './style.module.scss';

const staffExperienceItemClassname = 'staff-experience-item';

interface StaffExperienceItemProps {
  item: CommentData;
  tilingMode: TilingModes;
}

const StaffExperienceItem: FC<StaffExperienceItemProps & WithClassNameComponentProps> = ({
  className,
  item,
  tilingMode,
}) => {
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);

  return (
    <li className={cs(staffExperienceItemStyles[`${staffExperienceItemClassname}__item`], className)}>
      <div
        className={staffExperienceItemStyles[`${staffExperienceItemClassname}__comment-wrapper`]}
        onMouseEnter={() => setAreTilesAnimated(true)}
        onMouseLeave={() => setAreTilesAnimated(false)}
      >
        <Tiles
          animated={areTilesAnimated}
          hovered={areTilesAnimated}
          className={staffExperienceItemStyles[`${staffExperienceItemClassname}__tiles`]}
          tilingMode={tilingMode}
        />
        <div
          className={staffExperienceItemStyles[`${staffExperienceItemClassname}__comment`]}
          dangerouslySetInnerHTML={{ __html: item.text }}
        />
        <div className={staffExperienceItemStyles[`${staffExperienceItemClassname}__person`]}>
          <span dangerouslySetInnerHTML={{ __html: item.person.name }} />
          {item.person.position ? <span dangerouslySetInnerHTML={{ __html: ', ' + item.person.position }} /> : null}
        </div>
      </div>
      {item.person.photo && (
        <div className={staffExperienceItemStyles[`${staffExperienceItemClassname}__photo-wrapper`]}>
          <Image
            className={staffExperienceItemStyles[`${staffExperienceItemClassname}__photo`]}
            image={item.person.photo}
          />
        </div>
      )}
    </li>
  );
};

export { StaffExperienceItem };
