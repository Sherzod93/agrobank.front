import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import legalInformationStyles from './style.module.scss';

const legalInformationClassname = 'legal-information';
const year = new Date().getFullYear();

const LegalInformation: FC = () => {
  const {
    i18n: { t },
  } = useTranslation();

  return (
    <div className={legalInformationStyles[legalInformationClassname]}>
      <div
        className={legalInformationStyles[`${legalInformationClassname}__copyright`]}
        dangerouslySetInnerHTML={{ __html: t('footer.bank-copyright', { year }) }}
      />
      <div
        className={legalInformationStyles[`${legalInformationClassname}__legal-information`]}
        dangerouslySetInnerHTML={{ __html: t('footer.legal-information') }}
      />
    </div>
  );
};

export { LegalInformation };
