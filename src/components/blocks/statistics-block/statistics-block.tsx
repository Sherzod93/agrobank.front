import cs from 'classnames';
import React, { FC, useCallback, useRef } from 'react';
import { useBaseBackgroundColor } from '../../../contexts';
import { useResizeObserver, useStyleElement } from '../../../hooks';
import { AbstractBlockProps, BlockWithItemsComponentProps, BlockWithTitleComponentProps } from '../../../interfaces';
import { Tag } from '../../units/tag/tag';
import { TagsAndButtons } from '../../units/tags-and-buttons/tags-and-buttons';
import statisticsBlockStyles from './style.module.scss';

const statisticsBlockClassname = 'statistics-block';

export interface StatisticsBlockProps
  extends AbstractBlockProps,
    BlockWithItemsComponentProps<string>,
    BlockWithTitleComponentProps {}

const halfOfSqrtTwo = 2 ** 0.5 / 2;

const StatisticsBlock: FC<StatisticsBlockProps> = ({ className, items, title }) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const tagsComponentElementRef = useRef<HTMLDivElement>(null);
  const [styleElementRef, styleElementCssScope] = useStyleElement();

  const resizeCallback = useCallback(
    ([
      {
        contentRect: { height, width },
      },
    ]: ResizeObserverEntry[]) => {
      const { current: tagsComponentElement } = tagsComponentElementRef;
      const { current: styleElement } = styleElementRef;

      if (!tagsComponentElement || !styleElement) {
        return;
      }

      const { sheet: cssSheet } = styleElement;

      if (!cssSheet) {
        return;
      }

      const rhombusSize = Math.min(height, width) * halfOfSqrtTwo;

      Array.from(cssSheet.cssRules).forEach(() => cssSheet.removeRule(0));

      cssSheet.insertRule(`.${statisticsBlockStyles[statisticsBlockClassname]}_${styleElementCssScope} .${
        statisticsBlockStyles[`${statisticsBlockClassname}__animation`]
      } {
  height: ${rhombusSize}px; width: ${rhombusSize}px;
}`);
    },
    [styleElementCssScope, styleElementRef],
  );

  useResizeObserver({ elementRef: tagsComponentElementRef, callback: resizeCallback });

  return (
    <div
      className={cs(
        statisticsBlockStyles[statisticsBlockClassname],
        statisticsBlockStyles[`${statisticsBlockClassname}_base-background-color_${baseBackgroundColor}`],
        `${statisticsBlockStyles[statisticsBlockClassname]}_${styleElementCssScope}`,
        className,
      )}
    >
      <div
        className={statisticsBlockStyles[`${statisticsBlockClassname}__title`]}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className={statisticsBlockStyles[`${statisticsBlockClassname}__tags-wrapper`]}>
        <div className={statisticsBlockStyles[`${statisticsBlockClassname}__animation`]} />
        <TagsAndButtons
          ref={tagsComponentElementRef}
          className={statisticsBlockStyles[`${statisticsBlockClassname}__tags`]}
        >
          {items.map((item) => (
            <Tag key={item} title={item} />
          ))}
        </TagsAndButtons>
      </div>
    </div>
  );
};

export { StatisticsBlock };
