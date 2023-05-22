import cs from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useBaseBackgroundColor } from '../../../../contexts';
import { Breakpoints, breakpointsToMediaQuery } from '../../../../helpers';
import { useFocusOrClickOutside, useMatchMedia } from '../../../../hooks';
import { FilterItemData, WithClassNameComponentProps } from '../../../../interfaces';
import { LanguageFetchState, setLanguage } from '../../../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../../../services/store';
import languageSelectorStyles from './style.module.scss';

const languageSelectorClassname = 'language-selector';

const LanguageSelector: FC<WithClassNameComponentProps> = ({ className }) => {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useMatchMedia({
    callback: setIsMobile,
    mediaQuery: breakpointsToMediaQuery({ to: Breakpoints.md }),
  });

  const {
    i18n: { getResourceBundle, language },
  } = useTranslation();

  const { requestPhase: setLanguageRequestPhase, url } = useAppSelector((state) => state.language);

  const dispatch = useAppDispatch();

  const { baseBackgroundColor } = useBaseBackgroundColor();

  const languageOptions = useMemo(() => {
    const { languages = {} }: { languages: { [key: string]: string } } = getResourceBundle(language, '');

    return Object.entries(languages)
      .reduce((result, [code, title], index) => {
        result.push({
          code,
          id: index,
          title,
        });

        return result;
      }, [] as FilterItemData[])
      .sort(({ code: languageCodeA, id: languageIdA }, { code: languageCodeB, id: languageIdB }) => {
        if (languageCodeA === language) {
          return -1;
        }

        if (languageCodeB === language) {
          return 1;
        }

        return languageIdA - languageIdB;
      });
  }, [getResourceBundle, language]);

  const { currentLanguageOption } = useMemo(() => {
    const currentLanguageOption = languageOptions.find(({ code }) => code === language);

    return {
      currentLanguageOption,
    };
  }, [language, languageOptions]);

  const [isFolded, setIsFolded] = useState(true);

  const componentElementRef = useRef<HTMLDivElement>(null);

  const outsideFocusOrClickHandler = useCallback(() => {
    setIsFolded(true);
  }, []);

  useFocusOrClickOutside(componentElementRef, !isFolded, outsideFocusOrClickHandler);

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
        componentElement.focus();
        setIsFolded(true);
        return;
      }

      if (focusedElement.matches(`.${languageSelectorStyles[`${languageSelectorClassname}__current-value`]}`)) {
        switch (key) {
          case 'Enter':
          case ' ':
            if (isFolded) {
              setIsFolded(false);
            } else {
              setIsFolded(true);
            }
            event.preventDefault();
            break;
          case 'ArrowDown':
            if (isFolded) {
              setIsFolded(false);
              (
                componentElement.querySelector(
                  `.${languageSelectorStyles[`${languageSelectorClassname}__item`]}:nth-child(1)`,
                ) as HTMLLIElement | undefined
              )?.focus();
              event.preventDefault();
            }
        }
      }

      if (focusedElement.matches(`.${languageSelectorStyles[`${languageSelectorClassname}__item`]}`)) {
        switch (key) {
          case 'ArrowUp': {
            const elementToFocusing =
              focusedElement.previousElementSibling ??
              componentElement.querySelector(
                `.${languageSelectorStyles[`${languageSelectorClassname}__item`]}:last-child`,
              );

            if (elementToFocusing) {
              (elementToFocusing as HTMLLIElement).focus();
              event.preventDefault();
            }
            break;
          }
          case 'ArrowDown':
            const elementToFocusing =
              focusedElement.nextElementSibling ??
              componentElement.querySelector(
                `.${languageSelectorStyles[`${languageSelectorClassname}__item`]}:first-child`,
              );

            if (elementToFocusing) {
              (elementToFocusing as HTMLLIElement).focus();
              event.preventDefault();
            }
            break;
          case 'Enter':
          case ' ':
            focusedElement.dispatchEvent(new Event('click', { bubbles: true }));
            componentElement.focus();
            event.preventDefault();
        }
      }
    };

    componentElement.addEventListener('keydown', keyDownHandler);

    return () => {
      componentElement.removeEventListener('keydown', keyDownHandler);
    };
  }, [currentLanguageOption, isFolded]);

  useEffect(() => {
    if (setLanguageRequestPhase === LanguageFetchState.fulfilled) {
      window.location.href = url ?? '/';
    }
  }, [setLanguageRequestPhase, url]);

  const languageOption = (code: string, title: string) => {
    return (
      <li
        key={code}
        className={cs(languageSelectorStyles[`${languageSelectorClassname}__item`], {
          [languageSelectorStyles[`${languageSelectorClassname}__item_current`]]: code === language,
        })}
        dangerouslySetInnerHTML={{ __html: title }}
        onClick={() => {
          if (code !== language) {
            dispatch(
              setLanguage({
                language: code,
                url: pathname,
              }),
            );
          }
        }}
        tabIndex={0}
      />
    );
  };

  return (
    <div
      ref={componentElementRef}
      className={cs(
        languageSelectorStyles[languageSelectorClassname],
        languageSelectorStyles[`${languageSelectorClassname}_base-background-color_${baseBackgroundColor}`],
        className,
        {
          [languageSelectorStyles[`${languageSelectorClassname}_is-folded`]]: isFolded,
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
        <ul className={languageSelectorStyles[`${languageSelectorClassname}__list`]}>
          {languageOptions.map(({ code, title }) => languageOption(code, title))}
        </ul>
      ) : (
        <>
          <div
            className={cs(languageSelectorStyles[`${languageSelectorClassname}__current-value`])}
            dangerouslySetInnerHTML={{ __html: currentLanguageOption!.title }}
            tabIndex={isFolded ? 0 : -1}
          />
          <ul role={'language_selector_text'}
            className={cs(
              languageSelectorStyles[`${languageSelectorClassname}__list`],
              languageSelectorStyles[`${languageSelectorClassname}__list_foldable`],
            )}
          >
            {languageOptions.slice(0, isFolded ? 1 : Infinity).map(({ code, title }) => languageOption(code, title))}
          </ul>
        </>
      )}
    </div>
  );
};

export { LanguageSelector };
