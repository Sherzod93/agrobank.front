import cs from 'classnames';
import { FC, useCallback, useEffect, useRef } from 'react';
import { useBaseBackgroundColor } from '../../../../contexts';
import { useResizeObserver } from '../../../../hooks';
import { WithClassNameComponentProps } from '../../../../interfaces';
import tabsStyles from './style.module.scss';

const tabsClassname = 'tabs';
const selectedTabClassname = tabsStyles[`${tabsClassname}__option-wrapper_selected`];

interface TabsProps {
  options: string[];
  onSelect?: (index: number) => void;
  selectedOptionIx?: number;
}

const Tabs: FC<TabsProps & WithClassNameComponentProps> = ({ className, onSelect, options, selectedOptionIx = 0 }) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const componentElementRef = useRef<HTMLDivElement>(null);
  const tabsOptionsRef = useRef<HTMLUListElement>(null);
  const tabsOptionBgRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const tabBackground = useCallback(() => {
    const bodyIndent = parseInt(getComputedStyle(document.body).getPropertyValue('padding-left'));
    const selectedTabElement = getSelectedTabElement();

    if (selectedTabElement) {
      const componentElementBounds = componentElementRef.current?.getBoundingClientRect();
      const tabElementBounds = selectedTabElement.getBoundingClientRect();
      const ulElementBounds = tabsOptionsRef.current?.getBoundingClientRect();

      if (componentElementBounds && componentElementRef.current && tabsOptionBgRef.current && ulElementBounds) {
        const indent = parseInt(getComputedStyle(componentElementRef.current).getPropertyValue('padding-left'));
        const padding = (componentElementBounds.width - ulElementBounds.width) / 2;

        tabsOptionBgRef.current.style.marginLeft =
          ulElementBounds.x < 0
            ? `${tabElementBounds.x - ulElementBounds.x + indent}px`
            : `${tabElementBounds.x - bodyIndent - ulElementBounds.x + (padding > indent ? padding : indent)}px`;
        tabsOptionBgRef.current.style.width = `${tabElementBounds.width}px`;
        tabsOptionBgRef.current.style.transition = !firstRender.current ? 'all 0.3s cubic-bezier(0, 0, 0, 1)' : 'none';
      }
    }
  }, []);

  const getSelectedTabElement = (): Element | null => {
    const { current: componentElement } = componentElementRef;

    if (!componentElement) {
      return null;
    }

    return componentElement.querySelector(`.${selectedTabClassname}`);
  };

  const resizeCallback = useCallback(() => {
    tabBackground();
  }, [tabBackground]);

  useResizeObserver({ elementRef: componentElementRef, callback: resizeCallback });

  useEffect(() => {
    const selectedTabElement = getSelectedTabElement();

    if (selectedTabElement) {
      tabBackground();

      if (firstRender.current) {
        firstRender.current = false;

        return;
      }

      selectedTabElement.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
  }, [selectedOptionIx, tabBackground]);

  if (options.length === 0) {
    return null;
  }

  return (
    <div
      ref={componentElementRef}
      className={cs(
        tabsStyles[tabsClassname],
        tabsStyles[`${tabsClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      <ul className={tabsStyles[`${tabsClassname}__options`]} ref={tabsOptionsRef}>
        {options.map((option, index) => (
          <li
            key={index}
            className={cs(tabsStyles[`${tabsClassname}__option-wrapper`], {
              [selectedTabClassname]: selectedOptionIx === index,
            })}
          >
            <button
              aria-pressed={selectedOptionIx === index}
              className={tabsStyles[`${tabsClassname}__option`]}
              disabled={selectedOptionIx === index}
              dangerouslySetInnerHTML={{ __html: option }}
              type="button"
              onClick={() => onSelect && onSelect(index)}
            />
          </li>
        ))}
        <div className={tabsStyles[`${tabsClassname}__option-bg`]} ref={tabsOptionBgRef} />
      </ul>
    </div>
  );
};

export { Tabs };
