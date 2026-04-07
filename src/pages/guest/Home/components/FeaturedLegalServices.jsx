import React from "react";
import {
  ArrowRight,
  FileCheck2,
  Landmark,
  Scale,
  ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";
import legalFamilyImage from "@/assets/legal/isolated-saudi-family-father-mother-600nw-2601785537.webp";

const LEGAL_SERVICES_PATH =
  "/services/corporate-advisory/legal-documentation-and-contracts";

const planningHighlights = [
  {
    title: "Family-first planning",
    text: "Structure decisions around guardianship, beneficiaries, executors, and the wishes you want clearly recorded.",
    Icon: ShieldAlert,
  },
  {
    title: "Document readiness",
    text: "Prepare the information and supporting details early so the registration process does not stall on missing inputs.",
    Icon: FileCheck2,
  },
  {
    title: "Route clarity",
    text: "Understand whether a DIFC route or Abu Dhabi civil-will route deserves attention first for your situation.",
    Icon: Scale,
  },
];

const pathwayCards = [
  {
    title: "DIFC route",
    body: "English-led registration support with digital-first preparation and virtual steps where available.",
    tone: "light",
  },
  {
    title: "Abu Dhabi route",
    body: "Civil-will registration support with published bilingual forms and online application flow.",
    tone: "dark",
  },
];

export default function FeaturedLegalServices() {
  return (
    <section className="relative overflow-hidden bg-[#F6F1E7] py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-[#D6B26F]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#0D354C]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D6B26F]">
              Featured Legal Services
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0D354C] sm:text-4xl lg:text-5xl">
              Secure your legacy in the UAE with clearer will planning
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              HMC helps families, investors, and residents approach will
              registration with more structure around succession, guardianship,
              and document readiness so important decisions are not left to
              uncertainty.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-[#0D354C]/10 bg-white/90 p-5 shadow-[0_18px_46px_-34px_rgba(13,53,76,0.35)] sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
                  Why it matters
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Without a registered will, families may face delay,
                  uncertainty, and avoidable stress. A clearer structure helps
                  protect loved ones and reduces room for confusion later.
                </p>
              </div>

              {pathwayCards.map((card) => (
                <article
                  key={card.title}
                  className={[
                    "rounded-[28px] border p-5 shadow-[0_18px_46px_-34px_rgba(13,53,76,0.35)]",
                    card.tone === "dark"
                      ? "border-[#0D354C] bg-[#0D354C] text-white"
                      : "border-[#0D354C]/10 bg-white/90 text-[#0D354C]",
                  ].join(" ")}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
                    {card.title}
                  </p>
                  <p
                    className={[
                      "mt-3 text-sm leading-relaxed",
                      card.tone === "dark" ? "text-white/78" : "text-slate-600",
                    ].join(" ")}
                  >
                    {card.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={LEGAL_SERVICES_PATH}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D354C] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Explore Legal Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-[#0D354C]/12 bg-white px-6 py-3 text-sm font-semibold text-[#0D354C] transition hover:bg-[#0D354C]/5"
              >
                Book a Consultation
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="overflow-hidden rounded-[32px] border border-[#0D354C]/10 bg-white shadow-[0_28px_70px_-38px_rgba(13,53,76,0.45)]">
              <img
                src={legalFamilyImage}
                alt="Family-focused legal services planning"
                className="h-[360px] w-full object-cover sm:h-[420px] lg:h-[500px]"
                loading="lazy"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {planningHighlights.map(({ title, text, Icon }) => (
                <article
                  key={title}
                  className="rounded-[28px] border border-[#0D354C]/10 bg-white/92 p-5 shadow-[0_16px_40px_-32px_rgba(13,53,76,0.32)]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0D354C] text-[#D6B26F]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-[#0D354C]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {text}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-[30px] border border-[#0D354C]/10 bg-white/92 p-6 shadow-[0_20px_48px_-36px_rgba(13,53,76,0.35)]">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D6B26F]/18 text-[#0D354C]">
                  <Landmark className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
                    Practical support
                  </p>
                  <h3 className="mt-2 text-xl font-black tracking-tight text-[#0D354C]">
                    A clearer route before registration starts
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    The goal is not only to register a document, but to make
                    sure the planning around it is coherent, family-aware, and
                    ready for the route you choose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
