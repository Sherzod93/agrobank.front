import cs from 'classnames';
import React, { FC } from 'react';
import { AbstractBlockProps, LinkData } from '../../../interfaces';
import { Icon, IconCode } from '../../units/icon/icon';
import { Link } from '../../units/link/link';
import { Tag } from '../../units/tag/tag';
import linkBlockStyles from './style.module.scss';

const linkBlockClassname = 'link-block';

export interface LinkBlockProps extends AbstractBlockProps {
  link: LinkData;
  withArrow?: boolean;
}

const LinkBlock: FC<LinkBlockProps> = ({ className, link, withArrow }) => (
  <div className={cs(linkBlockStyles[linkBlockClassname], className)}>
    <div className={linkBlockStyles[`${linkBlockClassname}__wrapper`]}>
      <Link className={linkBlockStyles[`${linkBlockClassname}__link`]} to={link.url}>
        <Tag className={linkBlockStyles[`${linkBlockClassname}__tag`]} title={link.title} />
      </Link>
      {withArrow ? (
        <Icon className={linkBlockStyles[`${linkBlockClassname}__icon`]} code={IconCode.curveArrow} />
      ) : null}
    </div>
  </div>
);

export { LinkBlock };
