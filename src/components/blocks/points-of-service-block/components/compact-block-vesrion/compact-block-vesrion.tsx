import cs from 'classnames';
import React, { FC } from 'react';
import { PointOfServiceAddress } from '../../../../../interfaces';
import { pointsOfServiceBlockClassname } from '../../constants';
import { PointsOfServiceBlockProps } from '../../interfaces';
import pointsOfServiceBlockStyles from '../../style.module.scss';
import { PointsOfServiceMap } from '../points-of-service-map/points-of-service-map';

type PointsOfServiceCompactBlockProps = Omit<
  PointsOfServiceBlockProps,
  'countries' | 'isCompact' | 'posType' | 'withCategoryFilter'
> & { pointsOfService: PointOfServiceAddress[] };

const PointsOfServiceCompactBlock: FC<PointsOfServiceCompactBlockProps> = ({
  className,
  mapClassname,
  pointsOfService,
}) => {
  return (
    <PointsOfServiceMap
      className={cs(pointsOfServiceBlockStyles[`${pointsOfServiceBlockClassname}_map-wrapper`], className)}
      mapClassname={mapClassname}
      points={pointsOfService}
    />
  );
};

export { PointsOfServiceCompactBlock };
