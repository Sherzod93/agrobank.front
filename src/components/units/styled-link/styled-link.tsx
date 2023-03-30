import cs from 'classnames';
import React, { ComponentProps, FC } from 'react';
import { useBaseBackgroundColor } from '../../../contexts';
import { Link } from '../link/link';
import linkStyles from './style.module.scss';

const linkClassname = 'link';

const StyledLink: FC<ComponentProps<typeof Link>> = ({ className, ...restProps }) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();

  return (
    <Link
      className={cs(
        linkStyles[linkClassname],
        linkStyles[`${linkClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
      {...restProps}
    />
  );
};

export { StyledLink };
