import cs from 'classnames';
import { nanoid } from 'nanoid';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zeroTime } from '../../../../../calculators-models/helpers';
import { LoanModel } from '../../../../../calculators-models/LoanModel';
import { PeriodUnits } from '../../../../../calculators-models/typings';
import {
  CalculationParameterValueFixed,
  CalculationParameterValueType,
  CalculationParameterValueVariable,
  FirstParamType,
  LoanProductData,
  ProductType,
  WithClassNameComponentProps,
} from '../../../../../interfaces';
import { useBaseBackgroundColor } from '../../../../../contexts';
import { CurrenciesFetchState, fetchCurrencies } from '../../../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../../../services/store';
import { formatCalculatorValue, getCalculationParamDefaultValue } from '../../helpers';
import { useCustomResultValues } from '../../hooks';
import { CalculatorForm } from '../../interface';
import { Range } from '../range/range';
import loanCalculatorFormStyles from './style.module.scss';

const loanCalculatorFormClassname = 'loan-calculator-form';

interface LoanCalculatorFormProps {
  product: LoanProductData;
}

const LoanCalculatorForm: FC<CalculatorForm & LoanCalculatorFormProps & WithClassNameComponentProps> = ({
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
  const  baseBackgroundColor = useBaseBackgroundColor();
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
    setValue,
    watch,
  } = useForm({
    defaultValues: calculationParamsDefaultValues,
    mode: 'onChange',
  });
  const formValues = watch();
  const { amount, initialPayment = 0, interestRate, monthCount } = formValues;
  const parameterDependency = (key: string, inputValue?: string) => {
    switch (key) {
      case 'initialPayment':
        return formatValue({
          type: 'amount',
          value: Math.round(Number(inputValue?.replace(/\D/g, '')) || initialPaymentAmount),
        });
      case 'interestRate':
        return formatValue({
          type: 'interestRate',
          value: Number(inputValue?.replace(/\D/g, '')) || initialParam('rate') || interestRate,
        });
      case 'monthCount':
        return formatValue({
          type: 'monthCount',
          value: Number(inputValue?.replace(/\D/g, '')) || initialParam('month') || monthCount,
        });
      default:
        return formatValue({
          type: key as any,
          value: Number(inputValue?.replace(/\D/g, '')) || (formValues as any)[key],
        });
    }
  };
  const initialParam = useCallback(
    (value: string) => {
      const monthCountParam =
        calculationParams[CalculationParameterValueType.fixed].find(({ key }) => key === 'monthCount') ||
        calculationParams[CalculationParameterValueType.variable].find(({ key }) => key === 'monthCount');

      const monthlyRates = monthCountParam?.rates;

      if (!monthlyRates?.length) {
        return null;
      }

      switch (value) {
        case 'max':
          return monthlyRates[monthlyRates.length - 1].month;
        case 'month':
          return monthlyRates[monthCount].month;
        case 'rate':
          return monthlyRates[monthCount].rate;
      }
    },
    [calculationParams, monthCount],
  );
  const initialPaymentAmount = useMemo(
    () => Math.trunc(amount * 100 * (initialPayment / 100)) / 100,
    [amount, initialPayment],
  );
  const { annuityPayment, interest, records } = useMemo(() => {
    if (!isValid) {
      calculationDataRef.current = null;
      return {};
    }

    const beginDate = zeroTime(new Date());

    try {
      const {
        records,
        totals: { interest },
      } = new LoanModel({
        amount: initialPaymentAmount !== 0 ? (amount * 100 - initialPaymentAmount * 100) / 100 : amount,
        beginDate,
        interestRate: (initialParam('rate') || interestRate) / 100,
        period: initialParam('month') || monthCount,
        periodUnit: PeriodUnits.month,
      }).result;

      const [, { payment: annuityPayment }] = records;

      return { annuityPayment, interest, records };
    } catch (e) {
      calculationDataRef.current = null;
      return {};
    }
  }, [amount, calculationDataRef, initialParam, initialPaymentAmount, interestRate, isValid, monthCount]);

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid, setIsValid]);

  const customResultValuesUserDefinedFunctionArguments = useMemo(
    () => [
      {
        amount,
        annuityPayment,
        initialPayment,
        interest,
        interestRate,
        monthCount,
        records,
      },
    ],
    [amount, annuityPayment, initialPayment, interest, interestRate, monthCount, records],
  );

  const customResultValues = useCustomResultValues(
    product.customResultValueFunctionBodies ?? [],
    '{ amount, annuityPayment, initialPayment, interest, interestRate, monthCount }, t',
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
      annuityPayment,
      customResultValues,
      gracePeriod: calculationParams[CalculationParameterValueType.variable].find((x) =>
        x.hasOwnProperty('gracePeriod'),
      )?.gracePeriod,
      initialPayment,
      interest,
      interestRate: initialParam('rate') || interestRate,
      monthCount,
      records,
      type: ProductType.loan,
    },
    currencyCodeToCurrencyRecordMap,
  };

  const currencyCode = product.currency;
  const formatValue = (
    value: FirstParamType<typeof formatCalculatorValue>,
    rates?: CalculationParameterValueVariable['rates'],
  ) => formatCalculatorValue(value, t, language, currencyCode, currencyCodeToCurrencyRecordMap, rates);

  const setInputTyping = (
    convertToNum: number,
    key: string,
    max: number,
    min: number,
    rangeValues: (CalculationParameterValueVariable & { id: string; key: string }) | undefined,
  ) => {
    if (convertToNum < rangeValues!.min) {
      return min;
    }
    if (convertToNum > rangeValues!.max) {
      return max;
    }

    return convertToNum;
  };

  const rates = calculationParams.variable.find((param) => param.key === 'monthCount')?.rates;

  return (
    <form className={loanCalculatorFormStyles[loanCalculatorFormClassname]}>
      {calculationParams[CalculationParameterValueType.variable].map(({ id, isInput, key, max, min, step, title }) => (
        <div
          key={key}
          className={cs(
            loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter`],
            loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter_variable`],
          )}
        >
          <label
            className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-label`]}
            dangerouslySetInnerHTML={{ __html: title ? title : t(`block-calculator.${key}`) }}
            htmlFor={id}
          />
          <div className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-values`]}>
            {!isInput ? (
              <span
                className={cs(
                  loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value`],
                  loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value_current`],
                )}
                dangerouslySetInnerHTML={{ __html: parameterDependency(key) }}
              />
            ) : (
              <label className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__wrapper`]}>
                <input
                  className={cs(
                    loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-input-view_${baseBackgroundColor}`],
                    loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value`],
                    loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value_current`],

                  )}
                  onChange={(event) => {
                    const rangeValues = calculationParams.variable.find((x) => x.key === key);
                    let convertToNum: number = Number(event.target.value.replace(/[\s\D]/g, ''));
                    convertToNum = setInputTyping(convertToNum, key, max, min, rangeValues);

                    return setValue(key as unknown as any, convertToNum);
                  }}
                  type="hidden"
                  value={parameterDependency(key).split('&')[0]}
                />
                <span
                  className={cs(
                    loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value`],
                    loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value_current`],
                  )}
                  dangerouslySetInnerHTML={{ __html: parameterDependency(key) }}
                />
              </label>
            )}
            <span
              className={cs(
                loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value`],
                loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value_max`],
                loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value_above-range`],
              )}
              dangerouslySetInnerHTML={{
                __html: `${language === 'uz' ? '' : t('block-calculator.to') + '&nbsp;'}${formatValue(
                  {
                    isLimitValue: true,
                    type: key as any,
                    value: max,
                  },
                  rates,
                )}${language === 'uz' ? '&nbsp;' + t('block-calculator.to') : ''}`,
              }}
            />
            {key === 'initialPayment' ? (
              <span
                className={cs(
                  loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value`],
                  loanCalculatorFormStyles[
                    `${loanCalculatorFormClassname}__calculation-parameter-value_initial-payment`
                  ],
                )}
                dangerouslySetInnerHTML={{
                  __html: formatValue({ type: 'initialPayment', value: (formValues as any)[key] }),
                }}
              />
            ) : null}
          </div>
          <Range
            className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value-range`]}
            id={id}
            max={max}
            min={min}
            valueOnTheBar={
              key === 'initialPayment'
                ? formatValue({ type: 'initialPayment', value: (formValues as any)[key] })
                : undefined
            }
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
              loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value`],
              loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value_max`],
              loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value_under-range`],
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
      {calculationParams[CalculationParameterValueType.fixed].map(({ id, key, title, value }) => (
        <div
          key={key}
          className={cs(
            loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter`],
            loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter_fixed`],
          )}
        >
          <span
            className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-label`]}
            dangerouslySetInnerHTML={{ __html: title ? title : t(`block-calculator.${key}`) }}
          />
          <span
            className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-parameter-value`]}
            dangerouslySetInnerHTML={{
              __html: parameterDependency(key),
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
      {isValid ? (
        <div className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-results`]}>
          <div className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result`]}>
            <span
              className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result-label`]}
              dangerouslySetInnerHTML={{ __html: t('block-calculator.interestRate') }}
            />
            <span
              className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result-value`]}
              dangerouslySetInnerHTML={{
                __html: formatValue({ type: 'interestRate', value: initialParam('rate') || interestRate }),
              }}
            />
          </div>
          <div className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result`]}>
            <span
              className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result-label`]}
              dangerouslySetInnerHTML={{ __html: t('block-calculator.monthlyPayment') }}
            />
            <span
              className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result-value`]}
              dangerouslySetInnerHTML={{
                __html: formatValue({ type: 'amount', value: Math.round(annuityPayment!) }),
              }}
            />
          </div>
          {/*
          <div className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result`]}>
            <span
              className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result-label`]}
              dangerouslySetInnerHTML={{ __html: t('block-calculator.overpayment') }}
            />
            <span
              className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result-value`]}
              dangerouslySetInnerHTML={{
                __html: formatValue({ type: 'amount', value: Math.round(interest!) }),
              }}
            />
          </div>
          */}
          {Object.entries(customResultValues).map(([key, { title, type, value }]) => (
            <div key={key} className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result`]}>
              <span
                className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result-label`]}
                dangerouslySetInnerHTML={{ __html: title ? title : t(`block-calculator.${key}`) }}
              />
              <span
                className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result-value`]}
                dangerouslySetInnerHTML={{
                  __html: formatValue({ type: type as any, value: value as any }),
                }}
              />
            </div>
          ))}
          {/*
          {calculationParams[CalculationParameterValueType.variable].find((x) => x.hasOwnProperty('gracePeriod')) ? (
            <div className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result`]}>
              <span
                className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result-label`]}
                dangerouslySetInnerHTML={{ __html: t('block-calculator.gracePeriod') }}
              />
              <span
                className={loanCalculatorFormStyles[`${loanCalculatorFormClassname}__calculation-result-value`]}
                dangerouslySetInnerHTML={{
                  __html: formatValue({
                    type: 'monthCount',
                    value:
                      calculationParams[CalculationParameterValueType.variable].find((x) =>
                        x.hasOwnProperty('gracePeriod'),
                      )!.gracePeriod || 0,
                  }),
                }}
              />
            </div>
          ) : null}
          */}
        </div>
      ) : null}
    </form>
  );
};

export { LoanCalculatorForm };
