import cs from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBaseBackgroundColor } from '../../../../contexts';
import { WithClassNameComponentProps } from '../../../../interfaces';
import { Icon, IconCode } from '../../icon/icon';
import visuallyImpairedModeStyles from './style.module.scss';

const visuallyImpairedModeClassname = 'visually-impaired-mode';

interface VisuallyImpairedModeProps {
  withTitle?: boolean;
}

const dataVimAttributeName = 'data-vim';
const vimSettingsName = 'vim';
const hasDataVimAttribute = () => {
  return document.documentElement.hasAttribute(dataVimAttributeName);
};
const loadVimSettings = () => {
  return localStorage.getItem(vimSettingsName) === 'true';
};
const saveVimSettings = () => {
  localStorage.setItem(vimSettingsName, String(hasDataVimAttribute()));
};

const VisuallyImpairedMode: FC<VisuallyImpairedModeProps & WithClassNameComponentProps> = ({
  className,
  withTitle = false,
}) => {
  const { t } = useTranslation();
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const [isVisuallyImpairedMode, setIsVisuallyImpairedMode] = useState(loadVimSettings());

  useEffect(() => {
    const initial = loadVimSettings();

    const mutationObserver = new MutationObserver(() => {
      setIsVisuallyImpairedMode(hasDataVimAttribute());
      saveVimSettings();
    });

    mutationObserver.observe(document.documentElement, { attributeFilter: [dataVimAttributeName] });

    if (initial && !hasDataVimAttribute()) {
      document.documentElement.setAttribute(dataVimAttributeName, '');
    } else if (!initial && hasDataVimAttribute()) {
      document.documentElement.removeAttribute(dataVimAttributeName);
    }

    return () => {
      saveVimSettings();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <button
      className={cs(
        visuallyImpairedModeStyles[visuallyImpairedModeClassname],
        visuallyImpairedModeStyles[`${visuallyImpairedModeClassname}_base-background-color_${baseBackgroundColor}`],
        {
          [visuallyImpairedModeStyles[`${visuallyImpairedModeClassname}_active`]]: isVisuallyImpairedMode,
          [visuallyImpairedModeStyles[`${visuallyImpairedModeClassname}_with-title`]]: withTitle,
        },
        className,
      )}
      onClick={() => {
        if (!hasDataVimAttribute()) {
          document.documentElement.setAttribute(dataVimAttributeName, '');
        } else {
          document.documentElement.removeAttribute(dataVimAttributeName);
        }
      }}
    >
      <Icon
        className={visuallyImpairedModeStyles[`${visuallyImpairedModeClassname}__icon`]}
        code={IconCode.visuallyImpairedMode}
      />

      {withTitle ? (
        <span
          className={visuallyImpairedModeStyles[`${visuallyImpairedModeClassname}__title`]}
          dangerouslySetInnerHTML={{
            __html: t(isVisuallyImpairedMode ? 'global.regular-version' : 'global.visually-impaired-mode'),
          }}
        />
      ) : null}
    </button>
  );
};

export { VisuallyImpairedMode };
