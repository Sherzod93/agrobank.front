import cs from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { WithClassNameComponentProps } from '../../../../../interfaces';
import { Button, ButtonSize, ButtonType } from '../../../../units/controls/button/button';
import modeSwitcherStyles from './style.module.scss';

export enum PointsOfServiceBlockMode {
  map = 'map',
  list = 'list',
}

const modeSwitcherClassname = 'mode-switcher';

interface ModeSwitcherProps {
  currentMode: PointsOfServiceBlockMode;
  onChange: (modeType: PointsOfServiceBlockMode) => void;
}

const ModeSwitcher: FC<ModeSwitcherProps & WithClassNameComponentProps> = ({ className, currentMode, onChange }) => {
  const {
    i18n: { t },
  } = useTranslation();

  return (
    <div className={cs(modeSwitcherStyles[modeSwitcherClassname], className)}>
      {[PointsOfServiceBlockMode.map, PointsOfServiceBlockMode.list].map((mode) => (
        <Button
          key={mode}
          aria-pressed={mode === currentMode}
          buttonType={ButtonType.secondary}
          className={cs(modeSwitcherStyles[`${modeSwitcherClassname}__item`], {
            [modeSwitcherStyles[`${modeSwitcherClassname}__item_active`]]: mode === currentMode,
            [modeSwitcherStyles[`${modeSwitcherClassname}__item_inactive`]]: mode !== currentMode,
          })}
          onClick={() => onChange(mode)}
          size={ButtonSize.small}
        >
          <span dangerouslySetInnerHTML={{ __html: t(`block-points-of-service.mode_${mode}`) }} />
        </Button>
      ))}
    </div>
  );
};

export { ModeSwitcher };
