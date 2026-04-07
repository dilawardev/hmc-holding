import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

import OffshoreImage from "../assets/offshore/image.png";

gsap.registerPlugin(ScrollTrigger);

const goalAssessmentCards = [
  {
    title: "Tax Optimization",
    bullets: [
      "Minimal or zero corporate taxation",
      "Ideal for efficient international structuring",
    ],
  },
  {
    title: "Asset Protection",
    bullets: [
      "Safeguards against creditor claims and legal liabilities",
      "Strengthens financial security for private and corporate assets",
    ],
  },
  {
    title: "Confidentiality & Anonymity",
    bullets: [
      "High levels of data privacy for shareholders and beneficial owners",
      "Company records are not publicly disclosed in most jurisdictions",
    ],
  },
  {
    title: "Operational Flexibility",
    bullets: [
      "No requirement for physical presence in the UAE",
      "Remote setup possible through authorized representatives",
    ],
  },
];

const considerationsCards = [
  {
    title: "Operational Scope",
    bullets: [
      "Offshore companies are not permitted to conduct local business within the UAE",
      "Activities are restricted to international trade, investment holding, shipping, and similar sectors",
    ],
  },
  {
    title: "Regulatory Requirements",
    bullets: [
      "No minimum capital required",
      "100% foreign ownership permitted",
      "Minimum of one shareholder and one director",
      "Local registered agent required for legal compliance",
    ],
  },
];

export default function Offshore() {
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-anim='os-section']").forEach((el) => {
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
              { label: "Offshore" },
            ]}
            showHomeIcon
          />
          <div className="max-w-4xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Company Formation
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Offshore Company Formation In The UAE
            </h1>
            <p className="text-lg sm:text-xl font-bold text-white/70">
              Your Strategic Opportunity For Tax Optimization And Asset Protection
            </p>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[40%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
          <div className="absolute top-[75%] -left-32 h-64 w-64 rounded-full bg-[#D6B26F]/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16 space-y-16">

          {/* ── Intro: image-left / text-right ── */}
          <div data-anim="os-section" className="grid gap-8 md:gap-10 md:grid-cols-2 items-center">
            <div className="overflow-hidden rounded-3xl ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)]">
              <img src={OffshoreImage} alt="Dubai skyline with modern architecture" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C] leading-tight">
                A Globally Recognized Structure For International Entrepreneurs
              </h2>
              <div className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed space-y-4">
                <p>
                  Forming an offshore company in Dubai offers a legitimate and internationally accepted vehicle for optimizing tax exposure, securing assets, and preserving privacy. This structure is particularly suited to entrepreneurs with cross-border operations, financial holdings, or strategic international ambitions.
                </p>
                <p>
                  At HMC, we guide discerning clients through the complexities of offshore incorporation with precision and discretion &mdash; delivering a structure that aligns with your global goals.
                </p>
              </div>
            </div>
          </div>

          {/* ── Initial Goal Assessment (2x2) ── */}
          <div data-anim="os-section" className="space-y-8">
            <h2 className="text-center text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Initial Goal Assessment
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {goalAssessmentCards.map((card, i) => (
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
          </div>

          {/* ── Important Considerations And Limitations ── */}
          <div data-anim="os-section" className="space-y-8">
            <h2 className="text-center text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Important Considerations And Limitations
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {considerationsCards.map((card, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/90 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10"
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
          </div>

          {/* ── Offshore Vs. Freezone ── */}
          <div data-anim="os-section" className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Offshore Vs. Freezone Companies &ndash; Know The Difference
            </h2>
            <div className="text-[15px] sm:text-base text-slate-600 leading-relaxed space-y-4">
              <p>
                While offshore entities are strictly limited to international operations and cannot engage in business within the UAE, Freezone companies offer broader flexibility &mdash; including potential access to local markets through licensing and regulatory frameworks.
              </p>
              <p>
                Choosing the right structure depends on your specific goals. Offshore setups prioritize privacy, tax planning, and asset protection. Freezones support active business operations, scaling, and UAE market access.
              </p>
            </div>
          </div>

          {/* ── Conclusion ── */}
          <div data-anim="os-section" className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Conclusion
            </h2>
            <div className="text-[15px] sm:text-base text-slate-600 leading-relaxed space-y-4">
              <p>
                Offshore company formation in Dubai provides powerful advantages in international tax efficiency, privacy, and asset protection. However, limitations on local business activities must be taken into account.
              </p>
              <p>
                Let HMC help you determine whether an offshore or Freezone structure best aligns with your strategic goals. Our expert advisors are here to guide your next step in the UAE and beyond.
              </p>
            </div>
          </div>

          {/* ── CTA ── */}
          <div data-anim="os-section" className="relative rounded-3xl bg-[#0D354C] text-white p-8 sm:p-10 shadow-2xl overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D6B26F]/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Explore Your Offshore Options
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                  Let HMC guide you through every step of offshore incorporation &mdash; with discretion, precision, and a focus on your global ambitions.
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
