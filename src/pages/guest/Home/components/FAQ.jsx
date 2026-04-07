import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What services does HMC Holding offer?",
    answer:
      "HMC Holding provides a comprehensive range of services including business and investment advisory, corporate advisory, real estate acquisition and management, business solutions, and visa and immigration services — all tailored to help clients succeed in the UAE market.",
  },
  {
    question: "Who can benefit from HMC's advisory services?",
    answer:
      "Our services are designed for investors, entrepreneurs, family offices, and corporate leadership teams looking to enter, expand, or optimise their presence in the UAE and broader Middle East region.",
  },
  {
    question: "How does HMC support real estate investors?",
    answer:
      "We guide investors from property identification and acquisition through financing, asset management, and portfolio optimisation — providing end-to-end support for both residential and commercial real estate in Dubai.",
  },
  {
    question: "Can HMC help with company formation in Dubai?",
    answer:
      "Yes. We are experts in company formation across over 40 free zones in the UAE. From selecting the right jurisdiction and corporate structure to handling license applications and registration, we manage the entire process.",
  },
  {
    question: "What visa and immigration services do you provide?",
    answer:
      "We offer complete visa application processing, relocation planning, compliance and regulatory guidance, family sponsorship, and dependent visa support — ensuring a smooth transition for individuals and teams moving to the UAE.",
  },
  {
    question: "Where is HMC Holding based?",
    answer:
      "Our office is located at Office 24, Golden Mile 2, Palm Jumeirah, Dubai, UAE. We serve clients locally and internationally from this central Dubai location.",
  },
];

function AccordionItem({ faq, index, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div
      data-anim="faq-item"
      className="rounded-2xl bg-white/90 ring-1 ring-[#0D354C]/10 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition hover:shadow-[0_14px_40px_rgba(13,53,76,0.12)]"
    >
      <button
        type="button"
        onClick={() => onToggle(index)}
        className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-bold text-[#0D354C] leading-snug">
          {faq.question}
        </span>
        <ChevronDown
          className={[
            "h-5 w-5 shrink-0 text-[#D6B26F] transition-transform duration-300",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>
      <div
        ref={contentRef}
        className="grid transition-[grid-template-rows] duration-200 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-anim='faq-item']");
      if (!items.length) return;

      gsap.set(items, { autoAlpha: 0, y: 25 });

      ScrollTrigger.create({
        trigger: "[data-anim='faq-grid']",
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white pb-16 sm:pb-20">
      {/* Decorative orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#0D354C]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-4 h-64 w-64 rounded-full bg-[#D6B26F]/20 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D354C] md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-700 leading-relaxed">
            Find answers to common questions about our services, processes, and how we can help you achieve your goals in the UAE.
          </p>
        </div>

        {/* Accordion */}
        <div data-anim="faq-grid" className="mt-10 grid gap-3 max-w-4xl">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              faq={faq}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
