import cs from 'classnames';
import React, { FC } from 'react';
import { AbstractBlockProps } from '../../../interfaces';
import textBlockStyles from './style.module.scss';

const textBlockClassname = 'text-block';

export interface TextBlockProps extends AbstractBlockProps {
  text: string;
}

const TextBlock: FC<TextBlockProps> = ({ className, text }) => (
  <p className={cs(textBlockStyles[`${textBlockClassname}`], className)} dangerouslySetInnerHTML={{ __html: text }} />
);

export { TextBlock };
