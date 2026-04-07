import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppReady } from "@/context/AppReadyContext";

import EllingtonLogo from "@/assets/partners/Ellington_58133c54d4.webp";
import EmaarLogo from "@/assets/partners/Emaar_f229e25788.webp";
import Logo01 from "@/assets/partners/logo_01_4fd8dc607d.webp";
import Logo02A from "@/assets/partners/logo_02_1_666ef04015.webp";
import Logo02B from "@/assets/partners/logo_02_9c1f49f13a.webp";
import MajidLogo from "@/assets/partners/Majid_Al_Futtaim_b3d70262eb.webp";
import MeraasLogo from "@/assets/partners/Meraas_logo_58aa6236ab.webp";
import SelectLogo from "@/assets/partners/Select_Group_be8d857695.webp";

gsap.registerPlugin(ScrollTrigger);

const innerPartners = [
  { name: "Emaar", logo: EmaarLogo },
  { name: "Majid Al Futtaim", logo: MajidLogo },
  { name: "Meraas", logo: MeraasLogo },
  { name: "Select Group", logo: SelectLogo },
  { name: "Ellington", logo: EllingtonLogo },
  { name: "Partner Collective", logo: Logo01 },
  { name: "Premier Partner", logo: Logo02A },
  { name: "Global Partner", logo: Logo02B },
];

const outerPartners = [
  { name: "Ellington", logo: EllingtonLogo },
  { name: "Partner Collective", logo: Logo01 },
  { name: "Premier Partner", logo: Logo02A },
  { name: "Global Partner", logo: Logo02B },
  { name: "Emaar", logo: EmaarLogo },
  { name: "Majid Al Futtaim", logo: MajidLogo },
  { name: "Meraas", logo: MeraasLogo },
  { name: "Select Group", logo: SelectLogo },
];

export default function Partners() {
  const sectionRef = useRef(null);
  const innerRingRef = useRef(null);
  const outerRingRef = useRef(null);
  const labelRef = useRef(null);
  const ready = useAppReady();

  useLayoutEffect(() => {
    if (!ready) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mm = gsap.matchMedia();

    const setup = (vals) => {
      const ctx = gsap.context(() => {
        // base vars
        gsap.set(sectionRef.current, { "--halo": 0.6, "--burst": 0.98 });

        // ring starting positions + responsive icon box sizes
        gsap.set(innerRingRef.current, {
          rotate: 0,
          "--d": vals.innerStart,
          "--iconScale": vals.innerScaleStart,
          "--iconBox": vals.innerBox,
        });

        gsap.set(outerRingRef.current, {
          rotate: 0,
          "--d": vals.outerStart,
          "--iconScale": vals.outerScaleStart,
          "--iconBox": vals.outerBox,
        });

        gsap.set(labelRef.current, { autoAlpha: 0, scale: 0.92 });

        if (prefersReduced) {
          gsap.set(labelRef.current, { autoAlpha: 1, scale: 1 });
          gsap.set(innerRingRef.current, {
            rotate: 0,
            "--d": vals.innerEnd,
            "--iconScale": vals.innerScaleEnd,
          });
          gsap.set(outerRingRef.current, {
            rotate: 0,
            "--d": vals.outerEnd,
            "--iconScale": vals.outerScaleEnd,
          });
          gsap.set(sectionRef.current, { "--halo": 1, "--burst": 1.04 });
          return;
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .to(labelRef.current, { autoAlpha: 1, scale: 1, ease: "none" }, 0)
          .to(innerRingRef.current, { "--d": vals.innerEnd, ease: "none" }, 0)
          .to(outerRingRef.current, { "--d": vals.outerEnd, ease: "none" }, 0)
          // icon scale grows as orbit expands
          .to(
            innerRingRef.current,
            { "--iconScale": vals.innerScaleEnd, ease: "none" },
            0
          )
          .to(
            outerRingRef.current,
            { "--iconScale": vals.outerScaleEnd, ease: "none" },
            0
          )
          .to(innerRingRef.current, { rotate: 90, ease: "none" }, 0)
          .to(outerRingRef.current, { rotate: -110, ease: "none" }, 0)
          .to(sectionRef.current, { "--halo": 1, "--burst": 1.06, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    };

    // ✅ Desktop
    mm.add("(min-width: 1024px)", () =>
      setup({
        innerStart: "420px",
        innerEnd: "1160px",
        outerStart: "720px",
        outerEnd: "1900px",

        innerBox: "72px",
        outerBox: "80px",

        innerScaleStart: 1.0,
        innerScaleEnd: 4,
        outerScaleStart: 1.0,
        outerScaleEnd: 4,
      })
    );

    // ✅ Tablet
    mm.add("(min-width: 768px) and (max-width: 1023px)", () =>
      setup({
        innerStart: "320px",
        innerEnd: "820px",
        outerStart: "520px",
        outerEnd: "1320px",

        innerBox: "60px",
        outerBox: "68px",

        innerScaleStart: 0.95,
        innerScaleEnd: 2,
        outerScaleStart: 0.95,
        outerScaleEnd: 2,
      })
    );

    // ✅ Mobile
    mm.add("(max-width: 767px)", () =>
      setup({
        innerStart: "220px",
        innerEnd: "560px",
        outerStart: "360px",
        outerEnd: "860px",

        innerBox: "52px",
        outerBox: "58px",

        innerScaleStart: 1.15,
        innerScaleEnd: 2,
        outerScaleStart: 1.15,
        outerScaleEnd: 2,
      })
    );

    return () => mm.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="
        relative isolate bg-white w-full
        overflow-hidden
        py-14 sm:py-16 md:py-20
      "
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center bg-white z-10 relative">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
            Trusted Partners
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#0D354C] md:text-4xl">
            A network built on execution
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            The companies that move with us across advisory, real estate, and mobility.
          </p>
        </div>

        {/* Responsive container height */}
        <div className="relative mt-10 sm:mt-14 h-[32rem] sm:h-[38rem] md:mt-16 md:h-[52rem] lg:h-[60rem] overflow-visible">
          {/* Sticky only on md+ (mobile stays normal flow) */}
          <div className="relative md:sticky md:top-24 flex h-full items-center justify-center">
            {/* Responsive max size of the square stage */}
            <div className="relative aspect-square w-full max-w-[420px] sm:max-w-[720px] lg:max-w-[1100px] overflow-visible">
              {/* Halo */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D6B26F]/35 blur-3xl"
                style={{ zIndex: -1, opacity: "var(--halo)" }}
              />

              {/* OUTER RING */}
              <div ref={outerRingRef} className="absolute inset-0" style={{ "--d": "520px" }}>
                {outerPartners.map((partner, idx) => {
                  const totalItems = outerPartners.length;
                  const positionAngle = (idx / totalItems) * 360;
                  const rotationAngle = 180 - 90; // your existing logic
                  return (
                    <OrbitIcon
                      key={partner.name}
                      angle={positionAngle}
                      rotationAngle={rotationAngle}
                      logo={partner.logo}
                      name={partner.name}
                    />
                  );
                })}
              </div>

              {/* INNER RING */}
              <div ref={innerRingRef} className="absolute inset-0" style={{ "--d": "320px" }}>
                {innerPartners.map((partner, idx) => {
                  const totalItems = innerPartners.length;
                  const positionAngle = (idx / totalItems) * 360;
                  const rotationAngle = 180 - 90;
                  return (
                    <OrbitIcon
                      key={partner.name}
                      angle={positionAngle}
                      rotationAngle={rotationAngle}
                      logo={partner.logo}
                      name={partner.name}
                    />
                  );
                })}
              </div>

              {/* Center label */}
              <div
                ref={labelRef}
                className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  className="
                    rounded-full bg-white px-5 sm:px-7 py-3 sm:py-4
                    text-center shadow-xl ring-1 ring-black/5
                    text-[12px] sm:text-base md:text-lg
                    font-extrabold text-[#0D354C]
                    uppercase tracking-[0.12em]
                    whitespace-nowrap
                  "
                >
                  Our Partners
                </div>
              </div>

              {/* local helper styles */}
              <style>{`
                /* prevents any accidental horizontal scrollbars caused by large transforms */
                :global(body){ overflow-x: hidden; }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitIcon({ logo, name, angle, rotationAngle, extra = 0 }) {
  return (
    <div className="absolute left-1/2 top-1/2 pointer-events-none">
      <div
        className="grid"
        style={{
          width: "var(--iconBox, 64px)",
          height: "var(--iconBox, 64px)",
          transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(calc((var(--d) + ${extra}px) / 2))`,
          willChange: "transform",
        }}
        title={name}
        aria-label={name}
      >
        <div
          style={{
            transform: `scale(var(--iconScale, 1)) rotate(${rotationAngle}deg)`,
            willChange: "transform",
          }}
          className="grid h-full w-full place-items-center"
        >
          <img
            src={logo}
            alt={`${name} logo`}
            loading="lazy"
            className="h-[60%] w-[60%] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
