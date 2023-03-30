import cs from 'classnames';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { AbstractBlockProps, BlockWithItemsComponentProps } from '../../../interfaces';
import { Tag } from '../../units/tag/tag';
import { useTickerAnimation } from './hooks';
import tickerBlockStyles from './style.module.scss';

const tickerBlockClassname = 'ticker-block';

export interface TickerBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<string> {
  isLayering?: boolean;
}

const TickerBlock: FC<TickerBlockProps> = ({ className, isLayering = false, items }) => {
  const blockElementRef = useRef<HTMLDivElement>(null);
  const pseudoBlockElementRef = useRef<HTMLDivElement>();
  const listElementRef = useRef<HTMLUListElement>(null);
  const listTailElementRef = useRef<HTMLLIElement>(null);

  const onDestroy = useCallback(() => {
    if (!isLayering) {
      return;
    }

    const { current: pseudoBlockElement } = pseudoBlockElementRef;

    if (!pseudoBlockElement) {
      return;
    }

    pseudoBlockElement.remove();

    pseudoBlockElementRef.current = undefined;
  }, [isLayering]);

  const onInit = useCallback(() => {
    if (!isLayering) {
      return;
    }

    const { current: blockElement } = blockElementRef;

    if (!blockElement) {
      return;
    }

    const pseudoBlockElement = blockElement.cloneNode(true) as HTMLDivElement;

    pseudoBlockElement.classList.add(tickerBlockStyles[`${tickerBlockClassname}_pseudo`]);

    pseudoBlockElementRef.current = pseudoBlockElement;

    blockElement.parentElement!.insertBefore(pseudoBlockElementRef.current, blockElement);
  }, [isLayering]);

  const onTick = useCallback(() => {
    if (!isLayering) {
      return;
    }

    const { current: blockElement } = blockElementRef;

    if (!blockElement) {
      return;
    }

    // TODO: (mellonis) optimize pseudo block animation
    const pseudoBlockElement = blockElement.cloneNode(true) as HTMLDivElement;

    pseudoBlockElement.classList.add(tickerBlockStyles[`${tickerBlockClassname}_pseudo`]);
    pseudoBlockElementRef.current!.replaceWith(pseudoBlockElement);
    pseudoBlockElementRef.current = pseudoBlockElement;
  }, [isLayering]);

  const { toggle } = useTickerAnimation({
    itemHiddenModifierClassname: tickerBlockStyles[`${tickerBlockClassname}__item_hidden`],
    listElementRef,
    onDestroy,
    onInit,
    onTick,
    ready: items.length > 0,
  });

  useEffect(() => {
    blockElementRef.current?.style.setProperty(
      '--scrollbar-width',
      window.innerWidth - document.documentElement.clientWidth + 'px',
    );
  }, []);

  return (
    <div
      ref={blockElementRef}
      className={cs(
        tickerBlockStyles[tickerBlockClassname],
        { [tickerBlockStyles[`${tickerBlockClassname}_is-layering`]]: isLayering },
        className,
      )}
    >
      <div className={tickerBlockStyles[`${tickerBlockClassname}__list-wrapper`]}>
        <ul ref={listElementRef} className={tickerBlockStyles[`${tickerBlockClassname}__list`]} onClick={toggle}>
          {items.map((item, index) => (
            <li key={index} className={tickerBlockStyles[`${tickerBlockClassname}__item`]}>
              <Tag className={tickerBlockStyles[`${tickerBlockClassname}__tag`]} title={item} />
            </li>
          ))}
          <li ref={listTailElementRef} className={tickerBlockStyles[`${tickerBlockClassname}__item`]} />
        </ul>
      </div>
    </div>
  );
};

export { TickerBlock };
