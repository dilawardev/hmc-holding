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
import visaApplication from "@/assets/services/visa-immigration-services/family-sponsorship/visa-application.jpg";
import burjBeach from "@/assets/services/visa-immigration-services/family-sponsorship/burj-beach.jpg";

const resolved = findServiceRoute("visa-immigration-services", "family-sponsorship");

const metrics = [
  { label: "Eligibility", value: "Clearer sponsorship path", detail: "Understand the requirements and document path with more certainty." },
  { label: "Preparation", value: "Stronger submissions", detail: "Keep records, attestations, and sequencing under better control." },
  { label: "Stability", value: "Smoother family transition", detail: "Support the move into residency with less uncertainty and delay." },
];

const steps = [
  { title: "Eligibility review", text: "Confirm sponsorship requirements, relationship documents, and route suitability early." },
  { title: "Document preparation", text: "Organize attestations, identity materials, and supporting records before submission pressure builds." },
  { title: "Submission and residency follow-through", text: "Coordinate the process through the required application and residency milestones." },
];

const cards = [
  { title: "Less documentation stress", text: "Reduce confusion by preparing the right records earlier in the process." },
  { title: "Clearer family planning", text: "Coordinate residency steps around the household's real timing and needs." },
  { title: "Smoother relocation", text: "Support a more stable move into UAE residency for dependents." },
  { title: "More confidence throughout", text: "Give sponsors and families better visibility into the journey ahead." },
];

const checklist = [
  "Relationship and identity records prepared in the right order",
  "Attestation and supporting documents reviewed before filing",
  "Processing expectations understood for each family member",
  "Residency coordination handled with care and communication",
];

export default function FamilyResidency() {
  if (!resolved) return null;
  const meta = getServiceMeta(resolved.category.id);
  const paragraphs = splitParagraphs(resolved.subService.body);

  return (
    <ServicePageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: meta.landingEyebrow, href: meta.landingPath }, { label: resolved.subService.label }]}
      eyebrow={meta.landingEyebrow}
      title={resolved.subService.label}
      summary={firstSentence(paragraphs[0], 210)}
      heroAside={<MetricStrip items={metrics} />}
    >
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_1fr] items-start">
        <div className="space-y-6">
          <SectionHeading eyebrow="Residency path" title="Family residency planning should feel supportive, clear, and well coordinated" intro="The service focuses on eligibility clarity, document preparation, and a steadier sponsorship journey for families." />
          <TextStack paragraphs={paragraphs.slice(0, 3)} />
        </div>
        <MediaFrame src={visaApplication} alt="UAE visa application materials for family residency planning" className="min-h-[320px] t" />
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Application flow" title="How family sponsorship is typically coordinated" intro="The process moves from eligibility review to document preparation and coordinated residency follow-through." align="center" />
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="grid gap-6">
          <MediaFrame src={burjBeach} alt="Dubai shoreline representing stability and lifestyle transition" className="min-h-[280px]" />
          <Checklist title="Family sponsorship priorities" items={checklist} />
          <ServiceInquiryCard
            title="Book a Free Family Sponsorship Consultation"
            intro="Tell us a little about your family residency case and we'll help you understand the next sensible step."
          />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Prepared outcomes" title="What better family-visa preparation supports" />
          <div className="grid gap-5 md:grid-cols-2">
            {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
          </div>
          <TextStack paragraphs={paragraphs.slice(3)} />
        </div>
      </PageSection>
      <ActionBanner title="Need a steadier family sponsorship process?" text="HMC can help organize eligibility, documentation, and submission steps so family residency feels clearer, better prepared, and less stressful." />
    </ServicePageShell>
  );
}
