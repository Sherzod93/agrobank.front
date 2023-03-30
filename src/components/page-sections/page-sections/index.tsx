import cs from 'classnames';
import React, { FC } from 'react';
import { PageSection as PageSectionClass, WithClassNameComponentProps } from '../../../interfaces';
import PageSection from '../page-section/page-section';
import pageSectionStyles from './style.module.scss';

interface PageSectionsProps {
  sections: PageSectionClass[];
}

const pageSectionsClassname = 'page-sections';

const PageSections: FC<PageSectionsProps & WithClassNameComponentProps> = ({ className, sections }) => (
  <ul className={cs(pageSectionStyles[pageSectionsClassname], className)}>
    {sections.map((section) => (
      <PageSection
        key={section.id}
        className={pageSectionStyles[`${pageSectionsClassname}__section`]}
        section={section}
      />
    ))}
  </ul>
);

export { PageSections };
