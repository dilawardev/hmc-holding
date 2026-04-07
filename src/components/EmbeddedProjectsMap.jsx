import React from "react";
import { ArrowRight, LockKeyhole, Radar, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PROJECTS_MAP_EMBED_URL, PROJECTS_MAP_ROUTE } from "@/constants/projectsMap";
import { useProjectsMapLock } from "@/hooks/useProjectsMapLock";

function AccessBadge({ locked }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        locked
          ? "border border-white/15 bg-white/10 text-white/[0.82]"
          : "border border-emerald-300/35 bg-emerald-300/12 text-emerald-50",
      ].join(" ")}
    >
      <LockKeyhole className="h-3.5 w-3.5" />
      {locked ? "Locked" : "Unlocked"}
    </span>
  );
}

export default function EmbeddedProjectsMap() {
  const navigate = useNavigate();
  const { isUnlocked, openUnlockModal } = useProjectsMapLock();

  const handleActivate = () => {
    if (isUnlocked) {
      navigate(PROJECTS_MAP_ROUTE);
      return;
    }

    openUnlockModal(() => navigate(PROJECTS_MAP_ROUTE));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0D354C] py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-[#D6B26F]/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D6B26F]/30 bg-[#D6B26F]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5E6BF]">
            <Radar className="h-3.5 w-3.5" />
            Live market visibility
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Explore HMC&apos;s live Dubai projects map
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/[0.76] sm:text-base">
            Open a live, map-based view of Dubai projects with current pricing,
            location intelligence, and developer inventory, all inside HMC&apos;s
            advisory flow.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/[0.78]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2">
              <ShieldCheck className="h-4 w-4 text-[#D6B26F]" />
              Access stays unlocked on this device
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2">
              <Radar className="h-4 w-4 text-[#D6B26F]" />
              Live project browsing experience
            </span>
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={handleActivate}
          onKeyDown={handleKeyDown}
          className="group relative mt-10 overflow-hidden rounded-[32px] border border-white/12 bg-[#082233] shadow-[0_30px_90px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B26F]/70"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%,rgba(214,178,111,0.14))]" />

          <iframe
            title="HMC live Dubai projects map preview"
            src={PROJECTS_MAP_EMBED_URL}
            loading="lazy"
            scrolling="no"
            aria-hidden="true"
            tabIndex={-1}
            className="pointer-events-none block h-[420px] w-full border-0 sm:h-[520px] lg:h-[620px]"
            style={{
              filter: isUnlocked ? "none" : "grayscale(0.15) saturate(0.9)",
              transform: "scale(1.01)",
              transformOrigin: "center center",
            }}
          />

          <div
            className={[
              "absolute inset-0 flex flex-col justify-between p-6 transition duration-300 sm:p-8",
              isUnlocked
                ? "bg-[linear-gradient(180deg,rgba(6,23,34,0.22),rgba(6,23,34,0.5))]"
                : "bg-[linear-gradient(180deg,rgba(6,23,34,0.3),rgba(6,23,34,0.78))] backdrop-blur-[2px]",
            ].join(" ")}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <AccessBadge locked={!isUnlocked} />
              <span className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.08] px-3 py-1 text-xs text-white/[0.72]">
                {isUnlocked ? "Tap to open the full map" : "Unlock to continue"}
              </span>
            </div>

            <div className="max-w-2xl">
              <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                {isUnlocked
                  ? "Open the full HMC projects map"
                  : "Unlock live projects, pricing, and location insights"}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                {isUnlocked
                  ? "Your access is active. Open the full-screen HMC map experience and continue browsing with live inventory."
                  : "Submit your details once to open the live HMC map experience and keep access available on this device."}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D6B26F] px-5 py-3 text-sm font-semibold text-[#0D354C] transition group-hover:-translate-y-0.5">
                {isUnlocked ? "Go to Projects Map" : "Unlock Projects Map"}
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
