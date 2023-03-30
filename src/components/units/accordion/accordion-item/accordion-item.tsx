import cs from 'classnames';
import React, { FC, useState } from 'react';
import { useBaseBackgroundColor } from '../../../../contexts';
import { WithClassNameComponentProps } from '../../../../interfaces';
import { Icon, IconCode } from '../../icon/icon';
import accordionItemStyles from './style.module.scss';

const accordionItemClassname = 'accordion-item';

export interface AccordionItemProps {
  subtitle?: string;
  text?: string;
  title: string;
  unfolded?: boolean;
}

const AccordionItem: FC<AccordionItemProps & WithClassNameComponentProps> = ({
  children,
  className,
  subtitle,
  title,
  unfolded,
}) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const [isFolded, setIsFolded] = useState(!unfolded);

  return (
    <li
      className={cs(
        accordionItemStyles[accordionItemClassname],
        accordionItemStyles[`${accordionItemClassname}_base-background-color_${baseBackgroundColor}`],
        {
          [accordionItemStyles[`${accordionItemClassname}_is-folded`]]: isFolded,
        },
        className,
      )}
    >
      <button
        aria-expanded={!isFolded}
        className={accordionItemStyles[`${accordionItemClassname}__title-wrapper`]}
        onClick={() => {
          setIsFolded((folded) => !folded);
        }}
        type="button"
      >
        <div
          className={accordionItemStyles[`${accordionItemClassname}__title`]}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && (
          <div
            className={accordionItemStyles[`${accordionItemClassname}__subtitle`]}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        <div className={accordionItemStyles[`${accordionItemClassname}__icon-wrapper`]}>
          <Icon
            className={accordionItemStyles[`${accordionItemClassname}__icon`]}
            code={isFolded ? IconCode.plus : IconCode.minus}
          />
        </div>
      </button>
      <div
        aria-hidden={isFolded}
        className={cs(accordionItemStyles[`${accordionItemClassname}__content`], {
          [accordionItemStyles[`${accordionItemClassname}__info`]]: children,
        })}
      >
        {!isFolded ? children : null}
      </div>
    </li>
  );
};

export { AccordionItem };
