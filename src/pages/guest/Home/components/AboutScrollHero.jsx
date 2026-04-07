import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppReady } from "@/context/AppReadyContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutScrollHero() {
  const sectionRef = useRef(null);
  const cardWrapRef = useRef(null);
  const cardRef = useRef(null);
  const microCopyRef = useRef(null);
  const pillRef = useRef(null);
  const statValueRefs = useRef([]);
  const ready = useAppReady();

  const stats = [
    { label: "Years of experience", target: 10, suffix: "+" },
    { label: "Successful client investments", target: 20, suffix: "M+" },
    { label: "Strategic free zone partnerships", target: 28, suffix: "+" },
    { label: "Exclusive clients served", target: 97, suffix: "" },
  ];

  const formatValue = (value, suffix = "") => `${Math.floor(value)}${suffix}`;

  useLayoutEffect(() => {
    if (!ready) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Always ensure refs show something sensible
    const setFinalStaticState = () => {
      // stats -> final values
      statValueRefs.current.forEach((el, idx) => {
        const s = stats[idx];
        if (el && s) el.textContent = formatValue(s.target, s.suffix);
      });

      // show microcopy + pill
      gsap.set(microCopyRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(pillRef.current, { autoAlpha: 1, y: 0 });

      // remove any tilt/3D
      gsap.set(cardWrapRef.current, { clearProps: "all" });
      gsap.set(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        y: 0,
        scale: 1,
        clearProps: "transformOrigin,transformStyle,willChange",
      });
    };

    if (prefersReduced) {
      setFinalStaticState();
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ✅ Desktop/tablet: keep scroll hero animation
      mm.add("(min-width: 768px)", () => {
        // reset stat values before animating
        statValueRefs.current.forEach((el, idx) => {
          if (el) el.textContent = formatValue(0, stats[idx]?.suffix ?? "");
        });

        // Initial states
        gsap.set(cardWrapRef.current, { perspective: 1200 });

        gsap.set(cardRef.current, {
          transformStyle: "preserve-3d",
          rotateX: 16,
          rotateY: -18,
          rotateZ: -7,
          y: 70,
          scale: 1,
          transformOrigin: "50% 50%",
          willChange: "transform",
        });

        gsap.set(microCopyRef.current, { autoAlpha: 0, y: 8 });
        gsap.set(pillRef.current, { autoAlpha: 0, y: 14 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Card becomes straight, scales slightly, rises
        tl.to(
          cardRef.current,
          {
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            y: -40,
            scale: 1.02,
            ease: "none",
          },
          0
        );

        // Micro copy
        tl.to(microCopyRef.current, { autoAlpha: 1, y: 0, ease: "none" }, 0.2);
        tl.to(microCopyRef.current, { autoAlpha: 0, y: -8, ease: "none" }, 0.4);

        // Pill near end
        tl.to(pillRef.current, { autoAlpha: 1, y: 0, ease: "none" }, 0.6);

        // Final lift
        tl.to(cardRef.current, { y: -120, scale: 1.0, ease: "none" }, 0.85);

        // Stat counters fire once
        stats.forEach((stat, idx) => {
          const el = statValueRefs.current[idx];
          if (!el) return;

          const counter = { value: 0 };
          gsap.fromTo(
            counter,
            { value: 0 },
            {
              value: stat.target,
              duration: 2.6,
              ease: "power1.out",
              onUpdate: () => {
                if (el) el.textContent = formatValue(counter.value, stat.suffix);
              },
              onComplete: () => {
                if (el) el.textContent = formatValue(stat.target, stat.suffix);
              },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                once: true,
              },
            }
          );
        });

        return () => {
          ScrollTrigger.refresh();
        };
      });

      // ✅ Mobile: disable scroll hero behavior; show static content
      mm.add("(max-width: 767px)", () => {
        setFinalStaticState();

        // Only kill triggers that belong to this section (avoid nuking others)
        ScrollTrigger.getAll().forEach((t) => {
          const trg = t.trigger;
          if (!trg || !sectionRef.current) return;
          if (trg === sectionRef.current || sectionRef.current.contains(trg)) {
            t.kill(false);
          }
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="
        relative isolate
        min-h-screen
        py-14 sm:py-16
        md:py-0 md:h-[300vh]
      "
    >
      {/* Sticky on md+, normal flow on mobile */}
      <div
        className="
          relative
          md:sticky md:top-0
          z-20
          w-full
          md:h-screen
          flex flex-col
          md:justify-center
          overflow-visible md:overflow-hidden
          pointer-events-none
        "
      >
        {/* Decorative dots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(255,255,255,.55)_1px,transparent_1px)] [background-size:24px_24px]"
        />

        {/* Micro copy */}
        <div className="mx-auto max-w-6xl w-full px-4 pointer-events-auto">
          <div
            ref={microCopyRef}
            className="hidden"
          >
            {/* microcopy removed */}
          </div>
        </div>

        {/* Card */}
        <div
          ref={cardWrapRef}
          className="mx-auto max-w-5xl md:w-11/12 w-full px-4 md:px-6 pointer-events-auto mt-4 md:mt-0"
        >
          <div
            ref={cardRef}
            className="
              relative rounded-3xl bg-white/90 shadow-2xl ring-1 ring-black/10
              md:max-h-[calc(100vh-14rem)] md:overflow-y-auto no-scrollbar
            "
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-70 [mask-image:radial-gradient(40%_60%_at_30%_0%,black,transparent)] bg-gradient-to-b from-white to-transparent"
            />

            <div className="relative grid gap-5 p-5 sm:p-6 md:gap-7 md:p-8 md:grid-cols-2">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#D6B26F]/15 px-3 py-1 text-[11px] sm:text-xs font-semibold text-[#0D354C] ring-1 ring-[#D6B26F]/30">
                  HMC Holding
                </div>

                <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#0D354C]">
                  Advisory-led, execution-backed
                </h2>

                <p className="mt-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  We guide investors, leadership teams, and families through capital structuring,
                  governance, market entry, real estate, and compliant mobility.
                </p>

                <p className="mt-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  Our holistic model blends finance, operations, and mobility so your decisions stay
                  integrated, transparent, and value-driven.
                </p>

                <p className="mt-3 hidden md:block text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  We keep you growing with tailored risk mitigation, flexible financing options, and
                  reporting that protects stakeholders across every investment scenario.
                </p>

                <ul className="mt-4 space-y-2.5 text-sm text-[#0D354C]">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#D6B26F]" />
                    Investment and corporate advisory with transparent oversight
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#D6B26F]" />
                    Real estate support from acquisition through portfolio care
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-[#D6B26F]" />
                    Visa and immigration guidance that keeps talent moving
                  </li>
                </ul>
              </div>

              {/* Right */}
              <div className="rounded-2xl bg-slate-50 p-5 sm:p-6 ring-1 ring-black/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stats.map((stat, idx) => (
                    <Stat
                      key={stat.label}
                      label={stat.label}
                      suffix={stat.suffix}
                      target={stat.target}
                      valueRef={(el) => (statValueRefs.current[idx] = el)}
                      formatValue={formatValue}
                    />
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-white p-4 ring-1 ring-black/5">
                  <div className="text-xs font-semibold text-slate-500">
                    What we do best
                  </div>
                  <div className="mt-2 text-sm text-slate-700">
                    Capital allocation, corporate governance, market entry, real
                    estate facilitation, and global mobility support — all
                    delivered with clear reporting and accountable execution.
                  </div>
                </div>
              </div>

              {/* bottom pill label */}
              <div className="md:col-span-2 flex justify-center pt-1">
                <div
                  ref={pillRef}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0D354C] shadow-lg ring-1 ring-[#D6B26F]/30"
                >
                  One trusted partner across your portfolio
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* local helper styles */}
        <style>{`
          .no-scrollbar{
            scrollbar-width: none;      /* Firefox */
            -ms-overflow-style: none;   /* IE/Edge */
          }
          .no-scrollbar::-webkit-scrollbar{
            display: none;              /* Chrome/Safari */
          }
        `}</style>
      </div>

      {/* Bottom fades only on md+ (avoids weird overlaps on mobile) */}
      <div
        aria-hidden="true"
        className="hidden md:block pointer-events-none absolute bottom-[22vw] left-0 w-full z-0"
        style={{
          height: "40%",
          background: `
            radial-gradient(
              80% 80% at 50% 100%,
              #ffffffff 0%,
              #ffffffff 70%,
              #ffffff00 100%
            )
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="hidden md:block pointer-events-none absolute bottom-0 left-0 w-full z-0"
        style={{
          height: "22vw",
          background: "#fff",
        }}
      />
    </section>
  );
}

function Stat({ label, suffix, valueRef, formatValue }) {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
      <div className="text-xl sm:text-2xl font-black text-[#0D354C]">
        <span ref={valueRef}>{formatValue(0, suffix)}</span>
      </div>
      <div className="mt-1 text-[11px] sm:text-xs font-semibold text-[#D6B26F]">
        {label}
      </div>
    </div>
  );
}
