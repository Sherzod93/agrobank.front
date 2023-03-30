import cs from 'classnames';
import React, { FC } from 'react';
import { WithClassNameComponentProps } from '../../../interfaces';
import iconsSvgPath from './icons.svg';
import iconStyles from './style.module.scss';

export enum IconCode {
  alsLogo = 'als-logo',
  clearCross = 'clear-cross',
  curveArrow = 'curve-arrow',
  expandArrow = 'expand-arrow',
  geolocation = 'geolocation',
  magnifyingGlass = 'magnifying-glass',
  minus = 'minus',
  orderedListBullet = 'ordered-list-bullet',
  paginationIconBorder = 'pagination-icon-border',
  paginationIconSolid = 'pagination-icon-solid',
  phoneIcon = 'phone-icon',
  plus = 'plus',
  unorderedListBullet = 'unordered-list-bullet',
  visuallyImpairedMode = 'visually-impaired-mode',
}

const iconCodeToSize: { [key in IconCode]: [number, number] } = {
  [IconCode.alsLogo]: [100, 46],
  [IconCode.clearCross]: [16.5, 16.5],
  [IconCode.curveArrow]: [75, 94],
  [IconCode.expandArrow]: [20, 12],
  [IconCode.geolocation]: [30, 30],
  [IconCode.magnifyingGlass]: [17, 17],
  [IconCode.minus]: [37, 7],
  [IconCode.orderedListBullet]: [25, 25],
  [IconCode.paginationIconBorder]: [30, 30],
  [IconCode.paginationIconSolid]: [30, 30],
  [IconCode.phoneIcon]: [116, 116],
  [IconCode.plus]: [37, 37],
  [IconCode.unorderedListBullet]: [17, 17],
  [IconCode.visuallyImpairedMode]: [38, 22],
};
const iconClassname = 'icon';

interface IconProps {
  code: IconCode;
}

const Icon: FC<IconProps & WithClassNameComponentProps> = ({ className, code }) => {
  const [width, height] = iconCodeToSize[code];

  return (
    <svg
      className={cs(iconStyles[iconClassname], className)}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
    >
      <use href={`${iconsSvgPath}#${code}`} />
    </svg>
  );
};

export { Icon };
