import cs from 'classnames';
import { kebabCase } from 'lodash-es';
import React, { FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { useTranslation } from 'react-i18next';
import { BaseBackgroundColorContext } from '../../../../contexts';
import { getProductTypeBaseBackgroundColor, provideForwardRef } from '../../../../helpers';
import { validators } from '../../../../helpers/validators';
import {
  AbstractBlockProps,
  BaseBackgroundColor,
  BlockWithProductComponentProps,
  FormItems,
  InputType,
  Place,
  ProductType,
  Region,
} from '../../../../interfaces';
import {
  CreateApplicationFetchState,
  fetchApplication,
  fetchPlaces,
  fetchRegions,
  PlacesFetchState,
  RegionsFetchState,
} from '../../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../../services/store';
import { Button, ButtonType } from '../../../units/controls/button/button';
import { Checkbox } from '../../../units/controls/checkbox/checkbox';
import { Icon, IconCode } from '../../../units/icon/icon';
import { RejectIcon, SuccessIcon } from './icons';
import { fields, titles } from './prerequisites';
import productApplyingBlockStyles from './style.module.scss';

const productApplyingBlockClassname = 'product-applying-block';

const { emailRegexValidator, digitsRegexValidator } = validators;

interface Option {
  readonly id: number;
  readonly name: string;
  readonly regionId?: number;
}

export interface FormFieldData {
  readonly inputType?: InputType;
  readonly name: keyof FormFieldsStepOne | keyof FormFieldsStepTwo | keyof FormFieldsStepThree;
  options?: Option[];
  readonly sectionTitle?: string;
  readonly type: FormItems;
}

export interface ProductApplyingBlockProps extends AbstractBlockProps, BlockWithProductComponentProps {
  readonly fields: FormFieldData[][];
  readonly titles: string[];
}

interface FormFieldsStepOne {
  isAccepted: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface FormFieldsStepTwo {
  delivery: boolean;
  homeRegion: string;
  homeCity: string;
  homeAddress: string;
  postcode: string;
  regionBankBranch: Region;
  bankBranch: Place;
}

interface FormFieldsStepThree {
  passport: string;
  birthdate: string;
  inn: string;
  files: File[];
}

export interface FormDataFields {
  productId?: number;
  isAccepted?: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  delivery: boolean | string;
  homeRegion: string;
  homeCity: string;
  homeAddress: string;
  postcode: string;
  regionBankBranch?: string; // TODO: убрать поле, оно определено в FormFieldsStepTwo
  bankBranch?: string; // TODO: убрать поле, оно определено в FormFieldsStepTwo
  regionId: number;
  placeId: number;
  passport: string;
  birthdate: string;
  inn: string;
  files?: File[]; // TODO: убрать поле, оно определено в FormFieldsStepThree
  file0?: File;
  file1?: File;
  file2?: File;
  file3?: File;
  file4?: File;
  file5?: File;
}


// TODO: Вынести в отдельный компонент
const Files = React.forwardRef<
  HTMLLabelElement,
  {
    errors: FieldErrors;
    field: FormFieldData;
    index: number;
    defaultValue?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>((props, forwardRef) => {
  const { errors, field } = props;
  const { t } = useTranslation();
  const { clearErrors, getValues, setValue } = useFormContext();
  const [filesList, setFilesList] = useState<File[]>([]);

  void getValues;

  useEffect(() => {
    clearErrors('files');
  }, [clearErrors, filesList]);

  const onDrop = useCallback(
    (acceptedFiles: File[], _, event) => {
      if (filesList.length >= 6) {
        event.preventDefault();
      }

      const checkExistingFile = filesList.find((file: File) => {
        for (const acceptFile of [...acceptedFiles]) {
          return acceptFile.name === file.name && acceptFile.lastModified === file.lastModified;
        }
        return false;
      });

      if (!checkExistingFile) {
        const setLimitOfFiles = [...filesList, ...acceptedFiles];
        setFilesList(setLimitOfFiles.length > 6 ? setLimitOfFiles.slice(0, 6) : setLimitOfFiles);
        setValue('files', setLimitOfFiles.length > 6 ? setLimitOfFiles.slice(0, 6) : setLimitOfFiles);
      }
    },
    [filesList, setValue],
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'application/pdf, image/jpeg, image/png',
    disabled: filesList.length >= 6,
    maxFiles: 6,
    multiple: true,
    onDrop,
  });

  const fileUploadStyle = useMemo(() => {
    return isDragReject ? 'reject' : isDragActive ? 'active' : isDragAccept ? 'accept' : '';
  }, [isDragActive, isDragReject, isDragAccept]);

  const removeFile = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
    deletedFile: File,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const checkExistingFileIndex = filesList.findIndex((file: File) => {
      return deletedFile.name === file.name && deletedFile.lastModified === file.lastModified;
    });

    if (checkExistingFileIndex >= 0) {
      const temp = [...filesList];
      temp.splice(checkExistingFileIndex, 1);
      setFilesList(temp);
      setValue('files', temp);
    }
  };

  return (
    <div
      className={cs(
        productApplyingBlockStyles[`${productApplyingBlockClassname}__${kebabCase(field.name)}`],
        productApplyingBlockStyles[`${productApplyingBlockClassname}_has-value`],
        productApplyingBlockStyles[`${productApplyingBlockClassname}__label`],
        productApplyingBlockStyles[`${productApplyingBlockClassname}__file-${fileUploadStyle}-state`],
      )}
    >
      <div
        {...getRootProps({
          className: productApplyingBlockStyles[`${productApplyingBlockClassname}__upload-wrapper`],
        })}
      >
        <input {...getInputProps()} type="file" />
        <div className={productApplyingBlockStyles[`${productApplyingBlockClassname}__placeholder-wrapper`]}>
          {filesList.length === 6 || isDragReject ? (
            <RejectIcon className={productApplyingBlockStyles[`${productApplyingBlockClassname}__blocked-icon`]} />
          ) : (
            <SuccessIcon className={productApplyingBlockStyles[`${productApplyingBlockClassname}__upload-icon`]} />
          )}
          <span
            className={productApplyingBlockStyles[`${productApplyingBlockClassname}__placeholder`]}
            dangerouslySetInnerHTML={{
              __html:
                filesList.length >= 6
                  ? t('block-product-applying.limit-of-files-uploaded')
                  : t(`block-product-applying.${kebabCase(field.name)}`),
            }}
          />
        </div>

        <aside>
          <ul className={productApplyingBlockStyles[`${productApplyingBlockClassname}__files-list`]}>
            {filesList.map((file: File) => (
              <li
                key={file.name}
                className={productApplyingBlockStyles[`${productApplyingBlockClassname}__files-item`]}
              >
                <span>
                  {file.name.length > 10
                    ? file.name.slice(0, 10) + '....' + file.type.substring(file.type.lastIndexOf('/') + 1)
                    : file.name}
                </span>
                <button
                  className={productApplyingBlockStyles[`${productApplyingBlockClassname}__remove-button`]}
                  onClick={(event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) =>
                    removeFile(event, file)
                  }
                ></button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <div
        className={productApplyingBlockStyles[`${productApplyingBlockClassname}__error`]}
        dangerouslySetInnerHTML={{ __html: errors[field.name]?.message }}
      />
    </div>
  );
});

// TODO: Вынести в отдельный компонент
const Input = React.forwardRef<
  HTMLLabelElement,
  {
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
        productApplyingBlockStyles[`${productApplyingBlockClassname}__${kebabCase(field.name)}`],
        productApplyingBlockStyles[`${productApplyingBlockClassname}__label`],
        {
          [productApplyingBlockStyles[`${productApplyingBlockClassname}_has-value`]]:
            props.name === 'birthdate' ? true : defaultValue && props.name === 'phone' ? true : defaultValue,
          [productApplyingBlockStyles[`${productApplyingBlockClassname}_has-error`]]: errors[field.name],
        },
      )}
      ref={forwardRef}
    >
      <span
        className={productApplyingBlockStyles[`${productApplyingBlockClassname}__placeholder`]}
        dangerouslySetInnerHTML={{ __html: t(`block-product-applying.${kebabCase(field.name)}`) }}
      />
      {props.name === 'phone' ? (
        <Controller
          name="phone"
          render={({ field: { onChange, onBlur, ref } }) => (
            <InputMask
              className={productApplyingBlockStyles[`${productApplyingBlockClassname}__input`]}
              mask="+\9\98 99 999 99 99"
              onBlur={onBlur}
              onChange={onChange}
              inputRef={ref}
            />
          )}
        />
      ) : (
        <input
          {...props}
          autoComplete="off"
          className={productApplyingBlockStyles[`${productApplyingBlockClassname}__input`]}
          maxLength={props.name === 'inn' ? 14 : props.name === 'passport' ? 9 : props.name === 'postcode' ? 6 : 255}
          type={props.name === 'birthdate' ? 'date' : 'text'}
        />
      )}
      <div
        className={productApplyingBlockStyles[`${productApplyingBlockClassname}__error`]}
        dangerouslySetInnerHTML={{ __html: errors[field.name]?.message }}
      />
    </label>
  );
});

// TODO: Вынести в отдельный компонент
const Select = React.forwardRef<
  HTMLLabelElement,
  {
    errors: FieldErrors;
    field: FormFieldData;
    index: number;
    defaultValue?: string;
  } & React.SelectHTMLAttributes<HTMLSelectElement>
>((props, forwardRef) => {
  const { errors, field, onChange } = props;
  const { t } = useTranslation();

  const [selectedRegionBankBranch, setSelectedRegionBankBranch] = useState('');
  void selectedRegionBankBranch;

  const changeSelectOptionHandler = (event: any) => {
    setSelectedRegionBankBranch(event.target.value);

    if (onChange) {
      onChange(event);
    }
  };

  const select = () => {
    return (
      <select
        {...props}
        className={productApplyingBlockStyles[`${productApplyingBlockClassname}__select`]}
        onChange={changeSelectOptionHandler}
        tabIndex={0}
        defaultValue=""
      >
        <option
          key={0}
          dangerouslySetInnerHTML={{ __html: t('block-product-applying.select-one') }}
          disabled
          value=""
        />
        {field.options!.map((option) => (
          <option
            key={option.id}
            dangerouslySetInnerHTML={{ __html: field.name === 'delivery' ? t(option.name) : option.name }}
            value={option.id}
          />
        ))}
      </select>
    );
  };

  return (
    <label
      className={cs(
        productApplyingBlockStyles[`${productApplyingBlockClassname}__${kebabCase(field.name)}`],
        productApplyingBlockStyles[`${productApplyingBlockClassname}__label`],
        productApplyingBlockStyles[`${productApplyingBlockClassname}_has-value`],
        {
          [productApplyingBlockStyles[`${productApplyingBlockClassname}_has-error`]]: errors[field.name],
          [productApplyingBlockStyles[`${productApplyingBlockClassname}_selected-option`]]: selectedRegionBankBranch,
        },
      )}
      ref={forwardRef}
    >
      <span
        className={productApplyingBlockStyles[`${productApplyingBlockClassname}__placeholder`]}
        dangerouslySetInnerHTML={{ __html: t(`block-product-applying.${kebabCase(field.name)}`) }}
      />
      {select()}
      <div
        className={productApplyingBlockStyles[`${productApplyingBlockClassname}__error`]}
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
        value: fieldName !== 'postcode', // TODO: need to be true, when 'files' will be full watchable by react-hook-form
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

    if (fieldName === 'passport') {
      validators.maxLength = {
        value: 9,
        message: t('block-product-applying.characters-must-be').replaceAll('#N#','9'),
      };

      validators.minLength = {
        value: 9,
        message: t('block-product-applying.characters-must-be').replaceAll('#N#','9'),
      };
    }


    if (fieldName === 'inn') {
      validators.maxLength = {
        value: 14,
        message: t('block-product-applying.characters-must-be').replaceAll('#N#','14'),
      };

      validators.minLength = {
        value: 14,
        message: t('block-product-applying.characters-must-be').replaceAll('#N#','14'),
      };
    }

    if (fieldName === 'postcode') {
      validators.maxLength = {
        value: 6,
        message: t('block-product-applying.characters-must-be').replaceAll('#N#','6'),
      };
    }

    switch (fieldName) {
      case 'email':
        validators.pattern = {
          value: emailRegexValidator,
          message: t('block-product-applying.uncorrected-email'),
        };
        break;
      case 'postcode':
      case 'inn':
        validators.pattern = { value: digitsRegexValidator, message: t('block-product-applying.is-digits-only') };
        break;
    }

    const registerProps = register(fieldName as string, { ...validators });

    const FormItem = ((field): typeof Files | typeof Input | typeof Select | null => {
      switch (field.type) {
        case 'file':
          return Files;
        case 'input':
          return Input;
        case 'select':
          return Select;
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
            className={productApplyingBlockStyles[`${productApplyingBlockClassname}__section-title`]}
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
  const onChangeCheckboxStateHandler = useCallback((checked) => setValue('isAccepted', checked), [setValue]);
  const formValues = watch();
  const { isAccepted = false } = formValues;

  const htmlHandler = (): string => {
    const content = t('block-product-applying.accepting-requirement');
    return content.includes('<a ')
      ? content.replace('<a ', '<a data-router file-download-attr target="_blank" rel="noopener noreferrer" ')
      : content;
  };

  return (
    <form
      className={productApplyingBlockStyles[`${productApplyingBlockClassname}__form`]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={cs(
          productApplyingBlockStyles[`${productApplyingBlockClassname}__fields`],
          productApplyingBlockStyles[`${productApplyingBlockClassname}__field-step-${step}`],
        )}
      >
        <Fields errors={errors} fields={fields} register={register} step={step} watch={watch} />
      </div>

      {step === 1 ? (
        <>
          <Checkbox
            {...register('isAccepted', { required: true })}
            checked={isAccepted}
            className={productApplyingBlockStyles[`${productApplyingBlockClassname}__checkbox`]}
            onChange={onChangeCheckboxStateHandler}
          >
            <span dangerouslySetInnerHTML={{ __html: htmlHandler() }} />
          </Checkbox>
          <br />
        </>
      ) : null}

      <Button
        className={productApplyingBlockStyles[`${productApplyingBlockClassname}__button`]}
        buttonType={ButtonType.primary}
        disabled={!isAccepted}
      >
        <span dangerouslySetInnerHTML={{ __html: buttonTitle }} />
      </Button>
    </form>
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
  <div aria-hidden={true} className={productApplyingBlockStyles[`${productApplyingBlockClassname}__progress-bar`]}>
    {Array.from({ length: stepCount }).map((_, index) => {
      const iconCode = currentStepIndex >= index ? IconCode.paginationIconSolid : IconCode.paginationIconBorder;

      return (
        <span key={index} onClick={() => onStepChange(index)}>
          <Icon
            key={index}
            className={productApplyingBlockStyles[`${productApplyingBlockClassname}__icon`]}
            code={iconCode}
          />
        </span>
      );
    })}
  </div>
);

const ProductApplyingBlock: FC<ProductApplyingBlockProps> = ({
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
      baseBackgroundColor: product?.type
        ? getProductTypeBaseBackgroundColor(product?.type)
        : BaseBackgroundColor.default,
    }),
    [product?.type],
  );

  const { places, requestPhase: placesRequestPhase } = useAppSelector((state) => state.places);
  const { regions, requestPhase: regionsRequestPhase } = useAppSelector((state) => state.regions);

  useEffect(() => {
    if (regionsRequestPhase === RegionsFetchState.initial) {
      dispatch(fetchRegions(language));
    }
  }, [dispatch, regionsRequestPhase]);

  useEffect(() => {
    if (placesRequestPhase === PlacesFetchState.initial) {
      dispatch(fetchPlaces(language));
    }
  }, [dispatch, placesRequestPhase]);

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

  const preExtendedFields = useMemo(() => {
    if (placesRequestPhase !== PlacesFetchState.fulfilled || regionsRequestPhase !== RegionsFetchState.fulfilled) {
      return fields;
    }

    return [...fields].map((fields) =>
      fields.map((field) => {
        if (field.name === 'bankBranch' && places) {
          field.options = places;
        }

        if ((field.name === 'homeRegion' || field.name === 'regionBankBranch') && regions) {
          field.options = regions;
        }

        return field;
      }),
    );
  }, [places, placesRequestPhase, regions, regionsRequestPhase]);

  const formValues = watch();

  const extendedFields = useMemo(() => {
    const bankBranchRegionId = Number(formValues.regionBankBranch);

    if (!Number.isFinite(bankBranchRegionId) || placesRequestPhase !== PlacesFetchState.fulfilled) {
      return preExtendedFields;
    }

    let bankBranchFieldData: FormFieldData | null = null;

    for (const fields of preExtendedFields) {
      for (const field of fields) {
        if (field.name === 'bankBranch') {
          bankBranchFieldData = field;
          break;
        }
      }
    }

    if (bankBranchFieldData) {
      bankBranchFieldData.options = places!.filter(({ regionId }) => +regionId === bankBranchRegionId);
    }

    return preExtendedFields;
  }, [preExtendedFields, formValues.regionBankBranch, places, placesRequestPhase]);

  if (placesRequestPhase !== PlacesFetchState.fulfilled || regionsRequestPhase !== RegionsFetchState.fulfilled) {
    return null;
  }

  const { isAccepted = false } = formValues;

  if (
    !product ||
    !(product.type === ProductType.card || product.type === ProductType.loan || product.type === ProductType.deposit) ||
    !product.canBeApplied
  ) {
    return null;
  }

  const onSubmit: SubmitHandler<any> = async (data: FormDataFields): Promise<any> => {
    if (step === 3) {
      const formData: FormData = new FormData();

      if (data.files?.length) {
        for (let i = 0; i <= data.files.length; i++) {
          formData.append(`file${i}`, data.files[i]);
        }
        delete data.files;
      }
      const region = regions!.find((region) => region.id === Number(data.regionBankBranch));

      delete data.isAccepted;
      data.productId = product.id;
      data.delivery = data.delivery === '1';

      if (region) {
        data.homeRegion = region.name;
        data.regionId = region.id;
      }

      data.placeId = Number(data.bankBranch);
      delete data.bankBranch;
      delete data.files;
      delete data.regionBankBranch;

      formData.append('data', JSON.stringify(data));
      formData.append('lang', language);
      formData.append('method', 'createApplication');

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
          productApplyingBlockStyles[productApplyingBlockClassname],
          productApplyingBlockStyles[`${productApplyingBlockClassname}_product-type_${product!.type}`],
          productApplyingBlockStyles[
          `${productApplyingBlockClassname}_base-background-color_${baseBackgroundColorContextValue.baseBackgroundColor}`
          ],
          {
            [productApplyingBlockStyles[`${productApplyingBlockClassname}_success`]]: step === 4,
          },
          className,
        )}
        id={productApplyingBlockClassname}
      >
        {step === 4 ? (
          <div className={productApplyingBlockStyles[`${productApplyingBlockClassname}__success-form`]}>
            <svg
              className={productApplyingBlockStyles[`${productApplyingBlockClassname}__success-icon`]}
              width="166"
              height="128"
              viewBox="0 0 166 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 79.3044L55.7341 123L163 3" stroke="white" strokeWidth="7" />
            </svg>
            <h3
              className={productApplyingBlockStyles[`${productApplyingBlockClassname}__success-form-title`]}
              dangerouslySetInnerHTML={{ __html: t('block-product-applying.success-form-title') }}
            />
            <p
              className={productApplyingBlockStyles[`${productApplyingBlockClassname}__success-form-subtitle`]}
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

                if (isValid && isAccepted && step + 1 === correctedStepIndex) {
                  setStep(correctedStepIndex);
                }
              }}
              stepCount={extendedFields.length}
            />

            <div
              className={productApplyingBlockStyles[`${productApplyingBlockClassname}__title`]}
              dangerouslySetInnerHTML={{ __html: t(titles[step - 1]) }}
            />
            <Steps fields={extendedFields} step={step} onSubmit={onSubmit} />
          </FormProvider>
        )}
      </div>
    </BaseBackgroundColorContext.Provider>
  );
};

export { ProductApplyingBlock };
