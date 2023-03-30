import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AbstractBlockProps,
  BlockWithTitleComponentProps,
  PageSectionTitleAlignment,
  PageSectionTitleOptions,
  PageSectionTitleSize,
} from '../../../interfaces';
import headerBlockStyles from './style.module.scss';

const headerBlockClassname = 'header-block';

export interface HeaderBlockProps
  extends AbstractBlockProps,
    BlockWithTitleComponentProps,
    Partial<PageSectionTitleOptions> {}

const HeaderBlock: FC<HeaderBlockProps> = ({
  arrow = false,
  className,
  title,
  titleAlignment = PageSectionTitleAlignment.center,
  titleSize = PageSectionTitleSize.medium,
}) => {
  const {
    i18n: { t },
  } = useTranslation();

  return (
    <h2
      className={cs(
        headerBlockStyles[headerBlockClassname],
        headerBlockStyles[`${headerBlockClassname}_alignment_${titleAlignment}`],
        headerBlockStyles[`${headerBlockClassname}_size_${titleSize}`],
        {
          [headerBlockStyles[`${headerBlockClassname}_with-arrow`]]: arrow,
        },
        className,
      )}
      dangerouslySetInnerHTML={{ __html: t(title) }}
    />
  );
};

export { HeaderBlock };
