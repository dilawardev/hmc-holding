import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { normalizeCopy } from "../../utils/serviceCopy";

gsap.registerPlugin(ScrollTrigger);

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useRevealSections(scopeRef) {
  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-anim='service-reveal']").forEach((element) => {
        gsap.set(element, { autoAlpha: 0, y: 40 });
        ScrollTrigger.create({
          trigger: element,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(element, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            }),
        });
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef]);
}

export function ServicePageShell({
  breadcrumbs,
  eyebrow,
  title,
  summary,
  heroAside,
  children,
}) {
  const contentRef = useRef(null);
  useRevealSections(contentRef);

  return (
    <>
      <section className="relative overflow-hidden bg-[#0D354C] pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[#D6B26F]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 space-y-5">
          <Breadcrumbs items={breadcrumbs} showHomeIcon />
          <div
            className={cx(
              "gap-8 lg:gap-10 items-start",
              heroAside ? "grid lg:grid-cols-[1.05fr_0.95fr]" : "block",
            )}
          >
            <div className="max-w-4xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                {normalizeCopy(eyebrow)}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                {normalizeCopy(title)}
              </h1>
              {summary ? (
                <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-3xl">
                  {normalizeCopy(summary)}
                </p>
              ) : null}
            </div>

            {heroAside ? <div className="mt-2 lg:mt-0">{heroAside}</div> : null}
          </div>
        </div>
      </section>

      <section className="relative bg-white pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[36%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
          <div className="absolute top-[74%] -left-32 h-64 w-64 rounded-full bg-[#D6B26F]/15 blur-3xl" />
        </div>

        <div
          ref={contentRef}
          className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16 space-y-16"
        >
          {children}
        </div>
      </section>
    </>
  );
}

export function PageSection({ className = "", children }) {
  return (
    <section data-anim="service-reveal" className={cx("space-y-8", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}) {
  const centered = align === "center";

  return (
    <div className={cx("space-y-2", centered && "text-center")}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
          {normalizeCopy(eyebrow)}
        </p>
      ) : null}
      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
        {normalizeCopy(title)}
      </h2>
      {intro ? (
        <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {normalizeCopy(intro)}
        </p>
      ) : null}
    </div>
  );
}

export function MediaFrame({
  src,
  alt,
  className = "",
  imageClassName = "",
}) {
  if (!src) return null;

  return (
    <div
      className={cx(
        "overflow-hidden rounded-3xl ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)] bg-white",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cx("w-full h-full object-cover", imageClassName)}
        loading="lazy"
      />
    </div>
  );
}

export function TextStack({ paragraphs = [], className = "" }) {
  return (
    <div
      className={cx(
        "space-y-4 text-[15px] sm:text-base text-slate-600 leading-relaxed",
        className,
      )}
    >
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{normalizeCopy(paragraph)}</p>
      ))}
    </div>
  );
}

export function InfoCard({ title, text, className = "" }) {
  return (
    <article
      className={cx(
        "rounded-2xl bg-white/95 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10",
        className,
      )}
    >
      <h3 className="text-lg font-black tracking-tight text-[#0D354C]">
        {normalizeCopy(title)}
      </h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        {normalizeCopy(text)}
      </p>
    </article>
  );
}

export function MetricStrip({ items = [], className = "" }) {
  if (!items.length) return null;

  return (
    <div className={cx("grid gap-4 sm:grid-cols-3", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm p-5 text-white shadow-lg"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
            {normalizeCopy(item.label)}
          </p>
          <p className="mt-3 text-lg font-black leading-tight">
            {normalizeCopy(item.value)}
          </p>
          {item.detail ? (
            <p className="mt-2 text-sm text-white/75 leading-relaxed">
              {normalizeCopy(item.detail)}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function Checklist({ title, items = [], className = "" }) {
  if (!items.length) return null;

  return (
    <div
      className={cx(
        "rounded-3xl border border-[#D6B26F]/25 bg-[#D6B26F]/8 p-6 sm:p-7",
        className,
      )}
    >
      {title ? (
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0D354C]">
          {normalizeCopy(title)}
        </p>
      ) : null}
      <ul className="mt-4 space-y-3 text-[15px] text-slate-600 leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B26F]" />
            <span>{normalizeCopy(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CalloutPanel({ title, text, className = "" }) {
  return (
    <div
      className={cx(
        "rounded-3xl bg-[#0D354C] p-6 sm:p-7 text-white shadow-[0_14px_40px_rgba(13,53,76,0.18)]",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
        Strategic focus
      </p>
      <h3 className="mt-3 text-xl font-black tracking-tight">
        {normalizeCopy(title)}
      </h3>
      <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
        {normalizeCopy(text)}
      </p>
    </div>
  );
}

export function LinkCardGrid({ items = [], columns = "md:grid-cols-3" }) {
  if (!items.length) return null;

  return (
    <div className={cx("grid gap-5", columns)}>
      {items.map((item) => (
        <Link
          key={item.to || item.title}
          to={item.to}
          className="group rounded-2xl bg-white/95 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 transition hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(13,53,76,0.14)]"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D6B26F]">
            Explore
          </p>
          <h3 className="mt-2 text-lg font-black tracking-tight text-[#0D354C]">
            {normalizeCopy(item.title)}
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {normalizeCopy(item.text)}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0D354C] transition group-hover:text-[#D6B26F]">
            View details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function ActionBanner({
  title,
  text,
  primaryLabel = "Get in touch",
}) {
  return (
    <PageSection>
      <div className="relative rounded-3xl bg-[#0D354C] text-white p-8 sm:p-10 shadow-2xl overflow-hidden">
        <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D6B26F]/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {normalizeCopy(title)}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
              {normalizeCopy(text)}
            </p>
          </div>
          <Link
            to="/contact-us"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D6B26F] px-6 py-3 text-sm font-bold text-[#0D354C] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {normalizeCopy(primaryLabel)}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </PageSection>
  );
}
