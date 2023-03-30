import cs from 'classnames';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { validators } from '../../../helpers/validators';
import { AbstractBlockProps, ProductAdvantageType, ProductType } from '../../../interfaces';
import { Button } from '../../units/controls/button/button';
import { Tiles, TilingModes } from '../../units/tiles/tiles';
import iconsSvgPath from '../product-advantages-block/components/product-advantage/icons.svg';
import subscriptionBlockStyles from './style.module.scss';

const subscriptionBlockClassname = 'subscription-block';

export interface SubscriptionBlockProps extends AbstractBlockProps {
  buttonTitle: string;
  subtitle: string;
  title: string;
}

// interface IFormInput {
//   email: String;
// }

const SubscriptionBlock: FC<SubscriptionBlockProps> = ({ buttonTitle, className, subtitle, title }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    resetField,
    watch,
  } = useForm();
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();
  const formValue = watch();
  const registerProps = register('email', {
    pattern: {
      value: validators.emailRegexValidator,
      message: t('form.invalid-email'),
    },
    required: {
      value: true,
      message: t('form.required-field'),
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    setIsSuccess(true);

    setTimeout(() => {
      resetField('email');
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div
      className={cs(subscriptionBlockStyles[subscriptionBlockClassname], className)}
      onMouseEnter={() => setAreTilesAnimated(true)}
      onMouseLeave={() => setAreTilesAnimated(false)}
    >
      <div
        className={cs(subscriptionBlockStyles[`${subscriptionBlockClassname}__submit-status`], {
          [subscriptionBlockStyles[`${subscriptionBlockClassname}__submit-status_success`]]: isSuccess,
        })}
      >
        <svg
          className={subscriptionBlockStyles[`${subscriptionBlockClassname}__result-icon`]}
          height="270"
          viewBox="0 0 270 270"
          width="270"
        >
          <use href={`${iconsSvgPath}#advantage-icon-diamond-border`} />
          <use href={`${iconsSvgPath}#advantage-icon-${ProductAdvantageType.arrowCornerwise}`} />
        </svg>
        <div
          className={subscriptionBlockStyles[`${subscriptionBlockClassname}__submit-status_title`]}
          dangerouslySetInnerHTML={{ __html: t('form.status-success-title') }}
        />
        <div
          className={subscriptionBlockStyles[`${subscriptionBlockClassname}__submit-status_subtitle`]}
          dangerouslySetInnerHTML={{ __html: t('form.status-success-subtitle') }}
        />
      </div>
      <Tiles
        animated={areTilesAnimated}
        animationReversed={true}
        className={subscriptionBlockStyles[`${subscriptionBlockClassname}__tiles`]}
        productType={ProductType.default}
        tilingMode={TilingModes.cornersWithBackground}
      />
      <h2
        className={subscriptionBlockStyles[`${subscriptionBlockClassname}__title`]}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p
        className={subscriptionBlockStyles[`${subscriptionBlockClassname}__subtitle`]}
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={subscriptionBlockStyles[`${subscriptionBlockClassname}__form`]}
      >
        <label
          className={cs(subscriptionBlockStyles[`${subscriptionBlockClassname}__label`], {
            [subscriptionBlockStyles[`${subscriptionBlockClassname}_has-value`]]: formValue.email?.length,
            [subscriptionBlockStyles[`${subscriptionBlockClassname}_has-error`]]: errors.email,
          })}
        >
          <span
            className={subscriptionBlockStyles[`${subscriptionBlockClassname}__placeholder`]}
            dangerouslySetInnerHTML={{ __html: t('block-subscription.input_email') }}
          />
          <input {...registerProps} className={subscriptionBlockStyles[`${subscriptionBlockClassname}__input`]} />
          {errors.email && errors.email.message ? (
            <div
              className={subscriptionBlockStyles[`${subscriptionBlockClassname}__error`]}
              dangerouslySetInnerHTML={{ __html: errors.email.message }}
            />
          ) : null}
          <svg
            aria-hidden={true}
            className={subscriptionBlockStyles[`${subscriptionBlockClassname}__icon`]}
            fill="none"
            height="28"
            viewBox="0 0 28 28"
            width="28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 25.9259C20.5865 25.9259 25.9259 20.5865 25.9259 14C25.9259 7.41349 20.5865 2.07407 14 2.07407C7.41349 2.07407 2.07407 7.41349 2.07407 14C2.07407 20.5865 7.41349 25.9259 14 25.9259ZM14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z"
              fill="#FF5858"
            />
            <path
              d="M12.472 16.8339H15.5287L15.7854 5.84388H12.2154L12.472 16.8339ZM11.9354 20.5205C11.9354 21.6639 12.8454 22.5505 14.012 22.5505C15.1554 22.5505 16.042 21.6639 16.042 20.5205C16.042 19.3772 15.1554 18.4905 14.012 18.4905C12.8454 18.4905 11.9354 19.3772 11.9354 20.5205Z"
              fill="#FF5858"
            />
          </svg>
        </label>
        <Button className={subscriptionBlockStyles[`${subscriptionBlockClassname}__button`]}>
          <span dangerouslySetInnerHTML={{ __html: buttonTitle }} />
        </Button>
      </form>
    </div>
  );
};

export { SubscriptionBlock };
