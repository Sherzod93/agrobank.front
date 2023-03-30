import React, { FC } from 'react';
import { PersonData, WithClassNameComponentProps } from '../../../../../interfaces';
import { PersonContacts } from '../person-contacts/person-contacts';
import personInfoStyles from './style.module.scss';

const personInfoClassname = 'person-info';

type PersonContactsProps = Pick<PersonData, 'bio' | 'contacts'>;

const PersonInfo: FC<PersonContactsProps & WithClassNameComponentProps> = ({ bio, contacts }) => (
  <div className={personInfoStyles[personInfoClassname]}>
    {bio ? (
      <div className={personInfoStyles[`${personInfoClassname}__bio`]} dangerouslySetInnerHTML={{ __html: bio }} />
    ) : null}
    {contacts ? (
      <PersonContacts className={personInfoStyles[`${personInfoClassname}__contacts`]} contacts={contacts} />
    ) : null}
  </div>
);

export { PersonInfo };
