import cs from 'classnames';

import { AbstractBlockProps, ProductType } from '../../../interfaces';
import React, { FC, useMemo, useState, useRef, ChangeEvent, useEffect, useCallback } from 'react';
import { getProductTypeBaseBackgroundColor } from '../../../helpers';
import { BaseBackgroundColorContext } from '../../../contexts';
import receptionFormStyles from './style.module.scss';
import InputMask from 'react-input-mask';
import { Checkbox } from '../../units/controls/checkbox/checkbox';
import { useTranslation } from 'react-i18next';
import {  useAppSelector, useAppDispatch } from '../../../services/store';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
    fetchApplication,
    fetchPlaces,
    fetchRegions,
    PlacesFetchState,
    RegionsFetchState,

} from '../../../services/reducers';
import { useForm, FormProvider } from 'react-hook-form';
import succesImage from './success-image.png';


export interface ReceptionFormBlockProps extends AbstractBlockProps{

}

const receptionFormClassname = 'reception-form-block';
const ReceptionFormBlock: FC<ReceptionFormBlockProps> = ({ className }) => {

    const {
        i18n: { language },
        t,
    } = useTranslation();

    const methods = useForm();

    const dispatch = useAppDispatch();

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

    const [data, setData] = useState<any>( {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        birthday: '',
        gender: {
            male: false,
            female: false,
        },
        userType:{
            individual:false,
            legalEntity:false,
        },
        address: '',
        text: '',
        placesList: [],
        organizationName:'',
        selectedRegion: '',
        selectedPlace: '',
        selectedStatus:'',
        selectedAppeal: '',
        file: File,
        agreeTerms:'',
        agreeDataCorrect:'',
        token:'',
    } );

    const [customError, setCustomError] = useState<any>( {
        firstName: false,
    });
    const [customErrorMessage] = useState<any>( {
        firstName: t('block-product-applying.input-error-text'),
        middleName:t('block-product-applying.input-error-text'),
        lastName:t('block-product-applying.input-error-text'),
        email:t('block-product-applying.input-error-text'),
        phone:t('block-product-applying.input-error-text'),
        birthday:t('block-product-applying.input-error-text'),
        address:t('block-product-applying.input-error-text'),
        organizationName:t('block-product-applying.input-error-text'),
        selectedRegion:t('block-product-applying.select-option-error'),
        selectedPlace:t('block-product-applying.select-option-error'),
        selectedStatus:t('block-product-applying.select-option-error'),
        selectedAppeal:t('block-product-applying.select-option-error'),
        gender:t('block-product-applying.select-option-error'),
        userType:t('block-product-applying.select-option-error'),
        agreeTerms:t('block-product-applying.do-you-agree'),
        agreeDataCorrect:t('block-product-applying.do-you-agree'),
    });

    const Appealoptions = [
        {
            label: t('block-product-applying.appeal-type-statement'),
            value: t('block-product-applying.appeal-type-statement'),
        },
        {
            label: t('block-product-applying.appeal-type-offer'),
            value: t('block-product-applying.appeal-type-offer'),
        },
        {
            label: t('block-product-applying.appeal-type-complaint'),
            value: t('block-product-applying.appeal-type-complaint'),
        },

    ];
    const Statusoptions = [
        {
            label: t('block-product-applying.social-status-busy'),
            value: t('block-product-applying.social-status-busy'),
        },
        {
            label: t('block-product-applying.social-status-unemployed'),
            value: t('block-product-applying.social-status-unemployed'),
        },
        {
            label: t('block-product-applying.social-status-student'),
            value: t('block-product-applying.social-status-student'),
        },
        {
            label: t('block-product-applying.social-status-pensioner'),
            value: t('block-product-applying.social-status-pensioner'),
        },

    ];


    const content = data.userType.legalEntity
            ? <div className={cs(
                receptionFormStyles[`${receptionFormClassname}__margin-bottom-20`],
            )}>
            <input
                required
                type={'text'}
                value={data.organizationName}
                onChange={(e:any) => {
                    setData((prevData:any) => ({ ...prevData, organizationName: e.target.value }));
                    customError.organizationName=false;
                }}
                placeholder= {t('block-product-applying.organization-name')}
            className={receptionFormStyles[`${receptionFormClassname}__input`]} />
            { customError.organizationName ? (<span
                className={receptionFormStyles[`${receptionFormClassname}__error-text`]}
                dangerouslySetInnerHTML={{ __html: customErrorMessage.organizationName }} />) : null }
    </div>: null;

    const baseBackgroundColor = getProductTypeBaseBackgroundColor(ProductType.card);
    const { requestPhase: createApplicationRequestPhase }  = useAppSelector((state) => state.createApplication);
    const baseBackgroundColorContextValue = useMemo(() => {
        return { baseBackgroundColor };
    }, [baseBackgroundColor]);
    useEffect(() => {

    },[createApplicationRequestPhase]);

    const onSubmit = (event:any) => {

        setCustomError({});
        var formError:any = {};
        formError['firstName'] = data.firstName == '' ? true : false;
        formError['middleName'] = data.middleName == '' ? true : false;
        formError['lastName'] = data.middleName == '' ? true : false;
        formError['email'] = data.email == '' ? true : false;
        formError['phone'] = data.phone == '' ? true : false;
        formError['birthday'] = data.birthday == '' ? true : false;
        formError['address'] = data.address == '' ? true : false;
        formError['organizationName'] = data.userType['legalEntity'] && data.organizationName ==''? true : false;
        formError['selectedRegion'] = data.selectedRegion == '' ? true : false;
        formError['selectedPlace'] = data.selectedPlace == '' ? true : false;
        formError['selectedStatus'] = data.selectedStatus == '' ? true : false;
        formError['selectedAppeal'] = data.selectedAppeal == '' ? true : false;
        formError['gender'] = data.gender.male || data.gender.female ? false : true;
        formError['userType'] = data.userType['individual'] || data.userType['legalEntity']? false : true;
        formError['agreeTerms'] = data.agreeTerms == '' ? true : false;
        formError['agreeDataCorrect'] = data.agreeDataCorrect == '' ? true : false;
        const googleToken = document.getElementById('google-token') as HTMLInputElement;

        if(googleToken){
            data.token = googleToken.value;
        }


        const formData: FormData = new FormData();

        formData.append('file',data.file[0]);
        formData.append('data', JSON.stringify(data));
        formData.append('lang', language);
        formData.append('method', 'createReceptionForm');


        if(Object.values(formError).indexOf(true)>=0){
            setCustomError(formError);
        }else{
            dispatch(fetchApplication(formData));
        }


    };

    /*const openInNewTab = (url:any) => {
        // 👇️ setting target to _blank with window.open
        window.open(url, '_blank');
    };*/

    const regionChanged = (e:any) => {

        var currentRegion = e.target.value;
        var currentPlaces:any = [];
        if(currentRegion.length > 0){
            places?.map((item) => {
                if(item.regionId == currentRegion){
                    currentPlaces.push(item);
                }
            });
        }
        setData((prevData:any) => ({ ...prevData, selectedRegion: currentRegion, placesList: currentPlaces, selectedPlace: '' }));
        customError.selectedRegion=false;
    };

        const [file, setFile] = useState<File>();
        const inputRef = useRef<HTMLInputElement | null>(null);

        const handleUploadClick = () => {
            inputRef.current?.click();
        };

        const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) {
                return;
            }
            setFile(e.target.files[0]);
            setData((prevData:any) => ({ ...prevData, file: e.target.files }));
        };
          const SuccessWindow =  <div

              className={cs(
                  receptionFormStyles[`${receptionFormClassname}_base-background-color_darkBlue`],
                  [receptionFormStyles[`${receptionFormClassname}__success-content`]],
              )}
          ><img className={cs(receptionFormStyles[`${receptionFormClassname}__success-image`])}   src={ succesImage } />
            <span className={cs(receptionFormStyles[`${receptionFormClassname}__success-title`])} dangerouslySetInnerHTML={{ __html: t('block-product-applying.sent-success') }} />
            <span className={cs(receptionFormStyles[`${receptionFormClassname}__success-text`])} dangerouslySetInnerHTML={{ __html: t('block-product-applying.sent-success-text') }} />
          </div>;

            const [token, setToken] = useState();
            const onVerify = useCallback((token) => { setToken(token);},[]);
           const siteKey:string = '6LfByHwmAAAAAIuclMAelyjS-cO1D6lCJ7NgoHdR';
           const FormWindow =  <FormProvider {...methods}>
                {/*<form onSubmit={onSubmit}>*/}
               <GoogleReCaptchaProvider reCaptchaKey={siteKey} >
                   <GoogleReCaptcha
                       onVerify={onVerify}
                   />
                   <input name={'token'} id={'google-token'} type="hidden" value={token} />
                <div className={cs(receptionFormStyles[`${receptionFormClassname}__container`],className)}>
                    <div
                        className={cs(
                            receptionFormStyles[`${receptionFormClassname}_base-background-color_darkBlue`],
                        )}
                    >
                        {/*full name*/}
                        <div className={cs(receptionFormStyles[`${receptionFormClassname}__content`])}>
                            <label className={cs(receptionFormStyles[`${receptionFormClassname}__label`],[receptionFormStyles[`${receptionFormClassname}_has-value`]])} >
                                {data.firstName.length > 0 ? (
                                    <span className={cs(receptionFormStyles[`${receptionFormClassname}__placeholder`])} dangerouslySetInnerHTML={{ __html: t('block-product-applying.first-name') }} />

                                ) : null}
                                <input
                                    autoComplete="off"
                                    className={receptionFormStyles[`${receptionFormClassname}__input`]}
                                    maxLength={255}
                                    type={'text'}
                                    placeholder={ t('block-product-applying.first-name') }
                                    value={data.firstName}
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, firstName: e.target.value }));
                                        customError.firstName=false;
                                    }}
                                />
                                { customError.firstName ? (<span className={receptionFormStyles[`${receptionFormClassname}__error-text`]} dangerouslySetInnerHTML={{ __html: customErrorMessage.firstName }} />) : null }
                            </label>
                            <label className={cs(
                                receptionFormStyles[`${receptionFormClassname}__label`],
                                [receptionFormStyles[`${receptionFormClassname}_has-value`]],
                            )} >
                                {data.middleName.length > 0 ? (
                                    <span className={cs(receptionFormStyles[`${receptionFormClassname}__placeholder`])} dangerouslySetInnerHTML={{ __html: t('block-product-applying.middle-name') }} />
                                ) : null}

                                <input
                                    autoComplete="off"
                                    className={receptionFormStyles[`${receptionFormClassname}__input`]}
                                    maxLength={255}
                                    placeholder={ t('block-product-applying.middle-name') }
                                    value={data.middleName}
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, middleName: e.target.value }));
                                        customError.middleName=false;
                                    }}
                                />
                                { customError.middleName ? (<span className={receptionFormStyles[`${receptionFormClassname}__error-text`]} dangerouslySetInnerHTML={{ __html: customErrorMessage.middleName }} />) : null }
                            </label>
                            <label className={cs(
                                receptionFormStyles[`${receptionFormClassname}__label`],
                                [receptionFormStyles[`${receptionFormClassname}_has-value`]],
                            )} >
                                {data.lastName.length > 0 ? (<span className={cs(receptionFormStyles[`${receptionFormClassname}__placeholder`])} dangerouslySetInnerHTML={{ __html: t('block-product-applying.last-name') }}  />) : null}
                                <input
                                    autoComplete="off"
                                    className={receptionFormStyles[`${receptionFormClassname}__input`]}
                                    maxLength={255}

                                    placeholder={ t('block-product-applying.last-name') }
                                    value={ data.lastName }
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, lastName: e.target.value }));
                                        customError.lastName=false;
                                    }}
                                />
                                { customError.lastName ? (<span className={ receptionFormStyles[`${receptionFormClassname}__error-text`] } dangerouslySetInnerHTML={{ __html: customErrorMessage.lastName }} />) : null }
                            </label>
                        </div>

                        {/*telefon - email - date*/}
                        <div className={cs(receptionFormStyles[`${receptionFormClassname}__content`])}>
                            <label className={cs(
                                receptionFormStyles[`${receptionFormClassname}__label`],
                                [receptionFormStyles[`${receptionFormClassname}_has-value`]],
                            )} >
                                {data.phone.length > 0 ? (<span className={cs(receptionFormStyles[`${receptionFormClassname}__placeholder`])} dangerouslySetInnerHTML={{ __html: t('block-product-applying.phone') }} />) : null}

                                <InputMask
                                    autoComplete="off"
                                    className={receptionFormStyles[`${receptionFormClassname}__input`]}
                                    mask="+\9\98 99 999 99 99"

                                    placeholder={ t('block-product-applying.phone') }
                                    value={data.phone}
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, phone: e.target.value }));
                                        customError.phone=false;
                                    }}
                                />
                                { customError.phone ? (<span className={receptionFormStyles[`${receptionFormClassname}__error-text`]} dangerouslySetInnerHTML={{ __html: customErrorMessage.phone }} />) : null }
                            </label>
                            <label className={cs(
                                receptionFormStyles[`${receptionFormClassname}__label`],
                                [receptionFormStyles[`${receptionFormClassname}_has-value`]],
                            )} >
                                {data.email.length > 0 ? (<span className={cs(receptionFormStyles[`${receptionFormClassname}__placeholder`])} dangerouslySetInnerHTML={{ __html: t('block-product-applying.email') }} />) : null}

                                <input
                                    autoComplete="off"
                                    className={receptionFormStyles[`${receptionFormClassname}__input`]}
                                    maxLength={255}

                                    placeholder={ t('block-product-applying.email') }
                                    value={data.email}
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, email: e.target.value }));
                                        customError.email=false;
                                    }}
                                />
                                { customError.email ? (<span className={receptionFormStyles[`${receptionFormClassname}__error-text`]}>
                                    { customErrorMessage.email }</span>) : null }
                            </label>
                            <label className={cs(
                                receptionFormStyles[`${receptionFormClassname}__label`],
                                receptionFormStyles[`${receptionFormClassname}__label-date`],
                                [receptionFormStyles[`${receptionFormClassname}_has-value`]],
                            )} >
                                    <span className={cs(receptionFormStyles[`${receptionFormClassname}__placeholder`])}>
                                    { t('block-product-applying.birthdate') }
                                </span>

                                <input
                                    autoComplete="off"
                                    className={receptionFormStyles[`${receptionFormClassname}__input`]}
                                    maxLength={255}
                                    type={'date'}
                                    placeholder={ t('block-product-applying.birthdate') }
                                    value={data.birthday}
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, birthday: e.target.value }));
                                        customError.birthday=false;
                                    }}
                                />
                                { customError.birthday ? (<span className={receptionFormStyles[`${receptionFormClassname}__error-text`]}>
                                    { customErrorMessage.birthday }</span>) : null }
                            </label>
                        </div>

                        {/*gender*/}
                        <div className={cs(receptionFormStyles[`${receptionFormClassname}__content`])}>
                            <label className={cs(
                                receptionFormStyles[`${receptionFormClassname}__label`],
                                [receptionFormStyles[`${receptionFormClassname}_has-value`]],
                            )} >
                                <Checkbox
                                    checked = { data.gender.male }
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, gender: { male: true, female: false } }));
                                        customError.gender=false;
                                    }}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: t('block-product-applying.male') }} />
                                </Checkbox>
                            </label>
                            <label className={cs(
                                receptionFormStyles[`${receptionFormClassname}__label`],
                                [receptionFormStyles[`${receptionFormClassname}_has-value`]],
                            )} >
                                <Checkbox
                                    checked = { data.gender.female }
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, gender: { female: true, male: false } }));
                                        customError.gender=false;
                                    }}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: t('block-product-applying.female') }} />
                                </Checkbox>
                            </label>
                        </div>


                        <div className={cs(receptionFormStyles[`${receptionFormClassname}__content`])}>
                        { customError.gender  ? (<span className={receptionFormStyles[`${receptionFormClassname}__error-text`]}>
                                    { customErrorMessage.gender }</span>) : null }
                        </div>

                        {/*region - branch*/}
                        <div className={cs(receptionFormStyles[`${receptionFormClassname}__content`])}>
                            <label className={cs(receptionFormStyles[`${receptionFormClassname}__label`])} >
                                <span className={cs(receptionFormStyles[`${ receptionFormClassname }__span-title`])}>{ t('block-product-applying.region') }</span>
                                <select
                                    defaultValue={  data.selectedRegion }
                                    onChange={ regionChanged }
                                    value={ data.selectedRegion }
                                    className={receptionFormStyles[`${receptionFormClassname}__select`]}
                                >
                                    <option dangerouslySetInnerHTML={{ __html: t('block-product-applying.not-selected') }} />
                                    { regions?.map((item,index) => {
                                        return (
                                            <option key={ index } value={ item.id }>{ item.name }</option>
                                        );
                                    }) }
                                </select>
                                { customError.selectedRegion ? (<span className={receptionFormStyles[`${receptionFormClassname}__error-text`]}>
                                    { customErrorMessage.selectedRegion }</span>) : null }
                            </label>
                            <label className={cs(receptionFormStyles[`${receptionFormClassname}__label`])} >
                                <span className={cs(receptionFormStyles[`${ receptionFormClassname }__span-title`])}>
                                    <span dangerouslySetInnerHTML={{ __html: t('block-product-applying.district') }} />
                                </span>
                                <select
                                    defaultValue={ data.selectedPlace }
                                    value={ data.selectedPlace }
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, selectedPlace: e.target.value }));
                                        customError.selectedPlace=false;
                                    }}
                                    className={receptionFormStyles[`${receptionFormClassname}__select`]}
                                >
                                    <option dangerouslySetInnerHTML={{ __html: t('block-product-applying.not-selected') }} />
                                    { data.placesList?.map((item:any, index:any ) => {
                                        return (
                                            <option value={ index }>{ item.name }</option>
                                        );
                                    }) }
                                </select>
                                { customError.selectedPlace ? (<span className={receptionFormStyles[`${receptionFormClassname}__error-text`]}>
                                    { customErrorMessage.selectedPlace }</span>) : null }
                            </label>
                        </div>

                        {/*address*/}
                        <div className={cs(receptionFormStyles[`${ receptionFormClassname }__content`])}>
                            <label className={cs(receptionFormStyles[`${receptionFormClassname}__label`])}>

                                <input
                                    placeholder={ t('block-product-applying.address') }
                                    autoComplete="off"
                                    className={receptionFormStyles[`${receptionFormClassname}__input`]}
                                    maxLength={255}
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, address: e.target.value }));
                                        customError.address=false;
                                    }}

                                />
                                { data.address.length < 0 ? (
                                    <span className={cs(receptionFormStyles[`${receptionFormClassname}__placeholder_textarea`])}>{  t('block-product-applying.characters-must-be') }</span>
                                ) : null }
                                { customError.address ? (<span className={receptionFormStyles[`${receptionFormClassname}__error-text`]}>
                                    { customErrorMessage.address }</span>) : null }
                            </label>

                        </div>

                        {/*tip obrasheniya - sotsialniy status*/}
                        <div className={cs(receptionFormStyles[`${receptionFormClassname}__content`])}>
                            <label className={cs(receptionFormStyles[`${ receptionFormClassname }__label`])} >
                                    <span className={cs(receptionFormStyles[`${ receptionFormClassname }__span-title`])}>
                                        {t('block-product-applying.appeal-type')}</span>
                                <select
                                    defaultValue={ data.selectedAppeal }
                                    value={data.selectedAppeal}
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, selectedAppeal: e.target.value }));
                                        customError.selectedAppeal=false;
                                    }}
                                    className={ receptionFormStyles[`${ receptionFormClassname }__select`]}>
                                    <option value="" selected disabled>{ t('block-product-applying.select-type') }</option>
                                    {Appealoptions.map((option,index) => (
                                        <option key={index} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                { customError.selectedAppeal ? (<span className={receptionFormStyles[`${receptionFormClassname}__error-text`]}>
                                    { customErrorMessage.selectedAppeal }</span>) : null }
                            </label>

                            <label className={cs(receptionFormStyles[`${ receptionFormClassname }__label`])} >
                                <span className={cs(receptionFormStyles[`${ receptionFormClassname }__span-title`])}>{t('block-product-applying.social-status')}</span>
                                <select
                                    defaultValue={ data.selectedStatus }
                                    value={ data.selectedStatus }
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, selectedStatus: e.target.value }));
                                        customError.selectedStatus=false;
                                    }}
                                    className={receptionFormStyles[`${ receptionFormClassname }__select`]} >
                                    <option value="" selected disabled>{ t('block-product-applying.select-status') }</option>
                                    {Statusoptions.map((option,index) => (
                                        <option key={index} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                { customError.selectedStatus ? (<span className={receptionFormStyles[`${receptionFormClassname}__error-text`]}>
                                    { customErrorMessage.selectedStatus }</span>) : null }
                            </label>
                        </div>

                        {/*text obrasheniya*/}
                        <div className={cs(receptionFormStyles[`${ receptionFormClassname }__content`])}>
                            <label className={cs(receptionFormStyles[`${ receptionFormClassname }__label`])}>
                                { data.text.length < 0 ? (
                                    <span className={cs(receptionFormStyles[`${ receptionFormClassname }__placeholder_textarea`])}>{ t('block-product-applying.text-appeal') }</span>
                                ) : null }
                                <textarea
                                    placeholder={ t('block-product-applying.text-appeal') }
                                    autoComplete="off"
                                    className={ receptionFormStyles[`${ receptionFormClassname }__input`]}
                                    maxLength={255}
                                    rows={1}
                                    onChange={(e:any) => {
                                        setData((prevData:any) => ({ ...prevData, text: e.target.value }));
                                    }}
                                ></textarea>
                            </label>
                        </div>

                        {/*user type*/}
                        <div className={cs(receptionFormStyles[`${receptionFormClassname}__content`])}>
                            <label className={cs(
                                receptionFormStyles[`${receptionFormClassname}__label`],
                            )} >
                                <Checkbox
                                    checked = { data.userType.individual }
                                    onChange={(e:any) => {
                                        setData((previousData:any) => ({ ...previousData, userType: { individual: true, legalEntity: false } }));
                                        customError.userType=false;
                                    }}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: t('block-product-applying.individual-entity') }} />
                                </Checkbox>
                            </label>

                            <label className={cs(
                                receptionFormStyles[`${receptionFormClassname}__label`],
                                [receptionFormStyles[`${receptionFormClassname}_has-value`]],

                            )} >
                                <Checkbox
                                    checked = { data.userType.legalEntity }
                                    onChange={(e:any) => {
                                        setData((previousData:any) => ({ ...previousData, userType: { legalEntity: true, individual: false } }));
                                        customError.userType=false;
                                    }}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: t('block-product-applying.legal-entity') }} />
                                </Checkbox>
                            </label>
                        </div>
                        { customError.userType ? (<div className={cs(receptionFormStyles[`${receptionFormClassname}__content`],
                            [receptionFormStyles[`${receptionFormClassname}__error-text`]])}>
                            { customErrorMessage.userType }</div>) : null }
                        <div className={cs(
                            receptionFormStyles[`${receptionFormClassname}__content`],
                        )} >
                            { content }
                        </div>

                        {/*file*/}
                        <div className={cs(receptionFormStyles[`${receptionFormClassname}__content`])}>
                            <div className={cs(receptionFormStyles[`${receptionFormClassname}__fileUploaderDiv`])}>
                                <button type={'button'} onClick={handleUploadClick} className={cs(receptionFormStyles[`${receptionFormClassname}__UploadButton`])}>
                                    {<svg className="style_product-applying-block__upload-icon__2Hmy2" fill="none"
                                          height="97" viewBox="0 0 100 97" width="100"
                                          xmlns="http://www.w3.org/2000/svg">
                                        <path clip-rule="evenodd"
                                              d="M52.8038 4.09457L48.9367 0L45.0696 4.09457L26.9845 23.2435L34.7187 30.548L43.6175 21.1257V74.7681H54.2558V21.1257L63.1547 30.548L70.8889 23.2435L52.8038 4.09457ZM0 44.7902V91.5987V96.9178H5.31915H94.6808H100V91.5987V44.7902H89.3617V86.2795H10.6383V44.7902H0Z"
                                              fill="white" fill-rule="evenodd"></path>
                                    </svg> }
                                    {file ? `${file.name}` : t('block-product-applying.upload-file') }
                                </button>

                                <input

                                    type={ 'file' }
                                    ref={inputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>

                        {/*agreement*/}
                        <div className={cs(receptionFormStyles[`${receptionFormClassname}__content`])}>
                            <label className={cs(receptionFormStyles[`${ receptionFormClassname }__label`])}>
                                    <Checkbox
                                        checked = { data.agreeDataCorrect}
                                        onChange={(e:any) => {
                                            setData((previousData:any) => ({ ...previousData, agreeDataCorrect: true }));
                                            customError.agreeDataCorrect=false;
                                        }}
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: t('block-product-applying.agree-data-correct') }} />
                                    </Checkbox>
                                { customError.agreeDataCorrect ? (
                                    <span className={receptionFormStyles[`${receptionFormClassname}__error-text`]}>
                                        <span dangerouslySetInnerHTML={{ __html: customErrorMessage.agreeDataCorrect }} />
                                    </span>
                                ) : null }
                            </label>
                        </div>
                        <div className={cs(receptionFormStyles[`${receptionFormClassname}__content`])}>
                            <label className={cs(receptionFormStyles[`${ receptionFormClassname }__label`])}>
                                <div className={cs(receptionFormStyles[`${ receptionFormClassname }__agreeDataCorrect`])}>
                                    <Checkbox
                                        checked = { data.agreeTerms}
                                        onChange={(e:any) => {
                                            setData((previousData:any) => ({ ...previousData, agreeTerms: true }));
                                            customError.agreeTerms=false;
                                        }}
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: t('block-product-applying.agree-by-contract') }} />

                                        <a onClick={() => window.open(t('block-product-applying.public-offers-url') , '_blank') } dangerouslySetInnerHTML={{ __html: t('block-product-applying.public-offers') }} />
                                    </Checkbox>

                                </div>
                                { customError.agreeTerms ? (<span className={receptionFormStyles[`${receptionFormClassname}__error-text`]} dangerouslySetInnerHTML={{ __html: customErrorMessage.agreeTerms }} /> ) : null }
                            </label>
                        </div>
                        <div className={cs(receptionFormStyles[`${ receptionFormClassname }__content-3`])}>
                            <div>
                                <button
                                    className={cs(receptionFormStyles[`${ receptionFormClassname }__button-send`])}
                                    type = { 'submit' }
                                    onClick={onSubmit}
                                >{ t('block-product-applying.send-button') }</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*</form>*/}
               </GoogleReCaptchaProvider>
            </FormProvider>;

    return (

        <BaseBackgroundColorContext.Provider value={baseBackgroundColorContextValue}>

            { (createApplicationRequestPhase === 2)?SuccessWindow:FormWindow }

        </BaseBackgroundColorContext.Provider>
    );
};

export { ReceptionFormBlock };