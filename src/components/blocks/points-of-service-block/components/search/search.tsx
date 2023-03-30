import cs from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { provideForwardRef } from '../../../../../helpers';
import { PointOfServiceAddress, WithClassNameComponentProps } from '../../../../../interfaces';
import { Icon, IconCode } from '../../../../units/icon/icon';
import searchStyles from './style.module.scss';

const searchClassname = 'search';

interface SearchProps {
  onFilter?: (points: PointOfServiceAddress[]) => void;
  onFocus?: () => void;
  onPointSelected?: (point: PointOfServiceAddress) => void;
  points: PointOfServiceAddress[];
  showResults?: boolean;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps & WithClassNameComponentProps>(
  ({ className, onFilter, onFocus, onPointSelected, points, showResults = true }, forwardRef) => {
    const {
      i18n: { t },
    } = useTranslation();
    const componentElementRef = useRef<HTMLDivElement>(null);
    const inputElementRef = useRef<HTMLInputElement | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState('');

    const pointToIndexMap = useMemo(() => {
      return points.reduce((result, pointOfService) => {
        result.set(pointOfService, {
          address: pointOfService.address.toLocaleLowerCase(),
          phones: pointOfService.phones?.map(({ phoneNumber }) => phoneNumber.toLocaleLowerCase()) ?? [],
          title: pointOfService.title.toLocaleLowerCase(),
        });

        return result;
      }, new Map<PointOfServiceAddress, { address: string; phones: string[]; title: string }>());
    }, [points]);

    const filteredPoints = useMemo(() => {
      const lowerCasedAndTrimmedQuery = query.toLowerCase().trim();

      let filteredPoints: PointOfServiceAddress[];

      if (lowerCasedAndTrimmedQuery) {
        filteredPoints = [...pointToIndexMap.entries()]
          .filter(
            ([_, { address, phones, title }]) =>
              address.includes(lowerCasedAndTrimmedQuery) ||
              phones.includes(lowerCasedAndTrimmedQuery) ||
              title.includes(lowerCasedAndTrimmedQuery),
          )
          .map(([point]) => point);
      } else {
        filteredPoints = [...pointToIndexMap.keys()];
      }

      return filteredPoints;
    }, [pointToIndexMap, query]);

    useEffect(() => {
      if (onFilter) {
        onFilter(filteredPoints);
      }
    }, [filteredPoints, onFilter, query]);

    useEffect(() => {
      setQuery('');
    }, [points]);

    useEffect(() => {
      if (!showResults) {
        return;
      }

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

        if (focusedElement.matches(`.${searchStyles[`${searchClassname}__input`]}`)) {
          switch (key) {
            case 'ArrowDown':
              const { selectionEnd, selectionStart, value } = focusedElement as HTMLInputElement;

              if ((selectionStart ?? 0) > 0 && selectionStart === selectionEnd && selectionStart === value.length) {
                const elementToFocusing = (
                  focusedElement.parentElement!.nextElementSibling ??
                  componentElement.querySelector(`.${searchStyles[`${searchClassname}__item`]}:first-child`)
                )?.querySelector(`.${searchStyles[`${searchClassname}__result-button`]}`);
                (elementToFocusing as HTMLLIElement).focus();
                event.preventDefault();
              }
          }
        }

        if (focusedElement.matches(`.${searchStyles[`${searchClassname}__result-button`]}`)) {
          switch (key) {
            case 'ArrowUp': {
              const elementToFocusing = (
                focusedElement.parentElement!.previousElementSibling ??
                componentElement.querySelector(`.${searchStyles[`${searchClassname}__item`]}:last-child`)
              )?.querySelector(`.${searchStyles[`${searchClassname}__result-button`]}`);

              if (elementToFocusing) {
                (elementToFocusing as HTMLLIElement).focus();
                event.preventDefault();
              }
              break;
            }
            case 'ArrowDown':
              const elementToFocusing = (
                focusedElement.parentElement!.nextElementSibling ??
                componentElement.querySelector(`.${searchStyles[`${searchClassname}__item`]}:first-child`)
              )?.querySelector(`.${searchStyles[`${searchClassname}__result-button`]}`);

              if (elementToFocusing) {
                (elementToFocusing as HTMLLIElement).focus();
                event.preventDefault();
              }
              break;
          }
        }
      };

      componentElement.addEventListener('keydown', keyDownHandler);

      return () => {
        componentElement.removeEventListener('keydown', keyDownHandler);
      };
    }, [showResults]);

    if (points.length === 0) {
      return null;
    }

    return (
      <div
        ref={componentElementRef}
        className={cs(
          searchStyles[searchClassname],
          {
            [searchStyles[`${searchClassname}_is-focused`]]: isFocused || query.length > 0,
          },
          className,
        )}
      >
        <div className={searchStyles[`${searchClassname}__input-wrapper`]}>
          <input
            ref={(element) => {
              inputElementRef.current = element;
              provideForwardRef(element, forwardRef as any);
            }}
            className={searchStyles[`${searchClassname}__input`]}
            type="text"
            onBlur={() => setIsFocused(false)}
            onChange={({ target: { value } }) => {
              if (value.trim().length === 0) {
                setQuery('');
              }

              setQuery(value);
            }}
            onFocus={() => {
              if (onFocus) {
                onFocus();
              }

              setIsFocused(true);
            }}
            placeholder={t('block-points-of-service.search-field-placeholder', '')}
            value={query}
          />
          <div className={searchStyles[`${searchClassname}__buttons-wrapper`]}>
            {query.length > 0 ? (
              <button
                className={searchStyles[`${searchClassname}__button`]}
                onClick={() => {
                  setQuery('');
                  inputElementRef.current?.focus();
                }}
                type="button"
              >
                <Icon className={searchStyles[`${searchClassname}__button-icon`]} code={IconCode.clearCross} />
              </button>
            ) : null}
            <button
              className={cs(
                searchStyles[`${searchClassname}__button`],
                searchStyles[`${searchClassname}__button_search`],
              )}
              onClick={() => {
                const { current: inputElement } = inputElementRef;

                if (inputElement) {
                  inputElement.focus();
                }
              }}
              type="button"
            >
              <Icon className={searchStyles[`${searchClassname}__button-icon`]} code={IconCode.magnifyingGlass} />
            </button>
          </div>
        </div>
        {showResults && query.length > 0 && filteredPoints.length > 0 ? (
          <ul className={searchStyles[`${searchClassname}__results`]}>
            {filteredPoints.map((point) => {
              const { address, id, title } = point;

              return (
                <li key={id} className={searchStyles[`${searchClassname}__item`]}>
                  <button
                    className={searchStyles[`${searchClassname}__result-button`]}
                    onClick={() => {
                      if (onPointSelected) {
                        onPointSelected(point);
                      }
                    }}
                  >
                    <div className={searchStyles[`${searchClassname}__title`]}>{title}</div>
                    <div className={searchStyles[`${searchClassname}__address`]}>{address}</div>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  },
);

export { Search };
