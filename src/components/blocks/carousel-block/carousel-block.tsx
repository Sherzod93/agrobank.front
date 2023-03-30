import cs from 'classnames';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { AbstractBlockProps, BlockWithItemsComponentProps, ExtendedAdviceData, LinkData } from '../../../interfaces';
import { Advice } from '../../units/business/advice/advice';
import { Button, ButtonType } from '../../units/controls/button/button';
import carouselBlockStyles from './style.module.scss';

const carouselBlockClassname = 'carousel-block';

enum Direction {
  prev = 'prev',
  next = 'next',
}

export type CarouselItemData = ExtendedAdviceData;

export interface CarouselBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<CarouselItemData> {
  linkToAllItems: LinkData;
}

const CarouselBlock: FC<CarouselBlockProps> = ({ items, className, linkToAllItems }) => {
  const navigate = useNavigate();
  const swiperElementRef = useRef<HTMLDivElement>(null);
  const nextSlideButtonElementRef = useRef<HTMLButtonElement>(null);
  const prevSlideButtonElementRef = useRef<HTMLButtonElement>(null);
  const [isCenterCarousel, setIsCenterCarousel] = useState(false);
  const [isNextSlideButtonVisible, setIsNextSlideButtonVisible] = useState(false);
  const [isPrevSlideButtonVisible, setIsPrevSlideButtonVisible] = useState(false);
  const handleControlClick = useCallback(
    (direction: Direction) => {
      const {
        current: { swiper },
      } = swiperElementRef as any;

      if (swiper) {
        switch (direction) {
          case Direction.next:
            swiper.slideNext();
            break;
          case Direction.prev:
            swiper.slidePrev();
            break;
        }
      }
    },
    [swiperElementRef],
  );
  const { title: linkToAllTitle, url: linkToAllUrl } = linkToAllItems;

  useEffect(() => {
    const {
      current: { swiper },
    } = swiperElementRef as any;

    if (swiper) {
      const { current: nextSlideButtonElement } = nextSlideButtonElementRef;
      const { current: prevSlideButtonElement } = prevSlideButtonElementRef;
      const handler = (swiper: any) => {
        const { isBeginning, isEnd } = swiper;

        if (nextSlideButtonElement) {
          nextSlideButtonElement.disabled = isEnd;
        }

        if (prevSlideButtonElement) {
          prevSlideButtonElement.disabled = isBeginning;

          if (swiperElementRef.current && swiperElementRef.current.offsetWidth < swiper.wrapperEl.scrollWidth) {
            setIsCenterCarousel(false);
            setIsNextSlideButtonVisible(true);
            setIsPrevSlideButtonVisible(true);
          } else {
            setIsCenterCarousel(true);
            setIsNextSlideButtonVisible(false);
            setIsPrevSlideButtonVisible(false);
          }

          if (!isBeginning) {
            setIsPrevSlideButtonVisible(true);
          } else {
            setIsPrevSlideButtonVisible(false);
          }
        }
      };

      swiper.on('fromEdge', handler);
      swiper.on('toEdge', handler);
      handler(swiper);
    }
  }, []);

  return (
    <div className={cs(carouselBlockStyles[`${carouselBlockClassname}`], className)}>
      <Swiper
        // @ts-ignore
        ref={swiperElementRef}
        className={cs(carouselBlockStyles[`${carouselBlockClassname}__swiper`], {
          [carouselBlockStyles[`${carouselBlockClassname}__swiper_center`]]: isCenterCarousel,
        })}
        navigation={true}
        slidesPerView={'auto'}
        wrapperTag={'ul'}
      >
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            className={carouselBlockStyles[`${carouselBlockClassname}__item-wrapper`]}
            tag={'li'}
          >
            <Advice className={carouselBlockStyles[`${carouselBlockClassname}__item`]} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        ref={prevSlideButtonElementRef}
        className={cs(
          carouselBlockStyles[`${carouselBlockClassname}__control`],
          carouselBlockStyles[`${carouselBlockClassname}__control_prev`],
          {
            [carouselBlockStyles[`${carouselBlockClassname}__control_hidden`]]: !isPrevSlideButtonVisible,
          },
        )}
        onClick={() => handleControlClick(Direction.prev)}
        type="button"
      >
        <span
          className={carouselBlockStyles[`${carouselBlockClassname}__control_icon`]}
          dangerouslySetInnerHTML={{ __html: '←' }}
        />
      </button>
      <button
        ref={nextSlideButtonElementRef}
        className={cs(
          carouselBlockStyles[`${carouselBlockClassname}__control`],
          carouselBlockStyles[`${carouselBlockClassname}__control_next`],
          {
            [carouselBlockStyles[`${carouselBlockClassname}__control_hidden`]]: !isNextSlideButtonVisible,
          },
        )}
        onClick={() => handleControlClick(Direction.next)}
        type="button"
      >
        <span
          className={carouselBlockStyles[`${carouselBlockClassname}__control_icon`]}
          dangerouslySetInnerHTML={{ __html: '→' }}
        />
      </button>
      {linkToAllUrl && (
        <Button
          buttonType={ButtonType.secondary}
          className={carouselBlockStyles[`${carouselBlockClassname}__articles`]}
          onClick={() => navigate(linkToAllUrl)}
          withArrow={true}
        >
          {linkToAllTitle}
        </Button>
      )}
    </div>
  );
};

export { CarouselBlock };
