import cs from 'classnames';
import React, { FC } from 'react';
import { AbstractBlockProps, BlockWithItemsComponentProps, PersonData } from '../../../interfaces';
import personListBlockStyles from './style.module.scss';

const personListBlockClassname = 'person-list';

export interface PersonListBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<PersonData> {}

const PersonListBlock: FC<PersonListBlockProps> = ({ className, items }) => (
  <ul className={cs(personListBlockStyles[personListBlockClassname], className)}>
    {items.map(({ id, name, position }) => (
      <li key={id} className={personListBlockStyles[`${personListBlockClassname}__person`]}>
        <div
          className={personListBlockStyles[`${personListBlockClassname}__name`]}
          dangerouslySetInnerHTML={{ __html: name }}
        />
        <div
          className={personListBlockStyles[`${personListBlockClassname}__position`]}
          dangerouslySetInnerHTML={{ __html: position }}
        />
      </li>
    ))}
  </ul>
);

export { PersonListBlock };
