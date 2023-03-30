import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { BaseBackgroundColorContext } from '../../../contexts';
import { contacts } from '../../../stories-data';
import { ContactsBlock as ContactsBlockComponent } from './contacts-block';

export default {
  title: 'Blocks/Contacts Block',
  component: ContactsBlockComponent,
} as ComponentMeta<typeof ContactsBlockComponent>;

const ContactsBlock: ComponentStory<typeof ContactsBlockComponent> = (
  { email, phone, productType, title },
  { globals: { baseBackgroundColor } },
) => {
  return (
    <BaseBackgroundColorContext.Provider value={baseBackgroundColor}>
      <ContactsBlockComponent email={email} phone={phone} productType={productType} title={title} />
    </BaseBackgroundColorContext.Provider>
  );
};

ContactsBlock.args = contacts;

export { ContactsBlock };
