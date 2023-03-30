import { FormItems } from '../../../../interfaces';
import { FormFieldData } from './control-applying-block';

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
    {
      name: 'message',
      type: FormItems.input,
    },
  ],
];
export const titles: string[] = [
  'block-product-applying.control-title-first-step',
];
