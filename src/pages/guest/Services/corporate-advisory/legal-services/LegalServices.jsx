import React, { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  Globe2,
  Landmark,
  Mail,
  Phone,
  Scale,
  ShieldAlert,
  UserRound,
  Users,
} from "lucide-react";

import { ServicePageShell } from "@/pages/guest/Services/components/service-pages/ServicePagePrimitives";
import ThemedSelect from "@/components/forms/ThemedSelect";
import { submitLegalInquiry } from "@/utils/inquiryApi";
import advisoryMeetingImage from "@/assets/services/business-investment-advisory/business-consulting-and-development/advisory-meeting.jpg";
import executiveMeetingImage from "@/assets/services/visa-immigration-services/investor-and-partner-visas/executive-meeting.jpg";
import handshakeImage from "@/assets/services/corporate-advisory/legal-documentation-and-contracts/handshake.jpg";

const heroHighlights = [
  "100% online registration support",
  "Proceedings in English through DIFC registration",
  "Timing varies by drafting scope and appointment availability",
];

const riskItems = [
  {
    icon: ShieldAlert,
    title: "Default distribution may override your preferences",
    text: "Without a registered will, your estate may be handled under default rules instead of the instructions you intended for your spouse, children, or wider family.",
  },
  {
    icon: Landmark,
    title: "Assets and bank access can slow down",
    text: "Families and executors may face procedural delay while authority, entitlement, and supporting documentation are being confirmed.",
  },
  {
    icon: Users,
    title: "Guardianship questions can become more stressful",
    text: "If minor children are involved, the absence of a clear registered will can add uncertainty at exactly the wrong time.",
  },
  {
    icon: Scale,
    title: "Family disputes become more likely",
    text: "Ambiguity around instructions, beneficiaries, or executors can increase friction, cost, and emotional pressure for loved ones.",
  },
];

const comparisonRows = [
  {
    label: "Registry",
    difc: "DIFC Courts Wills Service",
    abuDhabi: "ADJD Civil Wills Office / Civil Family Court",
  },
  {
    label: "Who the route is aimed at",
    difc: "Non-Muslims investing and living in the UAE.",
    abuDhabi: "Non-UAE citizens may register a will regardless of religion.",
  },
  {
    label: "Language position",
    difc: "Registration is handled in English and the service says testators and witnesses need a basic grasp of English.",
    abuDhabi: "Standard will forms are published in both Arabic and English.",
  },
  {
    label: "Registration mode",
    difc: "Electronic signing with virtual registration available from anywhere in the world.",
    abuDhabi:
      "Application is submitted online, then a video-call notarisation appointment is booked if approved.",
  },
  {
    label: "Preparation support",
    difc: "Online template options and a public register of DIFC Wills Draftsmen are available.",
    abuDhabi:
      "A standardised will template is published through the Civil Family Court.",
  },
  {
    label: "Published timing note",
    difc: "The registration appointment itself is described as taking about 20 minutes once the will is ready.",
    abuDhabi:
      "Application approval is described as taking up to 10 working days before the notarisation stage.",
  },
];

const whyHmcCards = [
  {
    title: "Clear route selection",
    text: "We help you understand whether DIFC, Abu Dhabi, or a more tailored legal route deserves attention first.",
  },
  {
    title: "Family-first planning",
    text: "The discussion stays focused on guardianship, executors, beneficiaries, and how to avoid unnecessary stress later.",
  },
  {
    title: "Document readiness",
    text: "We help organise the intake so drafting and registration do not stall on avoidable missing details.",
  },
  {
    title: "Remote-friendly coordination",
    text: "The process can be prepared from abroad or within the UAE, with digital-first coordination where available.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Consult & plan",
    text: "Define family priorities, executors, beneficiaries, guardianship intentions, and whether DIFC or Abu Dhabi appears more suitable.",
  },
  {
    number: "02",
    title: "Draft the will",
    text: "Prepare the will around the relevant registry format, your asset position, and any family-specific instructions.",
  },
  {
    number: "03",
    title: "Review & refine",
    text: "Check names, powers, fallback clauses, and family provisions before anything is submitted for registration.",
  },
  {
    number: "04",
    title: "Finalize documents",
    text: "Complete supporting documents, identity material, and any language or template requirements tied to the chosen route.",
  },
  {
    number: "05",
    title: "Submit & register",
    text: "Book the relevant appointment, complete the registry process, and keep the registered copy and reference details organised.",
  },
];

const familyValueCards = [
  {
    title: "Guardianship clarity",
    text: "Parents usually want certainty on who steps in and how responsibilities are expressed if children are still minors.",
  },
  {
    title: "Executor confidence",
    text: "A structured will makes it easier for the right person to act, communicate, and move matters forward.",
  },
  {
    title: "Fewer family disputes",
    text: "Clear drafting reduces room for misunderstanding around beneficiaries, shares, and decision-making.",
  },
  {
    title: "Peace of mind",
    text: "The biggest benefit is often simple: knowing your wishes are formally recorded rather than left uncertain.",
  },
];

const faqItems = [
  {
    question: "Do I need to live in the UAE to register a will?",
    answer:
      "The right answer depends on the route. DIFC states that wills can be registered virtually from anywhere in the world, while ADJD states non-UAE citizens may register a will through its Civil Wills Office. Final suitability should still be confirmed for your personal situation.",
  },
  {
    question: "Which option should I choose: DIFC or Abu Dhabi?",
    answer:
      "There is no one-size-fits-all answer. The better route depends on your family structure, asset profile, preferred process language, and the type of drafting support you need.",
  },
  {
    question: "Can I prepare the will online?",
    answer:
      "Both registries publish digital or online elements. DIFC offers online preparation and virtual registration options, while ADJD accepts online applications and schedules notarisation by video call if the application is approved.",
  },
  {
    question: "How long can the process take?",
    answer:
      "That depends on drafting complexity, document readiness, and appointment scheduling. DIFC says the registration appointment itself should take about 20 minutes once the will is ready, while ADJD says application approval can take up to 10 working days before the next stage.",
  },
  {
    question: "Is this page legal advice?",
    answer:
      "No. This page is a practical overview designed to help you understand the process. Final advice should be based on your assets, family circumstances, and the registry rules that apply to you.",
  },
];

const nationalityOptions = [
  "United Arab Emirates",
  "United Kingdom",
  "India",
  "Pakistan",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "South Africa",
  "Egypt",
  "Other",
];

const willTypeOptions = ["DIFC Will", "Abu Dhabi Civil Will", "Not sure yet"];
const initialLegalForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nationality: "",
  willType: "",
};

export default function LegalServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState(initialLegalForm);
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });
  const isSubmitting = submitState.status === "loading";

  function updateForm(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));

    if (submitState.status !== "idle") {
      setSubmitState({ status: "idle", message: "" });
    }
  }

  async function handleLegalSubmit(event) {
    event.preventDefault();

    setSubmitState({ status: "loading", message: "" });

    try {
      const response = await submitLegalInquiry({
        ...form,
        pageUrl:
          typeof window !== "undefined"
            ? window.location.href
            : "/services/corporate-advisory/legal-services",
        pagePath: "/services/corporate-advisory/legal-services",
      });

      setForm(initialLegalForm);
      setSubmitState({
        status: "success",
        message:
          response.message ||
          "Your wills consultation request has been sent successfully.",
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your wills consultation request right now. Please try again shortly.",
      });
    }
  }

  return (
    <div className="overflow-x-hidden">
      <ServicePageShell
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Corporate Advisory", href: "/corporate-advisory" },
          { label: "Legal Services" },
        ]}
        eyebrow="Corporate Advisory"
        title="Legal Services"
        summary="Will registration and legacy-planning support for families who want clearer control over succession, guardianship, and document readiness in the UAE."
      >
      <section data-anim="service-reveal" className="relative ">
        <div className=" grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D6B26F]">
              Will Registration & Legacy Planning
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-tight text-[#0D354C] sm:text-5xl lg:text-6xl">
              Secure Your Legacy in the UAE. Protect Your Family Today.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Without a registered will, your estate may be distributed under
              default rules rather than your wishes. That can create delay,
              uncertainty, and avoidable stress for the people you care about
              most. A registered will helps you stay in control and protect your
              family with greater clarity.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {heroHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-[#0D354C]/10 bg-white/85 px-4 py-3 shadow-[0_14px_32px_-28px_rgba(13,53,76,0.45)]"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <p className="text-sm font-medium leading-relaxed text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#consultation-form"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-600"
              >
                Book Your Free Consultation Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#faq"
                className="inline-flex items-center justify-center rounded-full border border-[#0D354C]/12 bg-white px-6 py-3 text-sm font-semibold text-[#0D354C] transition hover:bg-[#0D354C]/5"
              >
                See FAQs
              </a>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="overflow-hidden rounded-[32px] border border-[#0D354C]/10 bg-white shadow-[0_28px_70px_-38px_rgba(13,53,76,0.45)]">
              <img
                src={executiveMeetingImage}
                alt="Consultation meeting for will planning"
                className="h-[340px] w-full object-cover sm:h-[420px]"
                loading="lazy"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-[#0D354C]/10 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(13,53,76,0.42)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
                  DIFC Route
                </p>
                <h2 className="mt-3 text-xl font-bold text-[#0D354C]">
                  English-led registration
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  DIFC publishes online preparation routes, virtual
                  registration, and a register of approved wills draftsmen.
                </p>
              </div>

              <div className="rounded-[28px] border border-[#0D354C]/10 bg-[#0D354C] p-5 text-white shadow-[0_18px_40px_-30px_rgba(13,53,76,0.6)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
                  Abu Dhabi Route
                </p>
                <h2 className="mt-3 text-xl font-bold text-white">
                  Civil will registration
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  ADJD publishes bilingual forms and an online application
                  process with video-call notarisation after approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        data-anim="service-reveal"
        className="relative bg-white pb-[4.5rem] sm:pb-[5.5rem]"
      >
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[0.94fr_0.46fr] lg:items-start">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                    Why It Matters
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D354C] md:text-5xl">
                    What Happens If You Don&apos;t Have a Will?
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                    A registered will does not remove every probate step, but it
                    can materially improve clarity, reduce uncertainty, and
                    better protect the people depending on your instructions.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {riskItems.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-[28px] border border-[#0D354C]/10 bg-white p-6 shadow-[0_18px_40px_-32px_rgba(13,53,76,0.35)]"
                    >
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0D354C] text-white">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-[#0D354C]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {item.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                    Route Comparison
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D354C] md:text-5xl">
                    DIFC Will vs Abu Dhabi Civil Will
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                    This is a high-level comparison of published registry
                    guidance, not a substitute for legal advice. The better fit
                    depends on your personal circumstances, asset mix, and
                    family planning goals.
                  </p>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-[#0D354C]/10 bg-white shadow-[0_22px_52px_-36px_rgba(13,53,76,0.38)]">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse text-left">
                      <thead className="bg-[#F8FAFC]">
                        <tr>
                          <th className="border-b border-[#0D354C]/10 px-5 py-4 text-sm font-semibold text-slate-500">
                            Feature
                          </th>
                          <th className="border-b border-[#0D354C]/10 px-5 py-4 text-sm font-semibold text-[#0D354C]">
                            DIFC Courts
                          </th>
                          <th className="border-b border-[#0D354C]/10 px-5 py-4 text-sm font-semibold text-[#0D354C]">
                            Abu Dhabi Civil Wills
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonRows.map((row) => (
                          <tr key={row.label} className="align-top">
                            <td className="border-b border-[#0D354C]/8 px-5 py-4 text-sm font-semibold text-[#0D354C]">
                              {row.label}
                            </td>
                            <td className="border-b border-[#0D354C]/8 px-5 py-4 text-sm leading-relaxed text-slate-600">
                              {row.difc}
                            </td>
                            <td className="border-b border-[#0D354C]/8 px-5 py-4 text-sm leading-relaxed text-slate-600">
                              {row.abuDhabi}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <aside
              id="consultation-form"
              className="lg:sticky lg:top-32 rounded-[30px] border border-[#0D354C]/10 bg-[#F8FAFC] p-5 shadow-[0_28px_70px_-44px_rgba(13,53,76,0.45)] sm:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                Free Consultation
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0D354C]">
                Book a Free Wills Consultation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Tell us a little about your situation and we&apos;ll help you
                understand the next sensible step.
              </p>

              <form
                className="mt-6 space-y-4"
                onSubmit={handleLegalSubmit}
              >
                <fieldset
                  className={isSubmitting ? "space-y-4 opacity-80" : "space-y-4"}
                  disabled={isSubmitting}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="First name"
                      name="firstName"
                      value={form.firstName}
                      placeholder="First name"
                      required
                      onChange={(value) => updateForm("firstName", value)}
                    />
                    <Field
                      label="Last name"
                      name="lastName"
                      value={form.lastName}
                      placeholder="Last name"
                      required
                      onChange={(value) => updateForm("lastName", value)}
                    />
                  </div>
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="name@example.com"
                    required
                    onChange={(value) => updateForm("email", value)}
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    placeholder="+971 50 000 0000"
                    onChange={(value) => updateForm("phone", value)}
                  />
                  <ThemedSelect
                    label="Nationality"
                    name="nationality"
                    value={form.nationality}
                    options={nationalityOptions}
                    placeholder="Select nationality"
                    required
                    onChange={(value) => updateForm("nationality", value)}
                    icon={Globe2}
                  />
                  <ThemedSelect
                    label="Will type"
                    name="willType"
                    value={form.willType}
                    options={willTypeOptions}
                    placeholder="Select option"
                    required
                    onChange={(value) => updateForm("willType", value)}
                    icon={FileCheck2}
                  />

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-400"
                  >
                    {isSubmitting ? "Sending..." : "Talk to an Expert"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
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

              <div className="mt-6 rounded-2xl bg-[#0D354C] p-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6B26F]">
                  Contact
                </p>
                <div className="mt-3 space-y-3 text-sm text-white/80">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#D6B26F]" />
                    +971 50 171 1384
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#D6B26F]" />
                    info@hmc-holding.com
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section
        data-anim="service-reveal"
        className=" py-[4.5rem] sm:py-[5.5rem]"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="overflow-hidden rounded-[32px] shadow-[0_30px_70px_-38px_rgba(13,53,76,0.42)]">
              <img
                src={handshakeImage}
                alt="Legal documentation consultation"
                className="h-full min-h-[360px] w-full object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                Why HMC
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D354C] md:text-5xl">
                A wills process should feel calm, clear, and family-focused
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                The goal is not only to register a document. It is to make sure
                your instructions are thought through, your family implications
                are clear, and the registry route makes sense before anything is
                filed.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {whyHmcCards.map((card) => (
                  <article
                    key={card.title}
                    className="rounded-[26px] border border-[#0D354C]/10 bg-white p-5 shadow-[0_18px_40px_-32px_rgba(13,53,76,0.35)]"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0D354C] text-white">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0D354C]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {card.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        data-anim="service-reveal"
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={advisoryMeetingImage}
            alt="Will consultation meeting"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0D354C]/70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-[4.5rem] text-white sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Guidance Banner
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
              Get tailored guidance on DIFC and Abu Dhabi wills that protects
              what matters most
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              Start with the route, scope, and family implications. The drafting
              strategy is easier once those decisions are clear.
            </p>
            <a
              href="#consultation-form"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              Talk to an expert
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
 <section className="bg-white py-[4.5rem] sm:py-[5.5rem]">
  <div className="mx-auto max-w-5xl px-4">
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
        Registration Process
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D354C] md:text-5xl">
        Unified Will Registration (DIFC & Abu Dhabi)
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
        The drafting strategy changes by route, but the planning rhythm is
        similar: understand the family position, prepare the document, and
        complete the registry process cleanly.
      </p>
    </div>

    <div className="relative mx-auto mt-12 max-w-4xl">
      <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-[#D6B26F]/70 via-[#0D354C]/10 to-transparent md:left-1/2 md:block" />
      <div className="grid gap-6">
        {processSteps.map((step, index) => (
          <div
            key={step.number}
            className={[
              "relative md:grid md:grid-cols-2 md:gap-10",
              index % 2 === 1 ? "md:[&>*:first-child]:order-2" : "",
            ].join(" ")}
          >
            <div className="hidden md:block" />

            <div className="relative rounded-[28px] border border-[#0D354C]/10 bg-[#F8FAFC] p-6 shadow-[0_18px_40px_-32px_rgba(13,53,76,0.35)]">
              <span
                className={[
                  "absolute -left-3 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0D354C] text-sm font-bold text-white",
                  index % 2 === 1
                    ? "md:left-[calc(-1.1rem-0.75rem)] md:right-auto"
                    : "md:left-auto md:right-[calc(100%+1.1rem)]",
                ].join(" ")}
              >
                {step.number}
              </span>

              <h3 className="text-2xl font-semibold text-[#0D354C]">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
      <section
        data-anim="service-reveal"
        className=" py-[4.5rem] sm:py-[5.5rem]"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Family Priorities
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D354C] md:text-5xl">
              What UAE families usually want most from the process
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              When people decide to register a will, the objective is usually
              not complexity. It is certainty, smoother family protection, and a
              document that is easier to rely on later.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {familyValueCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[28px] border border-[#0D354C]/10 bg-white p-6 shadow-[0_18px_40px_-32px_rgba(13,53,76,0.35)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D6B26F]/18 text-[#0D354C]">
                  <UserRound className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#0D354C]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="faq"
        data-anim="service-reveal"
        className="bg-white py-[4.5rem] sm:py-[5.5rem]"
      >
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D354C] md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              A few practical answers before you decide which wills route you
              want to explore.
            </p>
          </div>

          <div className="mt-10 grid gap-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={item.question}
                  className="rounded-[24px] border border-[#0D354C]/10 bg-[#F8FAFC] shadow-[0_16px_36px_-34px_rgba(13,53,76,0.4)]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq((prev) => (prev === index ? -1 : index))
                    }
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-[#0D354C] sm:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={[
                        "h-5 w-5 shrink-0 text-[#D6B26F] transition-transform",
                        isOpen ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </button>

                  <div
                    className="grid overflow-hidden transition-[grid-template-rows] duration-200"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </ServicePageShell>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  placeholder,
  type = "text",
  required = false,
  onChange,
}) {
  const Icon = type === "email" ? Mail : type === "tel" ? Phone : FileCheck2;

  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        <Icon className="h-4 w-4 text-[#D6B26F]" />
        {label}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        className="w-full rounded-2xl border border-[#0D354C]/10 bg-white px-4 py-3.5 text-sm text-[#0D354C] outline-none transition placeholder:text-slate-400 focus:border-[#D6B26F] focus:ring-2 focus:ring-[#D6B26F]/20"
      />
    </label>
  );
}

