import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import ServiceInquiryCard from "./service-pages/ServiceInquiryCard";
import { getServiceMeta } from "../data/serviceMeta";
import { toServicePath } from "../data/servicesCatalog";
import {
  buildHighlights,
  buildNarrativeBlocks,
  firstSentence,
  normalizeCopy,
  splitParagraphs,
} from "../utils/serviceCopy";
import accountingPayrollImage from "@/assets/services/corporate-advisory/accounting-bookkeeping-and-payroll/bookkeeping-payroll.png";
import corporateBankingImage from "@/assets/services/corporate-advisory/corporate-banking-and-mortgage-advisory/corporate-banking-mortgage.jpg";
import mortgageServicesImage from "@/assets/services/real-estate-services/mortgage-services/mortgage-services.jpg";
import goldenVisaImage from "@/assets/services/visa-immigration-services/golden-visa-advisory/golden-visa-advisory.webp";

gsap.registerPlugin(ScrollTrigger);

const serviceDetailVisuals = {
  "corporate-advisory/accounting-bookkeeping-and-payroll": {
    src: accountingPayrollImage,
    alt: "Memo notes and bookkeeping materials representing payroll and accounting support",
  },
  "corporate-advisory/corporate-banking-and-mortgage-advisory": {
    src: corporateBankingImage,
    alt: "Professional banking and finance image representing corporate banking and mortgage advisory",
  },
  "real-estate-services/mortgage-services": {
    src: mortgageServicesImage,
    alt: "Property finance image representing mortgage advisory and home financing support",
  },
  "visa-immigration-services/golden-visa-advisory": {
    src: goldenVisaImage,
    alt: "Golden Visa promotional visual representing UAE long-term residency advisory",
  },
};

function SpecializationCard({ categorySlug, subServiceSlug, item }) {
  return (
    <Link
      to={toServicePath(categorySlug, subServiceSlug, item.slug)}
      className="group rounded-2xl bg-white/95 p-5 shadow-[0_10px_30px_rgba(13,53,76,0.08)] ring-1 ring-[#0D354C]/10 transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(13,53,76,0.14)]"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D6B26F]">
        Specialized topic
      </p>
      <h3 className="mt-2 text-lg font-black tracking-tight text-[#0D354C]">
        {normalizeCopy(item.label)}
      </h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        {normalizeCopy(item.body)}
      </p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0D354C] transition group-hover:text-[#D6B26F]">
        View topic
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function LinkList({ title, items, buildPath }) {
  if (!items.length) return null;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D6B26F]">
        {title}
      </p>
      <ul className="mt-3 space-y-2 text-sm text-[#0D354C]">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              to={buildPath(item)}
              className="inline-flex items-center gap-2 transition hover:text-[#D6B26F]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#D6B26F]" aria-hidden="true" />
              {normalizeCopy(item.label)}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function ServiceDetailPage({ resolved }) {
  const contentRef = useRef(null);
  const { category, subService, subChild } = resolved;
  const meta = getServiceMeta(category.id || category.slug);
  const paragraphs = splitParagraphs(subService.body);
  const highlights = buildHighlights(paragraphs, meta.highlightLabels);
  const narrative = buildNarrativeBlocks(paragraphs, meta.sectionTitles);
  const currentTitle = normalizeCopy(subChild ? subChild.label : subService.label);
  const heroSummary = subChild
    ? firstSentence(subChild.body, 185)
    : firstSentence(paragraphs[0] || category.overview, 185);
  const landingPath = meta.landingPath;
  const detailVisual = !subChild
    ? serviceDetailVisuals[`${category.slug}/${subService.slug}`]
    : null;
  const showGoldenVisaInquiry =
    !subChild &&
    category.slug === "visa-immigration-services" &&
    subService.slug === "golden-visa-advisory";
  const siblingServices = category.items.filter((item) => item.slug !== subService.slug);
  const siblingTopics = subChild
    ? subService.children.filter((item) => item.slug !== subChild.slug)
    : [];

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-anim='detail-section']").forEach((element) => {
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
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#0D354C] pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[#D6B26F]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 space-y-5">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: normalizeCopy(category.label), href: landingPath },
              { label: normalizeCopy(subService.label), href: toServicePath(category.slug, subService.slug) },
              ...(subChild ? [{ label: normalizeCopy(subChild.label) }] : []),
            ]}
            showHomeIcon
          />
          <div className="max-w-4xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              {meta.landingEyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {currentTitle}
            </h1>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-3xl">
              {heroSummary}
            </p>
          </div>
        </div>
      </section>

      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[42%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
          <div className="absolute top-[78%] -left-32 h-64 w-64 rounded-full bg-[#D6B26F]/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16 space-y-16">
          <div
            data-anim="detail-section"
            className="grid gap-8 md:gap-10 md:grid-cols-[1.08fr_0.92fr] items-start"
          >
            <div className="grid gap-6">
              <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 sm:p-8 shadow-[0_12px_36px_rgba(13,53,76,0.10)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                  Service overview
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
                  What this service is designed to support
                </h2>
                <div className="mt-4 space-y-4 text-[15px] sm:text-base text-slate-600 leading-relaxed">
                  {narrative.lead.map((paragraph, index) => (
                    <p key={index}>{normalizeCopy(paragraph)}</p>
                  ))}
                </div>
              </article>

              {showGoldenVisaInquiry ? (
                <ServiceInquiryCard
                  title="Book a Free Golden Visa Consultation"
                  intro="Tell us a little about your Golden Visa goals and we'll help you understand the next sensible step."
                />
              ) : null}
            </div>

            <div className="grid gap-6">
              {detailVisual ? (
                <div className="overflow-hidden rounded-3xl ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)] bg-white">
                  <img
                    src={detailVisual.src}
                    alt={detailVisual.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : null}

              <aside className="rounded-3xl border border-[#D6B26F]/30 bg-[#D6B26F]/8 p-6 sm:p-7 shadow-[0_10px_30px_rgba(13,53,76,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0D354C]">
                  At a glance
                </p>
                <div className="mt-4 space-y-4">
                  {highlights.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/90 p-4 ring-1 ring-[#0D354C]/10">
                      <p className="text-sm font-bold text-[#0D354C]">{item.label}</p>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {normalizeCopy(item.text)}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>

          {subChild ? (
            <div
              data-anim="detail-section"
              className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] items-start"
            >
              <article className="rounded-3xl border border-[#D6B26F]/30 bg-white/95 p-6 sm:p-8 shadow-[0_12px_36px_rgba(13,53,76,0.10)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                  Focus area
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
                  {normalizeCopy(subChild.label)}
                </h2>
                <p className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed">
                  {normalizeCopy(subChild.body)}
                </p>
              </article>

              <LinkList
                title={`Other topics in ${normalizeCopy(subService.label)}`}
                items={siblingTopics}
                buildPath={(item) => toServicePath(category.slug, subService.slug, item.slug)}
              />
            </div>
          ) : null}

          {narrative.blocks.length ? (
            <div data-anim="detail-section" className="space-y-8">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                  What the work involves
                </p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
                  Service structure and delivery focus
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {narrative.blocks.map((block) => (
                  <article
                    key={block.title}
                    className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-[0_10px_30px_rgba(13,53,76,0.08)]"
                  >
                    <h3 className="text-xl font-black tracking-tight text-[#0D354C]">
                      {block.title}
                    </h3>
                    <div className="mt-4 space-y-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                      {block.paragraphs.map((paragraph, index) => (
                        <p key={index}>{normalizeCopy(paragraph)}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {!subChild && subService.children.length ? (
            <div data-anim="detail-section" className="space-y-8">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                  Specialized areas
                </p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
                  Explore focused topics within this service
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {subService.children.map((item) => (
                  <SpecializationCard
                    key={item.slug}
                    categorySlug={category.slug}
                    subServiceSlug={subService.slug}
                    item={item}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div data-anim="detail-section" className="grid gap-6 md:grid-cols-[1.05fr_0.95fr] items-start">
            <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 sm:p-8 shadow-[0_12px_36px_rgba(13,53,76,0.10)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                Closing view
              </p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
                What to keep in view before moving forward
              </h2>
              <div className="mt-4 space-y-4 text-[15px] sm:text-base text-slate-600 leading-relaxed">
                {(narrative.closing.length ? narrative.closing : paragraphs.slice(-1)).map(
                  (paragraph, index) => (
                    <p key={index}>{normalizeCopy(paragraph)}</p>
                  ),
                )}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={landingPath}
                  className="inline-flex items-center justify-center rounded-full bg-[#0D354C] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Back to category
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center rounded-full bg-[#D6B26F] px-5 py-2.5 text-sm font-bold text-[#0D354C] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Contact HMC
                </Link>
              </div>
            </article>

            <div className="grid gap-6">
              <LinkList
                title="Related sub-services"
                items={siblingServices}
                buildPath={(item) => toServicePath(category.slug, item.slug)}
              />

              {!subChild && subService.children.length ? (
                <LinkList
                  title={`Topics in ${normalizeCopy(subService.label)}`}
                  items={subService.children}
                  buildPath={(item) => toServicePath(category.slug, subService.slug, item.slug)}
                />
              ) : null}
            </div>
          </div>

          <div
            data-anim="detail-section"
            className="relative rounded-3xl bg-[#0D354C] text-white p-8 sm:p-10 shadow-2xl overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D6B26F]/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {meta.ctaTitle}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                  {meta.ctaText}
                </p>
              </div>
              <Link
                to="/contact-us"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D6B26F] px-6 py-3 text-sm font-bold text-[#0D354C] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Get in touch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
