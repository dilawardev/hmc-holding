import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

import MainlandImage from "../assets/mainland/1.avif";

gsap.registerPlugin(ScrollTrigger);

const legalStructures = [
  {
    title: "Initial Goal Assessment",
    text: "Ideal for commercial and industrial activities such as e-commerce, automotive rental, or food distribution.\n\nThanks to recent reforms, investors can now benefit from 100% foreign ownership without the need for a local partner \u2014 while enjoying the legal protection of limited liability.",
  },
  {
    title: "Sole Establishment",
    text: "A preferred option for service-based businesses such as consultancy firms, caf\u00e9s, or boutique restaurants.\n\nThis structure requires a UAE-based Local Service Agent for administrative support, while you retain full operational control and ownership of your company.",
  },
];

const keyAdvantages = [
  { bold: "Full access to all UAE markets", text: "and the ability to work directly with local companies and government entities" },
  { bold: "100% foreign ownership", text: "in many sectors \u2014 no Emirati partner required" },
  { bold: "Flexible legal structures", text: "tailored to your business model (LLC or Sole Establishment)" },
  { bold: "No industry-specific restrictions", text: "\u2014 enabling maximum growth and cross-sector expansion" },
  { bold: "Strategic positioning", text: "for scaling regionally or globally from a stable and business-friendly environment" },
];

export default function Mainland() {
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-anim='ml-section']").forEach((el) => {
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
              { label: "Mainland" },
            ]}
            showHomeIcon
          />
          <div className="max-w-4xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Company Formation
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Mainland Company Formation In Dubai
            </h1>
            <p className="text-lg sm:text-xl font-bold text-white/70">
              Your Gateway To Unlimited Business Potential
            </p>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[40%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16 space-y-16">

          {/* ── Establishing A Mainland Company ── */}
          <div data-anim="ml-section" className="grid gap-8 md:gap-10 md:grid-cols-2 items-center">
            <div className="overflow-hidden rounded-3xl ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)]">
              <img src={MainlandImage} alt="Modern building in Dubai" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C] leading-tight">
                Establishing A Mainland Company
              </h2>
              <div className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed space-y-4">
                <p>
                  Forming a mainland company in the UAE offers international investors unrestricted access to local markets and the ability to operate freely with both domestic and global clients. This structure provides maximum entrepreneurial flexibility &mdash; without geographical or sector-specific limitations.
                </p>
                <p>
                  Mainland companies are particularly suited for businesses that require a physical presence in the UAE or seek to engage in direct trade within the local economy.
                </p>
                <p className="font-semibold text-[#0D354C]">
                  Available Legal Structures for Mainland Setup
                </p>
              </div>
            </div>
          </div>

          {/* ── Available Legal Structures ── */}
          <div data-anim="ml-section" className="space-y-8">
            <h2 className="text-center text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Available Legal Structures For Mainland Setup
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {legalStructures.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/90 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10"
                >
                  <h3 className="text-lg font-black text-[#0D354C]">{s.title}</h3>
                  <div className="mt-3 text-[15px] text-slate-600 leading-relaxed space-y-3">
                    {s.text.split("\n\n").map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Key Advantages ── */}
          <div data-anim="ml-section" className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Key Advantages Of A Mainland Company In The UAE
            </h2>
            <ul className="space-y-3 text-[15px] sm:text-base text-slate-600 leading-relaxed">
              {keyAdvantages.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B26F]" />
                  <span>
                    <strong className="text-[#0D354C]">{item.bold}</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Your Trusted Partner ── */}
          <div data-anim="ml-section" className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Your Trusted Partner For Mainland Company Formation
            </h2>
            <div className="text-[15px] sm:text-base text-slate-600 leading-relaxed space-y-4">
              <p>
                At HMC, we offer end-to-end support for your mainland setup &mdash; from selecting the right legal structure to fulfilling every legal, tax, and regulatory requirement with precision and reliability.
              </p>
              <p>
                Our deep understanding of the UAE&rsquo;s corporate landscape ensures a smooth and compliant establishment process, allowing you to focus fully on realizing your vision.
              </p>
            </div>
          </div>

          {/* ── CTA ── */}
          <div data-anim="ml-section" className="relative rounded-3xl bg-[#0D354C] text-white p-8 sm:p-10 shadow-2xl overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D6B26F]/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Let&rsquo;s Bring Your Business Vision To Life
                </h2>
                <div className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed space-y-2">
                  <p>
                    Partner with HMC to establish your mainland company in Dubai &mdash; confidently, compliantly, and with a long-term perspective.
                  </p>
                  <p className="font-semibold text-white">
                    Contact us today and turn your ambitions into tangible success in the UAE.
                  </p>
                </div>
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
