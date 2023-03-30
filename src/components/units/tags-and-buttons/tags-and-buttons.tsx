import cs from 'classnames';
import React, { cloneElement, isValidElement } from 'react';
import { WithClassNameComponentProps } from '../../../interfaces';
import { ProductTag } from '../business/product-tag/product-tag';
import { Button, buttonClassname } from '../controls/button/button';
import buttonStyles from '../controls/button/style.module.scss';
import tagStyles from '../tag/style.module.scss';
import { Tag, tagClassname } from '../tag/tag';
import tagsAndButtonsStyles from './style.module.scss';

const tagsAndButtonsClassname = 'tags-and-buttons';

interface TagsAndButtonsProps {
  withoutBreak?: boolean;
}

const TagsAndButtons = React.forwardRef<
  HTMLDivElement,
  TagsAndButtonsProps & WithClassNameComponentProps & Pick<React.HTMLProps<HTMLDivElement>, 'children'>
>(({ children, className, withoutBreak = false }, forwardRef) => {
  return (
    <div ref={forwardRef} className={cs(tagsAndButtonsStyles[tagsAndButtonsClassname], className)}>
      {React.Children.map(children, (child) => {
        if (isValidElement(child) && [Button, ProductTag, Tag].some((type) => type === child.type)) {
          switch (child.type) {
            case Button:
              return (
                <>
                  {!withoutBreak ? <div className={tagsAndButtonsStyles[`${tagsAndButtonsClassname}__break`]} /> : null}
                  {cloneElement(child, {
                    className: cs(child.props.className, buttonStyles[`${buttonClassname}_stuck`]),
                  })}
                </>
              );
            case ProductTag:
            case Tag:
              return cloneElement(child, {
                className: cs(child.props.className, tagStyles[`${tagClassname}_stuck`]),
              });
          }
        }

        return child;
      })}
    </div>
  );
});

export { TagsAndButtons };
