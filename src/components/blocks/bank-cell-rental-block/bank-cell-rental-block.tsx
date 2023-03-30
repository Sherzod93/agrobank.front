import cs from 'classnames';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBaseBackgroundColor } from '../../../contexts';
import { AbstractBlockProps, BlockWithTitleComponentProps } from '../../../interfaces';
import { Button } from '../../units/controls/button/button';
import { Radio } from '../../units/controls/radio/radio';
import { Tabs } from '../../units/controls/tabs/tabs';
import { BankCellSizeData, EntityType } from './interfaces';
import lgVaultImage from './resources/vault-lg.svg';
import mdVaultImage from './resources/vault-md.svg';
import smVaultImage from './resources/vault-sm.svg';
import xsVaultImage from './resources/vault-xs.svg';
import bankCellRentalBlockStyles from './style.module.scss';

const vaultImages = {
  xs: xsVaultImage,
  sm: smVaultImage,
  md: mdVaultImage,
  lg: lgVaultImage,
};

const bankCellRentalBlockClassname = 'bank-cell-rental-block';

export interface BankCellRentalProps extends AbstractBlockProps, BlockWithTitleComponentProps {
  bankCellSizes: BankCellSizeData[];
  buttonTitle: string;
  canBeApplied?: boolean;
}

const BankCellRentalBlock: FC<BankCellRentalProps> = ({
  bankCellSizes,
  buttonTitle,
  canBeApplied = false,
  className,
  title,
}) => {
  const { t } = useTranslation();
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const entityTypes: EntityType[] = useMemo(() => {
    const entityTypesSet = new Set<string>();

    bankCellSizes.forEach((BankCellSize) => {
      Object.keys(BankCellSize.rentalPrice).forEach((entityType) => {
        entityTypesSet.add(entityType as EntityType);
      });
    });

    return [...entityTypesSet.values()];
  }, [bankCellSizes]);
  const entityTypesTitles = useMemo(
    () => entityTypes.map((entityType) => t(`block-bank-cell-rental.entity-type_${entityType}`)),
    [entityTypes, t],
  );
  const [selectedEntityTypeIx, setSelectedEntityTypeIx] = useState(0);
  const [selectedBankCellSizeIx, setSelectedBankCellSizeIx] = useState(0);
  const rentalPrice = useMemo(() => {
    const currentEntityType = entityTypes[selectedEntityTypeIx];
    const BankCellSize = bankCellSizes[selectedBankCellSizeIx];
    return BankCellSize.rentalPrice[currentEntityType];
  }, [entityTypes, bankCellSizes, selectedEntityTypeIx, selectedBankCellSizeIx]);
  const vaultImage = useMemo(() => {
    return vaultImages[bankCellSizes[selectedBankCellSizeIx].size as keyof typeof vaultImages] ?? vaultImages.lg;
  }, [bankCellSizes, selectedBankCellSizeIx]);

  return (
    <div
      className={cs(
        bankCellRentalBlockStyles[bankCellRentalBlockClassname],
        bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      <h2
        className={bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}__title`]}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <Tabs
        className={bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}__tabs`]}
        onSelect={setSelectedEntityTypeIx}
        options={entityTypesTitles}
        selectedOptionIx={selectedEntityTypeIx}
      />
      <div className={bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}__bank-cell`]}>
        <div className={bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}__radio-buttons`]}>
          {bankCellSizes.map((item: BankCellSizeData, index: number) => (
            <Radio
              key={item.id}
              className={bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}__radio-button`]}
              isChecked={selectedBankCellSizeIx === index}
              isSolidBackgroundView
              onClick={() => setSelectedBankCellSizeIx(index)}
              name={item.type}
            >
              <span
                className={bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}__size-title`]}
                dangerouslySetInnerHTML={{ __html: item.name }}
              />
              <span
                className={bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}__size-parameters`]}
                dangerouslySetInnerHTML={{ __html: item.parameters }}
              />
            </Radio>
          ))}
        </div>
        <div className={bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}__vault-image-wrap`]}>
          <img
            className={bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}__vault-image`]}
            src={vaultImage}
            alt=""
            aria-hidden={true}
          />
        </div>
      </div>
      <div className={bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}__price`]}>
        <div
          className={bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}__price-title`]}
          dangerouslySetInnerHTML={{ __html: t('block-bank-cell-rental.rental-price-title') }}
        />
        <div
          className={bankCellRentalBlockStyles[`${bankCellRentalBlockClassname}__price-value`]}
          dangerouslySetInnerHTML={{ __html: rentalPrice }}
        />
      </div>
      {canBeApplied ? (
        <Button withArrow={true}>
          <span dangerouslySetInnerHTML={{ __html: buttonTitle }} />
        </Button>
      ) : null}
    </div>
  );
};

export { BankCellRentalBlock };
