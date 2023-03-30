import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React, { FC, useMemo } from 'react';
import { TFunction } from 'react-i18next';
import { resolveHtmlEntities } from '../../../../../helpers';
import { CurrencyRecord, DepositProductData, LoanProductData, ProductType } from '../../../../../interfaces';
import { formatCalculatorValue } from '../../helpers';
import { CalculationData, CustomResultValue } from '../../interface';
import logo from './logo.png';

Font.register({
  family: 'ALS-Agrobank',
  fontWeight: 400,
  src: `${process.env.PUBLIC_URL}/calculator-pdf-fonts/ALSAgrofont-Regular.woff`,
});

Font.register({
  family: 'ALS-Agrobank',
  fontWeight: 'bold',
  src: `${process.env.PUBLIC_URL}/calculator-pdf-fonts/ALSAgrofont-Bold.woff`,
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'ALS-Agrobank',
    fontSize: 14,
    padding: '1cm',
  },
  logo: {
    height: 'auto',
    width: '4cm',
  },
  description: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 24,
  },
  param: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 16,
    marginTop: 10,
  },
  paramTitle: {
    flexShrink: 0,
    fontWeight: 'bold',
    width: '7cm',
  },
  paramValue: {
    flexGrow: 1,
    paddingLeft: 10,
  },
  tableHeader: {
    alignItems: 'center',
    backgroundColor: '#b2ebc4',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    marginTop: 24,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableRowOdd: {
    backgroundColor: '#ecfaf0',
  },
  tableCell: {
    padding: '0.2cm',
    width: '25%',
  },
  tableCellAlignCenter: {
    textAlign: 'center',
  },
  tableCellAlignRight: {
    textAlign: 'right',
  },
  tableCellPosition: {
    width: '2cm',
  },
  disclaimer: {
    fontSize: 10,
    marginTop: 24,
  },
});

export interface CalculationPdfProps {
  calculationData: CalculationData;
  currencyCodeToCurrencyRecordMap: Record<string, CurrencyRecord>;
  filename?: string;
  language: string;
  product: DepositProductData | LoanProductData;
  t: TFunction<'translation'>;
}

const CalculationPdf: FC<CalculationPdfProps> = ({
  calculationData,
  currencyCodeToCurrencyRecordMap,
  language,
  product,
  t,
}) => {
  const description = t(`block-calculator.calculation-description_${product.type}`, { title: product.title });
  const disclaimer = t(`block-calculator.calculation-disclaimer_${product.type}`, { title: product.title });
  const calculationValues: CustomResultValue[] = useMemo(() => {
    const params: CustomResultValue[] = [];

    if (calculationData.type === ProductType.deposit) {
      params.push(
        {
          title: t('block-calculator.amount'),
          type: 'amount',
          value: calculationData.amount,
        },
        {
          title: t('block-calculator.monthCount'),
          type: 'term',
          value: calculationData.monthCount,
        },
        {
          title: t('block-calculator.interestRate'),
          type: 'interestRate',
          value: calculationData.interestRate,
        },
        {
          title: t('block-calculator.totalIncome'),
          type: 'amount',
          value: calculationData.totalIncome!,
        },
      );
    }

    if (calculationData.type === ProductType.loan) {
      params.push(
        {
          title: t('block-calculator.amount'),
          type: 'amount',
          value: calculationData.amount,
        },
        {
          title: t('block-calculator.monthCount'),
          type: 'term',
          value: calculationData.monthCount,
        },
        {
          title: t('block-calculator.interestRate'),
          type: 'interestRate',
          value: calculationData.interestRate,
        },
      );
    }

    params.push(...Object.values(calculationData.customResultValues));

    return params;
  }, [calculationData, t]);
  const records: JSX.Element | null = useMemo(() => {
    if (calculationData.records?.length) {
      if (calculationData.type === ProductType.deposit) {
        return (
          <>
            <View style={Object.assign({}, styles.tableHeader, styles.tableRow)}>
              <Text style={Object.assign({}, styles.tableCell, styles.tableCellPosition, styles.tableCellAlignCenter)}>
                {resolveHtmlEntities(t('block-calculator.number-sign'))}
              </Text>
              <Text style={Object.assign({}, styles.tableCell, styles.tableCellAlignRight)}>
                {resolveHtmlEntities(t('block-calculator.monthlyIncome'))}
              </Text>
            </View>
            {calculationData.records.slice(1).map(({ income }, index) => (
              <View key={index} style={Object.assign({}, styles.tableRow, index % 2 === 1 ? styles.tableRowOdd : null)}>
                <Text
                  style={Object.assign({}, styles.tableCell, styles.tableCellPosition, styles.tableCellAlignCenter)}
                >
                  {resolveHtmlEntities(String(index + 1))}
                </Text>
                <Text style={Object.assign({}, styles.tableCell, styles.tableCellAlignRight)}>
                  {resolveHtmlEntities(
                    formatCalculatorValue(
                      { type: 'amount', value: income },
                      t,
                      language,
                      undefined,
                      currencyCodeToCurrencyRecordMap,
                    ),
                  )}
                </Text>
              </View>
            ))}
          </>
        );
      }

      if (calculationData.type === ProductType.loan) {
        return (
          <>
            <View style={Object.assign({}, styles.tableHeader, styles.tableRow)}>
              <Text style={Object.assign({}, styles.tableCell, styles.tableCellPosition, styles.tableCellAlignCenter)}>
                {resolveHtmlEntities(t('block-calculator.number-sign'))}
              </Text>
              <Text style={Object.assign({}, styles.tableCell, styles.tableCellAlignRight)}>
                {resolveHtmlEntities(t('block-calculator.monthlyPayment'))}
              </Text>
              <Text style={Object.assign({}, styles.tableCell, styles.tableCellAlignRight)}>
                {resolveHtmlEntities(t('block-calculator.monthlyBody'))}
              </Text>
              <Text style={Object.assign({}, styles.tableCell, styles.tableCellAlignRight)}>
                {resolveHtmlEntities(t('block-calculator.monthlyInterest'))}
              </Text>
              <Text style={Object.assign({}, styles.tableCell, styles.tableCellAlignRight)}>
                {resolveHtmlEntities(t('block-calculator.monthlyAmount'))}
              </Text>
            </View>
            {calculationData.records.slice(1).map(({ amount, body, interest, payment }, index) => (
              <View key={index} style={Object.assign({}, styles.tableRow, index % 2 === 1 ? styles.tableRowOdd : null)}>
                <Text
                  style={Object.assign({}, styles.tableCell, styles.tableCellPosition, styles.tableCellAlignCenter)}
                >
                  {resolveHtmlEntities(String(index + 1))}
                </Text>
                {[payment, body, interest, -amount].map((value, index) => (
                  <Text key={index} style={Object.assign(styles.tableCell, styles.tableCellAlignRight)}>
                    {resolveHtmlEntities(
                      formatCalculatorValue(
                        { type: 'amount', value },
                        t,
                        language,
                        undefined,
                        currencyCodeToCurrencyRecordMap,
                      ),
                    )}
                  </Text>
                ))}
              </View>
            ))}
          </>
        );
      }
    }

    return null;
  }, [calculationData, currencyCodeToCurrencyRecordMap, language, t]);

  const rates = product.calculationParams.monthCount.rates;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Image style={styles.logo} src={logo} />
        </View>
        {description ? (
          <View style={styles.description}>
            <Text>{resolveHtmlEntities(description)}</Text>
          </View>
        ) : null}
        {calculationValues.map((calculationValue, index) => (
          <View key={index} style={styles.param}>
            <Text style={styles.paramTitle}>{resolveHtmlEntities(calculationValue.title)}</Text>
            <Text style={styles.paramValue}>
              {resolveHtmlEntities(
                formatCalculatorValue(
                  calculationValue as any,
                  t,
                  language,
                  product.currency,
                  currencyCodeToCurrencyRecordMap,
                  rates,
                ),
              )}
            </Text>
          </View>
        ))}
        {records}
        {disclaimer ? (
          <View style={styles.disclaimer}>
            <Text>{resolveHtmlEntities(disclaimer)}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
};

export { CalculationPdf };
