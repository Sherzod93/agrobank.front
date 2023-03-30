import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { loadingLazySubscriber } from '../../../../helpers';
import { useResizeObserver } from '../../../../hooks';

const listElementToDataMap = new WeakMap();
const { subscribe: subscribeForLoadingLazy, unsubscribe: unsubscribeFromLoadingLazy } = loadingLazySubscriber;

export const useTickerAnimation = ({
  itemHiddenModifierClassname,
  listElementRef,
  onDestroy,
  onInit,
  onTick,
  ready = false,
}: {
  itemHiddenModifierClassname: string;
  listElementRef: RefObject<HTMLUListElement>;
  onDestroy?: () => void;
  onInit?: () => void;
  onTick?: () => void;
  ready: boolean;
}) => {
  const listItemElementsRef = useRef<Element[]>();
  const listTailElementRef = useRef<Element>();
  const canPlayRef = useRef(false);
  const pause = useCallback(() => {
    if (ready) {
      listElementToDataMap.get(listElementRef.current!).playing = false;
    }
  }, [listElementRef, ready]);
  const play = useCallback(() => {
    if (ready) {
      listElementToDataMap.get(listElementRef.current!).playing = true;
    }
  }, [listElementRef, ready]);
  const toggle = useCallback(() => {
    if (ready) {
      if (listElementToDataMap.get(listElementRef.current!).playing) {
        return pause();
      }

      return play();
    }
  }, [listElementRef, pause, play, ready]);
  const [isAppeared, setIsAppeared] = useState(false);

  useEffect(() => {
    const { current: listElement } = listElementRef;

    if (!listElement) {
      return;
    }

    subscribeForLoadingLazy(listElement, ({ isIntersecting }) => {
      if (isIntersecting) {
        unsubscribeFromLoadingLazy(listElement);
        setIsAppeared(true);
      }
    });

    return () => {
      unsubscribeFromLoadingLazy(listElement);
    };
  }, [listElementRef]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const { current: listElement } = listElementRef;

    if (!listElement) {
      return;
    }

    if (!listElementToDataMap.has(listElement)) {
      listElementToDataMap.set(listElement, { playing: false, translateX: 0 });
    }

    const children = [...listElement.children];

    listItemElementsRef.current = children.slice(0, -1);
    listTailElementRef.current = children.slice(-1)[0];
  }, [ready, listElementRef, listItemElementsRef]);

  useEffect(() => {
    if (!ready || !isAppeared) {
      return;
    }

    const { current: listElement } = listElementRef;
    const { current: listItemElements } = listItemElementsRef;

    if (!listElement || !listItemElements) {
      return;
    }

    const data = listElementToDataMap.get(listElement);

    data.playing = true;

    let requestAnimationFrameId: number;

    const translate = () => {
      if (canPlayRef.current) {
        if (data.playing) {
          data.translateX -= 1;
        }
      } else {
        listItemElements.forEach((listItemElement) => {
          listItemElement.classList.remove(itemHiddenModifierClassname);
        });
        data.translateX = 0;
      }

      if (data.playing) {
        listElement.style.transform = `translateX(${data.translateX}px)`;
      }

      if (onTick) {
        onTick();
      }

      requestAnimationFrameId = requestAnimationFrame(translate);
    };

    requestAnimationFrameId = requestAnimationFrame(translate);

    if (onInit) {
      onInit();
    }

    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
      data.playing = false;

      if (onDestroy) {
        onDestroy();
      }
    };
  }, [ready, listElementRef, isAppeared, itemHiddenModifierClassname, onInit, onTick, onDestroy]);

  useEffect(() => {
    if (!ready || !isAppeared) {
      return;
    }

    const { current: listItemElements } = listItemElementsRef;

    if (!listItemElements) {
      return;
    }

    if (listItemElements.length) {
      const { current: listElement } = listElementRef;
      const listElementParentElement = listElement?.parentElement;

      if (!listElement || !listElementParentElement) {
        return;
      }

      const data = listElementToDataMap.get(listElement);
      const lastItemElement = listItemElements.slice(-1)[0];
      const listAndListItemsIntersectionObserver = new IntersectionObserver(([{ isIntersecting, target }]) => {
        if (target === listElementParentElement) {
          data.playing = isIntersecting;
        }

        if (!isIntersecting && data.playing) {
          data.translateX = 0;

          if (target !== lastItemElement) {
            setTimeout(() => {
              target.classList.add(itemHiddenModifierClassname);
            });
          } else {
            setTimeout(() => {
              listItemElements.forEach((listItemElement) => {
                listItemElement.classList.remove(itemHiddenModifierClassname);
              });
            });
          }
        }
      });

      listAndListItemsIntersectionObserver.observe(listElementParentElement);

      listItemElements.forEach((listItemElement) => {
        listAndListItemsIntersectionObserver.observe(listItemElement);
      });

      return () => {
        listAndListItemsIntersectionObserver.disconnect();
      };
    }
  }, [ready, listElementRef, listItemElementsRef, listTailElementRef, isAppeared, itemHiddenModifierClassname]);

  const listElementResizeHandler = useCallback(
    ([
      {
        contentRect: { width },
      },
    ]) => {
      if (!ready || !isAppeared) {
        return;
      }

      const { current: listItemElements } = listItemElementsRef;
      const { current: listTailElement } = listTailElementRef;

      if (!listItemElements || !listTailElement) {
        return;
      }

      listTailElement.innerHTML = '';

      let summaryWidth = 0;
      const clonedElements = [];

      for (let i = 0; summaryWidth < width && i < listItemElements.length; i += 1) {
        summaryWidth += listItemElements[i].clientWidth;
        clonedElements.push(listItemElements[i].firstElementChild?.cloneNode(true) as Element);
      }

      if (summaryWidth > width) {
        canPlayRef.current = true;
        clonedElements.forEach((clonedImage) => {
          listTailElement.appendChild(clonedImage);
        });
      } else {
        canPlayRef.current = false;
      }
    },
    [ready, isAppeared],
  );

  useResizeObserver({
    elementRef: listElementRef,
    callback: listElementResizeHandler,
  });

  return {
    pause,
    play,
    toggle,
  };
};
