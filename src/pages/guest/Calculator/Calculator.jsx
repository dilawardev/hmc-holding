import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Globe2,
  House,
  IdCard,
  Landmark,
  Mail,
  MapPin,
  Monitor,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  UtensilsCrossed,
  Warehouse,
} from "lucide-react";

import CTA from "@/pages/guest/Home/components/CTA";
import ThemedSelect from "@/components/forms/ThemedSelect";
import { submitCalculatorInquiry } from "@/utils/inquiryApi";

import PartnerLogo01 from "@/assets/partners/logo_01_4fd8dc607d.webp";
import PartnerLogo02 from "@/assets/partners/logo_02_9c1f49f13a.webp";
import PartnerLogo03 from "@/assets/partners/logo_02_1_666ef04015.webp";
import EmaarLogo from "@/assets/partners/Emaar_f229e25788.webp";
import MajidLogo from "@/assets/partners/Majid_Al_Futtaim_b3d70262eb.webp";
import AdvisoryMeetingImage from "@/assets/services/business-investment-advisory/business-consulting-and-development/advisory-meeting.jpg";
import ExecutiveMeetingImage from "@/assets/services/visa-immigration-services/investor-and-partner-visas/executive-meeting.jpg";
import SkylineImage from "@/assets/services/business-solutions/office-space-advisory-and-interior-fit-out/skyline-towers.jpg";

const steps = [
  {
    key: "activity",
    label: "Activity",
    title: "What type of business are you planning?",
    description:
      "Choose the activity that best matches what you want to launch in the UAE.",
  },
  {
    key: "details",
    label: "Details",
    title: "Tell us about your setup goals",
    description:
      "These details help us size the most practical structure, visa path, and setup scope.",
  },
  {
    key: "office",
    label: "Office",
    title: "What kind of office setup do you need?",
    description:
      "Workspace requirements can influence licensing, cost range, and where your business fits best.",
  },
  {
    key: "location",
    label: "Location",
    title: "Where and when do you want to start?",
    description:
      "We use this to align jurisdiction, residency planning, and the pace of your setup timeline.",
  },
  {
    key: "contact",
    label: "Contact",
    title: "Where should we send your tailored estimate?",
    description:
      "Share your contact details and our team will prepare a sharper next-step proposal for you.",
  },
];

const activityOptions = [
  {
    id: "consulting",
    title: "Consulting & Professional Services",
    description: "Advisory, recruitment, project delivery, business support",
    icon: BriefcaseBusiness,
  },
  {
    id: "technology",
    title: "Technology & Digital",
    description: "Software, IT, telecom, digital products, managed services",
    icon: Monitor,
  },
  {
    id: "retail",
    title: "E-commerce & Retail",
    description: "Online stores, trading, direct-to-consumer, distribution",
    icon: ShoppingBag,
  },
  {
    id: "trading",
    title: "Trading & Import/Export",
    description: "General trading, sourcing, industrial supply, logistics",
    icon: Banknote,
  },
  {
    id: "hospitality",
    title: "Food, Lifestyle & Hospitality",
    description: "Restaurants, cafes, wellness, leisure, customer-facing brands",
    icon: UtensilsCrossed,
  },
  {
    id: "real-estate",
    title: "Real Estate & Built Environment",
    description: "Property, brokerage, facilities, construction, development",
    icon: Building2,
  },
];

const setupReasonOptions = [
  {
    id: "new-company",
    title: "New company formation",
    description: "Launching a new operation with the right license and structure",
    icon: Sparkles,
  },
  {
    id: "expansion",
    title: "Expansion or branch setup",
    description: "Adding a UAE entity to support regional growth",
    icon: FileText,
  },
  {
    id: "relocation",
    title: "Relocation or restructuring",
    description: "Moving activity or redesigning the structure for better fit",
    icon: ArrowRight,
  },
  {
    id: "visa-only",
    title: "Residency-led setup",
    description: "Exploring a company route to support visas and long-term presence",
    icon: IdCard,
  },
];

const officeOptions = [
  {
    id: "virtual",
    title: "Virtual office",
    description: "Leanest setup for service-led businesses that do not need daily occupancy",
    icon: House,
  },
  {
    id: "business-centre",
    title: "Business centre",
    description: "Flexible desks, meeting access, and shared workspace support",
    icon: Building2,
  },
  {
    id: "private-office",
    title: "Private office",
    description: "Dedicated office space for teams, operations, and a premium footprint",
    icon: Landmark,
  },
  {
    id: "storefront",
    title: "Retail or client-facing space",
    description: "Customer experience, walk-in traffic, or showroom requirements",
    icon: Store,
  },
  {
    id: "warehouse",
    title: "Warehouse or industrial space",
    description: "Storage, fulfilment, light industrial, or logistics-focused activity",
    icon: Warehouse,
  },
];

const jurisdictionOptions = [
  {
    id: "free-zone",
    title: "Free zone",
    description: "Often a strong fit for international trade, services, and lean setups",
    icon: Globe2,
  },
  {
    id: "mainland",
    title: "Mainland",
    description: "Ideal when you need broader local-market flexibility or physical presence",
    icon: Building2,
  },
  {
    id: "not-sure",
    title: "Not sure yet",
    description: "We will compare both paths and recommend the practical option",
    icon: ShieldCheck,
  },
];

const timelineOptions = ["Immediately", "This quarter", "Within 6 months", "Exploring"];
const ownerOptions = ["1", "2", "3", "4", "5", "6", "7+"];
const visaOptions = ["0", "1", "2", "3", "4", "5", "6+"];
const nationalityOptions = [
  "United Arab Emirates",
  "Saudi Arabia",
  "United Kingdom",
  "United States",
  "India",
  "Pakistan",
  "Germany",
  "Turkey",
  "Egypt",
  "Nigeria",
  "South Africa",
  "Other",
];

const insightCards = [
  {
    title: "License fit",
    body: "We narrow the activity groupings that fit your commercial goals and expected operations.",
    bullets: ["Activity mapping", "Commercial scope", "Regulatory fit"],
  },
  {
    title: "Setup structure",
    body: "We size the setup around shareholders, visas, and how involved your founders need to be.",
    bullets: ["Ownership planning", "Visa sizing", "Formation route"],
  },
  {
    title: "Operational footprint",
    body: "Office requirements can materially change cost, speed, and the right jurisdiction for you.",
    bullets: ["Workspace level", "Occupancy needs", "Cost impact"],
  },
  {
    title: "Jurisdiction strategy",
    body: "We align location and timing with whether you need mainland flexibility or free zone efficiency.",
    bullets: ["Free zone vs mainland", "Residency context", "Launch timeline"],
  },
  {
    title: "Proposal handoff",
    body: "Your next-step proposal includes the likely setup path, support scope, and commercial guidance.",
    bullets: ["Tailored estimate", "Next actions", "Advisor follow-up"],
  },
];

const trustItems = [
  { icon: CheckCircle2, label: "No obligation" },
  { icon: Clock3, label: "Takes about 2 minutes" },
  { icon: ShieldCheck, label: "Tailored follow-up" },
  { icon: Users, label: "One advisory team" },
];

const partnerLogos = [
  PartnerLogo01,
  PartnerLogo02,
  PartnerLogo03,
  EmaarLogo,
  MajidLogo,
];

const supportTags = [
  "Company formation",
  "Free zone and mainland guidance",
  "Visa planning",
  "Office strategy",
  "Banking readiness",
  "Corporate structuring",
  "Compliance coordination",
  "Expansion planning",
];

const platformCards = [
  {
    title: "Strategic structuring",
    body: "Build the setup around what the business needs to do next, not just what is cheapest today.",
  },
  {
    title: "Commercial clarity",
    body: "See where office, visa, and jurisdiction choices are likely to push the cost up or down.",
  },
  {
    title: "Coordinated delivery",
    body: "Keep formation, compliance, banking, and relocation decisions connected from day one.",
  },
  {
    title: "UAE market context",
    body: "Shape the entry path around how you plan to operate locally, regionally, or internationally.",
  },
  {
    title: "Operational readiness",
    body: "Understand what needs to happen after licensing so launch does not stall at the final mile.",
  },
  {
    title: "Room to scale",
    body: "Set the business up with enough flexibility for additional visas, offices, and activities later.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Answer the setup questions",
    body: "Share the business activity, office preference, shareholder count, and timing so we can scope the right pathway.",
  },
  {
    number: "02",
    title: "We review the strategic fit",
    body: "Our team matches your answers to the likely licensing route, jurisdiction options, and support requirements.",
  },
  {
    number: "03",
    title: "Receive your tailored estimate",
    body: "You get a clearer picture of the structure, next milestones, and where the major cost drivers sit.",
  },
  {
    number: "04",
    title: "Move into execution with HMC",
    body: "If the fit is right, we carry the plan into formation, coordination, and launch support.",
  },
];

const faqItems = [
  {
    question: "What does this setup estimate include?",
    answer:
      "It helps us understand your business activity, ownership, office needs, jurisdiction preference, and launch timing so we can shape a more relevant proposal.",
  },
  {
    question: "Is this a final quote?",
    answer:
      "No. It is a guided estimate and advisory intake. Final commercial terms depend on the exact activity, license requirements, office package, and visa scope.",
  },
  {
    question: "Can HMC help with mainland and free zone setups?",
    answer:
      "Yes. The goal of this page is to help us quickly identify which route deserves a closer look based on how you plan to operate.",
  },
  {
    question: "Do you only support brand-new companies?",
    answer:
      "No. We also support market entry, entity restructuring, branch expansion, and businesses that need a more practical operating model in the UAE.",
  },
  {
    question: "Can you help after formation as well?",
    answer:
      "Yes. HMC also supports adjacent needs like office planning, visa strategy, corporate advisory, and broader business growth requirements.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "Our team reviews your answers and follows up with the most relevant next step, whether that is a tailored proposal, a clarification call, or a narrower setup recommendation.",
  },
];

const initialAnswers = {
  activity: "",
  setupReason: "",
  owners: "1",
  visas: "0",
  office: "",
  jurisdiction: "",
  inUae: "",
  timeline: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nationality: "",
  dependantVisas: "",
  consent: false,
};

function CalculatorPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });

  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const stepValid = isStepValid(stepIndex, answers);
  const isSubmitting = submitState.status === "loading";
  const activityTitle = getOptionTitle(activityOptions, answers.activity);
  const setupReasonTitle = getOptionTitle(setupReasonOptions, answers.setupReason);
  const officeTitle = getOptionTitle(officeOptions, answers.office);
  const jurisdictionTitle = getOptionTitle(jurisdictionOptions, answers.jurisdiction);

  const summaryRows = [
    { label: "Activity", value: activityTitle },
    { label: "Reason", value: setupReasonTitle },
    { label: "Owners", value: answers.owners },
    { label: "Visas", value: answers.visas },
    { label: "Office", value: officeTitle },
    { label: "Jurisdiction", value: jurisdictionTitle },
    { label: "Start", value: answers.timeline },
  ].filter((item) => item.value);

  const updateAnswer = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));

    if (submitState.status !== "idle") {
      setSubmitState({ status: "idle", message: "" });
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const goForward = () => {
    if (!stepValid || isLastStep) return;
    setStepIndex((prev) => prev + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stepValid) return;

    setSubmitState({ status: "loading", message: "" });

    try {
      await submitCalculatorInquiry({
        firstName: answers.firstName,
        lastName: answers.lastName,
        email: answers.email,
        phone: answers.phone,
        nationality: answers.nationality,
        activity: activityTitle,
        activityId: answers.activity,
        setupReason: setupReasonTitle,
        setupReasonId: answers.setupReason,
        owners: answers.owners,
        visas: answers.visas,
        office: officeTitle,
        officeId: answers.office,
        jurisdiction: jurisdictionTitle,
        jurisdictionId: answers.jurisdiction,
        inUae: answers.inUae,
        timeline: answers.timeline,
        dependantVisas: answers.dependantVisas,
        consent: answers.consent,
        pageUrl:
          typeof window !== "undefined"
            ? window.location.href
            : "/calculator",
        pagePath: "/calculator",
      });

      setSubmitState({
        status: "success",
        message: "Your setup request has been sent successfully.",
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your setup request right now. Please try again shortly.",
      });
    }
  };

  const resetForm = () => {
    setAnswers(initialAnswers);
    setSubmitted(false);
    setStepIndex(0);
    setSubmitState({ status: "idle", message: "" });
  };

  return (
    <div className="bg-white text-[#0D354C]">
      <section
        id="calculator-estimate"
        className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(214,178,111,0.18), transparent 26%), radial-gradient(circle at 88% 16%, rgba(13,53,76,0.12), transparent 28%), linear-gradient(180deg, #fcfbf8 0%, #ffffff 56%, #f8fafc 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-[#D6B26F]/35 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid gap-10 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
            <div className="xl:sticky xl:top-32">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D6B26F]/35 bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-[#0D354C] shadow-[0_16px_40px_-28px_rgba(13,53,76,0.4)] backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#D6B26F]" />
                2-minute setup estimate
              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[0.98] tracking-tight text-[#0D354C] sm:text-5xl lg:text-7xl">
                Calculate the cost of your{" "}
                <span className="text-[#D6B26F]">business setup</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                Answer a few practical questions and HMC will shape a sharper setup proposal around your activity, jurisdiction, visa needs, and operating model.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Guidance across free zones and mainland pathways",
                  "Aligned with business, visa, office, and growth priorities",
                  "Built for founders, investors, and expanding teams",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#D6B26F]/15 text-[#D6B26F] ring-1 ring-[#D6B26F]/25">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <p className="text-base text-slate-700 sm:text-lg">{item}</p>
                  </div>
                ))}
              </div>

      
            </div>

            <div>
              <form
                onSubmit={handleSubmit}
                className="rounded-[32px] border border-[#0D354C]/10 bg-white/90 p-5 shadow-[0_30px_70px_-38px_rgba(13,53,76,0.45)] backdrop-blur sm:p-8"
              >
                <div className="flex gap-2">
                  {steps.map((item, index) => (
                    <span
                      key={item.key}
                      className={[
                        "h-1.5 flex-1 rounded-full transition",
                        index <= stepIndex ? "bg-[#D6B26F]" : "bg-[#D6B26F]/20",
                      ].join(" ")}
                    />
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-slate-500">
                    {stepIndex + 1} / {steps.length}
                  </p>
                  <p className="text-sm font-semibold text-[#0D354C]">
                    {currentStep.label}
                  </p>
                </div>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#0D354C]">
                  {currentStep.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                  {currentStep.description}
                </p>

                <div className="mt-7">
                  {submitted ? (
                    <SubmittedState
                      summaryRows={summaryRows}
                      onReset={resetForm}
                      message={submitState.message}
                    />
                  ) : (
                    renderStepContent(stepIndex, answers, updateAnswer)
                  )}
                </div>

                {!submitted && (
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    {stepIndex > 0 && (
                      <button
                        type="button"
                        onClick={goBack}
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#0D354C]/12 px-5 py-3 text-sm font-semibold text-[#0D354C] transition hover:bg-[#0D354C]/5"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    )}

                    {isLastStep ? (
                      <button
                        type="submit"
                        disabled={!stepValid || isSubmitting}
                        className={[
                          "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold transition",
                          stepValid && !isSubmitting
                            ? "bg-[#0D354C] text-white shadow-[0_18px_42px_-28px_rgba(13,53,76,0.7)] hover:-translate-y-0.5"
                            : "cursor-not-allowed bg-slate-200 text-slate-500",
                        ].join(" ")}
                      >
                        {isSubmitting ? "Sending..." : "Show My Setup Options"}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={goForward}
                        disabled={!stepValid || isSubmitting}
                        className={[
                          "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold transition",
                          stepValid && !isSubmitting
                            ? "bg-[#0D354C] text-white shadow-[0_18px_42px_-28px_rgba(13,53,76,0.7)] hover:-translate-y-0.5"
                            : "cursor-not-allowed bg-slate-200 text-slate-500",
                        ].join(" ")}
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}

                {!submitted && submitState.message ? (
                  <p className="mt-4 text-sm font-medium text-rose-600">
                    {submitState.message}
                  </p>
                ) : null}
              </form>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {trustItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border border-[#0D354C]/8 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-[0_10px_30px_-28px_rgba(13,53,76,0.45)]"
                  >
                    <item.icon className="h-4 w-4 text-[#D6B26F]" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#D6B26F]">
            Built around the wider UAE business ecosystem
          </p>
          <div className="mt-8 grid grid-cols-2 gap-8 opacity-70 sm:grid-cols-3 lg:grid-cols-5">
            {partnerLogos.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/70 px-6 py-4 grayscale transition hover:grayscale-0"
              >
                <img
                  src={logo}
                  alt="Partner logo"
                  className="h-12 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-[4.5rem] sm:py-[5.5rem]">
        <div className="pointer-events-none absolute -left-28 top-12 h-72 w-72 rounded-full bg-[#0D354C]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#D6B26F]/18 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[30px] shadow-[0_28px_70px_-38px_rgba(13,53,76,0.45)]">
            <img
              src={AdvisoryMeetingImage}
              alt="HMC advisory consultation"
              className="h-full min-h-[380px] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D354C]/60 via-[#0D354C]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                Setup coverage
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Everything you need to shape the right market-entry decision
              </h2>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              What the estimate helps uncover
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D354C] md:text-5xl">
              Move from guesswork to a clearer setup path
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              This page is designed to surface the choices that tend to shape setup cost most: activity type, office expectations, visa needs, and jurisdiction fit.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  stat: "40+",
                  label: "Free zones to assess against mainland options",
                },
                {
                  stat: "5",
                  label: "Advisory pillars connected through one team",
                },
                {
                  stat: "End-to-end",
                  label: "Support from setup planning into execution",
                },
                {
                  stat: "Tailored",
                  label: "Recommendations built around how you plan to operate",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-[#0D354C]/10 bg-white p-5 shadow-[0_20px_40px_-34px_rgba(13,53,76,0.42)]"
                >
                  <p className="text-3xl font-bold text-[#0D354C]">{item.stat}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-[4.5rem] sm:py-[5.5rem]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                Beyond formation
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D354C] md:text-5xl">
                The proposal can connect setup with the rest of the operating plan
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                HMC works across company formation, advisory, corporate readiness, business solutions, and real estate support, so the estimate can look wider than license fees alone.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  title="Banking and compliance context"
                  body="Factor in the decisions that often follow setup so the path is realistic from day one."
                />
                <FeatureCard
                  title="Operating footprint strategy"
                  body="Compare lean options against the level of presence your business actually needs."
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {supportTags.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#0D354C]/10 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-[0_10px_20px_-18px_rgba(13,53,76,0.35)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-[28px] shadow-[0_26px_60px_-34px_rgba(13,53,76,0.42)] md:translate-y-6">
                <img
                  src={ExecutiveMeetingImage}
                  alt="Meeting around setup strategy"
                  className="h-full min-h-[280px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-[28px] shadow-[0_26px_60px_-34px_rgba(13,53,76,0.42)]">
                <img
                  src={SkylineImage}
                  alt="Dubai skyline representing office and location planning"
                  className="h-full min-h-[280px] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0D354C] py-[4.5rem] text-white sm:py-[5.5rem]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-[#D6B26F]/14 blur-3xl" />
          <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-white/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Why use this page
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
              One planning tool that keeps the full business setup picture connected
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              The calculator is not just about price. It is a faster way to surface the operational choices that determine whether a setup will actually support the business you want to build.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {platformCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_18px_46px_-30px_rgba(0,0,0,0.75)] backdrop-blur"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D6B26F]/18 text-[#D6B26F]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[4.5rem] sm:py-[5.5rem]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Process
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D354C] md:text-5xl">
              From first answers to a setup roadmap
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              The experience is intentionally simple so you can move from uncertainty to a more informed next step without a long intake process.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="grid gap-5">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-[28px] border border-[#0D354C]/10 bg-[#F8FAFC] p-6 shadow-[0_16px_40px_-30px_rgba(13,53,76,0.35)]"
                >
                  <div className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-[#0D354C] px-3 text-sm font-bold text-white">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-[#0D354C]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-[32px] shadow-[0_30px_70px_-34px_rgba(13,53,76,0.42)]">
              <img
                src={ExecutiveMeetingImage}
                alt="Advisory session with clients"
                className="h-full min-h-[420px] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={SkylineImage}
            alt="Dubai skyline"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0D354C]/68" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center text-white sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
            Start with clarity
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Stop guessing the setup cost. Start with the structure that fits.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/80">
            Use the calculator to frame your options now, then let HMC turn the result into a practical launch plan.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#calculator-estimate"
              className="inline-flex items-center justify-center rounded-full bg-[#D6B26F] px-6 py-3 text-sm font-semibold text-[#0D354C] transition hover:-translate-y-0.5"
            >
              Start My Estimate
            </a>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              Talk To HMC
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-[4.5rem] sm:py-[5.5rem]">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0D354C] md:text-5xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              A few quick answers about how this estimate works and what happens next.
            </p>
          </div>

          <div className="mt-10 grid gap-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={item.question}
                  className="rounded-[24px] border border-[#0D354C]/10 bg-[#F8FAFC] shadow-[0_16px_40px_-34px_rgba(13,53,76,0.4)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq((prev) => (prev === index ? -1 : index))}
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

  
    </div>
  );
}

function renderStepContent(stepIndex, answers, updateAnswer) {
  if (stepIndex === 0) {
    return (
      <div className="grid gap-3">
        {activityOptions.map((item) => (
          <OptionCard
            key={item.id}
            option={item}
            selected={answers.activity === item.id}
            onClick={() => updateAnswer("activity", item.id)}
          />
        ))}
      </div>
    );
  }

  if (stepIndex === 1) {
    return (
      <div className="space-y-7">
        <div className="grid gap-3">
          {setupReasonOptions.map((item) => (
            <OptionCard
              key={item.id}
              option={item}
              selected={answers.setupReason === item.id}
              onClick={() => updateAnswer("setupReason", item.id)}
            />
          ))}
        </div>

        <CountSection
          label="How many owners or shareholders?"
          value={answers.owners}
          options={ownerOptions}
          onChange={(value) => updateAnswer("owners", value)}
        />

        <CountSection
          label="How many residence visas do you expect to need?"
          value={answers.visas}
          options={visaOptions}
          onChange={(value) => updateAnswer("visas", value)}
        />
      </div>
    );
  }

  if (stepIndex === 2) {
    return (
      <div className="grid gap-3">
        {officeOptions.map((item) => (
          <OptionCard
            key={item.id}
            option={item}
            selected={answers.office === item.id}
            onClick={() => updateAnswer("office", item.id)}
          />
        ))}
      </div>
    );
  }

  if (stepIndex === 3) {
    return (
      <div className="space-y-7">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            <MapPin className="h-4 w-4 text-[#D6B26F]" />
            Preferred jurisdiction
          </p>
          <div className="mt-4 grid gap-3">
            {jurisdictionOptions.map((item) => (
              <OptionCard
                key={item.id}
                option={item}
                selected={answers.jurisdiction === item.id}
                onClick={() => updateAnswer("jurisdiction", item.id)}
              />
            ))}
          </div>
          <Link
            to="/company-formation"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D6B26F] transition hover:text-[#0D354C]"
          >
            Compare formation pathways
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <BinaryField
          label="Are you currently living in the UAE?"
          value={answers.inUae}
          onChange={(value) => updateAnswer("inUae", value)}
        />

        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            <Clock3 className="h-4 w-4 text-[#D6B26F]" />
            When would you like to start?
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {timelineOptions.map((item) => (
              <ChoiceButton
                key={item}
                label={item}
                selected={answers.timeline === item}
                onClick={() => updateAnswer("timeline", item)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="First name"
          value={answers.firstName}
          placeholder="First name"
          onChange={(value) => updateAnswer("firstName", value)}
        />
        <TextField
          label="Last name"
          value={answers.lastName}
          placeholder="Last name"
          onChange={(value) => updateAnswer("lastName", value)}
        />
      </div>

      <TextField
        label="Email"
        type="email"
        value={answers.email}
        placeholder="email@example.com"
        onChange={(value) => updateAnswer("email", value)}
      />

      <TextField
        label="Phone"
        type="tel"
        value={answers.phone}
        placeholder="+971 50 000 0000"
        onChange={(value) => updateAnswer("phone", value)}
      />

      <ThemedSelect
        label="Nationality"
        value={answers.nationality}
        onChange={(value) => updateAnswer("nationality", value)}
        options={nationalityOptions}
        placeholder="Select your nationality"
        icon={Globe2}
        textSize="text-base"
      />

      <BinaryField
        label="Will you need dependant visas as well?"
        value={answers.dependantVisas}
        onChange={(value) => updateAnswer("dependantVisas", value)}
      />

      <label className="flex items-start gap-3 rounded-2xl border border-[#0D354C]/10 bg-[#F8FAFC] px-4 py-4">
        <input
          type="checkbox"
          checked={answers.consent}
          onChange={(event) => updateAnswer("consent", event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0D354C] focus:ring-[#D6B26F]"
        />
        <span className="text-sm leading-relaxed text-slate-600">
          I agree to be contacted by HMC about my setup enquiry through email, phone, or WhatsApp and understand this request is for advisory follow-up.
        </span>
      </label>
    </div>
  );
}

function SubmittedState({ summaryRows, onReset, message }) {
  return (
    <div className="rounded-[28px] border border-[#D6B26F]/30 bg-[#F8FAFC] p-6">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D6B26F]/16 text-[#D6B26F]">
        <CheckCircle2 className="h-7 w-7" />
      </div>

      <h3 className="mt-5 text-2xl font-bold text-[#0D354C]">
        Your setup request is ready for review
      </h3>
      <p className="mt-3 text-base leading-relaxed text-slate-600">
        We have captured the key setup inputs. A member of the HMC team can now review the structure and come back with the next best recommendation.
      </p>

      {message ? (
        <p className="mt-4 text-sm font-medium text-emerald-600">{message}</p>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {summaryRows.map((row) => (
          <div
            key={row.label}
            className="rounded-2xl border border-[#0D354C]/8 bg-white px-4 py-4"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {row.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-[#0D354C]">{row.value}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center justify-center rounded-2xl border border-[#0D354C]/12 px-5 py-3 text-sm font-semibold text-[#0D354C] transition hover:bg-[#0D354C]/5"
      >
        Start another estimate
      </button>
    </div>
  );
}

function FeatureCard({ title, body }) {
  return (
    <div className="rounded-[28px] border border-[#0D354C]/10 bg-white p-6 shadow-[0_16px_40px_-32px_rgba(13,53,76,0.35)]">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0D354C] text-white">
        <CheckCircle2 className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-[#0D354C]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}

function OptionCard({ option, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-start gap-4 rounded-[24px] border px-4 py-4 text-left transition sm:px-5",
        selected
          ? "border-[#D6B26F] bg-[#D6B26F]/10 shadow-[0_18px_40px_-28px_rgba(214,178,111,0.6)]"
          : "border-[#0D354C]/10 bg-white hover:border-[#D6B26F]/50 hover:bg-[#F8FAFC]",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 transition",
          selected
            ? "bg-[#0D354C] text-white ring-[#0D354C]"
            : "bg-[#0D354C]/6 text-[#0D354C] ring-[#0D354C]/10",
        ].join(" ")}
      >
        <option.icon className="h-5 w-5" />
      </span>

      <span>
        <span className="block text-lg font-semibold text-[#0D354C]">
          {option.title}
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-slate-600">
          {option.description}
        </span>
      </span>
    </button>
  );
}

function CountSection({ label, value, options, onChange }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        <Users className="h-4 w-4 text-[#D6B26F]" />
        {label}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {options.map((item) => (
          <ChoiceButton
            key={item}
            label={item}
            selected={value === item}
            onClick={() => onChange(item)}
          />
        ))}
      </div>
    </div>
  );
}

function BinaryField({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {["Yes", "No"].map((item) => (
          <ChoiceButton
            key={item}
            label={item}
            selected={value === item}
            onClick={() => onChange(item)}
          />
        ))}
      </div>
    </div>
  );
}

function ChoiceButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl border px-4 py-3 text-sm font-semibold transition",
        selected
          ? "border-[#0D354C] bg-[#0D354C] text-white shadow-[0_16px_34px_-26px_rgba(13,53,76,0.8)]"
          : "border-[#0D354C]/12 bg-white text-[#0D354C] hover:bg-[#F8FAFC]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function TextField({
  label,
  value,
  placeholder,
  onChange,
  type = "text",
}) {
  const Icon = type === "email" ? Mail : type === "tel" ? Phone : null;

  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        {Icon && <Icon className="h-4 w-4 text-[#D6B26F]" />}
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[#0D354C]/10 bg-white px-4 py-3.5 text-base text-[#0D354C] outline-none transition placeholder:text-slate-400 focus:border-[#D6B26F] focus:ring-2 focus:ring-[#D6B26F]/20"
      />
    </label>
  );
}

function isStepValid(stepIndex, answers) {
  if (stepIndex === 0) return Boolean(answers.activity);
  if (stepIndex === 1) return Boolean(answers.setupReason);
  if (stepIndex === 2) return Boolean(answers.office);
  if (stepIndex === 3) {
    return Boolean(answers.jurisdiction && answers.inUae && answers.timeline);
  }

  return Boolean(
    answers.firstName &&
      answers.lastName &&
      answers.email &&
      answers.phone &&
      answers.nationality &&
      answers.dependantVisas &&
      answers.consent
  );
}

function getOptionTitle(options, id) {
  return options.find((option) => option.id === id)?.title ?? "";
}

export default CalculatorPage;
