import cs from 'classnames';
import React, { FC } from 'react';
import { useMenu } from '../../../../hooks';
import { WithClassNameComponentProps } from '../../../../interfaces';
import { Link } from '../../../units/link/link';
import footerMenuStyles from './style.module.scss';

const footerMenuClassname = 'footer-menu';

const FooterMenu: FC<WithClassNameComponentProps> = ({ className }) => {
  const footerMenu = useMenu('footer');

  if (!footerMenu?.length) {
    return null;
  }

  return (
    <div className={cs(footerMenuStyles[footerMenuClassname], className)}>
      <ul className={footerMenuStyles[`${footerMenuClassname}__items`]}>
        {footerMenu.map((item, index) => (
          <li key={index} className={footerMenuStyles[`${footerMenuClassname}__item`]}>
            <Link
              className={footerMenuStyles[`${footerMenuClassname}__link`]}
              dangerouslySetInnerHTML={{ __html: item.title }}
              to={item.path}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { FooterMenu };
