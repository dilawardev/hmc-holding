import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import ServiceDetailContent from "@/pages/guest/Services/components/ServiceDetailContent";

import PackageImg1 from "../assets/company-formation/1.png";
import PackageImg2 from "../assets/company-formation/2.png";

gsap.registerPlugin(ScrollTrigger);


const introParas = [
  "Setting up a company in Dubai opens the door to exceptional opportunities \u2013 from substantial tax advantages to access to dynamic international markets. However, success in this venture requires in-depth knowledge of legal, tax, and administrative frameworks. Every year, entrepreneurs and professionals take advantage of these benefits, whether to pursue a new career path in Dubai or to strategically benefit from the business-friendly environment of the UAE.",
  "From choosing the right Freezone to business licensing and opening a bank account, success hinges on detailed planning and a deep understanding of both regional and international regulations \u2014 particularly for founders residing in Germany or outside the UAE.",
  "Unforeseen challenges during the setup process are not to be underestimated. That\u2019s why having an experienced and trustworthy partner by your side is essential to navigate all legal and administrative requirements safely \u2014 and to ensure your business foundation in Dubai is strong, compliant, and built for growth.",
];

const roadmapSteps = [
  {
    title: "Initial Goal Assessment",
    text: "In a personal, obligation-free consultation, we clarify your objectives and define exactly how we can support your business setup in the most effective way.",
  },
  {
    title: "Tailored Strategy",
    text: "Together with certified tax advisors and legal experts, we develop a customized strategy, optimize your tax structure, and select the ideal company type and Freezone for your goals.",
  },
  {
    title: "Preparation",
    text: "We ensure you are fully prepared \u2014 providing clear checklists and guidance so that no questions remain unanswered.",
  },
  {
    title: "Company Registration",
    text: "We handle the entire registration process \u2014 from obtaining your business license to company incorporation. Your physical presence in Dubai is not required.",
  },
  {
    title: "Entry & Residency Visa",
    text: "Once your license is issued, we coordinate your arrival and assist with visa formalities, Emirates ID registration, and all necessary documentation.",
  },
  {
    title: "Living Tax-Free In Dubai",
    text: "Upon arrival, we manage all required government introductions, enabling you to transition into your new lifestyle with ease. Start your journey to success today.",
  },
];

const comprehensivePackage = [
  { label: "Effortless Company Formation", text: "Personalized consulting and complete handling of all formalities \u2014 from concept to completion." },
  { label: "Expert Tax Optimisation", text: "Tailored strategies designed by professionals to minimize your tax exposure effectively." },
  { label: "Visa & Emirates ID Services", text: "Full support with all necessary procedures to obtain residency and official identification." },
  { label: "Bank Account Opening", text: "Assistance in setting up both personal and corporate bank accounts with trusted institutions." },
  { label: "UAE Driving License", text: "Guidance throughout the process of obtaining your local driving license." },
  { label: "Insurance & Real Estate Advisory", text: "Expert consultation on health insurance plans and support in purchasing or leasing real estate in line with your needs." },
  { label: "Langfristige Betreuung", text: "Verl\u00e4ssliche Unterst\u00fctzung \u00fcber die Gr\u00fcndung hinaus." },
];

const premiumPackage = [
  { label: "Streamlined Company Formation", text: "End-to-end service and personal consulting for a smooth and efficient start." },
  { label: "Advanced Tax Optimisation", text: "Professional tax strategies tailored to your financial objectives." },
  { label: "Complete Residency Visa & Emirates ID", text: "Fast-track application service \u2014 completed in as little as 5 working days." },
  { label: "Banking Solutions for Every Need", text: "Full support in opening personal and corporate bank accounts \u2014 efficient, discreet, and secure." },
  { label: "Exclusive Real Estate Advisory", text: "Personalized assistance in purchasing or renting property, aligned with your lifestyle and investment goals." },
  { label: "Mobility & Driving License Support", text: "Full guidance on obtaining a UAE driving licence and access to a personal driver for convenience." },
  { label: "VIP Government Liaison Services", text: "Priority handling of government procedures \u2014 discreet, smooth, and time-saving." },
  { label: "Health Insurance Advisory", text: "Independent recommendations and facilitation of optimal insurance coverage tailored to your needs." },
  { label: "Corporate Tax Registration", text: "End-to-end support for official registration under UAE Corporate Tax regulations." },
  { label: "Long-Term Strategic Guidance", text: "Dedicated advisory beyond incorporation \u2014 for lasting business growth and peace of mind." },
];

const formationTypes = [
  { label: "Mainland", href: "/mainland" },
  { label: "Freezone", href: "/freezone" },
  { label: "Offshore", href: "/offshore" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function CompanyFormation() {
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-anim='cf-section']").forEach((el) => {
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
              { label: "Company Formation" },
            ]}
            showHomeIcon
          />
          <div className="max-w-4xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Business Consulting
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Company Formation
            </h1>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[30%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
          <div className="absolute top-[60%] -left-32 h-64 w-64 rounded-full bg-[#D6B26F]/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16 space-y-16">

          {/* ── 1. Intro ── */}
          <div data-anim="cf-section" className="text-center max-w-4xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Company Formation In Dubai &ndash; Your Path To Success
            </h2>
            <div className="space-y-4 text-[15px] sm:text-base text-slate-600 leading-relaxed">
              {introParas.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* ── 2. From Zero Tax ── */}
          <div data-anim="cf-section" className="text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              From Zero Tax To Full Mobility: Your Business Setup In 6 Clear Steps
            </h2>
            <p className="text-sm font-bold uppercase tracking-wider text-[#D6B26F]">
              Why HMC?
            </p>
            <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed">
              We are experts in company formation across more than 40 Freezones in the UAE. From location selection to office solutions &mdash; we guide you confidently through every stage of the process and handle all formalities so that you can focus on your future while we take care of the rest.
            </p>
          </div>

          {/* ── 3. 6-Step Roadmap Grid ── */}
          <div data-anim="cf-section" className="space-y-8">
            <h2 className="text-center text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Your Roadmap To A Successful Company Formation &ndash; In 6 Simple Steps
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {roadmapSteps.map((step, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/90 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.14)]"
                >
                  <h3 className="text-lg font-black text-[#0D354C]">{step.title}</h3>
                  <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── 4. Our Packages ── */}
          <div data-anim="cf-section" className="space-y-8">
            <div className="text-center space-y-2">
              <p className="text-sm font-bold uppercase tracking-wider text-[#D6B26F]">
                Our Packages
              </p>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
                Tailored Excellence For A Successful Start In The UAE
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-3xl ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)]">
                <img src={PackageImg1} alt="Business handshake" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="overflow-hidden rounded-3xl ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)]">
                <img src={PackageImg2} alt="Premium concierge service" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>

          {/* ── 5. Two Package Columns ── */}
          <div data-anim="cf-section" className="grid gap-8 md:grid-cols-2">
            {/* Left: Comprehensive */}
            <div className="rounded-3xl bg-white/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10">
              <h3 className="text-xl sm:text-2xl font-black text-[#0D354C]">
                Comprehensive Business Setup Package
              </h3>
              <p className="mt-1 text-sm font-semibold text-[#D6B26F]">
                Your All-in-One Solution for Success in the UAE
              </p>
              <ul className="mt-5 space-y-3 text-[15px] text-slate-600 leading-relaxed">
                {comprehensivePackage.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B26F]" />
                    <span>
                      <strong className="text-[#0D354C]">{item.label}:</strong>{" "}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-semibold italic text-[#0D354C]">
                Alles aus einer Hand &mdash; f&uuml;r Ihren erfolgreichen Start in den VAE!
              </p>
            </div>

            {/* Right: Premium */}
            <div className="rounded-3xl bg-white/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10">
              <h3 className="text-xl sm:text-2xl font-black text-[#0D354C]">
                Premium Concierge Package
              </h3>
              <p className="mt-1 text-sm font-semibold text-[#D6B26F]">
                Your Worry-Free Launch Into Life and Business in the UAE
              </p>
              <ul className="mt-5 space-y-3 text-[15px] text-slate-600 leading-relaxed">
                {premiumPackage.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B26F]" />
                    <span>
                      <strong className="text-[#0D354C]">{item.label}:</strong>{" "}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-slate-600 leading-relaxed">
                Benefit from our premium services and make your transition to the UAE efficient, elegant, and effortless.
              </p>
            </div>
          </div>

          {/* ── 5b. Detailed SEO Copy ── */}
          <div data-anim="cf-section" className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Full Service Description
            </h2>
            <ServiceDetailContent
              categoryId="business-investment-advisory"
              itemTitle="Company Formation (Mainland, Free Zone, Offshore)"
              showAllItems={false}
              defaultOpenFirst
            />
          </div>

          {/* ── 6. Closing Section ── */}
          <div data-anim="cf-section" className="text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Your Seamless Start In Dubai &ndash; All From One Trusted Source
            </h2>
            <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed">
              With HMC as your partner, you benefit from a fully integrated service approach in your Dubai Freezone company formation. From incorporation to visa and banking, right through to tax consulting and ensure compliance. Legally sound, administratively efficient, and strategically aligned &mdash; we lay the foundation for your success in the UAE.
            </p>
            <p className="text-base font-semibold text-[#0D354C]">
              Rely on our expertise. Focus on what matters most. Let us take care of the rest.
            </p>
          </div>

          {/* ── 7. Sub-page Links ── */}
          <div data-anim="cf-section" className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
                Mainland Company Formation In Dubai
              </h2>
              <p className="text-lg sm:text-xl font-bold text-[#0D354C]/80">
                Your Gateway To Unlimited Business Potential
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {formationTypes.map((type) => (
                <div
                  key={type.label}
                  className="flex flex-col items-center gap-4 rounded-2xl bg-white/90 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.14)]"
                >
                  <h3 className="text-2xl font-black text-[#0D354C]">{type.label}</h3>
                  <Link
                    to={type.href}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0D354C] px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div data-anim="cf-section" className="relative rounded-3xl bg-[#0D354C] text-white p-8 sm:p-10 shadow-2xl overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D6B26F]/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Ready To Start Your Journey?
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                  Let HMC guide you through every step of your company formation in Dubai. From consultation to completion, we&rsquo;re with you all the way.
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
