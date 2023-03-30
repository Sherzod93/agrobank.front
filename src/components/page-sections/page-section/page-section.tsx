import cs from 'classnames';
import React, { FC } from 'react';
import {
  BlockType,
  ComponentRenderType,
  PageSection as PageSectionClass,
  WithClassNameComponentProps,
} from '../../../interfaces';
import { HeaderBlock } from '../../blocks';
import { pageSectionBlockTypeToComponentMap } from './block-type-to-component-map';
import pageSectionStyles from './style.module.scss';

const pageSectionClassname = 'page-section';

interface PageSectionProps {
  blockRenderType?: ComponentRenderType;
  hiddenTabClassname?: string;
  onlyBlocks?: boolean;
  section: PageSectionClass;
}

const PageSection: FC<PageSectionProps & WithClassNameComponentProps> = ({
  blockRenderType = ComponentRenderType.default,
  className,
  hiddenTabClassname,
  onlyBlocks = false,
  section,
}) => {
  const {
    blocks: blockDataList,
    title: sectionTitle,
    titleAlignment: sectionTitleAlignment,
    titleSize: sectionTitleSize,
  } = section;

  const blocks = blockDataList.map((blockData) => {
    const PageSectionBlock = pageSectionBlockTypeToComponentMap[blockData.type as BlockType];
    if (!PageSectionBlock) {
      return null;
    }

    return (
      <PageSectionBlock
        key={blockData.id}
        className={cs(
          pageSectionStyles[`${pageSectionClassname}__block`],
          pageSectionStyles[`${pageSectionClassname}__block_type_${blockData.type}`],
          pageSectionStyles[`${pageSectionClassname}_only-blocks-mode`],
          {
            [className!]: className && onlyBlocks === true,
          },
          hiddenTabClassname,
        )}
        {...(blockData as any)}
        blockRenderType={blockRenderType}
        hiddenTabClassname={hiddenTabClassname}
        mapClassname={pageSectionStyles[`${pageSectionClassname}__map`]}
        tabsClassname={pageSectionStyles[`${pageSectionClassname}__tabs`]}
      />
    );
  });

  return onlyBlocks ? (
    <>{blocks}</>
  ) : (
    <li className={cs(pageSectionStyles[pageSectionClassname], className)}>
      {sectionTitle ? (
        <HeaderBlock
          className={pageSectionStyles[`${pageSectionClassname}__title`]}
          title={sectionTitle}
          titleAlignment={sectionTitleAlignment}
          titleSize={sectionTitleSize}
        />
      ) : null}
      <div className={`${pageSectionClassname}__content`}>{blocks}</div>
    </li>
  );
};

PageSection.displayName = 'PageSectionWrapper';

export default PageSection;
