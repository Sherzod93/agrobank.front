import cs from 'classnames';
import React, { FC } from 'react';
import { AbstractBlockProps, BlockWithItemsComponentProps, PersonData } from '../../../interfaces';
import { Accordion } from '../../units/accordion/accordion';
import { AccordionItem } from '../../units/accordion/accordion-item/accordion-item';
import { PersonInfo } from './components';
import foldablePersonListBlockStyles from './style.module.scss';

const foldablePersonListBlockClassname = 'foldable-person-list-block';

export interface FoldablePersonListBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<PersonData> {}

const FoldablePersonListBlock: FC<FoldablePersonListBlockProps> = ({ className, items }) => (
  <Accordion className={cs(foldablePersonListBlockStyles[foldablePersonListBlockClassname], className)}>
    {items.map(({ bio, contacts, id, name, position, unfolded }) => (
      <AccordionItem key={id} subtitle={position} title={name} unfolded={unfolded}>
        <PersonInfo bio={bio} contacts={contacts} />
      </AccordionItem>
    ))}
  </Accordion>
);

export { FoldablePersonListBlock };
