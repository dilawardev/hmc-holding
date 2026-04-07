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
import visaApplication from "@/assets/services/visa-immigration-services/investor-and-partner-visas/visa-application.jpg";
import executiveMeeting from "@/assets/services/visa-immigration-services/investor-and-partner-visas/executive-meeting.jpg";

const resolved = findServiceRoute("visa-immigration-services", "investor-and-partner-visas");

const metrics = [
  { label: "Eligibility clarity", value: "Cleaner investor path", detail: "Match the visa route to the ownership structure and residency goal." },
  { label: "Application quality", value: "Better preparation", detail: "Reduce friction through stronger documentation and process handling." },
  { label: "Residency outcome", value: "More confidence", detail: "Keep the investor journey coordinated from setup through approval." },
];

const steps = [
  { title: "Eligibility review", text: "Clarify the right visa path based on ownership, investment structure, and intended residency outcome." },
  { title: "Documentation preparation", text: "Coordinate the core records, approvals, and supporting materials needed for a stronger submission." },
  { title: "Submission and follow-through", text: "Manage the application journey with clearer coordination through each procedural step." },
];

const cards = [
  { title: "Fewer process delays", text: "Reduce confusion by aligning structure, documents, and next steps early." },
  { title: "Stronger submission quality", text: "Present a cleaner case with better-organized supporting material." },
  { title: "Better investor continuity", text: "Keep business activity and residency objectives aligned throughout the journey." },
  { title: "More confident relocation", text: "Approach UAE residency with a clearer sense of timing and requirements." },
];

const checklist = [
  "The visa path aligned with entity structure and ownership position",
  "Documentation assembled early enough to avoid avoidable delays",
  "Application sequencing coordinated with company setup where relevant",
  "Residency decisions handled with long-term mobility goals in mind",
];

export default function InvestorVisa() {
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
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_1fr] items-center">
        <div className="space-y-6">
          <SectionHeading eyebrow="Residency path" title="Investor residency works best when immigration planning matches the commercial structure" intro="The service focuses on ownership alignment, document readiness, and a cleaner investor-residency path." />
          <TextStack paragraphs={paragraphs.slice(0, 3)} />
        </div>
        <MediaFrame src={visaApplication} alt="UAE visa application materials on a desk" className="min-h-[320px]" />
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Application flow" title="How the investor route is usually handled" intro="The process moves from eligibility review to document preparation and structured submission follow-through." align="center" />
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="grid gap-6">
          <MediaFrame src={executiveMeeting} alt="Executive meeting representing investor planning and residency coordination" className="min-h-[280px]" />
          <Checklist title="Investor visa priorities" items={checklist} />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Prepared outcomes" title="What good preparation tends to unlock" />
          <div className="grid gap-5 md:grid-cols-2">
            {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
          </div>
          <TextStack paragraphs={paragraphs.slice(3)} />
        </div>
      </PageSection>
      <ActionBanner title="Need a clearer investor or partner visa path into the UAE?" text="HMC can help coordinate the structure, documentation, and submission flow needed for a more confident investor residency process." />
    </ServicePageShell>
  );
}
