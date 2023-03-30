import cs from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useBaseBackgroundColor } from '../../../contexts';
import { Breakpoints, breakpointsToMediaQuery } from '../../../helpers';
import { useFocusOrClickOutside, useMatchMedia, useMenu } from '../../../hooks';
import { Icon, IconCode } from '../icon/icon';
import { Link } from '../link/link';
import internetBankMenuStyles from './style.module.scss';

const internetBankMenuClassname = 'internet-bank-menu';

const InternetBankMenu = () => {
  const componentElementRef = useRef<HTMLDivElement>(null);
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const internetBankMenu = useMenu('internet-bank');
  const internetBankMenuItem = internetBankMenu?.find(({ path }) => path === 'internet-bank');
  const [isFolded, setIsFolded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const outsideFocusOrClickHandler = useCallback(() => {
    setIsFolded(true);
  }, []);

  useFocusOrClickOutside(componentElementRef, !isFolded, outsideFocusOrClickHandler);

  useMatchMedia({
    callback: setIsMobile,
    mediaQuery: breakpointsToMediaQuery({ to: Breakpoints.md }),
  });

  useEffect(() => {
    const { current: componentElement } = componentElementRef;

    if (!componentElement) {
      return;
    }

    const keyDownHandler = (event: KeyboardEvent) => {
      const { key } = event;
      const { current: componentElement } = componentElementRef;

      if (!componentElement) {
        return;
      }

      const focusedElement = document.querySelector(':focus');

      if (!focusedElement) {
        return;
      }

      if (key === 'Escape') {
        const elementToFocusing = componentElement.querySelector(
          `.${internetBankMenuStyles[`${internetBankMenuClassname}__title`]}`,
        );

        if (elementToFocusing) {
          (elementToFocusing as HTMLDivElement).focus();
          setIsFolded(true);
          event.preventDefault();
        }

        return;
      }

      if (focusedElement.matches(`.${internetBankMenuStyles[`${internetBankMenuClassname}__title`]}`)) {
        switch (key) {
          case 'Enter':
          case ' ':
            setIsFolded(!isFolded);
            event.preventDefault();
            break;
          case 'ArrowDown':
            setIsFolded(false);
            (
              componentElement.querySelector(
                `.${internetBankMenuStyles[`${internetBankMenuClassname}__list-item`]}:nth-child(1)`,
              ) as HTMLLinkElement | undefined
            )?.focus();
            event.preventDefault();
        }
      }

      if (focusedElement.matches(`.${internetBankMenuStyles[`${internetBankMenuClassname}__list-item`]}`)) {
        switch (key) {
          case 'ArrowUp': {
            const elementToFocusing =
              focusedElement.previousElementSibling ??
              componentElement.querySelector(
                `.${internetBankMenuStyles[`${internetBankMenuClassname}__list-item`]}:last-child`,
              );

            if (elementToFocusing) {
              (elementToFocusing as HTMLLinkElement).focus();
              event.preventDefault();
            }
            break;
          }
          case 'ArrowDown': {
            const elementToFocusing =
              focusedElement.nextElementSibling ??
              componentElement.querySelector(
                `.${internetBankMenuStyles[`${internetBankMenuClassname}__list-item`]}:first-child`,
              );

            if (elementToFocusing) {
              (elementToFocusing as HTMLLinkElement).focus();
              event.preventDefault();
            }
            break;
          }
          case 'Enter': {
            setTimeout(() => {
              const elementToFocusing = componentElement.querySelector(
                `.${internetBankMenuStyles[`${internetBankMenuClassname}__title`]}`,
              );

              if (elementToFocusing) {
                (elementToFocusing as HTMLDivElement).focus();
                setIsFolded(true);
              }
            }, 0);
          }
        }
      }
    };

    componentElement.addEventListener('keydown', keyDownHandler);

    return () => {
      componentElement.removeEventListener('keydown', keyDownHandler);
    };
  }, [isFolded]);

  if (internetBankMenuItem?.children == null) {
    return null;
  }

  const { children: internetBankMenuItems, title: internetBankMenuTitle } = internetBankMenuItem!;

  const listItem = (link: string, title: string) => (
    <Link
      key={link}
      className={cs({
        [internetBankMenuStyles[`${internetBankMenuClassname}__list-item`]]: !isMobile,
        [internetBankMenuStyles[`${internetBankMenuClassname}__link`]]: isMobile,
      })}
      dangerouslySetInnerHTML={{ __html: title }}
      tabIndex={0}
      to={link}
    />
  );

  return (
    <div
      ref={componentElementRef}
      className={cs(
        internetBankMenuStyles[internetBankMenuClassname],
        internetBankMenuStyles[`${internetBankMenuClassname}_base-background-color_${baseBackgroundColor}`],
        {
          [internetBankMenuStyles[`${internetBankMenuClassname}_is-folded`]]: isFolded,
        },
      )}
      onMouseEnter={() => {
        if (!isMobile) {
          setIsFolded(false);
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          setIsFolded(true);
        }
      }}
    >
      {isMobile ? (
        <>
          <div
            className={internetBankMenuStyles[`${internetBankMenuClassname}__title`]}
            dangerouslySetInnerHTML={{ __html: `${internetBankMenuTitle}:` }}
          />
          {internetBankMenuItems.map(({ link, title }, index) => (
            <div key={index}>{listItem(link, title)}</div>
          ))}
        </>
      ) : (
        <>
          <div className={internetBankMenuStyles[`${internetBankMenuClassname}__title`]} tabIndex={isFolded ? 0 : -1}>
            <div dangerouslySetInnerHTML={{ __html: internetBankMenuTitle }} />
            <Icon
              className={internetBankMenuStyles[`${internetBankMenuClassname}__icon`]}
              code={IconCode.expandArrow}
            />
          </div>
          {!isFolded && (
            <div className={internetBankMenuStyles[`${internetBankMenuClassname}__list`]}>
              {internetBankMenuItems.map(({ link, title }) => listItem(link, title))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { InternetBankMenu };
