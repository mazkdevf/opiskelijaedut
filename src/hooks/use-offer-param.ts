import { useCallback, useRef, useSyncExternalStore } from "react";

const PARAM = "offer";
const CHANGE_EVENT = "offerparamchange";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getSnapshot() {
  return new URLSearchParams(window.location.search).get(PARAM);
}

export function useOfferParam() {
  const slug = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const pushed = useRef(false);

  const open = useCallback((next: string) => {
    const params = new URLSearchParams({ [PARAM]: next });
    window.history.pushState(null, "", `?${params}`);
    pushed.current = true;
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      window.history.back();
      return;
    }
    window.history.replaceState(null, "", window.location.pathname);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { slug, open, close };
}
