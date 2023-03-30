import cs from 'classnames';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import { BaseBackgroundColorContext } from '../../../../../../../contexts';
import {
  BaseBackgroundColor,
  ComponentRenderType,
  PointOfServiceAddress,
  WithClassNameComponentProps,
} from '../../../../../../../interfaces';
import { Address } from '../../../../../../units/address/address';
import { Icon, IconCode } from '../../../../../../units/icon/icon';
import pointOfServiceInformationStyles from './style.module.scss';

interface PointOfServiceInformationProps {
  point: PointOfServiceAddress;
  onClose?: () => void;
}

const pointOfServiceInformationClassname = 'point-of-service-information';

const PointOfServiceInformation: FC<PointOfServiceInformationProps & WithClassNameComponentProps> = ({
  className,
  point,
  onClose,
}) => {
  const componentElementRef = useRef<HTMLDivElement>(null);
  const closeButtonElementRef = useRef<HTMLButtonElement>(null);
  const baseBackgroundColor = BaseBackgroundColor.green;
  const baseBackgroundColorContextValue = useMemo(() => {
    return {
      baseBackgroundColor,
    };
  }, [baseBackgroundColor]);

  useEffect(() => {
    const { current: componentElement } = componentElementRef;

    if (!componentElement) {
      return;
    }

    componentElement.focus();

    const keyDownHandler = (event: KeyboardEvent) => {
      const { key } = event;
      const { current: componentElement } = componentElementRef;

      if (!componentElement) {
        return;
      }

      if (key === 'Escape') {
        const { current: closeButtonElement } = closeButtonElementRef;

        if (!closeButtonElement) {
          return;
        }

        closeButtonElement.dispatchEvent(new Event('click', { bubbles: true }));
      }
    };

    componentElement.addEventListener('keydown', keyDownHandler, { passive: true });

    return () => {
      componentElement.removeEventListener('keydown', keyDownHandler);
    };
  }, [point]);

  return (
    <BaseBackgroundColorContext.Provider value={baseBackgroundColorContextValue}>
      <div
        ref={componentElementRef}
        className={cs(
          pointOfServiceInformationStyles[pointOfServiceInformationClassname],
          pointOfServiceInformationStyles[
            `${pointOfServiceInformationClassname}_base-background-color_${baseBackgroundColor}`
          ],
          className,
        )}
        tabIndex={-1}
      >
        <button
          ref={closeButtonElementRef}
          className={pointOfServiceInformationStyles[`${pointOfServiceInformationClassname}__close-button`]}
          onClick={onClose}
        >
          <Icon
            className={pointOfServiceInformationStyles[`${pointOfServiceInformationClassname}__close-button-icon`]}
            code={IconCode.clearCross}
          />
        </button>
        <Address
          address={point}
          className={pointOfServiceInformationStyles[`${pointOfServiceInformationClassname}__point-information`]}
          renderType={ComponentRenderType.default}
          titleClassname={
            pointOfServiceInformationStyles[`${pointOfServiceInformationClassname}__point-information-title`]
          }
        />
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

export { PointOfServiceInformation };
