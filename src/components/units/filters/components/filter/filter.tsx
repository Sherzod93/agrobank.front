import cs from 'classnames';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useBaseBackgroundColor } from '../../../../../contexts';
import {
  ComponentRenderType,
  FilterData,
  FilterItemData,
  WithClassNameComponentProps,
} from '../../../../../interfaces';
import { Icon, IconCode } from '../../../icon/icon';
import filterStyles from './style.module.scss';

const filterClassname = 'filter';

export enum FilterAppearance {
  default = 'default',
  tag = 'tag',
}

interface FilterProps {
  appearance?: FilterAppearance;
  filter: FilterData;
  lexemePrefix?: string;
  onChange: (filterValue: { code: string; id: number | null }) => void;
  renderType?: ComponentRenderType;
}

const Filter: FC<FilterProps & WithClassNameComponentProps> = ({
  appearance = FilterAppearance.default,
  className,
  filter: {
    code: filterCode,
    defaultItemId: filterDefaultItemId,
    items: filterItems,
    isShowsMultipleValue,
    withAllOption: isFilterWithAllOptionPresented,
  },
  lexemePrefix,
  onChange,
  renderType = ComponentRenderType.default,
}) => {
  const {
    i18n: { t },
  } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { baseBackgroundColor } = useBaseBackgroundColor();

  const allLexeme = useMemo(() => {
    return isFilterWithAllOptionPresented ? t(`filters.${lexemePrefix}_${filterCode}_all`) : '';
  }, [filterCode, isFilterWithAllOptionPresented, lexemePrefix, t]);

  const filterItemsPossiblyWithAll = useMemo(() => {
    const result: FilterItemData[] = [];

    if (isFilterWithAllOptionPresented) {
      result.push({
        id: 0,
        code: '',
        title: allLexeme,
      });
    }

    result.push(...filterItems);

    return result;
  }, [allLexeme, filterItems, isFilterWithAllOptionPresented]);

  const filterTabOptions = useMemo(
    () => filterItemsPossiblyWithAll.map(({ title }) => title),
    [filterItemsPossiblyWithAll],
  );

  const filterTabOptionIx = Math.max(
    0,
    filterItemsPossiblyWithAll.findIndex(
      ({ code }) =>
        code === (searchParams.get(filterCode) ?? filterItems.find(({ id }) => id === filterDefaultItemId)?.code),
    ),
  );

  const lastCodeRef = useRef<string | null>(null);

  useEffect(() => {
    const { id } = filterItemsPossiblyWithAll[filterTabOptionIx];

    if (id === 0 && lastCodeRef.current !== null) {
      searchParams.delete(filterCode);
      setSearchParams(searchParams, { replace: true });
    }
  }, [filterCode, filterItemsPossiblyWithAll, filterTabOptionIx, searchParams, setSearchParams]);

  useEffect(() => {
    const { id } = filterItemsPossiblyWithAll[filterTabOptionIx];

    onChange(
      id !== 0
        ? {
            code: filterCode,
            id,
          }
        : {
            code: filterCode,
            id: null,
          },
    );
  }, [filterCode, onChange, searchParams, filterItemsPossiblyWithAll, filterTabOptionIx, setSearchParams]);

  const [isFocused, setIsFocused] = useState(false);

  const [isFolded, setIsFolded] = useState(true);

  const onValueChanged = (selectedOptionIx: number) => {
    const { code } = filterItemsPossiblyWithAll[selectedOptionIx];

    if (code) {
      if (code !== lastCodeRef.current) {
        lastCodeRef.current = code;
        searchParams.set(filterCode, code);
        setSearchParams(searchParams, { replace: true });
      }
    } else if (lastCodeRef.current !== null) {
      lastCodeRef.current = code;
      searchParams.delete(filterCode);
      setSearchParams(searchParams, { replace: true });
    }
  };

  const componentElementRef = useRef<any>(null);

  useEffect(() => {
    const { current: componentElement } = componentElementRef;

    if (!componentElement) {
      return;
    }

    if (isFolded) {
      return;
    }

    let isMounted = true;

    const lostFocusHandler = ({ target }: Event) => {
      if (!componentElement.contains(target as HTMLLIElement) && isMounted) {
        setIsFolded(true);
      }
    };

    document.addEventListener('focus', lostFocusHandler, { capture: true, passive: true });
    document.addEventListener('click', lostFocusHandler, { capture: true, passive: true });

    return () => {
      document.removeEventListener('focus', lostFocusHandler);
      document.removeEventListener('click', lostFocusHandler);

      isMounted = false;
    };
  }, [isFolded]);

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
        componentElement.focus({ preventScroll: true });
        setIsFolded(true);
        return;
      }

      if (focusedElement.matches(`.${filterStyles[`${filterClassname}__value-wrapper`]}`)) {
        switch (key) {
          case 'Enter':
          case ' ': {
            if (isFolded) {
              setIsFolded(false);
            } else {
              setIsFolded(true);
            }
            break;
          }
          case 'ArrowDown': {
            event.preventDefault();

            if (isFolded) {
              setIsFolded(false);
            } else {
              (
                componentElement.querySelector(
                  `.${filterStyles[`${filterClassname}__value-item`]}:nth-child(${filterTabOptionIx + 1})`,
                ) as HTMLLIElement | undefined
              )?.focus({ preventScroll: true });
            }
            break;
          }
        }
      }

      if (focusedElement.matches(`.${filterStyles[`${filterClassname}__value-item`]}`)) {
        switch (key) {
          case 'ArrowUp': {
            event.preventDefault();

            const elementToFocusing =
              focusedElement.previousElementSibling ??
              componentElement.querySelector(`.${filterStyles[`${filterClassname}__value-item`]}:last-child`);

            if (elementToFocusing) {
              (elementToFocusing as HTMLLIElement).focus({ preventScroll: true });
            }

            break;
          }
          case 'ArrowDown': {
            event.preventDefault();

            const elementToFocusing =
              focusedElement.nextElementSibling ??
              componentElement.querySelector(`.${filterStyles[`${filterClassname}__value-item`]}:first-child`);

            if (elementToFocusing) {
              (elementToFocusing as HTMLLIElement).focus({ preventScroll: true });
            }
            break;
          }
          case 'Enter':
          case ' ': {
            focusedElement.dispatchEvent(new Event('click', { bubbles: true }));
            componentElement.focus({ preventScroll: true });

            break;
          }
        }
      }
    };

    componentElement.addEventListener('keydown', keyDownHandler);

    return () => {
      componentElement.removeEventListener('keydown', keyDownHandler);
    };
  }, [filterTabOptionIx, isFolded]);

  if (filterItems.length === 0) {
    return null;
  }

  if (isShowsMultipleValue && filterItems.length === 1) {
    return null;
  }

  const TagName = renderType === ComponentRenderType.listItem ? 'li' : 'div';

  return (
    <TagName
      ref={componentElementRef}
      className={cs(
        filterStyles[filterClassname],
        filterStyles[`${filterClassname}_appearance_${appearance}`],
        filterStyles[`${filterClassname}_render-type_${renderType}`],
        {
          [filterStyles[`${filterClassname}_is-focused`]]: isFocused,
          [filterStyles[`${filterClassname}_is-folded`]]: isFolded,
        },
        className,
      )}
    >
      <div
        aria-expanded={!isFolded}
        role="button"
        className={filterStyles[`${filterClassname}__value-wrapper`]}
        onBlur={() => {
          setIsFocused(false);
        }}
        onClick={() => {
          setIsFolded((isFolded) => !isFolded);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        tabIndex={0}
      >
        <div className={filterStyles[`${filterClassname}__current-value`]}>
          <div
            className={filterStyles[`${filterClassname}__current-value-title`]}
            dangerouslySetInnerHTML={{ __html: filterTabOptions[filterTabOptionIx] }}
          />
          <Icon className={filterStyles[`${filterClassname}__icon`]} code={IconCode.expandArrow} />
        </div>
        <ul
          className={cs(
            filterStyles[`${filterClassname}__value-list`],
            filterStyles[`${filterClassname}__value-list_base-background-color_${baseBackgroundColor}`],
          )}
        >
          {filterTabOptions.map((title, ix) => (
            <li
              key={ix}
              className={cs(filterStyles[`${filterClassname}__value-item`], {
                [filterStyles[`${filterClassname}__value-item_is-selected`]]: ix === filterTabOptionIx,
              })}
              dangerouslySetInnerHTML={{ __html: title }}
              onClick={() => onValueChanged(ix)}
              tabIndex={0}
            />
          ))}
        </ul>
      </div>
    </TagName>
  );
};

export { Filter };
