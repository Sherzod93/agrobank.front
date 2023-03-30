import { ContactsBlockProps } from '../../components/blocks';
import { ProductType } from '../../interfaces';

export const contacts: ContactsBlockProps = {
  email: {
    address: 'headoffice@agrobank.uz',
    title: 'электронная почта',
  },
  phone: {
    hint: '+99871 203 88 88',
    phoneNumber: '+998712038888',
    title: 'номер телефона',
  },
  productType: ProductType.deposit,
  title: 'Не нашли ответ на свой вопрос?<br/>Мы будем рады с вами пообщаться',
};
