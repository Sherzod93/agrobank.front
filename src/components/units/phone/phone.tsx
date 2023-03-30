import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneInfo, WithClassNameComponentProps } from '../../../interfaces';
import { Icon, IconCode } from '../icon/icon';
import { Link } from '../link/link';
import phoneStyles from './style.module.scss';

const phoneClassname = 'phone';

const Phone: FC<WithClassNameComponentProps> = ({ className }) => {
  const {
    i18n: { t },
  } = useTranslation();

  const phoneInfo: PhoneInfo = {
    hint: t('contacts.phone-tooltip'),
    phoneNumber: t('contacts.phone-number'),
    title: t('contacts.phone-description'),
    phoneNumber2: t('contacts.phone-number-2'),
  };


  return (
    <div className={cs(phoneStyles[phoneClassname], className)}>
      <div className={phoneStyles[`${phoneClassname}__number-wrapper`]}>
        <Icon className={phoneStyles[`${phoneClassname}__icon`]} code={IconCode.phoneIcon} />
        <Link
          className={phoneStyles[`${phoneClassname}__number`]}
          title={phoneInfo.hint}
          to={`tel:${phoneInfo.phoneNumber}`}
        >
          <span dangerouslySetInnerHTML={{ __html: phoneInfo.hint }} />
        </Link> <span className={phoneStyles[`${phoneClassname}__comma`]}>,</span>

        <Link
          className={phoneStyles[`${phoneClassname}__number2`]}
          title={phoneInfo.phoneNumber2}
          to={`tel:${phoneInfo.phoneNumber2 }`}
        >&#160;&#160;
          <span dangerouslySetInnerHTML={{ __html: `${phoneInfo.phoneNumber2}` }} />
        </Link>
      </div>
      <div
        className={phoneStyles[`${phoneClassname}__description`]}
        dangerouslySetInnerHTML={{ __html: phoneInfo.title! }}
      />
    </div>
  );
};

export { Phone };
