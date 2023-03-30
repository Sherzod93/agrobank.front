import cs from 'classnames';
import React, { FC } from 'react';
import { WithClassNameComponentProps } from '../../../../interfaces';

import visitorsCountStyles from './style.module.scss';
import { useBaseBackgroundColor } from '../../../../contexts';
import { useAppSelector } from '../../../../services/store';
import { useTranslation } from 'react-i18next';

const visitorCountClassName = 'visitors-count';

const VistorsCount: FC<WithClassNameComponentProps> = ({ className }) => {
    const { visitors } = useAppSelector((state) => state.footer);
    const {
        i18n: { t },
    } = useTranslation();
    const { baseBackgroundColor } = useBaseBackgroundColor();

    return (
        <div  className={cs(
            visitorsCountStyles[visitorCountClassName],
            visitorsCountStyles[`${visitorCountClassName}_base-background-color_${baseBackgroundColor}`],
            className,
        )}
        >
            {visitors ? (<div className={visitorsCountStyles[`${visitorCountClassName}__content`]}>{t('footer.online-now')} {visitors}</div>) : null}
        </div>
    );
};

export { VistorsCount };
