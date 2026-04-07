import React from "react";

import GoalIcon from "@/assets/whyWithUs/goal.png";
import StrategyIcon from "@/assets/whyWithUs/development.png";
import PreparationIcon from "@/assets/whyWithUs/preparation.png";
import FoundationIcon from "@/assets/whyWithUs/business-1.png";
import VisaIcon from "@/assets/whyWithUs/passport.png";
import TaxIcon from "@/assets/whyWithUs/briefing.png";

const items = [
  {
    title: "Goal Analysis",
    description:
      "In a non-binding initial consultation, we will clarify your wishes and show you how we can best support your company start-up.",
    icon: GoalIcon,
  },
  {
    title: "Individual Strategy",
    description:
      "Together with tax consultants and lawyers, we develop a customized strategy, optimize your tax structure, and select the appropriate corporate structure.",
    icon: StrategyIcon,
  },
  {
    title: "Preparation",
    description:
      "We prepare you in detail - with checklists and clear information to avoid any uncertainty.",
    icon: PreparationIcon,
  },
  {
    title: "Company Foundation",
    description:
      "We take care of everything for you - from license application to company registration, without your presence in Dubai.",
    icon: FoundationIcon,
  },
  {
    title: "Entry & Visa",
    description:
      "After receiving your license, we will organize your entry and assist you with visa and Emirates ID.",
    icon: VisaIcon,
  },
  {
    title: "Tax-Free Living In Dubai",
    description:
      "After your arrival, we'll take care of all the administrative formalities so you can start your new life with ease. Start your successful company formation in Dubai now!",
    icon: TaxIcon,
  },
];

export default function WhyWithUs() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#0D354C]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-4 h-64 w-64 rounded-full bg-[#D6B26F]/25 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
            Why With Us
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D354C] md:text-4xl">
            Why With Us?
          </h2>
          <p className="mt-3 text-base text-slate-700 leading-relaxed">
            We are experts in company formation in over 40 free zones in the
            UAE. From location to office options, we guide you safely through
            the entire company formation process and take care of everything, so
            you can sit back and relax.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.title}
              className="group flex gap-4 rounded-2xl bg-white/90 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] ring-1 ring-[#0D354C]/10 transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.18)]"
            >
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-[#0D354C]/8 ring-1 ring-[#0D354C]/15">
                <img
                  src={item.icon}
                  alt={`${item.title} icon`}
                  className="h-10 w-10 object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0D354C]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
