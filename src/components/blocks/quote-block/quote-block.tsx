import cs from 'classnames';
import React, { FC } from 'react';
import { useBaseBackgroundColor } from '../../../contexts';
import { AbstractBlockProps } from '../../../interfaces';
import quoteBlockStyles from './style.module.scss';

const quoteBlockClassname = 'quote-block';

export interface QuoteBlockProps extends AbstractBlockProps {
  description: string;
  text: string;
}

const QuoteBlock: FC<QuoteBlockProps> = ({ className, description, text }) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();

  return (
    <div
      className={cs(
        quoteBlockStyles[quoteBlockClassname],
        quoteBlockStyles[`${quoteBlockClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      <svg
        className={quoteBlockStyles[`${quoteBlockClassname}__icon`]}
        fill="none"
        height="149"
        viewBox="0 0 162 149"
        width="162"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M110.628 0.339844H60.8103L0.993164 74.5092L60.8103 148.34H110.628L52.5194 74.5092L110.628 0.339844Z" />
        <path d="M161.628 0.339844H135.81L75.9932 74.5092L135.81 148.34H161.628L103.519 74.5092L161.628 0.339844Z" />
      </svg>

      <p className={quoteBlockStyles[`${quoteBlockClassname}__quote`]} dangerouslySetInnerHTML={{ __html: text }} />
      <div
        className={quoteBlockStyles[`${quoteBlockClassname}__description`]}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export { QuoteBlock };
