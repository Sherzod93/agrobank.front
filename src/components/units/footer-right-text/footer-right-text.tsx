import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { WithClassNameComponentProps } from '../../../interfaces';

import footerRightTextStyles from './style.module.scss';
import { useAppSelector } from '../../../services/store';

const footerRightTextClassname = 'footer-right-text';

interface FooterRightTextInterFace {
    text: string;

}
const FooterRightText: FC<WithClassNameComponentProps> = ({ className }) => {
    const isPageForBusiness  = useAppSelector((state) => state.pageContent.content?.isPageForBusiness);
    const classText = isPageForBusiness ? '__text-white' : '__text';
    const {
        i18n: { t },
    } = useTranslation();

    const footerRightText: FooterRightTextInterFace = {
        text: t('global.footer-right-text'),
    };
    return (
        <div className={cs(footerRightTextStyles[footerRightTextClassname], className)}>
            <div className={footerRightTextStyles[`${footerRightTextClassname}${classText}`]}>
                {footerRightText.text}
            </div>
        </div>
    );
};

export { FooterRightText };
