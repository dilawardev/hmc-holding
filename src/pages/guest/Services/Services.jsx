import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import services from "./data/services";
import WhyWithUs from "@/pages/guest/Home/components/WhyWithUs";

gsap.registerPlugin(ScrollTrigger);

function StarBullet() {
  return (
    <span className="mt-1 shrink-0">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.02592 1.47342C7.95636 1.19519 7.70637 1 7.41958 1C7.13279 1 6.8828 1.19519 6.81324 1.47342L6.66621 2.06155C6.09936 4.32896 4.32896 6.09936 2.06155 6.66621L1.47341 6.81324C1.19519 6.8828 1 7.13279 1 7.41958C1 7.70637 1.19519 7.95636 1.47341 8.02592L2.06155 8.17296C4.32896 8.73981 6.09936 10.5102 6.66621 12.7776L6.81324 13.3657C6.8828 13.644 7.13279 13.8392 7.41958 13.8392C7.70637 13.8392 7.95636 13.644 8.02592 13.3657L8.17296 12.7776C8.73981 10.5102 10.5102 8.73981 12.7776 8.17296L13.3657 8.02592C13.644 7.95636 13.8392 7.70637 13.8392 7.41958C13.8392 7.13279 13.644 6.8828 13.3657 6.81324L12.7776 6.66621C10.5102 6.09936 8.73981 4.32896 8.17296 2.06155L8.02592 1.47342ZM3.67696 7.41958C5.33273 6.66302 6.66302 5.33273 7.41958 3.67696C8.17615 5.33273 9.50644 6.66302 11.1622 7.41958C9.50644 8.17615 8.17615 9.50644 7.41958 11.1622C6.66302 9.50644 5.33273 8.17615 3.67696 7.41958Z"
          fill="#D6B26F"
        />
      </svg>
    </span>
  );
}

function ServicePageCard({ service }) {
  const { name, overview, image, imageAlt, items = [] } = service;

  return (
    <article
      data-anim="service-card"
      className="group rounded-3xl bg-white ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)] transition
                 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(13,53,76,0.16)] hover:ring-[#D6B26F]/35 overflow-hidden"
    >
      {/* Image */}
      {image && (
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt || `${name} visual`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0D354C]/50 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-[#0D354C] ring-1 ring-[#0D354C]/10 backdrop-blur-sm shadow-sm">
              {name}
            </span>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="p-6 sm:p-7 space-y-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-[#0D354C] leading-snug">
            {name}
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {overview}
          </p>
        </div>

        {items.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6B26F]">
              Included Services
            </p>
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li
                  key={item.path}
                  className="flex items-start gap-2.5 text-sm text-[#0D354C] leading-relaxed"
                >
                  <StarBullet />
                  <Link
                    to={item.path}
                    className="transition hover:text-[#D6B26F]"
                  >
                    {item.label}
                    {item.detail ? (
                      <span className="text-slate-500"> ({item.detail})</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

function ServicesPage() {
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const animateIn = (
        trigger,
        targets,
        { stagger = 0, y = 30, duration = 0.7 } = {},
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

      animateIn("[data-anim='services-grid']", "[data-anim='service-card']", {
        stagger: 0.12,
        duration: 0.6,
      });
      animateIn("[data-anim='services-cta']", "[data-anim='services-cta']", {
        y: 40,
        duration: 0.8,
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Navy Hero Banner */}
      <section className="relative overflow-hidden bg-[#0D354C] pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[#D6B26F]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 space-y-5">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Services" }]}
            showHomeIcon
          />
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Our Services
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Services
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Browse every service category and open the exact advisory,
              compliance, property, or immigration service you need.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[50%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16 space-y-14">
          {/* Service Cards Grid */}
          <div data-anim="services-grid" className="grid gap-7 sm:grid-cols-2">
            {services.map((service) => (
              <ServicePageCard key={service.id} service={service} />
            ))}
          </div>

          {/* CTA */}
          <div
            data-anim="services-cta"
            className="relative rounded-3xl max-w-6xl px-4 pt-12  bg-[#0D354C] text-white p-8 sm:p-10 shadow-2xl overflow-hidden"
          >
            {/* Decorative orbs */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D6B26F]/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/90">
                  <span className="h-2 w-2 rounded-full bg-[#D6B26F]" />
                  Let&apos;s get started
                </p>
                <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight">
                  Ready to elevate your business?
                </h2>
                <p className="mt-2 text-sm sm:text-base text-white/80 leading-relaxed">
                  Talk with our advisors about your next move. We&apos;re here
                  to help you navigate complexity with confidence.
                </p>
              </div>

              <Link
                to="/contact-us"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D6B26F] text-[#0D354C] px-6 py-3 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Get in touch
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WhyWithUs />
    </>
  );
}

export default ServicesPage;
