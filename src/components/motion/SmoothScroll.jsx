import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppReady } from "@/context/AppReadyContext";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const ready = useAppReady();

  useEffect(() => {
    if (!ready) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.0,
    });
    window.__hmcLenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Important: make sure ScrollTrigger measures after Lenis is ready
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      if (window.__hmcLenis === lenis) {
        delete window.__hmcLenis;
      }
    };
  }, [ready]);

  return children;
}
