import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { submitContactInquiry } from "@/utils/inquiryApi";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    label: "Contact",
    value: "+971 501711384",
    href: "tel:+971501711384",
    icon: Phone,
  },
  {
    label: "Office Address",
    value: "Office 24 – Golden Mile 2 – Palm Jumeirah Dubai, UAE",
    href: null,
    icon: MapPin,
  },
  {
    label: "Email",
    value: "info@hmc-holding.com",
    href: "mailto:info@hmc-holding.com",
    icon: Mail,
  },
];

function ContactCard({ item }) {
  const { label, value, href, icon: Icon } = item;

  const inner = (
    <>
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#D6B26F]/12 ring-1 ring-[#D6B26F]/30">
        <Icon className="h-5 w-5 text-[#D6B26F]" />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold text-[#0D354C] leading-snug">
        {value}
      </p>
    </>
  );

  const classes =
    "data-[anim='contact-card'] group block rounded-2xl bg-white p-6 ring-1 ring-[#0D354C]/10 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.18)]";

  if (href) {
    return (
      <a href={href} data-anim="contact-card" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <div data-anim="contact-card" className={classes}>
      {inner}
    </div>
  );
}

function ContactUs() {
  const contentRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });
  const isSubmitting = submitState.status === "loading";

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (submitState.status !== "idle") {
      setSubmitState({ status: "idle", message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitState({ status: "loading", message: "" });

    try {
      const response = await submitContactInquiry({
        name: form.name,
        email: form.email,
        phone: form.contact,
        subject: form.subject,
        message: form.message,
        pageUrl: typeof window !== "undefined" ? window.location.href : "/contact-us",
        pagePath: "/contact-us",
      });

      setForm({
        name: "",
        email: "",
        contact: "",
        subject: "",
        message: "",
      });
      setSubmitState({
        status: "success",
        message:
          response.message ||
          "Your message has been sent. We'll get back to you shortly.",
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your message right now. Please try again shortly.",
      });
    }
  };

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const animateIn = (trigger, targets, { stagger = 0, y = 30, duration = 0.7 } = {}) => {
        const els = gsap.utils.toArray(targets);
        if (!els.length) return;

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

      animateIn("[data-anim='info-grid']", "[data-anim='contact-card']", { stagger: 0.12 });
      animateIn("[data-anim='form-section']", "[data-anim='form-section']", { y: 40, duration: 0.8 });
      animateIn("[data-anim='map-section']", "[data-anim='map-section']", { y: 40, duration: 0.8 });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  const inputBase =
    "w-full rounded-xl bg-white px-4 py-3 text-sm text-slate-700 ring-1 ring-[#0D354C]/10 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#D6B26F] placeholder:text-slate-400";

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
              { label: "Contact Us" },
            ]}
            showHomeIcon
          />
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Get In Touch
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Contact Us
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Looking for your next investment or property in Dubai? We&apos;re here to help. Reach out to us today and let our team guide you with expertise and care.
            </p>
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

        <div className="relative mx-auto max-w-6xl px-4 pt-12 sm:pt-16 space-y-14">
          {/* Contact Info Cards */}
          <div data-anim="info-grid" className="grid gap-6 md:grid-cols-3">
            {contactInfo.map((item) => (
              <ContactCard key={item.label} item={item} />
            ))}
          </div>

          {/* Form Section */}
          <div data-anim="form-section" className="space-y-6">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
                Start the Conversation
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                At HMC Holding, we&apos;re here to guide you through every step of your real estate journey in Dubai. Whether you&apos;re looking for investment opportunities, property consultation, or simply have a question, our team is ready to assist you. Reach out today and let&apos;s connect.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1 */}
              <fieldset
                className={isSubmitting ? "space-y-5 opacity-80" : "space-y-5"}
                disabled={isSubmitting}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-bold text-[#0D354C]">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Anderson Smith"
                      className={inputBase}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-bold text-[#0D354C]">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="addersonsmith@gmail.com"
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="contact" className="text-sm font-bold text-[#0D354C]">
                      Contact
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      type="tel"
                      value={form.contact}
                      onChange={handleChange}
                      placeholder="+971 52 987 6543"
                      className={inputBase}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-sm font-bold text-[#0D354C]">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-bold text-[#0D354C]">
                    Comments / Questions <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={inputBase + " resize-y"}
                  />
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6B26F] px-6 py-3 text-sm font-bold text-[#0D354C] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </fieldset>

              {submitState.message ? (
                <p
                  className={
                    submitState.status === "success"
                      ? "text-sm font-medium text-emerald-600"
                      : "text-sm font-medium text-rose-600"
                  }
                >
                  {submitState.message}
                </p>
              ) : null}
            </form>
          </div>

          {/* Map */}
          <div data-anim="map-section" className="space-y-6">
            <div className="max-w-3xl space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
                Our Location
              </p>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
                Find Us
              </h2>
            </div>
            <div className="overflow-hidden rounded-3xl ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)]">
              <iframe
                title="HMC Holding Office Location"
                src="https://maps.google.com/maps?q=Golden+Mile+2,+Palm+Jumeirah,+Dubai,+UAE&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
