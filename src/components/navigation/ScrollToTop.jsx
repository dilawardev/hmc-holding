import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/utils/scrolling";

const SIZE = 48;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      setProgress(0);
      setVisible(false);
      return;
    }

    const ratio = Math.min(scrollY / docHeight, 1);
    setProgress(ratio);
    setVisible(scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleScrollToTop = () => {
    scrollToTop("smooth");
  };

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <button
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
      className={[
        "fixed bottom-6 right-6 z-50",
        "inline-flex items-center justify-center",
        "rounded-full bg-white shadow-lg ring-1 ring-black/5",
        "transition-all duration-300 ease-out",
        "hover:scale-105 hover:shadow-xl",
        "cursor-pointer",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
      style={{ width: SIZE, height: SIZE }}
    >
      {/* SVG progress ring */}
      <svg
        className="absolute inset-0"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        {/* Track */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#0D354C"
          strokeWidth={STROKE}
          opacity={0.15}
        />
        {/* Progress */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#D6B26F"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          className="transition-[stroke-dashoffset] duration-100 ease-out"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>

      {/* Arrow icon */}
      <ArrowUp className="relative h-5 w-5 text-[#0D354C]" />
    </button>
  );
}
