import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useBaseBackgroundColor } from '../../../../contexts';
import { WithClassNameComponentProps } from '../../../../interfaces';
import { Icon, IconCode } from '../../icon/icon';
import searchLinkStyles from './style.module.scss';

const searchLinkClassname = 'search-link';

const SearchLink: FC<WithClassNameComponentProps> = ({ className }) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { baseBackgroundColor } = useBaseBackgroundColor();

  return (
    <Link
      className={cs(
        searchLinkStyles[searchLinkClassname],
        searchLinkStyles[`${searchLinkClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
      data-router
      to={`/${language}/search`}
    >
      <Icon className={cs(searchLinkStyles[`${searchLinkClassname}__icon`])} code={IconCode.magnifyingGlass}></Icon>
    </Link>
  );
};

export { SearchLink };
