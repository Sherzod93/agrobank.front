import cs from 'classnames';
import React, { FC } from 'react';
import { WithClassNameComponentProps } from '../../../interfaces';
import accordionStyles from './style.module.scss';

const accordionClassname = 'accordion';

const Accordion: FC<WithClassNameComponentProps> = ({ children, className }) => {
  return <ul className={cs(accordionStyles[accordionClassname], className)}>{children}</ul>;
};

export { Accordion };
