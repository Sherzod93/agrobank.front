import cs from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBaseBackgroundColor } from '../../../contexts';
import { AbstractBlockProps, BlockWithProductComponentProps, CurrencyRecord, ProductType } from '../../../interfaces';
import { CurrenciesFetchState, fetchCurrencies } from '../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { Button, ButtonType } from '../../units/controls/button/button';
import { downloadCalculationPdf } from './components/calculation-pdf';
import { DepositCalculatorForm } from './components/deposit-calculator-form/deposit-calculator-form';
import { LoanCalculatorForm } from './components/loan-calculator-form/loan-calculator-form';
import { CalculationData } from './interface';
import calculatorBlockStyles from './style.module.scss';

const calculatorBlockClassname = 'calculator-block';

export interface CalculatorBlockProps extends AbstractBlockProps, Partial<BlockWithProductComponentProps> {
  title: string;
}

// TODO: (mellonis) Переход к форме отправки заявки

const CalculatorBlock: FC<CalculatorBlockProps> = ({
  className,
  contextProduct: productFromContext,
  product: productFromBlock,
  title: blockTitle,
}) => {
  const {
    i18n: { language, t },
  } = useTranslation();
  const { currencyCodeToCurrencyRecordMap, requestPhase: currencyCodeToCurrencyRecordMapRequestState } = useAppSelector(
    (state) => state.currencies,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currencyCodeToCurrencyRecordMapRequestState === CurrenciesFetchState.initial) {
      dispatch(fetchCurrencies());
    }
  }, [currencyCodeToCurrencyRecordMapRequestState, dispatch]);

  const { baseBackgroundColor } = useBaseBackgroundColor();
  const product = useMemo(() => {
    return productFromBlock || productFromContext;
  }, [productFromBlock, productFromContext]);
  const calculationDataRef = useRef<{
    calculationData: CalculationData;
    currencyCodeToCurrencyRecordMap: Record<string, CurrencyRecord>;
  }>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  const downloadCalculation = useCallback(() => {
    if (!product) {
      return;
    }

    if (product.type !== ProductType.loan && product.type !== ProductType.deposit) {
      return;
    }

    if (!calculationDataRef.current) {
      return;
    }

    downloadCalculationPdf({
      ...calculationDataRef.current,
      product,
      language,
      t,
    }).catch(console.error);
  }, [language, product, t]);

  if (!product || (product.type !== ProductType.deposit && product.type !== ProductType.loan)) {
    return null;
  }

  if (
    currencyCodeToCurrencyRecordMapRequestState !== CurrenciesFetchState.fulfilled ||
    currencyCodeToCurrencyRecordMap == null
  ) {
    return null;
  }

  return (
    <div
      className={cs(
        calculatorBlockStyles[calculatorBlockClassname],
        calculatorBlockStyles[`${calculatorBlockClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      <div
        className={calculatorBlockStyles[`${calculatorBlockClassname}__title`]}
        dangerouslySetInnerHTML={{ __html: blockTitle }}
      />
      {product.type === ProductType.loan ? (
        <LoanCalculatorForm calculationDataRef={calculationDataRef} product={product} setIsValid={setIsValid} />
      ) : null}
      {product.type === ProductType.deposit ? (
        <DepositCalculatorForm calculationDataRef={calculationDataRef} product={product} setIsValid={setIsValid} />
      ) : null}
      <div className={calculatorBlockStyles[`${calculatorBlockClassname}__buttons-wrapper`]}>
        <Button buttonType={ButtonType.secondary} disabled={!isValid} onClick={downloadCalculation}>
          <span dangerouslySetInnerHTML={{ __html: t('block-calculator.download-calculation-result') }} />
        </Button>
        {product.canBeApplied ? (
          <Button disabled={!isValid} buttonType={ButtonType.primary} withArrow={true}>
            <span dangerouslySetInnerHTML={{ __html: t('block-calculator.apply-product') }} />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export { CalculatorBlock };
