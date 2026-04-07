// Hero.jsx
import React from "react";
import {
  BriefcaseBusiness,
  Building2,
  Calculator,
  ChevronRight,
  Clock3,
  Globe,
  LineChart,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import BlurText from "@/components/motion/BlurText";
import FadeContent from "@/components/motion/FadeContent";
import { useAppReady } from "@/context/AppReadyContext";
import { getServiceMeta } from "@/pages/guest/Services/data/serviceMeta";

export default function Hero() {
  const isReady = useAppReady();

  const floating = [
    {
      Icon: LineChart,
      label: "Business & Investment Advisory",
      left: "14%",
      top: "28%",
      iconSize: "h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12",
      depth: 1.0,
      blur: "",
      opacity: "opacity-95",
      t: "9s",
      d: "-1.2s",
      className: " sm:block",
      fadeDelay: 300,
    },
    {
      Icon: Settings2,
      label: "Business Solutions",
      left: "25%",
      top: "18%",
      iconSize: "h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11",
      depth: 0.8,
      blur: "blur-[0.2px]",
      opacity: "opacity-90",
      t: "11s",
      d: "-5s",
      className: " sm:block",
      fadeDelay: 500,
    },
    {
      Icon: Building2,
      label: "Real Estate",
      left: "18%",
      top: "56%",
      iconSize: "h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12",
      depth: 0.9,
      blur: "",
      opacity: "opacity-90",
      t: "10s",
      d: "-3.5s",
      className: " sm:block",
      fadeDelay: 700,
    },
    {
      Icon: BriefcaseBusiness,
      label: "Corporate Advisory",
      left: "78%",
      top: "24%",
      iconSize: "h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12",
      depth: 1.1,
      blur: "blur-[0.2px]",
      opacity: "opacity-95",
      t: "12s",
      d: "-7s",
      className: " md:block",
      fadeDelay: 900,
    },
    {
      Icon: Globe,
      label: "Visa & Immigration Services",
      left: "84%",
      top: "52%",
      iconSize: "h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11",
      depth: 0.7,
      blur: "blur-[1px]",
      opacity: "opacity-75",
      t: "13s",
      d: "-2s",
      className: "hidden lg:block",
      fadeDelay: 1100,
    },
    {
      Icon: BriefcaseBusiness,
      label: "Corporate Advisory",
      left: "90%",
      top: "20%",
      iconSize: "h-12 w-12 md:h-14 md:w-14",
      depth: 0.5,
      blur: "blur-[2px]",
      opacity: "opacity-40",
      t: "15s",
      d: "-9s",
      className: "hidden xl:block",
      fadeDelay: 1300,
    },
    {
      Icon: LineChart,
      label: "Business & Investment Advisory",
      left: "34%",
      top: "70%",
      iconSize: "h-12 w-12 md:h-14 md:w-14",
      depth: 0.45,
      blur: "blur-[2px]",
      opacity: "opacity-35",
      t: "16s",
      d: "-6s",
      className: " xl:block",
      fadeDelay: 1500,
    },
  ];

  const chips = [
    {
      Icon: LineChart,
      text: "Business & Investment Advisory",
      to: getServiceMeta("business-investment-advisory").landingPath,
    },
    {
      Icon: Settings2,
      text: "Business Solutions",
      to: getServiceMeta("business-solutions").landingPath,
    },
    {
      Icon: Building2,
      text: "Real Estate",
      to: getServiceMeta("real-estate-services").landingPath,
    },
    {
      Icon: BriefcaseBusiness,
      text: "Corporate Advisory",
      to: getServiceMeta("corporate-advisory").landingPath,
    },
    {
      Icon: Globe,
      text: "Visa & Immigration Services",
      to: getServiceMeta("visa-immigration-services").landingPath,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0">
        {floating.map((f, idx) => (
          <FloatingIcon key={idx} {...f} animateWhen={isReady} />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-32 pb-14 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-4xl text-center text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold tracking-wide backdrop-blur sm:text-xs">
            hmc-holding
            <span className="h-1 w-1 rounded-full bg-white/70" />
            Strategic Advisory &amp; Growth
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl">
            <BlurText
              text="Clear strategy."
              as="span"
              delay={150}
              animateBy="words"
              direction="top"
              animateWhen={isReady}
              className="justify-center"
            />
            <BlurText
              text="Real-world execution."
              as="span"
              delay={150}
              animateBy="letters"
              direction="top"
              animateWhen={isReady}
              className="justify-center text-white/90"
            />
          </h1>

          <p className="mt-4 text-sm text-white/85 sm:text-base md:text-lg">
            We help organizations and individuals move confidently through
            investment, corporate growth, real estate, and immigration fast,
            compliant, and future-ready. You can now also start with our guided
            business setup calculator.
          </p>

          <FadeContent delay={300} blur duration={700} animateWhen={isReady}>
            <div className="mt-8 rounded-[28px] border border-white/15 bg-white/10 p-4 text-left shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-5">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#D6B26F]">
                    <Calculator className="h-6 w-6" />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                      <span className="h-2 w-2 rounded-full bg-[#D6B26F]" />
                      Featured Tool
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white sm:text-xl">
                      Business setup cost calculator
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-[15px]">
                      Answer a few practical questions and get a clearer view of
                      the setup path that fits your activity, office needs,
                      shareholders, visas, and jurisdiction goals.
                    </p>
                  </div>
                </div>

                <Link
                  to="/calculator"
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#D6B26F] px-5 py-3 text-sm font-semibold text-[#0D354C] transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Open Calculator
                  <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-white/85">
                  <div className="flex items-center gap-2 text-[#D6B26F]">
                    <Clock3 className="h-4 w-4" />
                    <span className="font-semibold text-white">
                      2-minute flow
                    </span>
                  </div>
                  <p className="mt-2 text-white/70">
                    Quick intake designed for serious founders and investors.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-white/85">
                  <div className="flex items-center gap-2 text-[#D6B26F]">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="font-semibold text-white">
                      Better-fit recommendations
                    </span>
                  </div>
                  <p className="mt-2 text-white/70">
                    Compare office, visa, and jurisdiction factors in one place.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-white/85">
                  <div className="flex items-center gap-2 text-[#D6B26F]">
                    <BriefcaseBusiness className="h-4 w-4" />
                    <span className="font-semibold text-white">
                      Advisory follow-up
                    </span>
                  </div>
                  <p className="mt-2 text-white/70">
                    Turn the result into a practical HMC setup roadmap.
                  </p>
                </div>
              </div>
            </div>
          </FadeContent>

          <div className="mt-9 flex gap-2 overflow-x-auto no-scrollbar pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
            {chips.map(({ Icon, text, to }) => (
              <Link
                key={text}
                to={to}
                className="group shrink-0 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] text-white/90 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15 hover:text-white sm:text-xs"
              >
                <Icon className="h-4 w-4 text-[#D6B26F] transition group-hover:scale-110" />
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar{
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar{
          display: none;
        }

        .float-outer{
          transform: translate3d(
            calc(var(--mx, 0) * var(--depth) * 18px),
            calc(var(--my, 0) * var(--depth) * 18px),
            0
          );
          transition: transform 140ms ease-out;
        }
        .float-inner{
          animation: floatY var(--t) ease-in-out infinite;
          animation-delay: var(--d);
        }
        @keyframes floatY {
          0%   { transform: translate3d(0, 0, 0) }
          50%  { transform: translate3d(0, -14px, 0) }
          100% { transform: translate3d(0, 0, 0) }
        }
      `}</style>
    </section>
  );
}

function FloatingIcon({
  Icon,
  label,
  left,
  top,
  iconSize,
  depth,
  blur,
  opacity,
  t,
  d,
  className = "",
  fadeDelay = 0,
  animateWhen = true,
}) {
  const clamp = (v) => `min(${v}, calc(100% - 6rem))`;

  return (
    <div
      className={`absolute float-outer ${className}`}
      style={{
        left: clamp(left),
        top: clamp(top),
        ["--depth"]: depth,
      }}
    >
      <div className="float-inner" style={{ ["--t"]: t, ["--d"]: d }}>
        <FadeContent
          delay={fadeDelay}
          blur
          duration={800}
          animateWhen={animateWhen}
        >
          <div className={`group relative ${opacity}`}>
            <div
              className={[
                "flex items-center justify-center rounded-3xl",
                "border border-white/20 bg-white/10 backdrop-blur-md",
                "shadow-[0_12px_30px_rgba(0,0,0,0.12)]",
                "transition duration-200 group-hover:scale-[1.04] group-hover:bg-white/14",
                "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-[74px] lg:w-[74px]",
                blur,
              ].join(" ")}
            >
              <Icon className={`${iconSize} text-[#D6B26F]`} />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-full mt-3 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-white/90 opacity-0 transition backdrop-blur md:block group-hover:opacity-100">
              {label}
            </div>
          </div>
        </FadeContent>
      </div>
    </div>
  );
}
