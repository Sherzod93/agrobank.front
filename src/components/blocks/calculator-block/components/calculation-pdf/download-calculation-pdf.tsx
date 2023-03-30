import React from 'react';
import { CalculationPdfProps } from './calculation-pdf';

export const downloadCalculationPdf = (props: CalculationPdfProps) => {
  return Promise.all([import('@react-pdf/renderer'), import('./calculation-pdf')]).then(
    ([ReactPDF, { CalculationPdf }]) => {
      ReactPDF.pdf(<CalculationPdf {...props} />)
        .toBlob()
        .then((blob) => {
          const url = URL.createObjectURL(blob);

          const aElement = document.createElement('a');

          aElement.href = url;
          aElement.download = props.t(`block-calculator.calculation-filename_${props.product.type}`);
          document.body.appendChild(aElement);
          aElement.click();
          aElement.remove();
        });
    },
  );
};
