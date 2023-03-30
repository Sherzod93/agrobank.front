import cs from 'classnames';
import React, { FC } from 'react';
import { AbstractBlockProps, BlockWithItemsComponentProps, FaqItemData } from '../../../interfaces';
import { Accordion } from '../../units/accordion/accordion';
import { AccordionItem } from '../../units/accordion/accordion-item/accordion-item';
import { faqBlockBlockTypeToComponentMap } from './block-type-to-component-map';
import faqBlockStyles from './style.module.scss';

const faqBlockClassname = 'faq-block';

export interface FaqBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<FaqItemData> {}

const FaqBlock: FC<FaqBlockProps> = ({ className, items }) => {
  return (
    <Accordion className={cs(faqBlockStyles[faqBlockClassname], className)}>
      {items.map(({ blocks: blockDataList, id: itemId, title: itemTitle }) => (
        <AccordionItem key={itemId} className={faqBlockStyles[`${faqBlockClassname}__item`]} title={itemTitle}>
          <div className={faqBlockStyles[`${faqBlockClassname}__content`]}>
            {blockDataList.map((blockData) => {
              const PageSectionBlock =
                faqBlockBlockTypeToComponentMap[blockData.type as keyof typeof faqBlockBlockTypeToComponentMap];

              if (PageSectionBlock) {
                return (
                  <PageSectionBlock
                    key={blockData.id}
                    className={cs(
                      faqBlockStyles[`${faqBlockClassname}__block`],
                      faqBlockStyles[`${faqBlockClassname}__block_type_${blockData.type}`],
                    )}
                    {...(blockData as any)}
                  />
                );
              }

              return null;
            })}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export { FaqBlock, faqBlockBlockTypeToComponentMap };
