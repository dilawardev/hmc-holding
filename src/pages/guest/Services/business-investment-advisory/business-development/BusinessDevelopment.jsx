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
import ServiceDetailContent from "@/pages/guest/Services/components/ServiceDetailContent";

gsap.registerPlugin(ScrollTrigger);

const introparagraphs = [
  "We support your company with precise consulting on the path to sustainable growth and long-term success \u2013 from strategic planning to implementation. Our clear goal: to position your business securely and competitively in the market.",
  "Our focus lies in opening up new markets and activating untapped potential to increase revenue and market share \u2013 for greater reach and competitiveness.",
  "In addition, we place great value on building stable, long-term business relationships that ensure growth for your company, even in dynamic times. Whether through new partnerships or optimized connections \u2013 we create networks that open new perspectives and secure sustainable success.",
  "Another key to success: we assemble high-performing teams that share your vision. Through strategic team leadership, we strengthen your customer relationships over the long term.",
  "As a reliable partner, we help shape the future of your company together with you.",
];

const sections = [
  {
    title: "Business Development \u2013 Your Strategic Key To Sustainable Success",
    text: "At HMC, we don\u2019t just consult \u2013 we empower. Our business development services are designed to guide your company on a path of sustainable growth and long-term success. From strategic planning to seamless execution, we work alongside you to ensure your business is positioned with strength, clarity, and resilience in an increasingly competitive marketplace.",
    image: Image1,
    imageAlt: "Dubai city skyline",
    layout: "text-left",
  },
  {
    title: "Strategic Market Expansion And Unlocking Growth Potential",
    text: "Our primary focus lies in the targeted development of new market opportunities and the activation of untapped potential within your organization. Together, we craft forward-looking strategies that not only increase revenue and expand market share but also enhance your competitive edge over the long term.\n\nWe place particular emphasis on identifying relevant opportunities across dynamic industries and economic environments, ensuring your business remains agile, visible, and influential in the markets that matter most. Whether through vertical expansion, product innovation, or geographic diversification \u2013 we deliver measurable progress with precision.",
    image: Image2,
    imageAlt: "Modern commercial buildings",
    layout: "text-right",
  },
  {
    title: "Establishing Sustainable Business Relationships",
    text: "Sustainable growth is rooted in strong, reliable partnerships. At HMC, we support you in building long-term, high-value relationships that provide both stability and growth \u2013 even in turbulent times. We facilitate the development of strategic networks and optimize existing business alliances to ensure they remain future-ready and performance-driven. By nurturing trust-based connections and aligning shared goals, we create a stable foundation for long-lasting commercial success and collaborative innovation.",
    image: null,
    layout: "full-width",
  },
  {
    title: "Building High-Performance Teams That Drive Vision",
    text: "A company is only as strong as its people. That\u2019s why we help you assemble and lead high-performance teams that embody your vision, drive your mission forward, and deliver consistent results. Through strategic leadership development, organizational structuring, and performance management, we reinforce your internal capabilities. The result: empowered teams that enhance customer relationships and generate sustainable value for your business.",
    image: Image3,
    imageAlt: "Business professionals in discussion",
    layout: "text-left",
  },
  {
    title: "Your Trusted Partner In Sustainable Transformation",
    text: "With deep industry expertise, global insight, and a comprehensive understanding of cross-sectoral dynamics, HMC serves as your reliable partner in shaping the future of your enterprise. We combine strategic foresight, innovation, and analytical precision to ensure that your goals are not only achieved but exceeded. Whether you are entering new markets, scaling operations, or repositioning your brand, we provide the guidance and clarity needed to realize your full potential with confidence.",
    image: Image4,
    imageAlt: "Dubai waterfront aerial view",
    layout: "text-right",
  },
];

function ContentSection({ section, index }) {
  if (section.layout === "full-width") {
    return (
      <div data-anim="bd-section" className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
          {section.title}
        </h2>
        <div className="text-[15px] sm:text-base text-slate-600 leading-relaxed space-y-4">
          {section.text.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    );
  }

  const isTextLeft = section.layout === "text-left";

  return (
    <div data-anim="bd-section" className="grid gap-8 md:gap-10 md:grid-cols-2 items-start">
      {/* Text */}
      <div className={isTextLeft ? "md:order-1" : "md:order-2"}>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C] leading-tight">
          {section.title}
        </h2>
        <div className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed space-y-4">
          {section.text.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {/* Image */}
      <div className={isTextLeft ? "md:order-2" : "md:order-1"}>
        <div className="overflow-hidden rounded-3xl ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)]">
          <img
            src={section.image}
            alt={section.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default function BusinessDevelopment() {
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-anim='bd-section']");
      items.forEach((el) => {
        gsap.set(el, { autoAlpha: 0, y: 40 });

        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      });

      // CTA
      const cta = document.querySelector("[data-anim='bd-cta']");
      if (cta) {
        gsap.set(cta, { autoAlpha: 0, y: 40 });
        ScrollTrigger.create({
          trigger: cta,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(cta, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" });
          },
        });
      }
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Navy Hero Banner */}
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
              { label: "Business Development" },
            ]}
            showHomeIcon
          />
          <div className="max-w-4xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Business Consulting
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Business Development
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[40%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
          <div className="absolute top-[75%] -left-32 h-64 w-64 rounded-full bg-[#D6B26F]/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16 space-y-16">
          {/* Intro */}
          <div data-anim="bd-section" className="max-w-4xl space-y-4">
            {introparagraphs.map((p, idx) => (
              <p
                key={idx}
                className={[
                  "leading-relaxed",
                  idx === 0
                    ? "text-base sm:text-lg text-slate-700"
                    : "text-[15px] sm:text-base text-slate-600",
                ].join(" ")}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Content Sections */}
          {sections.map((section, idx) => (
            <ContentSection key={idx} section={section} index={idx} />
          ))}

          {/* Long-form service copy */}
          <div data-anim="bd-section" className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
              Full Service Description
            </h2>
            <ServiceDetailContent
              categoryId="business-investment-advisory"
              itemTitle="Business Consulting & Development"
              showAllItems={false}
              defaultOpenFirst
            />
          </div>

          {/* CTA */}
          <div data-anim="bd-cta" className="relative rounded-3xl bg-[#0D354C] text-white p-8 sm:p-10 shadow-2xl overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D6B26F]/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Ready To Take The Next Step?
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                  Let us help you unlock your hidden potential and lay the foundation for enduring success. Reach out to us &ndash; we look forward to accompanying you on your journey toward transformative growth.
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
