// LandingShell.jsx
import React, { useEffect, useRef } from "react";
import Hero from "./Hero";
import AboutScrollHero from "./AboutScrollHero";

export default function LandingShell() {
  const rafRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;

    const setVars = (mx, my, mxp, myp) => {
      root.style.setProperty("--mx", mx);
      root.style.setProperty("--my", my);
      root.style.setProperty("--mxp", mxp);
      root.style.setProperty("--myp", myp);
    };

    const setDefaults = () => setVars("0", "0", "50%", "35%");
    setDefaults();

    const onMove = (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;

      const x = e.clientX;
      const y = e.clientY;

      const nx = (x / w - 0.5) * 2; // -1..1
      const ny = (y / h - 0.5) * 2; // -1..1

      const px = Math.max(0, Math.min(100, (x / w) * 100));
      const py = Math.max(0, Math.min(100, (y / h) * 100));

      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setVars(
          Math.max(-1, Math.min(1, nx)).toFixed(3),
          Math.max(-1, Math.min(1, ny)).toFixed(3),
          `${px.toFixed(1)}%`,
          `${py.toFixed(1)}%`
        );
      });
    };

    const onLeave = () => setDefaults();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setDefaults();
    };
  }, []);

  return (
    <div className="relative">
      {/* ✅ ONE shared background for both sections */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(800px circle at var(--mxp, 50%) var(--myp, 35%),
              rgba(255,255,255,.18), transparent 60%),
            radial-gradient(700px circle at 78% 24%,
              rgba(255,255,255,.10), transparent 55%),
            linear-gradient(135deg, #0D354C 0%, #134A63 55%, #0A2C40 100%)
          `,
        }}
      />

      <Hero />
      <AboutScrollHero />
    </div>
  );
}
