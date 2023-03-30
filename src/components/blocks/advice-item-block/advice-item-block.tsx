import cs from 'classnames';
import React, { FC } from 'react';
import {
  AbstractBlockProps,
  ComponentRenderType,
  BlockWithItemsComponentProps,
  ExtendedAdviceData,
} from '../../../interfaces';
import { Advice, AdviceTitleSize } from '../../units/business/advice/advice';
import adviceItemBlockStyles from './style.module.scss';

const adviceItemBlockClassname = 'advice-item-block';

export interface AdviceItemBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<ExtendedAdviceData> {}

const AdviceItemBlock: FC<AdviceItemBlockProps> = ({ className, blockRenderType, items }) => {
  const limit = 3;
  const TagName = blockRenderType === ComponentRenderType.listItem ? 'li' : 'div';

  return (
    <TagName className={cs(adviceItemBlockStyles[`${adviceItemBlockClassname}`], className)}>
      {items.slice(0, limit).map((item) => (
        <Advice
          key={item.id}
          className={adviceItemBlockStyles[`${adviceItemBlockClassname}__item`]}
          item={item}
          titleSize={AdviceTitleSize.large}
        />
      ))}
    </TagName>
  );
};
export { AdviceItemBlock };
