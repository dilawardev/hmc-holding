import React from "react";
import { findServiceRoute } from "@/pages/guest/Services/data/servicesCatalog";
import { getServiceMeta } from "@/pages/guest/Services/data/serviceMeta";
import { firstSentence, splitParagraphs } from "@/pages/guest/Services/utils/serviceCopy";
import {
  ActionBanner,
  Checklist,
  InfoCard,
  MediaFrame,
  MetricStrip,
  PageSection,
  SectionHeading,
  ServicePageShell,
  TextStack,
} from "@/pages/guest/Services/components/service-pages/ServicePagePrimitives";
import ServiceInquiryCard from "@/pages/guest/Services/components/service-pages/ServiceInquiryCard";
import visaApplication from "@/assets/services/visa-immigration-services/employment-visas/visa-application.jpg";
import careerAscent from "@/assets/services/visa-immigration-services/employment-visas/career-ascent.jpg";

const resolved = findServiceRoute("visa-immigration-services", "employment-visas");


const steps = [
  { title: "Role and eligibility check", text: "Confirm the visa route, employer setup, and applicant readiness before submission begins." },
  { title: "Document handling", text: "Prepare the required approvals, identity records, and employment materials with less confusion." },
  { title: "Processing and onboarding", text: "Coordinate application progress with entry, medical, Emirates ID, and onboarding steps." },
];

const cards = [
  { title: "Smoother onboarding", text: "Help new hires move from offer to active employment with less administrative friction." },
  { title: "Better employer coordination", text: "Keep internal teams, documents, and approvals closer together." },
  { title: "Reduced applicant stress", text: "Give employees clearer visibility into what happens next." },
  { title: "More reliable timing", text: "Support a cleaner handoff between application progress and operational start dates." },
];

const checklist = [
  "Hiring timelines aligned with immigration processing expectations",
  "Employer and employee documents reviewed before submission",
  "Medical, ID, and onboarding steps sequenced clearly",
  "Communication kept steady across the full employment start journey",
];

export default function EmploymentVisa() {
  if (!resolved) return null;
  const meta = getServiceMeta(resolved.category.id);
  const paragraphs = splitParagraphs(resolved.subService.body);

  return (
    <ServicePageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: meta.landingEyebrow, href: meta.landingPath }, { label: resolved.subService.label }]}
      eyebrow={meta.landingEyebrow}
      title={resolved.subService.label}
      summary={firstSentence(paragraphs[0], 210)}
    >
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_1fr] items-start">
        <div className="space-y-6">
          <SectionHeading eyebrow="Residency path" title="Employment visas move more smoothly when hiring decisions and immigration handling stay coordinated" intro="The service focuses on cleaner onboarding, stronger document handling, and smoother employer-applicant coordination." />
          <TextStack paragraphs={paragraphs.slice(0, 3)} />
        </div>
        <MediaFrame src={visaApplication} alt="Visa application materials with UAE flag details" className="min-h-[320px]" />
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Application flow" title="How employment visa coordination usually works" intro="The process moves from eligibility and documentation through submission, onboarding, and residency completion." align="center" />
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="grid gap-6">
          <MediaFrame src={careerAscent} alt="Career-oriented image representing employment progression" className="min-h-[280px]" />
          <Checklist title="Employment visa priorities" items={checklist} />
          <ServiceInquiryCard
            title="Book a Free Employment Visa Consultation"
            intro="Tell us a little about the hiring or employment visa case and we'll help you understand the next sensible step."
          />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Prepared outcomes" title="What stronger employment visa support improves" />
          <div className="grid gap-5 md:grid-cols-2">
            {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
          </div>
          <TextStack paragraphs={paragraphs.slice(3)} />
        </div>
      </PageSection>
      <ActionBanner title="Need employment visa handling that is easier to coordinate?" text="HMC can help employers and applicants manage the employment visa journey with clearer preparation, steadier communication, and cleaner follow-through." />
    </ServicePageShell>
  );
}
