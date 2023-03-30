import cs from 'classnames';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useResizeObserver } from '../../../hooks';
import { AbstractBlockProps, BlockWithItemsComponentProps } from '../../../interfaces';
import { ChronologyItem } from './interfaces';
import chronologyBlockStyles from './style.module.scss';

const chronologyBlockClassname = 'chronology-block';

export interface ChronologyBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<ChronologyItem> {}

const ChronologyBlock: FC<ChronologyBlockProps> = ({ items, className }) => {
  const componentElementRef = useRef<HTMLDivElement>(null);
  const eventsListElementRef = useRef<HTMLUListElement>(null);
  const rhombusPathElementRef = useRef<SVGPathElement>(null);
  const pathElementLengthRef = useRef(0);
  const sliderProgressRef = useRef(0);
  const sliderSnapIndexRef = useRef(0);

  useEffect(() => {
    const { current: rhombusPathElement } = rhombusPathElementRef;

    if (!rhombusPathElement) {
      return;
    }

    pathElementLengthRef.current = Math.trunc(rhombusPathElement.getTotalLength());
  }, []);

  const syncRhombusWithProgress = useCallback(() => {
    const { current: rhombusPathElement } = rhombusPathElementRef;

    if (rhombusPathElement) {
      const { current: pathElementLength } = pathElementLengthRef;
      const { current: progress } = sliderProgressRef;
      const actualProgress = Math.max(0, Math.min(1, progress));
      const strokeDashArrayValue = String(pathElementLength);
      const strokeDashoffsetValue = String(pathElementLength - actualProgress * pathElementLength);

      rhombusPathElement.setAttribute('stroke-dasharray', strokeDashArrayValue);
      rhombusPathElement.setAttribute('stroke-dashoffset', strokeDashoffsetValue);
      rhombusPathElement.style.opacity = String(strokeDashArrayValue !== strokeDashoffsetValue ? 1 : 0);
    }
  }, []);

  const syncEventsListTransformWithProgress = useCallback(() => {
    const { current: componentElement } = componentElementRef;
    const { current: eventsListElement } = eventsListElementRef;

    if (!componentElement || !eventsListElement) {
      return;
    }

    const eventHeight = componentElement.offsetHeight / 2;

    const { current: snapIndex } = sliderSnapIndexRef;

    eventsListElement.style.transform = `translateY(-${snapIndex * eventHeight}px)`;
  }, []);

  const handleSwiperOnProgress = useCallback(
    ({ snapIndex, progress }) => {
      sliderProgressRef.current = progress;
      sliderSnapIndexRef.current = snapIndex;
      syncRhombusWithProgress();
      syncEventsListTransformWithProgress();
    },
    [syncEventsListTransformWithProgress, syncRhombusWithProgress],
  );

  useResizeObserver({ elementRef: componentElementRef, callback: syncEventsListTransformWithProgress });

  return (
    <div ref={componentElementRef} className={cs(chronologyBlockStyles[chronologyBlockClassname], className)}>
      <div className={chronologyBlockStyles[`${chronologyBlockClassname}__events-wrap`]}>
        <div className={chronologyBlockStyles[`${chronologyBlockClassname}__rhombus`]} />
        <Swiper
          centerInsufficientSlides={true}
          centeredSlides={true}
          className={chronologyBlockStyles[`${chronologyBlockClassname}__swiper`]}
          grabCursor={true}
          keyboard={true}
          onProgress={handleSwiperOnProgress}
          onSlideChange={handleSwiperOnProgress}
          mousewheel={{ forceToAxis: true }}
          slideToClickedSlide={true}
          slidesPerView={'auto'}
          watchSlidesProgress={true}
          wrapperTag={'ul'}
        >
          {items.map(({ id, eventItem, timelineItem }) => (
            <SwiperSlide
              key={id}
              className={chronologyBlockStyles[`${chronologyBlockClassname}__swiper-item`]}
              tag={'li'}
            >
              {({ isActive }) => (
                <span
                  className={cs(chronologyBlockStyles[`${chronologyBlockClassname}__timeline-item-title`], {
                    [chronologyBlockStyles[`${chronologyBlockClassname}__has-value`]]:
                      isActive && eventItem.text.length,
                  })}
                  dangerouslySetInnerHTML={{ __html: timelineItem.title }}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <svg
          className={chronologyBlockStyles[`${chronologyBlockClassname}__empty-rhombus`]}
          fill="none"
          height="390"
          width="390"
        >
          <path ref={rhombusPathElementRef} d="M9.9 195 195 9.9 380.1 195 195 380.101z" style={{ opacity: 0 }} />
        </svg>
        <ul ref={eventsListElementRef} className={cs(chronologyBlockStyles[`${chronologyBlockClassname}__events`])}>
          {items.map(({ id, eventItem }) => (
            <li key={id} className={chronologyBlockStyles[`${chronologyBlockClassname}__event`]}>
              <span
                className={chronologyBlockStyles[`${chronologyBlockClassname}__event_text`]}
                dangerouslySetInnerHTML={{ __html: eventItem.text }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { ChronologyBlock };
