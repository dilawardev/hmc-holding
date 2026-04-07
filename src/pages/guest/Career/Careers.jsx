import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppReady } from "@/context/AppReadyContext";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

import MainImage from "../assets/career/mainimage.jpg";
import CompensationIcon from "../assets/career/Attractive_Compensation.png";
import NetworkIcon from "../assets/career/Strong Network.png";
import GrowthIcon from "../assets/career/Growth Opportunities.png";
import ModernIcon from "../assets/career/Modern Work Environment.png";

gsap.registerPlugin(ScrollTrigger);

const offers = [
  {
    title: "Attractive Compensation",
    description:
      "We reward your performance with an above-average, success-based compensation model that recognizes and values your achievements.",
    icon: CompensationIcon,
  },
  {
    title: "Strong Network",
    description:
      "Benefit from our extensive business network and the chance to position yourself in one of the fastest-growing markets in the world.",
    icon: NetworkIcon,
  },
  {
    title: "Modern Work Environment",
    description:
      "Join an innovative, international team based in the heart of Dubai, where collaboration and ambition thrive.",
    icon: ModernIcon,
  },
  {
    title: "Growth Opportunities",
    description:
      "We offer a range of professional development options and support you in reaching your full potential.",
    icon: GrowthIcon,
  },
];

export default function Careers() {
  const contentRef = useRef(null);
  const ready = useAppReady();

  useLayoutEffect(() => {
    if (!ready) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Helper: animate a group of elements with stagger, only when scrolled into view
      const animateIn = (trigger, targets, { stagger = 0, y = 30, duration = 0.7 } = {}) => {
        const els = gsap.utils.toArray(targets);
        if (!els.length) return;

        // Set initial hidden state
        gsap.set(els, { autoAlpha: 0, y });

        ScrollTrigger.create({
          trigger: typeof trigger === "string" ? document.querySelector(trigger) : trigger,
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

      animateIn("[data-anim='opportunity']", "[data-anim='opportunity']", { y: 40, duration: 0.8 });
      animateIn("[data-anim='offer-grid']", "[data-anim='offer-card']", { stagger: 0.12 });
      animateIn("[data-anim='info-grid']", "[data-anim='info-card']", { stagger: 0.15 });
      animateIn("[data-anim='closing']", "[data-anim='closing']", { y: 40, duration: 0.8 });
    }, contentRef);

    return () => ctx.revert();
  }, [ready]);

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
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/our-company" },
              { label: "Careers" },
            ]}
            showHomeIcon
          />
          <div className="max-w-4xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Man With Suitcase — HMC Holistic Management Consulting
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Career Opportunity in Dubai — Join Our Winning Team!
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-3xl">
              Are you a passionate sales professional who impresses with commitment and persuasive energy? Do you aspire to build a career in one of the world's most vibrant and fast-paced cities? Then you've found the right place.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[40%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 space-y-14 pt-14 sm:pt-16">
          {/* Opportunity */}
          <div data-anim="opportunity" className="grid gap-10 md:grid-cols-[1.05fr_1fr] items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D354C]">
                Your Opportunity in Dubai
              </h2>
              <div className="space-y-4 text-[15px] sm:text-base text-slate-700 leading-relaxed">
                <p>
                  We are seeking ambitious sales talents with a drive for excellence—individuals who are ready to support our clients with professionalism and dedication on their journey to tailored solutions.
                </p>
                <p>
                  Whether you're a seasoned sales expert or a career changer discovering your passion for client relations, what counts for us is your motivation and your will to succeed.
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/10">
              <img src={MainImage} alt="Career opportunity in Dubai" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          {/* Offer grid */}
          <div className="space-y-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D354C]">
              What We Offer
            </h3>
            <div data-anim="offer-grid" className="grid gap-6 sm:grid-cols-2">
              {offers.map((offer) => (
                <div
                  key={offer.title}
                  data-anim="offer-card"
                  className="group flex gap-4 rounded-2xl bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 p-5 transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.18)]"
                >
                  <div className="mt-1 h-12 w-12 shrink-0 rounded-xl bg-[#D6B26F]/12 ring-1 ring-[#D6B26F]/30 grid place-items-center">
                    <img src={offer.icon} alt="" className="h-7 w-7 object-contain" loading="lazy" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-bold text-[#0D354C]">{offer.title}</div>
                    <p className="text-sm text-slate-700 leading-relaxed">{offer.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile + Why */}
          <div data-anim="info-grid" className="grid gap-6 md:grid-cols-2">
            <div data-anim="info-card" className="group rounded-2xl bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 p-6 space-y-3 transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.18)]">
              <h4 className="text-xl font-extrabold text-[#0D354C]">Your Profile</h4>
              <ul className="space-y-2 text-sm text-slate-700 leading-relaxed list-disc list-inside">
                <li>A genuine passion for sales and enthusiasm for client interaction</li>
                <li>Excellent communication skills and persuasive confidence</li>
                <li>Motivation to perform at the highest level in a dynamic environment</li>
                <li>Strong team spirit and a results-driven mindset</li>
              </ul>
            </div>

            <div data-anim="info-card" className="group rounded-2xl bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 p-6 space-y-3 transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.18)]">
              <h4 className="text-xl font-extrabold text-[#0D354C]">Why Dubai?</h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                Dubai is not just a city of superlatives—it is a global hub of innovation and economic opportunity. As a thriving marketplace, it offers outstanding prospects for sales professionals ready to elevate their careers to new heights.
              </p>
            </div>
          </div>

          {/* Closing */}
          <div data-anim="closing" className="relative rounded-3xl bg-[#0D354C] text-white p-8 sm:p-10 shadow-2xl ring-1 ring-black/10 space-y-4 overflow-hidden">
            {/* Decorative orb inside CTA */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D6B26F]/20 blur-3xl" />

            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Ready For The Challenge?</h3>
              <p className="mt-4 text-sm sm:text-base text-white/90 leading-relaxed">
                Become part of our success story and shape your professional future with us in Dubai. Apply today and take the first step toward a rewarding career with HMC.
              </p>
              <p className="mt-3 text-sm sm:text-base font-semibold">
                We look forward to meeting you!<br />
                <span className="text-[#D6B26F]">Your HMC Partner Team</span>
              </p>
              <div className="mt-5">
                <a
                  href="mailto:info@hmc-holding.com"
                  className="inline-flex items-center justify-center rounded-full bg-[#D6B26F] text-[#0D354C] px-6 py-3 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
