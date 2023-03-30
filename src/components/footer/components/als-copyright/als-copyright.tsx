import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useBaseBackgroundColor } from '../../../../contexts';
import { WithClassNameComponentProps } from '../../../../interfaces';
import { Icon, IconCode } from '../../../units/icon/icon';
import { Link } from '../../../units/link/link';
import alsCopyrightStyles from './style.module.scss';

const alsCopyrightClassname = 'als-copyright';

const ALSCopyright: FC<WithClassNameComponentProps> = ({ className }) => {
  const {
    i18n: { t },
  } = useTranslation();
  const { baseBackgroundColor } = useBaseBackgroundColor();

  return (
    <div
      className={cs(
        alsCopyrightStyles[alsCopyrightClassname],
        alsCopyrightStyles[`${alsCopyrightClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      <Link
        className={cs(
          alsCopyrightStyles[`${alsCopyrightClassname}__link`],
          alsCopyrightStyles[`${alsCopyrightClassname}__link_logo`],
        )}
        aria-label={t('footer.designed-in') + t('footer.als')}
        to={t('footer.als-link')}
      >
        <Icon className={alsCopyrightStyles[`${alsCopyrightClassname}__logo`]} code={IconCode.alsLogo} />
      </Link>
      <div className={alsCopyrightStyles[`${alsCopyrightClassname}__description`]}>
        <div>
          <span
            className={alsCopyrightStyles[`${alsCopyrightClassname}__designed-in`]}
            dangerouslySetInnerHTML={{ __html: t('footer.designed-in') }}
          />
          <Link
            className={alsCopyrightStyles[`${alsCopyrightClassname}__link`]}
            dangerouslySetInnerHTML={{ __html: t('footer.als') }}
            to={t('footer.als-link')}
          />
        </div>
        <Link
          className={alsCopyrightStyles[`${alsCopyrightClassname}__link`]}
          dangerouslySetInnerHTML={{ __html: t('footer.information-about-the-site') }}
          to={t('footer.anons-link')}
        />
      </div>
    </div>
  );
};

export { ALSCopyright };
