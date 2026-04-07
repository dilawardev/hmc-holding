import React, { useEffect, useRef } from "react";
import {
  ArrowRight,
  Building2,
  LockKeyhole,
  MapPinned,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import {
  PROJECTS_MAP_EMBED_URL,
  PROJECTS_MAP_ROUTE,
} from "@/constants/projectsMap";
import { useProjectsMapLock } from "@/hooks/useProjectsMapLock";

const features = [
  {
    title: "Live project visibility",
    body: "Browse current Dubai project inventory in a map-first view built for faster location scanning.",
    Icon: MapPinned,
  },
  {
    title: "Advisory-ready research",
    body: "Use HMC&apos;s map workflow to compare opportunities before moving into a direct advisory conversation.",
    Icon: Building2,
  },
  {
    title: "Device-based access",
    body: "Unlock once on this device and return to the experience without repeating the access step.",
    Icon: ShieldCheck,
  },
];

const steps = [
  "Submit your contact details to unlock access.",
  "Open the live map and explore Dubai projects by area and developer.",
  "Reach out to HMC when you are ready to review the strongest options.",
];

export default function ProjectsMap() {
  const navigate = useNavigate();
  const { isUnlocked, openUnlockModal } = useProjectsMapLock();
  const hasPromptedRef = useRef(false);

  useEffect(() => {
    if (!isUnlocked && !hasPromptedRef.current) {
      hasPromptedRef.current = true;
      openUnlockModal(() => navigate(PROJECTS_MAP_ROUTE));
    }

    if (isUnlocked) {
      hasPromptedRef.current = false;
    }
  }, [isUnlocked, navigate, openUnlockModal]);

  if (!isUnlocked) {
    return (
      <section className="relative overflow-hidden bg-[#0D354C] px-4 pb-20 pt-32 text-white sm:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-[#D6B26F]/18 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_62%)]" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="rounded-[32px] border border-white/12 bg-white/[0.07] p-8 text-center shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur sm:p-10">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#D6B26F]/30 bg-[#D6B26F]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5E6BF]">
              <LockKeyhole className="h-3.5 w-3.5" />
              Projects map locked
            </span>
            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
              Unlock HMC&apos;s live Dubai projects map
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              Share your details to view live project locations, pricing, and
              developer inventory. Access unlocks immediately and stays active
              on this device.
            </p>

            <button
              type="button"
              onClick={() => openUnlockModal(() => navigate(PROJECTS_MAP_ROUTE))}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D6B26F] px-6 py-3 text-sm font-semibold text-[#0D354C] transition hover:-translate-y-0.5"
            >
              Unlock Projects Map
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#0D354C] px-4 pb-16 pt-28 text-white sm:pb-20 sm:pt-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-[#D6B26F]/18 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_62%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl space-y-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects" },
            ]}
            showHomeIcon
          />

          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D6B26F]/30 bg-[#D6B26F]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5E6BF]">
                <Sparkles className="h-3.5 w-3.5" />
                Live projects map
              </span>
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
                Explore Dubai projects through HMC&apos;s live map experience
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/[0.76] sm:text-base">
                Use the map to browse location clusters, review developer-led
                opportunities, and move from market scanning into an HMC
                advisory conversation when you are ready.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/[0.78]">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2">
                  <ShieldCheck className="h-4 w-4 text-[#D6B26F]" />
                  Device access stays unlocked
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2">
                  <MapPinned className="h-4 w-4 text-[#D6B26F]" />
                  Live inventory and location browsing
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D6B26F] px-6 py-3 text-sm font-semibold text-[#0D354C] transition hover:-translate-y-0.5"
                >
                  Talk to HMC
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/[0.07] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/12 bg-white/[0.08] p-6 shadow-[0_26px_90px_rgba(0,0,0,0.28)] backdrop-blur sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F5E6BF]">
                Access flow
              </p>
              <ul className="mt-5 space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/[0.07] text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-white/[0.74] sm:text-base">
                      {step}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#F6F1E7] px-4 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-24 right-0 h-72 w-72 rounded-full bg-[#D6B26F]/18 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#0D354C]/[0.08] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, body, Icon }) => (
              <div
                key={title}
                className="rounded-[28px] border border-[#0D354C]/8 bg-white/[0.85] p-6 shadow-[0_18px_60px_rgba(13,53,76,0.08)] backdrop-blur"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0D354C] text-[#D6B26F]">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-xl font-black tracking-tight text-[#0D354C]">
                  {title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-[36px] border border-[#0D354C]/10 bg-white shadow-[0_28px_80px_rgba(13,53,76,0.14)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0D354C]/8 bg-[#0D354C] px-5 py-4 text-white sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F5E6BF]">
                  Live map
                </p>
                <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">
                  HMC Dubai projects map
                </h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.08] px-4 py-2 text-xs text-white/[0.76]">
                <ShieldCheck className="h-4 w-4 text-[#D6B26F]" />
                Unlocked on this device
              </span>
            </div>

            <iframe
              title="HMC Dubai projects map"
              src={PROJECTS_MAP_EMBED_URL}
              loading="lazy"
              scrolling="no"
              className="block h-[760px] w-full border-0"
            />
          </div>

          <div className="mt-12 rounded-[32px] bg-[#0D354C] p-8 text-white shadow-[0_24px_90px_rgba(0,0,0,0.18)] sm:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F5E6BF]">
                  Next step
                </p>
                <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                  Need help shortlisting the right opportunities?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/[0.78] sm:text-base">
                  HMC can turn the live map into a practical shortlist aligned
                  with your strategy, budget, and location priorities.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D6B26F] px-6 py-3 text-sm font-semibold text-[#0D354C] transition hover:-translate-y-0.5"
                >
                  Book a Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/[0.07] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
