/**
 * Lightweight reactive state store using native JavaScript Proxy.
 * Provides transparent subscription to state mutations without framework overhead.
 */

export function createStore(initialState) {
  const subscribers = new Set();

  const state = new Proxy(initialState, {
    set(target, prop, value) {
      const prevValue = target[prop];
      target[prop] = value;

      if (prevValue !== value) {
        subscribers.forEach((fn) => {
          try {
            fn(prop, value, prevValue);
          } catch (err) {
            console.error(`[Store] Error in subscriber for "${String(prop)}":`, err);
          }
        });
      }
      return true;
    }
  });

  return {
    state,
    subscribe(fn) {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    }
  };
}
