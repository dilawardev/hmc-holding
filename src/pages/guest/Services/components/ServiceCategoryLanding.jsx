import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import services from "../data/services";
import serviceDetails from "../data/serviceDescriptionsLong";
import { servicesCatalog, toServicePath } from "../data/servicesCatalog";
import { getServiceMeta } from "../data/serviceMeta";
import {
  firstSentence,
  normalizeCopy,
  splitParagraphs,
  titleParts,
} from "../utils/serviceCopy";

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({ categorySlug, item }) {
  const { label, detail } = titleParts(item.title);
  const summary = firstSentence(splitParagraphs(item.body)[0] || item.body, 190);

  return (
    <article
      data-anim="category-item"
      className="group rounded-3xl bg-white/95 p-6 sm:p-7 shadow-[0_12px_36px_rgba(13,53,76,0.10)] ring-1 ring-[#0D354C]/10 transition hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(13,53,76,0.16)]"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
            {item.children.length ? "Service + specializations" : "Service detail"}
          </p>
          <h3 className="text-xl font-black tracking-tight text-[#0D354C] leading-tight">
            {label}
          </h3>
          {detail ? (
            <p className="text-sm font-semibold text-[#0D354C]/70">{detail}</p>
          ) : null}
          <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
        </div>

        {item.children.length ? (
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0D354C]/55">
              Included topics
            </p>
            <div className="flex flex-wrap gap-2">
              {item.children.map((child) => (
                <Link
                  key={child.slug}
                  to={toServicePath(categorySlug, item.slug, child.slug)}
                  className="inline-flex rounded-full bg-[#0D354C]/5 px-3 py-1 text-xs font-semibold text-[#0D354C] transition hover:bg-[#D6B26F]/15 hover:text-[#0D354C]"
                >
                  {normalizeCopy(child.label)}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <Link
          to={toServicePath(categorySlug, item.slug)}
          className="group/link inline-flex items-center gap-2 text-sm font-bold text-[#0D354C] transition hover:text-[#D6B26F]"
        >
          Explore service
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

export default function ServiceCategoryLanding({ categoryId }) {
  const contentRef = useRef(null);
  const category = serviceDetails.find((item) => item.id === categoryId);
  const catalog = servicesCatalog.find((item) => item.id === categoryId);
  const visual = services.find((item) => item.id === categoryId);
  const meta = getServiceMeta(categoryId);

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-anim='category-section']").forEach((element) => {
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

  if (!category || !catalog || !visual) return null;

  const items = catalog.items.map((item, index) => ({
    ...item,
    title: category.items[index]?.title || item.label,
    body: category.items[index]?.body || "",
  }));
  const highlightedServices = items.slice(0, 4);
  const specializationCount = items.reduce(
    (total, item) => total + item.children.length,
    0,
  );

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
              { label: normalizeCopy(category.name) },
            ]}
            showHomeIcon
          />
          <div className="max-w-4xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              {meta.landingEyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {normalizeCopy(category.name)}
            </h1>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-3xl">
              {normalizeCopy(meta.landingSummary)}
            </p>
          </div>
        </div>
      </section>

      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[35%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
          <div className="absolute top-[75%] -left-32 h-64 w-64 rounded-full bg-[#D6B26F]/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16 space-y-16">
          <div
            data-anim="category-section"
            className="grid gap-8 md:gap-10 md:grid-cols-[1.05fr_0.95fr] items-start"
          >
            <div className="overflow-hidden rounded-3xl ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)]">
              <img
                src={visual.image}
                alt={visual.imageAlt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                  What this category covers
                </p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C] leading-tight">
                  Built around the services clients need most often
                </h2>
                <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed">
                  {normalizeCopy(category.overview)}
                </p>
                <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed">
                  Each service below is presented through clearer entry points,
                  focused summaries, and faster paths into the exact area you need.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#0D354C]/10 bg-white/90 p-5 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D6B26F]">
                    Service lines
                  </p>
                  <p className="mt-2 text-3xl font-black text-[#0D354C]">
                    {items.length}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Structured pages linked from one category landing point.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#0D354C]/10 bg-white/90 p-5 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D6B26F]">
                    Specializations
                  </p>
                  <p className="mt-2 text-3xl font-black text-[#0D354C]">
                    {specializationCount}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Additional focused topics available within this category.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#D6B26F]/30 bg-[#D6B26F]/8 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0D354C]">
                  Included services
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {highlightedServices.map((item) => (
                    <span
                      key={item.slug}
                      className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0D354C] ring-1 ring-[#0D354C]/10"
                    >
                      {normalizeCopy(item.label)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div data-anim="category-section" className="space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                  Explore the details
                </p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
                  Services in {normalizeCopy(category.name)}
                </h2>
              </div>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0D354C] transition hover:text-[#D6B26F]"
              >
                Speak with HMC
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {items.map((item) => (
                <ServiceCard key={item.slug} categorySlug={catalog.slug} item={item} />
              ))}
            </div>
          </div>

          <div
            data-anim="category-section"
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
