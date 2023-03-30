import cs from 'classnames';
import React, { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AbstractBlockProps, PageSectionTitleAlignment, PageSectionTitleSize } from '../../../interfaces';
import { TabBlockData, UtilityBlockType } from '../../../interfaces/classes/blocks';
import PageSection from '../../page-sections/page-section/page-section';
import { Tabs } from '../../units/controls/tabs/tabs';
import tabsBlockStyles from './style.module.scss';

const tabsBlockClassname = 'tabs-block';

export interface TabsBlockProps extends AbstractBlockProps {
  code: string;
}

const TabsBlock: FC<TabsBlockProps> = ({ className, code: tabsCode, nestedBlocks, tabsClassname }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabItems = useMemo(() => {
    return (nestedBlocks as TabBlockData[])?.map(({ code, title }) => ({ code, title })) ?? [];
  }, [nestedBlocks]);
  const tabOptions = useMemo(() => tabItems.map(({ title }) => title), [tabItems]);
  const tabOptionIx = Math.max(
    0,
    tabItems.findIndex(({ code }) => code === searchParams.get(tabsCode)),
  );

  if (!tabsCode) {
    return null;
  }

  if (!nestedBlocks || nestedBlocks.length === 0) {
    return null;
  }

  if (!nestedBlocks.every(({ type }) => type === UtilityBlockType.tab)) {
    return null;
  }

  return (
    <>
      <Tabs
        className={cs(
          tabsBlockStyles[tabsBlockClassname],
          tabsBlockStyles[`${tabsBlockClassname}_tabs`],
          tabsClassname,
          className,
        )}
        onSelect={(tabOptionIx) => {
          const { code } = tabItems[tabOptionIx];

          if (tabOptionIx > 0) {
            searchParams.set(tabsCode, code);
          } else {
            searchParams.delete(tabsCode);
          }

          setSearchParams(searchParams, { replace: true });
        }}
        options={tabOptions}
        selectedOptionIx={tabOptionIx}
      />
      {nestedBlocks.map(({ id, nestedBlocks }, index) => (
        <PageSection
          key={id}
          hiddenTabClassname={index !== tabOptionIx ? tabsBlockStyles[`${tabsBlockClassname}_hidden`] : undefined}
          onlyBlocks={true}
          section={{
            blocks: nestedBlocks,
            id: `${id}-nested-blocks`,
            titleSize: PageSectionTitleSize.medium,
            titleAlignment: PageSectionTitleAlignment.center,
          }}
        />
      ))}
    </>
  );
};

export { TabsBlock };
