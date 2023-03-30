import cs from 'classnames';
import React, { FC, MouseEventHandler } from 'react';
import { useBaseBackgroundColor } from '../../../contexts';
import { WithClassNameComponentProps } from '../../../interfaces';
import tagStyles from './style.module.scss';

export const tagClassname = 'tag';

export enum TagSize {
  default = 'default',
  small = 'small',
}

export enum TagDomElement {
  button = 'button',
  div = 'div',
}

interface TagProps {
  onClick?: MouseEventHandler;
  size?: TagSize;
  tagDomElement?: TagDomElement;
  title?: string;
  value?: string;
}

const Tag: FC<TagProps & WithClassNameComponentProps> = ({
  className,
  size = TagSize.default,
  tagDomElement = TagDomElement.div,
  title,
  value,
  ...props
}) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const hasTitle = !!title;
  const hasValue = !!value;
  const isDotRendered = hasTitle && hasValue;

  if (tagDomElement === TagDomElement.button) {
    return (
      <button
        className={cs(
          tagStyles[tagClassname],
          tagStyles[`${tagClassname}_base-background-color_${baseBackgroundColor}`],
          tagStyles[`${tagClassname}_tag-size_${size}`],
          className,
        )}
        dangerouslySetInnerHTML={{ __html: `${title}${value ? `\xA0•\xA0${value}` : ''}` }}
        {...props}
      />
    );
  }

  return (
    <div
      className={cs(
        tagStyles[tagClassname],
        tagStyles[`${tagClassname}_base-background-color_${baseBackgroundColor}`],
        tagStyles[`${tagClassname}_tag-size_${size}`],
        className,
      )}
      dangerouslySetInnerHTML={{
        __html: `${hasTitle ? title : ''}${isDotRendered ? '\xA0•\xA0' : ''}${hasValue ? value : ''}`,
      }}
      {...props}
    />
  );
};

export { Tag };
