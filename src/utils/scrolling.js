function nativeScrollToTop(behavior = "auto") {
  window.scrollTo({ top: 0, left: 0, behavior });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function getLenisInstance() {
  if (typeof window === "undefined") return null;
  return window.__hmcLenis || null;
}

export function scrollToTop(behavior = "auto") {
  const lenis = getLenisInstance();

  if (lenis) {
    lenis.scrollTo(0, {
      immediate: behavior !== "smooth",
      duration: behavior === "smooth" ? 1 : 0,
      force: true,
    });
  }

  nativeScrollToTop(behavior);
}
