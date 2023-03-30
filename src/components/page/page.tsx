import cs from 'classnames';
import { BaseBackgroundColorContext, useBaseBackgroundColorContextValue } from '../../contexts';
import React, { FC, useRef } from 'react';
import { BaseBackgroundColor, WithClassNameComponentProps } from '../../interfaces';
import pageStyles from './style.module.scss';

export const pageClassname = 'page';

const Page: FC<WithClassNameComponentProps> = ({ children, className }) => {
  const componentElementRef = useRef<HTMLDivElement>(null);
  const baseBackgroundColorContextValue = useBaseBackgroundColorContextValue(BaseBackgroundColor.default);

  return (
    <BaseBackgroundColorContext.Provider value={baseBackgroundColorContextValue}>
      <div
        ref={componentElementRef}
        className={cs(
          pageStyles[pageClassname],
          pageStyles[`${pageClassname}_base-background-color_${baseBackgroundColorContextValue.baseBackgroundColor}`],
          className,
          'container',
        )}
      >
        {children}
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

export { Page };
