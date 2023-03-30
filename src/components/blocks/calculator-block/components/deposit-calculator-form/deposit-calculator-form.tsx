import cs from 'classnames';
import { nanoid } from 'nanoid';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DepositModel } from '../../../../../calculators-models/DepositModel';
import { zeroTime } from '../../../../../calculators-models/helpers';
import { PeriodUnits } from '../../../../../calculators-models/typings';
import {
  CalculationParameterValueFixed,
  CalculationParameterValueType,
  CalculationParameterValueVariable,
  DepositProductData,
  FirstParamType,
  ProductType,
  WithClassNameComponentProps,
} from '../../../../../interfaces';
import { CurrenciesFetchState, fetchCurrencies } from '../../../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../../../services/store';
import { formatCalculatorValue, getCalculationParamDefaultValue } from '../../helpers';
import { useCustomResultValues } from '../../hooks';
import { CalculatorForm } from '../../interface';
import { Range } from '../range/range';
import depositCalculatorFormStyles from './style.module.scss';

const depositCalculatorFormClassname = 'deposit-calculator-form';

interface DepositCalculatorFormProps {
  product: DepositProductData;
}

const DepositCalculatorForm: FC<CalculatorForm & DepositCalculatorFormProps & WithClassNameComponentProps> = ({
  calculationDataRef,
  product,
  setIsValid,
}) => {
  const {
    i18n: { language },
    t,
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

  const { params: calculationParams, defaultValues: calculationParamsDefaultValues } = useMemo(() => {
    return Object.entries(product.calculationParams).reduce(
      (result, [stringKey, calculatorParam]) => {
        const id = nanoid();
        const key = stringKey as keyof typeof product.calculationParams;
        const defaultValue = getCalculationParamDefaultValue(product.calculationParams, key);

        if (defaultValue != null) {
          result.defaultValues[key] = defaultValue;
        }

        result.params[calculatorParam.type].push({
          ...calculatorParam,
          id,
          key,
        } as any);

        return result;
      },
      {
        defaultValues: {} as { amount: number; initialPayment?: number; interestRate: number; monthCount: number },
        params: {
          [CalculationParameterValueType.fixed]: [] as (CalculationParameterValueFixed & {
            id: string;
            key: string;
          })[],
          [CalculationParameterValueType.variable]: [] as (CalculationParameterValueVariable & {
            id: string;
            key: string;
          })[],
        },
      },
    );
  }, [product]);

  const {
    formState: { isValid },
    register,
    watch,
  } = useForm({
    defaultValues: calculationParamsDefaultValues,
    mode: 'onChange',
  });
  const formValues = watch();
  const { amount, interestRate, monthCount } = formValues;
  const { monthIncome, records, totalIncome } = useMemo(() => {
    if (!isValid) {
      calculationDataRef.current = null;
      return {};
    }

    const beginDate = zeroTime(new Date());

    try {
      const {
        records,
        totals: { income: totalIncome },
      } = new DepositModel({
        amount,
        beginDate,
        interestRate: interestRate / 100,
        period: monthCount,
        periodUnit: PeriodUnits.month,
      }).result;

      const [, { income: monthIncome }] = records;

      return { monthIncome, records, totalIncome };
    } catch (e) {
      calculationDataRef.current = null;
      return {};
    }
  }, [amount, calculationDataRef, interestRate, isValid, monthCount]);

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid, setIsValid]);

  const customResultValuesUserDefinedFunctionArguments = useMemo(
    () => [
      {
        amount,
        interestRate,
        monthCount,
        monthIncome,
        records,
        totalIncome,
      },
    ],
    [amount, interestRate, monthCount, monthIncome, records, totalIncome],
  );

  const customResultValues = useCustomResultValues(
    product.customResultValueFunctionBodies ?? [],
    '{ amount, interestRate, monthCount, monthIncome, totalIncome}, t',
    customResultValuesUserDefinedFunctionArguments,
    t,
  );

  if (
    currencyCodeToCurrencyRecordMapRequestState !== CurrenciesFetchState.fulfilled ||
    currencyCodeToCurrencyRecordMap == null
  ) {
    return null;
  }

  calculationDataRef.current = {
    calculationData: {
      amount,
      customResultValues,
      interestRate,
      monthCount,
      monthIncome,
      records,
      totalIncome,
      type: ProductType.deposit,
    },
    currencyCodeToCurrencyRecordMap,
  };

  const currencyCode = product.currency;
  const formatValue = (value: FirstParamType<typeof formatCalculatorValue>) =>
    formatCalculatorValue(value, t, language, currencyCode, currencyCodeToCurrencyRecordMap);

  return (
    <form className={depositCalculatorFormStyles[depositCalculatorFormClassname]}>
      {calculationParams[CalculationParameterValueType.variable].map(({ id, key, max, min, step, title }) => (
        <div
          key={key}
          className={cs(
            depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter`],
            depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter_variable`],
          )}
        >
          <label
            className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter-label`]}
            dangerouslySetInnerHTML={{ __html: title ? title : t(`block-calculator.${key}`) }}
            htmlFor={id}
          />
          <div
            className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter-values`]}
          >
            <span
              className={cs(
                depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter-value`],
                depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter-value_current`],
              )}
              dangerouslySetInnerHTML={{
                __html: formatValue({
                  type: key as any,
                  value: (formValues as any)[key],
                }),
              }}
            />
            <span
              className={cs(
                depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter-value`],
                depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter-value_max`],
                depositCalculatorFormStyles[
                  `${depositCalculatorFormClassname}__calculation-parameter-value_above-range`
                ],
              )}
              dangerouslySetInnerHTML={{
                __html: `${language === 'uz' ? '' : t('block-calculator.to') + '&nbsp;'}${formatValue({
                  isLimitValue: true,
                  type: key as any,
                  value: max,
                })}${language === 'uz' ? '&nbsp;' + t('block-calculator.to') : ''}`,
              }}
            />
          </div>
          <Range
            className={
              depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter-value-range`]
            }
            id={id}
            max={max}
            min={min}
            step={step}
            {...register(key as any, {
              setValueAs: Number,
              validate: (valueToValidate) => {
                return Number.isFinite(valueToValidate) && valueToValidate >= min && valueToValidate <= max
                  ? undefined
                  : `Invalid ${title}`;
              },
            })}
          />
          <span
            className={cs(
              depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter-value`],
              depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter-value_max`],
              depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter-value_under-range`],
            )}
            dangerouslySetInnerHTML={{
              __html: `${language === 'uz' ? '' : t('block-calculator.to') + '&nbsp;'}${formatValue({
                isLimitValue: true,
                type: key as any,
                value: max,
              })}${language === 'uz' ? '&nbsp;' + t('block-calculator.to') : ''}`,
            }}
          />
        </div>
      ))}
      {isValid ? (
        <div className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-results`]}>
          <div className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-result`]}>
            <span
              className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-result-label`]}
              dangerouslySetInnerHTML={{ __html: t('block-calculator.totalIncome') }}
            />
            <span
              className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-result-value`]}
              dangerouslySetInnerHTML={{
                __html: formatValue({
                  type: 'amount',
                  value: Math.round(totalIncome!),
                }),
              }}
            />
          </div>
          <div className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-result`]}>
            <span
              className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-result-label`]}
              dangerouslySetInnerHTML={{ __html: t('block-calculator.monthlyIncome') }}
            />
            <span
              className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-result-value`]}
              dangerouslySetInnerHTML={{
                __html: formatValue({
                  type: 'amount',
                  value: Math.round(monthIncome!),
                }),
              }}
            />
          </div>
        </div>
      ) : null}
      {calculationParams[CalculationParameterValueType.fixed].map(({ id, key, title, value }) => (
        <div
          key={key}
          className={cs(
            depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter`],
            depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter_fixed`],
          )}
        >
          <span
            className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter-label`]}
            dangerouslySetInnerHTML={{ __html: title ? title : t(`block-calculator.${key}`) }}
          />
          <span
            className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-parameter-value`]}
            dangerouslySetInnerHTML={{
              __html: formatValue({
                type: key as any,
                value,
              }),
            }}
          />
          <input
            id={id}
            readOnly={true}
            type="hidden"
            {...register(key as any, {
              setValueAs: Number,
              validate: (valueToValidate) => {
                return Number.isFinite(valueToValidate) && valueToValidate === value ? undefined : `Invalid ${title}`;
              },
            })}
          />
        </div>
      ))}
      {Object.entries(customResultValues).map(([key, { title, type, value }]) => (
        <div key={key} className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-result`]}>
          <span
            className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-result-label`]}
            dangerouslySetInnerHTML={{ __html: title ? title : t(`block-calculator.${key}`) }}
          />
          <span
            className={depositCalculatorFormStyles[`${depositCalculatorFormClassname}__calculation-result-value`]}
            dangerouslySetInnerHTML={{
              __html: formatValue({
                type: type as any,
                value: value as any,
              }),
            }}
          />
        </div>
      ))}
    </form>
  );
};

export { DepositCalculatorForm };
