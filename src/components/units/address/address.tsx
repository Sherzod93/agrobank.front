import cs from 'classnames';
import React, { FC, useEffect, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useTranslation } from 'react-i18next';
import { useBaseBackgroundColor } from '../../../contexts';
import { AddressData, ComponentRenderType, WithClassNameComponentProps } from '../../../interfaces';
import { Link } from '../link/link';
import addressStyles from './style.module.scss';

const addressClassname = 'address';

interface AddressProps {
  address: AddressData;
  renderType?: ComponentRenderType;
  titleClassname?: string;
}

const Address: FC<AddressProps & WithClassNameComponentProps> = ({
  address: {
    additionalNumber,
    address,
    mfo,
    phones: addressPhones,
    postCode,
    title: addressTitle,
    workingTime: addressWorkingTime,
  },
  className,
  renderType = ComponentRenderType.listItem,
  titleClassname,
}) => {
  const { t } = useTranslation();
  const scrollbarRef = useRef<any>(null);
  const shadowBottomRef = useRef<HTMLDivElement>(null);
  const shadowTopRef = useRef<HTMLDivElement>(null);
  const TagName = renderType === ComponentRenderType.listItem ? 'li' : 'div';
  const { baseBackgroundColor } = useBaseBackgroundColor();

  const detailsInformation = (
    <div>
      <div
        className={addressStyles[`${addressClassname}__address`]}
        dangerouslySetInnerHTML={{ __html: `<strong>${t('contacts.address')}</strong><br />${address}` }}
      />
      <div
        className={addressStyles[`${addressClassname}__working-time`]}
        dangerouslySetInnerHTML={{
          __html: `<strong>${t('contacts.working-time')}</strong><br />${addressWorkingTime}`,
        }}
      />
      {postCode ? (
        <div
          className={addressStyles[`${addressClassname}__postcode`]}
          dangerouslySetInnerHTML={{ __html: `<strong>${t('contacts.postcode')}</strong><br />${postCode}` }}
        />
      ) : null}
      {mfo ? (
        <div
          className={addressStyles[`${addressClassname}__mfo`]}
          dangerouslySetInnerHTML={{ __html: `<strong>${t('contacts.mfo')}</strong><br />${mfo}` }}
        />
      ) : null}
      {additionalNumber ? (
        <div
          className={addressStyles[`${addressClassname}__additional-number`]}
          dangerouslySetInnerHTML={{
            __html: `<strong>${t('contacts.additional-number')}</strong><br />${additionalNumber}`,
          }}
        />
      ) : null}
    </div>
  );

  const handleUpdate = ({
    scrollTop,
    scrollHeight,
    clientHeight,
  }: {
    scrollTop: number;
    scrollHeight: number;
    clientHeight: number;
  }) => {
    if (!scrollbarRef.current || !shadowBottomRef.current || !shadowTopRef.current) {
      return;
    }

    const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity = (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    shadowBottomRef.current.style.opacity = shadowBottomOpacity.toString();
    shadowTopRef.current.style.opacity = shadowTopOpacity.toString();
  };

  useEffect(() => {
    if (!scrollbarRef.current) {
      return;
    }

    scrollbarRef.current.view.scrollTop = 0;
  }, [address, addressTitle]);

  return (
    <TagName
      className={cs(
        addressStyles[addressClassname],
        addressStyles[`${addressClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      <div
        className={cs(addressStyles[`${addressClassname}__title`], titleClassname)}
        dangerouslySetInnerHTML={{ __html: addressTitle }}
      />
      {renderType === ComponentRenderType.listItem ? (
        detailsInformation
      ) : (
        <div className={addressStyles[`${addressClassname}__scrollbar-container`]}>
          <Scrollbars
            onUpdate={handleUpdate}
            ref={scrollbarRef}
            renderThumbVertical={(props) => (
              <div {...props} className={addressStyles[`${addressClassname}__thumb-vertical`]} />
            )}
          >
            {detailsInformation}
          </Scrollbars>
          <div className={addressStyles[`${addressClassname}__scrollbar-shadow-top`]} ref={shadowTopRef} />
          <div className={addressStyles[`${addressClassname}__scrollbar-shadow-bottom`]} ref={shadowBottomRef} />
        </div>
      )}
      {addressPhones?.length ? (
        <div className={addressStyles[`${addressClassname}__phone-container`]}>
          {addressPhones.map((addressPhone) => (
            <Link
              className={addressStyles[`${addressClassname}__phone`]}
              dangerouslySetInnerHTML={{ __html: addressPhone.hint }}
              to={'tel:' + addressPhone.phoneNumber}
            />
          ))}
        </div>
      ) : null}
    </TagName>
  );
};

export { Address };
