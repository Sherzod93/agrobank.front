import cs from 'classnames';
import React, { FC } from 'react';
import { useBaseBackgroundColor } from '../../../contexts';
import { AbstractBlockProps } from '../../../interfaces';
import iconsSvgPath from './icons.svg';
import informationBlockStyles from './style.module.scss';

const informationBlockClassname = 'information-block';

export enum InformationIconType {
  cursor = 'cursor',
  done = 'done',
  tornSheet = 'torn-sheet',
}

export interface InformationBlockProps extends AbstractBlockProps {
  description?: string;
  title: string;
  informationType?: InformationIconType;
}

const InformationBlock: FC<InformationBlockProps> = ({ className, description, title, informationType }) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();

  return (
    <div
      className={cs(
        informationBlockStyles[informationBlockClassname],
        informationBlockStyles[`${informationBlockClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      {informationType ? (
        <svg
          className={informationBlockStyles[`${informationBlockClassname}__icon`]}
          height="178"
          viewBox="0 0 178 178"
          width="178"
        >
          <use href={`${iconsSvgPath}#information-icon-diamond-border`} />
          <use href={`${iconsSvgPath}#information-icon-${informationType}`} />
        </svg>
      ) : null}
      <div
        className={informationBlockStyles[`${informationBlockClassname}__title`]}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {description ? (
        <div
          className={informationBlockStyles[`${informationBlockClassname}__description`]}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : null}
    </div>
  );
};

export { InformationBlock };
