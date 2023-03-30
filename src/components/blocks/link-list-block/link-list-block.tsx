import cs from 'classnames';
import React, { FC, useCallback, useRef, useState } from 'react';
import { useResizeObserver } from '../../../hooks';
import useWindowDimensions from '../../../hooks/use-window-dimensions';
import { AbstractBlockProps, BlockWithItemsComponentProps, BlockWithTitleComponentProps } from '../../../interfaces';
import { StyledLink } from '../../units/styled-link/styled-link';
import { LinkListItemData } from './interfaces';
import linkListBlockStyles from './style.module.scss';

const linkListBlockClassname = 'link-list-block';

export interface LinkListBlockProps
  extends AbstractBlockProps,
    BlockWithItemsComponentProps<LinkListItemData>,
    BlockWithTitleComponentProps {}

const LinkListBlock: FC<LinkListBlockProps> = ({ title, className, items }) => {
  const componentElementRef = useRef<HTMLDivElement>(null);
  const [componentHeight, setComponentHeight] = useState(0);
  const { windowHeight } = useWindowDimensions();

  const resizeCallback = useCallback(
    ([
      {
        contentRect: { height },
      },
    ]) => {
      setComponentHeight(height);
    },
    [],
  );

  useResizeObserver({
    callback: resizeCallback,
    elementRef: componentElementRef,
  });

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      ref={componentElementRef}
      className={cs(
        linkListBlockStyles[linkListBlockClassname],
        {
          [linkListBlockStyles[`${linkListBlockClassname}__smaller`]]: componentHeight < windowHeight,
        },
        className,
      )}
    >
      <div
        className={linkListBlockStyles[`${linkListBlockClassname}__block-title`]}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className={linkListBlockStyles[`${linkListBlockClassname}__rhombuses`]}>
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className={linkListBlockStyles[`${linkListBlockClassname}__rhombus`]} />
        ))}
      </div>
      <ul className={linkListBlockStyles[`${linkListBlockClassname}__list`]}>
        {items.map(({ id, link, title }) => (
          <li key={id} className={linkListBlockStyles[`${linkListBlockClassname}__item`]}>
            <div
              className={linkListBlockStyles[`${linkListBlockClassname}__title`]}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <StyledLink
              className={linkListBlockStyles[`${linkListBlockClassname}__link`]}
              dangerouslySetInnerHTML={{ __html: link.title }}
              to={link.url}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { LinkListBlock };
