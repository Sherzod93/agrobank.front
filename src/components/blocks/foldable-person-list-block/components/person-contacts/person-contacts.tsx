import React, { FC } from 'react';
import { PersonContactType, PersonData, WithClassNameComponentProps } from '../../../../../interfaces';
import { Icon, IconCode } from '../../../../units/icon/icon';
import { StyledLink } from '../../../../units/styled-link/styled-link';
import personContactsStyles from './style.module.scss';

const personContactsClassname = 'person-contacts';

type PersonContactsProps = Required<Pick<PersonData, 'contacts'>>;

const PersonContacts: FC<PersonContactsProps & WithClassNameComponentProps> = ({ contacts }) => (
  <ul className={personContactsStyles[`${personContactsClassname}`]}>
    {contacts.map((item) => {
      const element = (() => {
        if ([PersonContactType.email, PersonContactType.link, PersonContactType.phone].includes(item.type)) {
          let url = '';

          switch (item.type) {
            case PersonContactType.email:
              url = `mailto:${item.value}`;
              break;
            case PersonContactType.link:
              url = item.value;
              break;
            case PersonContactType.phone:
              url = `tel:${item.value}`;
              break;
          }

          return (
            <div className={personContactsStyles[`${personContactsClassname}__value`]}>
              <StyledLink to={url} dangerouslySetInnerHTML={{ __html: item.value }} />
            </div>
          );
        }

        return (
          <div
            className={personContactsStyles[`${personContactsClassname}__value`]}
            dangerouslySetInnerHTML={{ __html: item.value }}
          />
        );
      })();

      return (
        <li key={item.id} className={personContactsStyles[`${personContactsClassname}__item`]}>
          <Icon
            className={personContactsStyles[`${personContactsClassname}__icon`]}
            code={IconCode.paginationIconBorder}
          />
          {element}
          <div
            className={personContactsStyles[`${personContactsClassname}__title`]}
            dangerouslySetInnerHTML={{ __html: item.title }}
          />
        </li>
      );
    })}
  </ul>
);

export { PersonContacts };
