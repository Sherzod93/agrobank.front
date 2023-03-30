import cs from 'classnames';
import React, { FC, Fragment,  useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Breakpoints, breakpointsToMediaQuery, formatNumber } from '../../../helpers';
import { useMatchMedia } from '../../../hooks';
import { AbstractBlockProps, BlockWithItemsComponentProps, CurrencyRate, extendedListKey } from '../../../interfaces';
import { currencies } from '../../../mocks';
import currencyRatesBlockStyles from './style.module.scss';
import Moment from 'moment';
import { useAppSelector } from '../../../services/store';

const currencyRatesBlockClassname = 'currency-rates-block';

export interface CurrencyRatesBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<CurrencyRate> {}

export interface CurrencyData {
  alpha3: string;
  sign: string;
  title: string;
}

const CurrencyRatesBlock: FC<CurrencyRatesBlockProps> = ({ className, items }) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const [isCompactView, setIsCompactView] = useState(true);

  useMatchMedia({
    callback: setIsCompactView,
    mediaQuery: breakpointsToMediaQuery({ to: Breakpoints.md }),
  });

  const isPageForBusiness  = useAppSelector((state) => state.pageContent.content?.isPageForBusiness);
  const colorText = isPageForBusiness ? 'white' : 'black';

  return (
    <table className={cs(currencyRatesBlockStyles[currencyRatesBlockClassname], className)}>
      <thead className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__header`]}>
        <tr>
          <td
              className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__item`]}
              dangerouslySetInnerHTML={{ __html: t('block-currency-rates.currency') }}
          />
          <td
              className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__item-header`]}
              dangerouslySetInnerHTML={{ __html: t('block-currency-rates.buy') }}
          />
          <td
              className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__item-header`]}
              dangerouslySetInnerHTML={{ __html: t('block-currency-rates.sell') }}
          />
          <td
              className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__item-header`]}
              dangerouslySetInnerHTML={{ __html: t('block-currency-rates.central-bank') }}
          />
        </tr>
      </thead>
      {items.map(({ alpha3, buy, rate, sale }) => (
        <tbody key={alpha3} className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__item-body`]}>
          {isCompactView ? (
            <Fragment>
              <tr className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__values`]}>
                <td
                    className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__title`]}
                    dangerouslySetInnerHTML={{ __html: currencies[extendedListKey].byIds.get(alpha3)?.title ?? alpha3 }}
                />
                <td className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__value-wrapper`]}>
                  <span className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__value`]}>
                    {formatNumber(buy, 2, language)}
                  </span>
                </td>
                <td className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__value-wrapper`]}>
                  <span className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__value`]}>
                    {formatNumber(sale, 2, language)}
                  </span>
                </td>
                <td className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__value-wrapper`]}>
                  <span className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__value`]}>
                    {formatNumber(rate, 2, language)}
                  </span>
                </td>
              </tr>
            </Fragment>
          ) : (
            <tr className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__item`]}>
              <td
                className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__title`]}
                dangerouslySetInnerHTML={{ __html: currencies.byIds.get(alpha3)?.sign ?? alpha3 }}
              />

              <td className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__value-wrapper`]}>
                <span className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__value`]}>
                  {formatNumber(buy, 2, language)}
                </span>
              </td>
              <td className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__value-wrapper`]}>
                <span className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__value`]}>
                  {formatNumber(sale, 2, language)}
                </span>
              </td>
              <td className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__value-wrapper`]}>
                <span className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__value`]}>
                  {formatNumber(rate, 2, language)}
                </span>
              </td>
            </tr>
          )}
        </tbody>
      ))}
      <tbody>
      {Array.isArray(items) && items.length > 0 ?
      <tr>
        <td className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__updated-date_${colorText}`]}>
          <div className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__svg_${colorText}`]}>
            <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill="#454242" d="M5.67326018,0 C6.0598595,0 6.37326018,0.31324366 6.37326018,0.699649298 L6.373,2.009 L13.89,2.009 L13.8901337,0.708141199 C13.8901337,0.321735562 14.2035343,0.00849190182 14.5901337,0.00849190182 C14.976733,0.00849190182 15.2901337,0.321735562 15.2901337,0.708141199 L15.29,2.009 L18,2.00901806 C19.1045695,2.00901806 20,2.90399995 20,4.00801605 L20,18.001002 C20,19.1050181 19.1045695,20 18,20 L2,20 C0.8954305,20 0,19.1050181 0,18.001002 L0,4.00801605 C0,2.90399995 0.8954305,2.00901806 2,2.00901806 L4.973,2.009 L4.97326018,0.699649298 C4.97326018,0.31324366 5.28666085,0 5.67326018,0 Z M1.4,7.742 L1.4,18.001002 C1.4,18.3322068 1.66862915,18.6007014 2,18.6007014 L18,18.6007014 C18.3313708,18.6007014 18.6,18.3322068 18.6,18.001002 L18.6,7.756 L1.4,7.742 Z M6.66666667,14.6186466 L6.66666667,16.284778 L5,16.284778 L5,14.6186466 L6.66666667,14.6186466 Z M10.8333333,14.6186466 L10.8333333,16.284778 L9.16666667,16.284778 L9.16666667,14.6186466 L10.8333333,14.6186466 Z M15,14.6186466 L15,16.284778 L13.3333333,16.284778 L13.3333333,14.6186466 L15,14.6186466 Z M6.66666667,10.6417617 L6.66666667,12.3078931 L5,12.3078931 L5,10.6417617 L6.66666667,10.6417617 Z M10.8333333,10.6417617 L10.8333333,12.3078931 L9.16666667,12.3078931 L9.16666667,10.6417617 L10.8333333,10.6417617 Z M15,10.6417617 L15,12.3078931 L13.3333333,12.3078931 L13.3333333,10.6417617 L15,10.6417617 Z M4.973,3.408 L2,3.40831666 C1.66862915,3.40831666 1.4,3.67681122 1.4,4.00801605 L1.4,6.343 L18.6,6.357 L18.6,4.00801605 C18.6,3.67681122 18.3313708,3.40831666 18,3.40831666 L15.29,3.408 L15.2901337,4.33697436 C15.2901337,4.72338 14.976733,5.03662366 14.5901337,5.03662366 C14.2035343,5.03662366 13.8901337,4.72338 13.8901337,4.33697436 L13.89,3.408 L6.373,3.408 L6.37326018,4.32848246 C6.37326018,4.7148881 6.0598595,5.02813176 5.67326018,5.02813176 C5.28666085,5.02813176 4.97326018,4.7148881 4.97326018,4.32848246 L4.973,3.408 Z" />
            </svg>
          </div>
          <div className={currencyRatesBlockStyles[`${currencyRatesBlockClassname}__date`]}>
            {  Moment(items[0].updated).format('DD.MM.YYYY')}
          </div>
        </td>
      </tr>
          :
          null
      }
      </tbody>
    </table>
  );
};

export { CurrencyRatesBlock };
