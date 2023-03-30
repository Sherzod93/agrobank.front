import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { WithClassNameComponentProps } from '../../../../../interfaces';
import { Icon, IconCode } from '../../../../units/icon/icon';
import mapControlsStyles from './style.module.scss';

const mapControlsClassname = 'map-controls';

export enum MapControlType {
  geolocation = 'geolocation',
  zoomIn = 'zoom-in',
  zoomOut = 'zoom-out',
}

const mapControlTypeToIconCodeMap = {
  [MapControlType.geolocation]: IconCode.geolocation,
  [MapControlType.zoomIn]: IconCode.plus,
  [MapControlType.zoomOut]: IconCode.minus,
};

interface MapControlsProps {
  isGeolocationAllowed?: boolean;
  onClick?: (controlType: MapControlType) => void;
}

const MapControls: FC<MapControlsProps & WithClassNameComponentProps> = ({
  className,
  isGeolocationAllowed = false,
  onClick,
}) => {
  const {
    i18n: { t },
  } = useTranslation();

  const controls = [MapControlType.zoomIn, MapControlType.zoomOut];

  if (isGeolocationAllowed) {
    controls.unshift(MapControlType.geolocation);
  }

  return (
    <ul className={cs(mapControlsStyles[mapControlsClassname], className)}>
      {controls.map((controlType) => (
        <li
          key={controlType}
          className={cs(
            mapControlsStyles[`${mapControlsClassname}__control`],
            mapControlsStyles[`${mapControlsClassname}__control_${controlType}`],
          )}
        >
          <button
            aria-label={t(`block-points-of-service.map-control-title_${controlType}`)}
            className={mapControlsStyles[`${mapControlsClassname}__button`]}
            onClick={() => {
              if (onClick) {
                onClick(controlType);
              }
            }}
          >
            <Icon
              className={mapControlsStyles[`${mapControlsClassname}__icon`]}
              code={mapControlTypeToIconCodeMap[controlType]}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

export { MapControls };
