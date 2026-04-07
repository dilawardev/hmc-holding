import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "@/preloader.css";

export default function Preloader({ onDone }) {
  const preloaderRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!preloaderRef.current) return;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone?.();
    };

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline.to(".mil-preloader-animation", { opacity: 1 });

      timeline.fromTo(
        ".mil-animation-1 .mil-h3",
        { y: "30px", opacity: 0 },
        { y: "0px", opacity: 1, stagger: 0.4 },
      );

      timeline.to(".mil-animation-1 .mil-h3", { opacity: 0, y: "-30" }, "+=.3");

      timeline.fromTo(
        ".mil-reveal-box",
        { opacity: 0 },
        { opacity: 1, x: "-30", duration: 0.1 },
      );

      timeline.to(
        ".mil-reveal-box",
        { width: "100%", x: 0, duration: 0.45 },
        "+=.1",
      );
      timeline.to(".mil-reveal-box", { right: "0" });
      timeline.to(".mil-reveal-box", { width: "0%", duration: 0.3 });

      timeline.fromTo(
        ".mil-animation-2 .mil-h3",
        { opacity: 0 },
        { opacity: 1 },
        "-=.5",
      );

      timeline.to(
        ".mil-animation-2 .mil-h3",
        { opacity: 0, y: "-30", duration: 0.6 },
        "+=.5",
      );

      timeline.to(
        ".mil-preloader",
        {
          opacity: 0,
          ease: "sine",
          duration: 0.8,
          onComplete: () => {
            preloaderRef.current?.classList.add("mil-hidden");
            finish();
          },
        },
        "+=.2",
      );
    }, preloaderRef);

    // Fallback in case timeline is interrupted
    const safety = window.setTimeout(finish, 5000);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
    };
  }, [onDone]);

  return (
    <div ref={preloaderRef} className="mil-preloader">
      <div className="mil-preloader-animation">
        <div className="mil-pos-abs mil-animation-1">
          <p className="mil-h3 mil-muted mil-thin">Pioneering</p>
          <p className="mil-h3 mil-muted">Creative</p>
          <p className="mil-h3 mil-muted mil-thin">Excellence</p>
        </div>
        <div className="mil-pos-abs mil-animation-2">
          <div className="mil-reveal-frame">
            <p className="mil-reveal-box"></p>
            <p className="mil-h3 mil-muted mil-thin">hmc-holding.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
