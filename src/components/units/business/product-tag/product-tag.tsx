import React, { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDateDetail } from '../../../../helpers';
import {
  AmountProductTagData,
  PercentProductTagData,
  ProductTagData,
  ProductTagTypes,
  WithClassNameComponentProps,
} from '../../../../interfaces';
import { CurrenciesFetchState, fetchCurrencies } from '../../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../../services/store';
import { formatCalculatorValue } from '../../../blocks/calculator-block/helpers';
import { Tag, TagSize } from '../../tag/tag';

interface ProductTagProps {
  productTag: ProductTagData;
  size?: TagSize;
}

const ProductTag: FC<ProductTagProps & WithClassNameComponentProps> = ({ className, productTag, size }) => {
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

  const value = useMemo(() => {
    if (!currencyCodeToCurrencyRecordMap) {
      return '';
    }

    switch (productTag.type) {
      case ProductTagTypes.amount: {
        const value = (productTag as AmountProductTagData).value;

        return formatCalculatorValue(
          {
            type: 'amount',
            value: value.amount,
          },
          t,
          language,
          value.currency,
          currencyCodeToCurrencyRecordMap,
        );
      }
      case ProductTagTypes.date:
        return formatDateDetail(productTag.value, language, t);
      case ProductTagTypes.percent: {
        const value = (productTag as PercentProductTagData).value;

        return formatCalculatorValue(
          {
            type: 'percent',
            value,
          },
          t,
          language,
          undefined,
          currencyCodeToCurrencyRecordMap,
        );
      }
      case ProductTagTypes.text:
        return productTag.value;
    }
  }, [currencyCodeToCurrencyRecordMap, language, productTag, t]);

  if (currencyCodeToCurrencyRecordMapRequestState !== CurrenciesFetchState.fulfilled) {
    return null;
  }

  return <Tag className={className} size={size} title={productTag.title} value={value} />;
};

ProductTag.displayName = 'Tag';

export { ProductTag };
