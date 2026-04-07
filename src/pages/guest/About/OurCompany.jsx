import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ShieldCheck,
  Eye,
  TrendingUp,
  Target,
  Compass,
} from "lucide-react";
import { useAppReady } from "@/context/AppReadyContext";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

import MerzanPortrait from "../assets/ceo/Portait-Merzan-2.png";
import BilelPortrait from "../assets/team/bilel.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ── Static data ─────────────────────────────────────────────── */

const stats = [
  { label: "Years of experience", target: 25, suffix: "+" },
  { label: "Successful client investments", target: 500, suffix: "M+" },
  { label: "Strategic free zone partnerships", target: 40, suffix: "+" },
  { label: "Exclusive clients served", target: 200, suffix: "" },
];

const values = [
  {
    title: "Integrity & Trust",
    description:
      "We uphold the highest standards of transparency and honesty, building lasting relationships rooted in mutual trust and respect.",
    Icon: ShieldCheck,
  },
  {
    title: "Strategic Foresight",
    description:
      "We anticipate market shifts and craft forward-looking strategies that position our clients ahead of the curve in a rapidly evolving landscape.",
    Icon: Compass,
  },
  {
    title: "Client-Centric Approach",
    description:
      "Every solution we deliver is tailored to the unique needs, goals, and circumstances of our clients — because no two journeys are alike.",
    Icon: Target,
  },
  {
    title: "Sustainable Growth",
    description:
      "We focus on long-term value creation, ensuring that every decision we support leads to enduring success for our clients and partners.",
    Icon: TrendingUp,
  },
];

const serviceAreas = [
  "Business & Investment Advisory",
  "Business Solutions",
  "Real Estate",
  "Corporate Advisory",
  "Visa & Immigration Services",
];

const leaders = [
  {
    name: "Merzan Hessou",
    title: "Visionary Founder With Strategic Foresight",
    image: MerzanPortrait,
    summary:
      "With over 20 years of experience in finance and strategic business consulting, Merzan guides companies and investors in developing sustainable, future-oriented strategies.",
  },
  {
    name: "Bilel Moussa",
    title: "Founder With Vision And Commitment",
    image: BilelPortrait,
    summary:
      "A passionate investment and real estate advisor with a keen sense for opportunity in the UAE, Bilel supports investors in bringing their visions to life.",
  },
];

const formatValue = (value, suffix = "") => `${Math.floor(value)}${suffix}`;

/* ── Component ───────────────────────────────────────────────── */

export default function OurCompany() {
  const contentRef = useRef(null);
  const statValueRefs = useRef([]);
  const ready = useAppReady();

  useLayoutEffect(() => {
    if (!ready) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Show final stat values immediately
      statValueRefs.current.forEach((el, idx) => {
        const s = stats[idx];
        if (el && s) el.textContent = formatValue(s.target, s.suffix);
      });
      return;
    }

    const ctx = gsap.context(() => {
      /* ── Fade-in sections ── */
      const animateIn = (
        trigger,
        targets,
        { stagger = 0, y = 40, duration = 0.8 } = {}
      ) => {
        const els = gsap.utils.toArray(targets);
        if (!els.length) return;

        gsap.set(els, { autoAlpha: 0, y });

        ScrollTrigger.create({
          trigger:
            typeof trigger === "string"
              ? document.querySelector(trigger)
              : trigger,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(els, {
              autoAlpha: 1,
              y: 0,
              duration,
              stagger,
              ease: "power2.out",
            });
          },
        });
      };

      animateIn("[data-anim='intro']", "[data-anim='intro']", {
        y: 50,
        duration: 0.9,
      });
      animateIn("[data-anim='mv-grid']", "[data-anim='mv-card']", {
        stagger: 0.12,
      });
      animateIn("[data-anim='stats-grid']", "[data-anim='stat-card']", {
        stagger: 0.1,
      });
      animateIn("[data-anim='values-grid']", "[data-anim='value-card']", {
        stagger: 0.12,
      });
      animateIn("[data-anim='services-overview']", "[data-anim='services-overview']", {
        y: 40,
      });
      animateIn("[data-anim='leaders-grid']", "[data-anim='leader-preview']", {
        stagger: 0.15,
      });
      animateIn("[data-anim='about-cta']", "[data-anim='about-cta']", {
        y: 40,
      });

      /* ── Stat counters ── */
      stats.forEach((stat, idx) => {
        const el = statValueRefs.current[idx];
        if (!el) return;

        const counter = { value: 0 };
        gsap.fromTo(
          counter,
          { value: 0 },
          {
            value: stat.target,
            duration: 2.4,
            ease: "power1.out",
            onUpdate: () => {
              if (el) el.textContent = formatValue(counter.value, stat.suffix);
            },
            onComplete: () => {
              if (el) el.textContent = formatValue(stat.target, stat.suffix);
            },
            scrollTrigger: {
              trigger: "[data-anim='stats-grid']",
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }, contentRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <>
      {/* ─── Navy Hero Banner ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0D354C] pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[#D6B26F]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-5">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "About Us" },
              ]}
              showHomeIcon
            />
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                About HMC Holding
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Where Strategy Meets Execution
              </h1>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                HMC Holding is a Dubai-based advisory firm guiding investors,
                leadership teams, and families through complex decisions with
                clarity, integrity, and measurable results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Content ──────────────────────────────────────────── */}
      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[30%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
          <div className="absolute top-[60%] -left-32 h-64 w-64 rounded-full bg-[#D6B26F]/15 blur-3xl" />
          <div className="absolute top-[85%] -right-24 h-56 w-56 rounded-full bg-[#0D354C]/6 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16 space-y-16 sm:space-y-20">
          {/* ── 1. Company Introduction ────────────────────────── */}
          <div
            data-anim="intro"
            className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-center"
          >
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D354C]">
                Advisory-Led, Execution-Backed
              </h2>
              <div className="space-y-4 text-[15px] sm:text-base text-slate-600 leading-relaxed">
                <p>
                  HMC stands where your story begins, and dreams find an
                  address — turning visions into lasting homes. We guide
                  investors, leadership teams, and families through complex
                  moves: structuring capital, strengthening governance, entering
                  new markets, securing real estate, and moving people
                  compliantly.
                </p>
                <p>
                  At its core, HMC's guiding principle is that tailored advisory
                  services require a holistic perspective. The company's vision
                  has always been to provide a unique, value-driven service that
                  delivers integrated solutions by combining extensive expertise
                  with key areas of the financial world.
                </p>
                <p>
                  Based in the heart of Dubai, we combine deep market insight
                  with strategic thinking to deliver capital allocation, corporate
                  governance, market entry, real estate facilitation, and global
                  mobility support — all with clear reporting and accountable
                  execution.
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-[0_14px_50px_rgba(13,53,76,0.10)] ring-1 ring-[#0D354C]/8">
              <img
                src={MerzanPortrait}
                alt="HMC Holding leadership"
                className="w-full h-full object-cover md:min-h-[420px]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0D354C]/10 via-transparent to-transparent rounded-3xl" />
            </div>
          </div>

          {/* ── 2. Mission & Vision Cards ──────────────────────── */}
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                What Drives Us
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D354C]">
                Our Mission & Vision
              </h2>
            </div>

            <div data-anim="mv-grid" className="grid gap-6 md:grid-cols-2">
              <div
                data-anim="mv-card"
                className="group rounded-2xl bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 p-6 sm:p-8 space-y-4 transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.18)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#D6B26F]/12 ring-1 ring-[#D6B26F]/30">
                  <Target className="h-6 w-6 text-[#D6B26F]" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0D354C]">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  To empower clients with strategies that support the sustainable
                  growth of their investments and businesses, staying ahead in a
                  constantly changing global environment. We focus on
                  client-centric strategies, offering customized risk mitigation
                  and financing options to ensure a high level of protection for
                  clients and partners across all investment scenarios.
                </p>
              </div>

              <div
                data-anim="mv-card"
                className="group rounded-2xl bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 p-6 sm:p-8 space-y-4 transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.18)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#D6B26F]/12 ring-1 ring-[#D6B26F]/30">
                  <Eye className="h-6 w-6 text-[#D6B26F]" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0D354C]">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  To provide a unique, value-driven service that delivers
                  integrated solutions by combining extensive expertise with key
                  areas of the financial world. We strive to be the trusted
                  partner that clients turn to for holistic advisory, helping them
                  navigate the most dynamic markets with confidence and clarity.
                </p>
              </div>
            </div>
          </div>

          {/* ── 3. Stats / Key Figures ─────────────────────────── */}
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                By The Numbers
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D354C]">
                Proven Track Record
              </h2>
            </div>

            <div
              data-anim="stats-grid"
              className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4"
            >
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  data-anim="stat-card"
                  className="rounded-2xl bg-white/90 p-5 sm:p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 text-center transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.18)]"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0D354C]">
                    <span
                      ref={(el) => (statValueRefs.current[idx] = el)}
                    >
                      {formatValue(0, stat.suffix)}
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#D6B26F]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 4. Core Values ─────────────────────────────────── */}
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                What We Stand For
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D354C]">
                Our Core Values
              </h2>
            </div>

            <div data-anim="values-grid" className="grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.title}
                  data-anim="value-card"
                  className="group flex gap-4 rounded-2xl bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 p-5 transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.18)]"
                >
                  <div className="mt-1 h-12 w-12 shrink-0 rounded-xl bg-[#D6B26F]/12 ring-1 ring-[#D6B26F]/30 grid place-items-center">
                    <value.Icon className="h-6 w-6 text-[#D6B26F]" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-bold text-[#0D354C]">
                      {value.title}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 5. Our Services Overview ───────────────────────── */}
          <div
            data-anim="services-overview"
            className="grid gap-8 md:gap-10 md:grid-cols-[1.1fr_0.9fr] items-center"
          >
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                What We Do
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D354C]">
                Comprehensive Advisory Services
              </h2>
              <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed">
                From investment strategy and corporate governance to real estate
                facilitation and global mobility — we deliver integrated
                solutions across every stage of your journey.
              </p>
              <ul className="space-y-3 text-sm text-[#0D354C]">
                {serviceAreas.map((service) => (
                  <li key={service} className="flex gap-3 items-center">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#D6B26F]" />
                    {service}
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 rounded-full bg-[#0D354C] text-white px-6 py-3 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Explore All Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6 sm:p-8 ring-1 ring-black/5 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#D6B26F]/15 px-3 py-1 text-[11px] sm:text-xs font-semibold text-[#0D354C] ring-1 ring-[#D6B26F]/30">
                HMC Holding
              </div>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                Capital allocation, corporate governance, market entry, real
                estate facilitation, and global mobility support — all delivered
                with clear reporting and accountable execution.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-4 ring-1 ring-black/5 text-center">
                  <div className="text-lg font-black text-[#0D354C]">5</div>
                  <div className="mt-1 text-[11px] font-semibold text-[#D6B26F]">
                    Service Verticals
                  </div>
                </div>
                <div className="rounded-xl bg-white p-4 ring-1 ring-black/5 text-center">
                  <div className="text-lg font-black text-[#0D354C]">40+</div>
                  <div className="mt-1 text-[11px] font-semibold text-[#D6B26F]">
                    Free Zone Partners
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 6. Leadership Preview ──────────────────────────── */}
          <div className="space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                  Leadership
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D354C]">
                  Meet The Founders
                </h2>
              </div>
              <Link
                to="/team"
                className="group inline-flex items-center gap-2 text-sm font-bold text-[#0D354C] hover:text-[#D6B26F] transition"
              >
                View Full Team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div data-anim="leaders-grid" className="grid gap-6 md:grid-cols-2">
              {leaders.map((leader) => (
                <Link
                  key={leader.name}
                  to="/team"
                  data-anim="leader-preview"
                  className="group rounded-2xl bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 overflow-hidden transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.18)]"
                >
                  <div className="grid grid-cols-[auto_1fr] items-center">
                    <div className="relative h-full w-28 sm:w-36 overflow-hidden">
                      <img
                        src={leader.image}
                        alt={`${leader.name} portrait`}
                        className="h-full w-full object-cover min-h-[180px]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 sm:p-6 space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
                        {leader.title}
                      </p>
                      <h3 className="text-lg sm:text-xl font-black tracking-tight text-[#0D354C] leading-tight">
                        {leader.name}
                      </h3>
                      <div className="h-[3px] w-10 rounded-full bg-[#D6B26F]" />
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {leader.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── 7. CTA Section ─────────────────────────────────── */}
          <div
            data-anim="about-cta"
            className="relative rounded-3xl bg-[#0D354C] text-white p-8 sm:p-10 shadow-2xl overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D6B26F]/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Ready To Partner With Us?
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                  Whether you're exploring investment opportunities, forming a
                  new business, or seeking strategic advisory — we're here to
                  guide you every step of the way.
                </p>
              </div>
              <Link
                to="/contact-us"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D6B26F] text-[#0D354C] px-6 py-3 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl shrink-0"
              >
                Get In Touch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
