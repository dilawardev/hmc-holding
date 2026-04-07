import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppReady } from "@/context/AppReadyContext";
import { scrollToTop } from "@/utils/scrolling";

export default function RouteScrollReset() {
  const { pathname, search } = useLocation();
  const ready = useAppReady();

  useEffect(() => {
    if (!ready) return undefined;

    scrollToTop("auto");

    const rafId = window.requestAnimationFrame(() => {
      scrollToTop("auto");
    });
    const timeoutId = window.setTimeout(() => {
      scrollToTop("auto");
    }, 80);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [ready, pathname, search]);

  return null;
}
