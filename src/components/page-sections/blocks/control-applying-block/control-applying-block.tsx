import cs from 'classnames';
import { kebabCase } from 'lodash-es';
import React, { FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { useTranslation } from 'react-i18next';
import { BaseBackgroundColorContext } from '../../../../contexts';
import { getProductTypeBaseBackgroundColor, provideForwardRef } from '../../../../helpers';
import { validators } from '../../../../helpers/validators';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
  AbstractBlockProps,
  BlockWithProductComponentProps,
  FormItems,
  InputType,
  ProductType,
} from '../../../../interfaces';
import {
  CreateApplicationFetchState,
  fetchApplication,
} from '../../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../../services/store';
import { Button, ButtonType } from '../../../units/controls/button/button';
import { Checkbox } from '../../../units/controls/checkbox/checkbox';

import { fields, titles } from './prerequisites';
import controlApplyingBlockStyles from './style.module.scss';

const controlApplyingBlockClassname = 'control-applying-block';

const { emailRegexValidator } = validators;

interface Option {
  readonly id: number;
  readonly name: string;
  readonly regionId?: number;
}

export interface FormFieldData {
  readonly inputType?: InputType;
  readonly name: keyof FormFieldsStepOne;
  options?: Option[];
  readonly sectionTitle?: string;
  readonly type: FormItems;
}

export interface ControlApplyingBlockProps extends AbstractBlockProps, BlockWithProductComponentProps {
  readonly fields: FormFieldData[][];
  readonly titles: string[];
}

interface FormFieldsStepOne {
  isAcceptedFirst: boolean;
  isAcceptedSecond: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  token:string;
}


export interface FormDataFields {
  productId?: number;
  isAcceptedFirst?: boolean;
  isAcceptedSecond?: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  token:string;
}


// TODO: Вынести в отдельный компонент
const Input = React.forwardRef<
  HTMLLabelElement,
  {
    value?: string;
    errors: FieldErrors;
    field: FormFieldData;
    defaultValue?: string;
    index: number;
  } & React.InputHTMLAttributes<HTMLInputElement>
>((props, forwardRef) => {
  const { defaultValue, field, errors } = props;
  const { t } = useTranslation();

  return (
    <label
      className={cs(
        controlApplyingBlockStyles[`${controlApplyingBlockClassname}__${kebabCase(field.name)}`],
        controlApplyingBlockStyles[`${controlApplyingBlockClassname}__label`],
        {
          [controlApplyingBlockStyles[`${controlApplyingBlockClassname}_has-value`]]:
            defaultValue && props.name === 'phone' ? true :  defaultValue,
          [controlApplyingBlockStyles[`${controlApplyingBlockClassname}_has-error`]]: errors[field.name],
        },
      )}
      ref={forwardRef}
    >
      <span
        className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__placeholder`]}
        dangerouslySetInnerHTML={{ __html: t(`block-product-applying.${kebabCase(field.name)}`) }}
      />
      {props.name === 'phone' ? (
        <Controller
          name="phone"
          render={({ field: { onChange, onBlur, ref } }) => (
            <InputMask
              className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__input`]}
              mask="+\9\98 99 999 99 99"
              onBlur={onBlur}
              onChange={onChange}
              inputRef={ref}
            />
          )}
        />
      ) : props.name === 'message'
          ?
          <Controller
              name="message"
              render={({ field: { onChange, onBlur, ref } }) => (
                  <textarea
                      autoComplete="off"
                      className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__input`]}
                      maxLength={255}
                      onBlur={onBlur}
                      onChange={onChange}
                      ref={ref}
                  />
              )}
          />
      : (
        <input
          {...props}
          autoComplete="off"
          className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__input`]}
          maxLength={255}
          type={'text'}
        />
      )}
      <div
        className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__error`]}
        dangerouslySetInnerHTML={{ __html: errors[field.name]?.message }}
      />
    </label>
  );
});



const Fields: FC<{
  errors: any;
  fields: any;
  step: any;
  register: any;
  watch: any;
}> = ({ errors, fields = [], step, register, watch }) => {
  let countFields = -1;
  const { t } = useTranslation();
  const labelRefs = useRef<HTMLLabelElement[]>([]);
  const formValues = watch();

  return fields.map((field: FormFieldData) => {
    countFields++;
    const { name: fieldName } = field;
    const validators: {
      maxLength?: { value: number; message: string };
      minLength?: { value: number; message: string };
      pattern?: { value: RegExp; message: string };
      required: { value: boolean; message: string };
    } = {
      required: {
        value: true, // TODO: need to be true, when 'files' will be full watchable by react-hook-form
        message: `${t('block-product-applying.' + kebabCase(fieldName))} ${t('block-product-applying.is-required')}`,
      },
    };

    if (fieldName === 'phone') {
      const formPhoneValueLength = formValues.phone?.replace(/\D/g, '').length;

      validators.maxLength = {
        value: formPhoneValueLength !== 12 ? 12 : 17,
        message: t('block-product-applying.characters-must-be').replaceAll('#N#','12'),
      };

      validators.minLength = {
        value: formPhoneValueLength !== 12 ? 12 : 17,
        message: t('block-product-applying.characters-must-be').replaceAll('#N#','12'),
      };
    }

    switch (fieldName) {
      case 'email':
        validators.pattern = {
          value: emailRegexValidator,
          message: t('block-product-applying.uncorrected-email'),
        };
        break;
    }

    const registerProps = register(fieldName as string, { ...validators });

    const FormItem = ((field): typeof Input | null => {
      switch (field.type) {
        case 'input':
          return Input;
        case 'textarea':
          return Input;
        default:
          return null;
      }
    })(field);

    if (!FormItem) {
      return null;
    }
    return (
      <React.Fragment key={field.name}>
        {field.sectionTitle ? (
          <div
            className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__section-title`]}
            dangerouslySetInnerHTML={{ __html: t(`block-product-applying.${field.sectionTitle}`) }}
          />
        ) : null}
        <FormItem
          {...registerProps}
          ref={(el: HTMLLabelElement) => {
            labelRefs.current[countFields] = el;
            provideForwardRef(el, registerProps.ref);
          }}
          errors={errors}
          defaultValue={formValues[fieldName] as string}
          field={field}
        />
      </React.Fragment>
    );
  });
};

const Step: FC<{ buttonTitle: string; fields: FormFieldData[]; step: number; onSubmit: SubmitHandler<any> }> = ({
  buttonTitle,
  fields,
  step,
  onSubmit,
}): ReactElement<HTMLFormElement> => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useFormContext();
  const { t } = useTranslation();
  const onChangeCheckboxStateHandlerFirst = useCallback((checked) => setValue('isAcceptedFirst', checked), [setValue]);
  const onChangeCheckboxStateHandlerSecond = useCallback((checked) => setValue('isAcceptedSecond', checked), [setValue]);
  const formValues = watch();
  const { isAcceptedFirst = false, isAcceptedSecond = false } = formValues;
  const [token, setToken] = useState();

  const onVerify = useCallback((token) => { setToken(token);},[]);
  const siteKey:string = '6LfByHwmAAAAAIuclMAelyjS-cO1D6lCJ7NgoHdR';

  return (
      <GoogleReCaptchaProvider reCaptchaKey={siteKey} language={'en'}
      >
    <form
      className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__form`]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input name={'token'} id={'google-token'} type="hidden" value={token} />
      <div
        className={cs(
          controlApplyingBlockStyles[`${controlApplyingBlockClassname}__fields`],
          controlApplyingBlockStyles[`${controlApplyingBlockClassname}__field-step-${step}`],
        )}
      >
        <Fields errors={errors} fields={fields} register={register} step={step} watch={watch} />
      </div>
      <GoogleReCaptcha
          onVerify={onVerify}
      />
      {step === 1 ? (
        <>
          <Checkbox
            {...register('isAcceptedFirst', { required: true })}
            checked={isAcceptedFirst}
            className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__checkbox`]}
            onChange={onChangeCheckboxStateHandlerFirst}
          >
            <span dangerouslySetInnerHTML={{ __html: t('block-product-applying.is-accepted-first') }} />
          </Checkbox>
          <br />
          <Checkbox
              {...register('isAcceptedSecond', { required: true })}
              checked={isAcceptedSecond}
              className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__checkbox`]}
              onChange={onChangeCheckboxStateHandlerSecond}
          >
            <span dangerouslySetInnerHTML={{ __html: t('block-product-applying.is-accepted-second') }} />
          </Checkbox>
          <br />
        </>
      ) : null}

      <Button
        className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__button`]}
        buttonType={ButtonType.primary}
        disabled={!isAcceptedFirst || !isAcceptedSecond}
      >
        <span dangerouslySetInnerHTML={{ __html: buttonTitle }} />
      </Button>
    </form>
      </GoogleReCaptchaProvider>
  );
};

const Steps: FC<{
  fields: FormFieldData[][];
  step: number;
  onSubmit: SubmitHandler<any>;
}> = ({ fields, step, onSubmit }): ReactElement<HTMLFormElement> | null => {
  const stepFields = fields[step - 1];
  const { t } = useTranslation();

  return (
    <Step
      buttonTitle={t(step < fields.length ? 'buttons.next' : 'buttons.submit')}
      fields={stepFields}
      step={step}
      onSubmit={onSubmit}
    />
  );
};

const Pagination: FC<{ currentStepIndex: number; onStepChange: (stepIndex: number) => void; stepCount: number }> = ({
  currentStepIndex,
  onStepChange,
  stepCount,
}) => (
  <div aria-hidden={true} className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__progress-bar`]}>
    {Array.from({ length: stepCount }).map((_, index) => {

      return (
        <span key={index} onClick={() => onStepChange(index)}>

        </span>
      );
    })}
  </div>
);

const ControlApplyingBlock: FC<ControlApplyingBlockProps> = ({
  className,
  contextProduct: productFromContext,
  product: productFromBlock,
}) => {
  const dispatch = useAppDispatch();
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const methods = useForm();
  const {
    formState: { isValid },
    watch,
  } = methods;
  const [step, setStep] = useState(1);
  const { errorData, requestPhase: createApplicationRequestPhase } = useAppSelector((state) => state.createApplication);

  const product = useMemo(() => {
    return productFromBlock || productFromContext;
  }, [productFromBlock, productFromContext]);

  const baseBackgroundColorContextValue = useMemo(
    () => ({
      baseBackgroundColor: getProductTypeBaseBackgroundColor(ProductType.card),
    }),
    [product?.type],
  );



  useEffect(() => {
    // summary: успешная загрузка формы
    if (createApplicationRequestPhase === CreateApplicationFetchState.fulfilled) {
      setStep(4);
    }

    // summary: успешная загрузка формы, но без фото (либо не прикрепили, либо что-то на стороне банка)
    if (createApplicationRequestPhase === CreateApplicationFetchState.rejected) {
      if (errorData) {
        if (errorData.error.type === 'files' && !errorData.success) {
          // вероятно, нужно сделать шаг 5, на котором будет доп инфа, про то, что фотки не ушли, в дизайне не было, не обсуждали, и не успели
          setStep(4);
        }
      }
    }
  }, [createApplicationRequestPhase, errorData]);


  const formValues = watch();



  const { isAcceptedFirst = false, isAcceptedSecond = false } = formValues;


  const onSubmit: SubmitHandler<any> = async (data: FormDataFields): Promise<any> => {
    if (step === 1) {
      const formData: FormData = new FormData();

      delete data.isAcceptedFirst;
      delete data.isAcceptedSecond;
      const googleToken = document.getElementById('google-token') as HTMLInputElement;
      if(googleToken){
        data.token = googleToken.value;
      }
      formData.append('data', JSON.stringify(data));
      formData.append('lang', language);
      formData.append('method', 'createControlApplication');



      if (createApplicationRequestPhase === CreateApplicationFetchState.initial) {
        dispatch(fetchApplication(formData));
      }
    } else {
      setStep(step + 1);
    }
  };

  return (
    <BaseBackgroundColorContext.Provider value={baseBackgroundColorContextValue}>
      <div
        className={cs(
          controlApplyingBlockStyles[controlApplyingBlockClassname],
          controlApplyingBlockStyles[`${controlApplyingBlockClassname}_product-type_${ProductType.card}`],
          controlApplyingBlockStyles[
          `${controlApplyingBlockClassname}_base-background-color_${baseBackgroundColorContextValue.baseBackgroundColor}`
          ],
          {
            [controlApplyingBlockStyles[`${controlApplyingBlockClassname}_success`]]: step === 4,
          },
          className,
        )}
        id={controlApplyingBlockClassname}
      >
        {step === 4 ? (
          <div className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__success-form`]}>
            <svg
              className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__success-icon`]}
              width="166"
              height="128"
              viewBox="0 0 166 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 79.3044L55.7341 123L163 3" stroke="white" strokeWidth="7" />
            </svg>
            <h3
              className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__success-form-title`]}
              dangerouslySetInnerHTML={{ __html: t('block-product-applying.control-success-form-title') }}
            />
            <p
              className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__success-form-subtitle`]}
              dangerouslySetInnerHTML={{ __html: t('block-product-applying.success-form-subtitle') }}
            />
          </div>
        ) : (
          <FormProvider {...methods}>
            <Pagination
              currentStepIndex={step - 1}
              onStepChange={(stepIndex) => {
                const correctedStepIndex = stepIndex + 1;

                if (correctedStepIndex < step) {
                  setStep(correctedStepIndex);
                }

                if (isValid && isAcceptedFirst && isAcceptedSecond && step + 1 === correctedStepIndex) {
                  setStep(correctedStepIndex);
                }
              }}
              stepCount={1}
            />

            <div
              className={controlApplyingBlockStyles[`${controlApplyingBlockClassname}__title`]}
              dangerouslySetInnerHTML={{ __html: t(titles[step - 1]) }}
            />
            <Steps fields={fields} step={step} onSubmit={onSubmit} />
          </FormProvider>
        )}
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

export { ControlApplyingBlock };
