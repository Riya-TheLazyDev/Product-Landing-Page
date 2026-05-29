/** Cross-page product cache invalidation after admin CRUD. */
const EVENT_NAME = "elevara:products-changed";

type Listener = () => void;
const listeners = new Set<Listener>();

export function notifyProductCatalogChanged(): void {
  listeners.forEach((listener) => listener());
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }
}

export function subscribeProductCatalog(listener: Listener): () => void {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    const onWindow = () => listener();
    window.addEventListener(EVENT_NAME, onWindow);
    return () => {
      listeners.delete(listener);
      window.removeEventListener(EVENT_NAME, onWindow);
    };
  }
  return () => listeners.delete(listener);
}
