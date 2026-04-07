import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

import Image1 from "@/assets/buissiness_development/1.png";
import Image2 from "@/assets/buissiness_development/2.png";
import Image3 from "@/assets/buissiness_development/3.png";
import Image4 from "@/assets/buissiness_development/4.png";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Reusable two-column section (text + image, alternating sides)     */
/* ------------------------------------------------------------------ */
function TwoColSection({ children, image, imageAlt, imageLeft = false }) {
  return (
    <div
      data-anim="ip-section"
      className="grid gap-8 md:gap-10 md:grid-cols-2 items-center"
    >
      {/* Text */}
      <div className={imageLeft ? "md:order-2" : "md:order-1"}>{children}</div>

      {/* Image */}
      <div className={imageLeft ? "md:order-1" : "md:order-2"}>
        <div className="overflow-hidden rounded-3xl ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)]">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function InvestorProjects() {
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-anim='ip-section']");
      items.forEach((el) => {
        gsap.set(el, { autoAlpha: 0, y: 40 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(el, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            }),
        });
      });

      const cta = document.querySelector("[data-anim='ip-cta']");
      if (cta) {
        gsap.set(cta, { autoAlpha: 0, y: 40 });
        ScrollTrigger.create({
          trigger: cta,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(cta, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            }),
        });
      }
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
              { label: "Investor Projects" },
            ]}
            showHomeIcon
          />
          <div className="max-w-4xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Business Consulting
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Investor Projects
            </h1>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[40%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
          <div className="absolute top-[75%] -left-32 h-64 w-64 rounded-full bg-[#D6B26F]/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16 space-y-16">

          {/* ── 1. Intro: text-left / image-right ── */}
          <TwoColSection image={Image1} imageAlt="Dubai skyline with modern towers">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C] leading-tight">
              Investor projects for future-oriented business development in the UAE
            </h2>
            <div className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed space-y-4">
              <p>
                For our exclusive partners, we strategically support the successful market
                entry and expansion of their companies in the United Arab Emirates (UAE).
                Our focus is on attracting investors interested in investing in existing or
                innovative projects and thus actively contributing to their further
                development. With a strong network and ongoing exchange, we unite our
                investors&rsquo; visions and efficiently implement them.
              </p>
              <p>
                We are currently working with several partners for whom comprehensive
                preparations have already been made for their expansion into the Gulf
                Cooperation Council (GCC) countries.
              </p>
            </div>
          </TwoColSection>

          {/* ── Centered sub-heading ── */}
          <h2
            data-anim="ip-section"
            className="text-center text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]"
          >
            Business projects for investors
          </h2>

          {/* ── 2. Tailor-made solutions: image-left / text-right ── */}
          <TwoColSection
            image={Image2}
            imageAlt="Modern commercial building complex"
            imageLeft
          >
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C] leading-tight">
              Tailor-made solutions for your vision
            </h2>
            <div className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed space-y-4">
              <p>
                With a network of experienced partners, comprehensive market knowledge,
                and continuous exchange, we develop sustainable strategies tailored to our
                clients&rsquo; specific requirements and goals. Our service includes:
              </p>
              <p>
                <strong className="text-[#0D354C]">
                  Identification of relevant business opportunities:
                </strong>{" "}
                We analyze the market and identify promising opportunities that will
                enable your company&rsquo;s growth.
              </p>
              <p>
                <strong className="text-[#0D354C]">
                  Design of sustainable business strategies:
                </strong>{" "}
                We help you develop clear and actionable plans that ensure long-term
                success.
              </p>
              <p>
                <strong className="text-[#0D354C]">Smooth market entry:</strong> We
                accompany you through all phases of market entry and ensure that your
                expansion into one of the world&rsquo;s most exciting economic regions
                proceeds smoothly.
              </p>
            </div>
          </TwoColSection>

          {/* ── 3. Discreet Brokerage: text-left / image-right ── */}
          <TwoColSection
            image={Image3}
            imageAlt="Aerial view of Dubai coastal development"
          >
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C] leading-tight">
              Discreet and Exclusive Project Brokerage
            </h2>
            <div className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed space-y-4">
              <p>
                We work closely with renowned partners preparing their expansion into the
                Gulf Cooperation Council (GCC) countries. We place particular emphasis on
                discretion and confidentiality. Our projects are not made publicly
                available but are presented exclusively to selected potential investors in
                initial personal meetings.
              </p>
              <p>This approach guarantees:</p>
              <p>
                <strong className="text-[#0D354C]">
                  Targeted brokerage of exclusive business opportunities:
                </strong>{" "}
                We ensure that only the most suitable investors have access to the
                projects.
              </p>
              <p>
                <strong className="text-[#0D354C]">Highest confidentiality:</strong> Your
                data and plans remain protected while we select the best partners for you.
              </p>
            </div>
          </TwoColSection>

          {/* ── 4. Together for sustainable success: image-left / text-right ── */}
          <TwoColSection
            image={Image4}
            imageAlt="Dubai waterfront panoramic aerial view"
            imageLeft
          >
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C] leading-tight">
              Together for sustainable success
            </h2>
            <div className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed space-y-4">
              <p>
                Our strength lies in the combination of comprehensive expertise, a strong
                network, and our ability to efficiently turn visions into reality. We help
                you achieve not only short-term success, but also position your company
                for the long term and sustainably.
              </p>
              <p>
                Trust in our experience and commitment to help you achieve your business
                goals in the UAE and beyond. We are at your side as a reliable partner to
                put your company on the road to success.
              </p>
            </div>
          </TwoColSection>

          {/* ── CTA ── */}
          <div
            data-anim="ip-cta"
            className="relative rounded-3xl bg-[#0D354C] text-white p-8 sm:p-10 shadow-2xl overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D6B26F]/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Ready To Take The Next Step?
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                  Let us help you unlock your hidden potential and lay the foundation for
                  enduring success. Reach out to us &ndash; we look forward to
                  accompanying you on your journey toward transformative growth.
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
