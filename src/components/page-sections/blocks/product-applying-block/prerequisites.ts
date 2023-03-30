import { FormItems, InputType } from '../../../../interfaces';
import { FormFieldData } from './product-applying-block';

export const fields: FormFieldData[][] = [
  [
    {
      name: 'firstName',
      type: FormItems.input,
    },
    {
      name: 'middleName',
      type: FormItems.input,
    },
    {
      name: 'lastName',
      type: FormItems.input,
    },
    {
      name: 'phone',
      type: FormItems.input,
    },
    {
      name: 'email',
      type: FormItems.input,
    },
  ],
  [
    {
      name: 'delivery',
      options: [
        { id: 0, name: 'block-product-applying.delivery-option-false' },
        // { id: 1, name: 'block-product-applying.delivery-option-true' },
      ],
      type: FormItems.select,
    },
    {
      name: 'homeRegion',
      options: [
        { id: 1, name: 'Бухара' },
        { id: 2, name: 'Республика Каракалпакстан' },
        { id: 3, name: 'Самарканд' },
        { id: 4, name: 'Ташкент' },
      ],
      sectionTitle: 'sectionHomeRegion',
      type: FormItems.select,
    },
    {
      name: 'homeCity',
      type: FormItems.input,
    },
    {
      name: 'homeAddress',
      type: FormItems.input,
    },
    {
      inputType: InputType.number,
      name: 'postcode',
      type: FormItems.input,
    },
    {
      name: 'regionBankBranch',
      options: [
        { id: 1, name: 'Бухара' },
        { id: 2, name: 'Республика Каракалпакстан' },
        { id: 3, name: 'Самарканд' },
        { id: 4, name: 'Ташкент' },
      ],
      sectionTitle: 'sectionRegionBankBranch',
      type: FormItems.select,
    },
    {
      name: 'bankBranch',
      options: [
        { id: 1, name: 'Бухарский филиал' },
        { id: 2, name: 'Филиал Республики Каракалпакстан' },
        { id: 3, name: 'Самаркандский филиал' },
        { id: 4, name: 'Ташкентский филиал' },
      ],
      type: FormItems.select,
    },
  ],
  [
    {
      name: 'passport',
      type: FormItems.input,
    },
    {
      name: 'birthdate',
      type: FormItems.input,
    },
    {
      name: 'inn',
      type: FormItems.input,
    },
    {
      name: 'files',
      type: FormItems.file,
    },
  ],
];
export const titles: string[] = [
  'block-product-applying.title-first-step',
  'block-product-applying.title-second-step',
  'block-product-applying.title-third-step',
];
