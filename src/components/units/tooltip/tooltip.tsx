import cs from 'classnames';
import React, { FC } from 'react';
import { useBaseBackgroundColor } from '../../../contexts';
import { WithClassNameComponentProps } from '../../../interfaces';
import tooltipStyles from './style.module.scss';

export const tooltipClassname = 'tooltip';

interface TooltipProps {
  text: string;
}

const Tooltip: FC<TooltipProps & WithClassNameComponentProps> = ({ className, text }) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();

  return (
    <div
      className={cs(
        tooltipStyles[tooltipClassname],
        tooltipStyles[`${tooltipClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
};

export { Tooltip };
