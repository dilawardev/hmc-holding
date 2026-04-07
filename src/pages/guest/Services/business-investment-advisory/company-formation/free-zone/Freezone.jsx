import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

import FreezoneImage from "../assets/freezone/1.png";

gsap.registerPlugin(ScrollTrigger);

const benefitsGrid = [
  {
    title: "Attractive Tax Conditions",
    bullets: [
      "No personal income tax",
      "Corporate tax capped at 9%, with an exemption threshold of approximately \u20AC85,000",
      "Potential for full corporate tax exemption depending on Freezone and business model",
    ],
  },
  {
    title: "No Paid-Up Capital Required",
    bullets: [
      "No actual capital injection necessary \u2014 only a formal declaration required for company formation",
    ],
  },
  {
    title: "Simplified Accounting Obligations",
    bullets: [
      "Basic bookkeeping only",
      "Annual tax return and financial statement submission required",
    ],
  },
  {
    title: "Real Estate Ownership",
    bullets: [
      "Freezone entities may own and manage real estate both within the UAE and internationally",
    ],
  },
  {
    title: "Maximum Confidentiality",
    bullets: [
      "Many Freezones offer optional company registration without public disclosure",
    ],
  },
  {
    title: "Seamless Formation Process",
    bullets: [
      "HMC manages all legal and administrative steps \u2014 from company setup and visa processing to opening your bank account",
    ],
  },
];

const whyFreezoneBenefits = [
  { title: "Tax Optimization", text: "Minimal or no corporate taxes \u2014 ideal for maximizing profitability." },
  { title: "Asset Protection", text: "Safeguard your assets from creditors and legal claims through solid structural design." },
  { title: "Privacy & Anonymity", text: "High levels of confidentiality for shareholders and beneficial owners." },
  { title: "Geographic Flexibility", text: "No requirement for physical presence in the UAE during the formation process." },
];

const limitations = [
  "Freezone companies are not permitted to trade directly within the UAE mainland unless via a local distributor",
  "Activities are often limited to international business sectors such as trade, logistics, or maritime services",
];

const regulatoryRequirements = [
  "No minimum capital requirements (varies by Freezone)",
  "100% foreign ownership allowed",
  "Minimum one shareholder and one director",
  "Local registered agent or service provider required",
];

export default function Freezone() {
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-anim='fz-section']").forEach((el) => {
        gsap.set(el, { autoAlpha: 0, y: 40 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }),
        });
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Navy Hero Banner ── */}
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
              { label: "Business Consulting", href: "/business-consulting" },
              { label: "Company Formation", href: "/company-formation" },
              { label: "Freezone" },
            ]}
            showHomeIcon
          />
          <div className="max-w-4xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Company Formation
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Company Formation In A Dubai Freezone
            </h1>
            <p className="text-lg sm:text-xl font-bold text-white/70">
              Your Strategic Advantage In Global Business
            </p>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[40%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
          <div className="absolute top-[70%] -left-32 h-64 w-64 rounded-full bg-[#D6B26F]/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16 space-y-16">

          {/* ── Intro: image-left / text-right ── */}
          <div data-anim="fz-section" className="grid gap-8 md:gap-10 md:grid-cols-2 items-center">
            <div className="overflow-hidden rounded-3xl ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)]">
              <img src={FreezoneImage} alt="Dubai Freezone skyline at sunset" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C] leading-tight">
                Dubai Freezone Company Formation
              </h2>
              <div className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed space-y-4">
                <p>
                  Establishing a company within one of Dubai&rsquo;s Freezones offers international entrepreneurs and corporations the opportunity to benefit from the UAE&rsquo;s favourable tax environment without the requirement of engaging in local business.
                </p>
                <p>
                  With over 40 specialized Freezones, Dubai provides streamlined and advantageous pathways for foreign investors seeking to set up tax-efficient operations. Selecting the right Freezone is crucial for success &mdash; particularly when opening a corporate bank account.
                </p>
                <p className="font-semibold text-[#0D354C]">
                  Key Benefits at a Glance: Attractive Tax Conditions
                </p>
              </div>
            </div>
          </div>

          {/* ── Benefits Grid (3x2) ── */}
          <div data-anim="fz-section" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefitsGrid.map((card, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/90 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.14)]"
              >
                <h3 className="text-lg font-black text-[#0D354C]">{card.title}</h3>
                <ul className="mt-3 space-y-2 text-[15px] text-slate-600 leading-relaxed">
                  {card.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B26F]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Launch Your Business With Confidence ── */}
          <div data-anim="fz-section" className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Launch Your Business With Confidence
            </h2>
            <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed">
              With HMC Business Setup, company formation in the UAE becomes a streamlined and secure process. Rely on our expertise and take your first step toward a tax-optimized future.
            </p>
            <p className="text-sm font-semibold text-[#0D354C]">
              Why Choose a Freezone Company?
            </p>
            <div className="space-y-4">
              {whyFreezoneBenefits.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/90 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] ring-1 ring-[#0D354C]/10"
                >
                  <h3 className="text-lg font-black text-[#0D354C]">{item.title}</h3>
                  <p className="mt-1 text-[15px] text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Important Limitations ── */}
          <div data-anim="fz-section" className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Important Limitations To Consider
            </h2>
            <p className="text-sm font-bold text-[#0D354C]">Business Restrictions</p>
            <ul className="space-y-2 text-[15px] sm:text-base text-slate-600 leading-relaxed">
              {limitations.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B26F]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Key Regulatory Requirements ── */}
          <div data-anim="fz-section" className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Key Regulatory Requirements
            </h2>
            <ul className="space-y-2 text-[15px] sm:text-base text-slate-600 leading-relaxed">
              {regulatoryRequirements.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B26F]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── CTA ── */}
          <div data-anim="fz-section" className="relative rounded-3xl bg-[#0D354C] text-white p-8 sm:p-10 shadow-2xl overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D6B26F]/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Ready To Set Up Your Freezone Company?
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                  Let HMC handle the complexities while you focus on building your business. From Freezone selection to full registration, we&rsquo;re with you every step.
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
    </>
  );
}
