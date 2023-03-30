import { BankCellSizeData } from '../../components/blocks/bank-cell-rental-block/interfaces';

export const bankCellRentalSizes: BankCellSizeData[] = [
  {
    id: 1,
    name: 'Маленький',
    parameters: '55x320x490мм',
    rentalPrice: {
      individual: '15 000 сумов / мес.',
      legal: '115 000 сумов / мес.',
    },
    size: 'xs',
    type: 'safeType',
  },
  {
    id: 2,
    name: 'Средний',
    parameters: '88x320x490мм',
    rentalPrice: {
      individual: '25 000 сумов / мес.',
      legal: '125 000 сумов / мес.',
    },
    size: 'sm',
    type: 'safeType',
  },
  {
    id: 3,
    name: 'Большой',
    parameters: '198x320x490мм',
    rentalPrice: {
      individual: '55 000 сумов / мес.',
      legal: '155 000 сумов / мес.',
    },
    size: 'md',
    type: 'safeType',
  },
  {
    id: 4,
    name: 'Самый большой',
    parameters: '308x320x490мм',
    rentalPrice: {
      individual: '85 000 сумов / мес.',
      legal: '185 000 сумов / мес.',
    },
    size: 'lg',
    type: 'safeType',
  },
];
