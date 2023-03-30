const targetToCallbackMap = new WeakMap();

const loadingLazySubscriber = Object.freeze({
  subscribe(target: HTMLElement, callback: (entity: IntersectionObserverEntry) => void) {
    intersectionObserver.observe(target);
    targetToCallbackMap.set(target, callback);
  },
  unsubscribe(target: HTMLElement) {
    targetToCallbackMap.delete(target);
    intersectionObserver.unobserve(target);
  },
});

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const { target } = entry;
      const callback = targetToCallbackMap.get(target);

      if (callback) {
        callback.call(null, entry);
      }
    });
  },
  {
    rootMargin: '700px 700px 700px 700px',
  },
);

export { loadingLazySubscriber };
