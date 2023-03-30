import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { WithClassNameComponentProps } from '../../../interfaces';

import siteUpdatedDateStyles from './style.module.scss';
import { useAppSelector } from '../../../services/store';

const siteUpdatedDateClassName = 'footer-right-text';

interface SiteUpdatedDateInterface {
    text: string;
}
const SiteUpdatedDate: FC<WithClassNameComponentProps> = ({ className }) => {

    const updatedDate  = useAppSelector((state) => state.pageContent.content?.lastUpdatedDate);
    const isPageForBusiness  = useAppSelector((state) => state.pageContent.content?.isPageForBusiness);

    const {
        i18n: { t },
    } = useTranslation();

    const siteUpdatedDate: SiteUpdatedDateInterface = {
        text: t('global.site-updated-date-text'),
    };
    const textClass = isPageForBusiness ? '__text-white' : '__text';
    const dateClass = isPageForBusiness ? '__date-white' : '__date';
    return (
        (updatedDate !== undefined ?
        <div className={cs(siteUpdatedDateStyles[siteUpdatedDateClassName], className)}>
            <span className={siteUpdatedDateStyles[`${siteUpdatedDateClassName}${textClass}`]}> {siteUpdatedDate.text}</span>
            <span className={siteUpdatedDateStyles[`${siteUpdatedDateClassName}${dateClass}`]}>{ updatedDate }</span>
        </div>
            : null)
    );
};

export { SiteUpdatedDate };
