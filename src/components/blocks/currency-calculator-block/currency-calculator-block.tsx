
import cs from 'classnames';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
    AbstractBlockProps,
    BlockWithItemsComponentProps,
    CurrencyRate,
    ProductType,
} from '../../../interfaces';
import { formatNumber, getProductTypeBaseBackgroundColor } from '../../../helpers';
import { BaseBackgroundColorContext } from '../../../contexts';
import currencyCalculatorBlockStyles from './style.module.scss';
import { TilePatternSize, Tiles, TilingModes } from '../../units/tiles/tiles';
import { Radio } from '../../units/controls/radio/radio';
import { useTranslation } from 'react-i18next';


const currencyCalculatorClassname = 'currency-calculator-block';

export interface CurrencyCalculatorBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<CurrencyRate> {}

const CurrencyCalculatorBlock: FC<CurrencyCalculatorBlockProps> = ({ className,items }) => {
    const {
        i18n: { language },
        t,
    } = useTranslation();
    const baseBackgroundColor = getProductTypeBaseBackgroundColor(ProductType.card);
    const [areTilesAnimated, setAreTilesAnimated] = useState(false);
    const baseBackgroundColorContextValue = useMemo(() => {
        return { baseBackgroundColor };
    }, [baseBackgroundColor]);

    const [isSale,setIsSale] = useState(true);
    const [selectedCurrency,setSelectedCurrency] = useState(JSON.stringify(items[0]));
    const [uzCurrencyState,setUzCurrencyState] = useState<any>(items[0].sale);
    const [currencyState, setCurrencyState] = useState<any>('1');
    const [changedInputType, setChangedInputType] = useState('');

    useEffect(() => {
        if(changedInputType === 'uz'){
            calculateUzCurrency();
        }else{

            calculateCurrency();
        }

    },[currencyState,selectedCurrency,isSale,uzCurrencyState]);

    const calculateCurrency = () => {
        const currentCurrency = JSON.parse(selectedCurrency);
        const buy = currentCurrency.buy;
        const sale = currentCurrency.sale;
        const sum = currencyState.replaceAll(/[\s|.|_|-|,]/g,'');

        if(isSale){
            setUzCurrencyState((sum * sale));
        }else{
            setUzCurrencyState((sum * buy));
        }
    };

    const calculateUzCurrency = () => {
        const currentCurrency = JSON.parse(selectedCurrency);
        const buy = currentCurrency.buy;
        const sale = currentCurrency.sale;
        const sum = uzCurrencyState.replaceAll(/[\s|.|_|-|,]/g,'');

        if(isSale){
            setCurrencyState((sum / sale).toFixed(2));
        }else{
            setCurrencyState((sum / buy).toFixed(2));
        }
    };



    return (
        <>
        <BaseBackgroundColorContext.Provider value={baseBackgroundColorContextValue}>
            <div className={cs(currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__container`],className)}
                 onMouseEnter={() => setAreTilesAnimated(true)}
                 onMouseLeave={() => setAreTilesAnimated(false)}
            >
                <div
                    className={cs(
                        currencyCalculatorBlockStyles[`${currencyCalculatorClassname}_base-background-color_darkBlue`],
                    )}
                >
                    <div className={cs(currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__title`])} >{t('block-currency-rates.bank-currency-converter')}</div>

                    <div className={cs(currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__content`])}>

                        <div className={cs(currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__content_radio`])}>
                            <Radio
                                checked={isSale}
                                className={currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__checkbox`]}
                                onChange={() => setIsSale(true)}
                            >
                                <span dangerouslySetInnerHTML={{ __html: t('block-currency-rates.sell') }} />
                            </Radio>
                            <Radio
                                checked={!isSale}
                                className={currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__checkbox`]}
                                onChange={() => setIsSale(false)}
                            >
                                <span dangerouslySetInnerHTML={{ __html: t('block-currency-rates.buy') }} />
                            </Radio>
                        </div>
                        <div></div>
                    </div>
                    <div className={cs(currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__content`])}>
                        <label className={cs(
                            currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__label`],
                            [currencyCalculatorBlockStyles[`${currencyCalculatorClassname}_has-value`]],
                        )} >
                            <input
                                id={'currencyInput'}
                                autoComplete="off"
                                className={currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__input`]}
                                maxLength={255}
                                type={'text'}
                                placeholder={'0'}
                                value={currencyState}
                                onChange={(e:any) => {
                                    setChangedInputType('other');
                                    setCurrencyState(e.target.value);
                                }}
                            />
                        </label>
                        <div></div>
                        <label
                            className={cs(
                                currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__label`],
                                currencyCalculatorBlockStyles[`${currencyCalculatorClassname}_has-value`],
                            )}
                        >
                            <select
                                id={'currency'}
                                value={selectedCurrency}
                                className={currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__select`]}
                                onChange={(e) => setSelectedCurrency(e.target.value)}
                                defaultValue=''
                            >
                                {items.map((item) => {
                                    return (
                                        <option
                                            dangerouslySetInnerHTML={{ __html: item.alpha3 }}
                                            value={JSON.stringify(item)}
                                            data-sale={item.sale}
                                            data-buy={item.buy}
                                        />
                                    );
                                })}
                            </select>
                        </label>
                    </div>
                    <div className={cs(currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__content`])}>
                        <label className={cs(
                            currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__label`],
                            [currencyCalculatorBlockStyles[`${currencyCalculatorClassname}_has-value`]],
                        )} >
                            <input
                                autoComplete="off"
                                className={currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__input`]}
                                maxLength={255}
                                type={'text'}
                                placeholder={'0'}
                                value={changedInputType === 'uz' ? uzCurrencyState : formatNumber(uzCurrencyState,2,language)}
                                onChange={(e:any) => {
                                    setUzCurrencyState(e.target.value);
                                    setChangedInputType('uz');
                                }}
                            />
                        </label>
                        <div></div>
                        <label
                            className={cs(
                                currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__label`],
                                currencyCalculatorBlockStyles[`${currencyCalculatorClassname}_has-value`],
                            )}
                        >
                            <input
                                disabled={true}
                                className={currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__input`]}
                                maxLength={255}
                                type={'text'}
                                placeholder={'UZS'}
                            />
                        </label>
                    </div>
                </div>
                <Tiles
                    animated={areTilesAnimated}
                    className={cs(currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__tiles`], {
                        [currencyCalculatorBlockStyles[`${currencyCalculatorClassname}__tiles_hover`]]: areTilesAnimated,
                    })}
                    hovered={areTilesAnimated}
                    tilePatternSize={TilePatternSize.small}
                    tilingMode={TilingModes.rightBottomCorner}
                />
            </div>

        </BaseBackgroundColorContext.Provider>
        </>
    );
};

export { CurrencyCalculatorBlock };