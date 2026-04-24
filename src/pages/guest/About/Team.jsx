import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppReady } from "@/context/AppReadyContext";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

import MerzanPortrait from "@/assets/ceo/IMG_6429.PNG";
import BilelPortrait from "@/assets/ceo/IMG_6243.PNG";

gsap.registerPlugin(ScrollTrigger);

const leaders = [
  {
    name: "Merzan Hessou",
    title: "Visionary Founder With Strategic Foresight",
    image: MerzanPortrait,
    align: "right",
    bio: [
      "With over 20 years of experience in finance and strategic business consulting, Merzan Hessou guides companies and investors in developing sustainable, future-oriented strategies.",
      "Following positions at leading banks and insurance institutions in Germany, he has spent the past several years applying his expertise in the dynamic investment landscape of the United Arab Emirates.",
      "His mission is to clearly decode economic complexities and develop solutions with his partners that deliver not only on paper but also in practice.",
      "Reliability, foresight, and close, trust-based collaboration form the foundation of his approach. With a refined understanding of individual needs and a strong focus on long-term value creation, Merzan Hessou is a trusted advisor for those looking to make informed decisions in a demanding market environment.",
    ],
  },
  {
    name: "Bilel Moussa",
    title: "Founder With Vision And Commitment",
    image: BilelPortrait,
    align: "left",
    bio: [
      "Bilel Moussa is the driving force and founder of our firm—a passionate investment and real estate advisor with a keen sense for opportunity in the UAE.",
      "For many years, he has supported investors in bringing their visions to life. Combining deep market insight with strategic thinking and intuitive judgment, he develops tailored solutions that pave the way for long-term success.",
      "From exclusive real estate opportunities to personalized investment strategies, his recommendations are grounded in experience, precision, and a firm commitment to creating real value.",
      "Respected for his trustworthy demeanor and diplomatic approach, Bilel Moussa is more than just a consultant for many of our international clients—he is a reliable partner navigating one of the most dynamic markets in the world.",
      "His dedication and unwavering focus on sustainable outcomes make him a driving force within our organization.",
    ],
  },
];

function LeaderCard({ leader, index }) {
  const reversed = leader.align === "left";

  return (
    <article
      data-anim="leader-card"
      className="rounded-3xl bg-white shadow-[0_14px_50px_rgba(13,53,76,0.10)] ring-1 ring-[#0D354C]/8 overflow-hidden"
    >
      <div
        className={[
          "grid gap-0 items-stretch",
          "md:grid-cols-2",
        ].join(" ")}
      >
        {/* Portrait */}
        <div
          className={[
            "relative overflow-hidden",
            reversed ? "md:order-2" : "md:order-1",
          ].join(" ")}
        >
          <img
            src={leader.image}
            alt={`${leader.name} portrait`}
            className="h-full w-full object-cover md:min-h-[500px]"
            loading="lazy"
          />
          {/* Subtle gradient overlay at bottom */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0D354C]/15 via-transparent to-transparent" />
        </div>

        {/* Bio */}
        <div className={["p-6 sm:p-8 md:p-10 flex flex-col justify-center space-y-5", reversed ? "md:order-1" : "md:order-2"].join(" ")}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
              {leader.title}
            </p>
            <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#0D354C] leading-tight">
              {leader.name}
            </h3>
            <div className="mt-1.5 h-[3px] w-12 rounded-full bg-[#D6B26F]" />
          </div>
          <div className="space-y-3 text-[15px] sm:text-base leading-relaxed text-slate-600">
            {leader.bio.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Team() {
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
      const cards = gsap.utils.toArray("[data-anim='leader-card']");
      cards.forEach((card) => {
        const img = card.querySelector("img");

        // Set initial hidden state
        gsap.set(card, { autoAlpha: 0, y: 50 });
        if (img) gsap.set(img, { scale: 1.05 });

        ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(card, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
            });
            if (img) {
              gsap.to(img, {
                scale: 1,
                duration: 1.2,
                ease: "power2.out",
              });
            }
          },
        });
      });
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

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-5">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/our-company" },
                { label: "Team" },
              ]}
              showHomeIcon
            />
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                Leadership
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                The people steering HMC Holding
              </h1>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Strategic leadership grounded in experience, integrity, and execution. Meet the founders guiding our clients through complex decisions with clarity and conviction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[60%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16">
          <div className="space-y-14">
            {leaders.map((leader, index) => (
              <LeaderCard key={leader.name} leader={leader} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
