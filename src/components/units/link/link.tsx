import { ComponentProps, FC, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { WithClassNameComponentProps } from '../../../interfaces';

interface LinkProps {
  isExternal?: boolean;
}

const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

const Link: FC<ComponentProps<typeof RouterLink> & LinkProps & WithClassNameComponentProps> = ({
  className,
  children,
  download,
  isExternal = false,
  to,
  ...restProps
}) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const { current: anchorElement } = ref;

    if (!anchorElement) {
      return;
    }

    anchorElement.dataset.router = '';

    return () => {
      delete anchorElement.dataset.aa;
    };
  }, []);

  if ((typeof to === 'string' && !to.startsWith('/') && !to.startsWith('#') && !to.startsWith('?')) || download) {
    const externalProps = isExternal || (typeof to === 'string' && to.startsWith('http')) ? externalLinkProps : {};

    return (
      <a ref={ref} className={className} download={download} href={to as string} {...restProps} {...externalProps}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink ref={ref} {...restProps} className={className} to={to}>
      {children}
    </RouterLink>
  );
};

export { Link };
