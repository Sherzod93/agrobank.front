import { CallCenterBlockProps } from '../../components/blocks';
import { ProductType } from '../../interfaces';

export const callCenter: CallCenterBlockProps = {
  phone: {
    hint: '+99871 203 88 88',
    phoneNumber: '+998712038888',
  },
  productType: ProductType.loan,
  title: 'Ответим на любые вопросы',
  text: 'Звонок на короткий номер — бесплатно на всей территории Узбекистана',
};
