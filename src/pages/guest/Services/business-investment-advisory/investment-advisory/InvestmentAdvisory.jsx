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
import executiveMeeting from "@/assets/services/business-investment-advisory/investor-advisory-and-structured-deals/executive-meeting.jpg";
import visionCompass from "@/assets/services/business-investment-advisory/investor-advisory-and-structured-deals/vision-compass.jpg";

const resolved = findServiceRoute(
  "business-investment-advisory",
  "investor-advisory-and-structured-deals",
);

const metrics = [
  {
    label: "Opportunity access",
    value: "Higher-signal deal flow",
    detail: "Prioritize better-fit opportunities over broader but weaker pipelines.",
  },
  {
    label: "Risk posture",
    value: "Stronger diligence",
    detail: "Pressure-test assumptions before capital, timing, or alignment is lost.",
  },
  {
    label: "Deal structure",
    value: "Cleaner execution",
    detail: "Use clearer terms, roles, and vehicles for better long-term outcomes.",
  },
];

const dealCards = [
  {
    title: "Deal sourcing",
    text: "Screen opportunities through fit, quality, timing, and long-term upside rather than headline appeal alone.",
  },
  {
    title: "Due diligence framing",
    text: "Use market signals, operational realities, and downside checks to sharpen decision quality.",
  },
  {
    title: "Execution readiness",
    text: "Keep negotiations, structures, and documentation aligned before commitment accelerates.",
  },
  {
    title: "Counterparty alignment",
    text: "Clarify the roles of investors, operators, and local stakeholders early enough to avoid drag later.",
  },
];

const investorChecklist = [
  "Reliable opportunity screening before serious engagement begins",
  "Commercial and structural diligence, not only surface-level review",
  "Clear role definition across investors, operators, and counterparties",
  "A structure that supports both protection and upside",
];

export default function InvestmentAdvisory() {
  if (!resolved) return null;

  const meta = getServiceMeta(resolved.category.id);
  const paragraphs = splitParagraphs(resolved.subService.body);

  return (
    <ServicePageShell
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: meta.landingEyebrow, href: meta.landingPath },
        { label: resolved.subService.label },
      ]}
      eyebrow={meta.landingEyebrow}
      title={resolved.subService.label}
      summary={firstSentence(paragraphs[0], 210)}
      heroAside={<MetricStrip items={metrics} />}
    >
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_1fr] items-start">
        <MediaFrame
          src={executiveMeeting}
          alt="Executives reviewing an investment discussion"
          className="min-h-[320px]"
        />
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Investor lens"
            title="Investment decisions improve when structure and access improve together"
          />
          <TextStack paragraphs={paragraphs.slice(0, 3)} />
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading
          eyebrow="Deal discipline"
          title="The investor workstream in practice"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {dealCards.map((card) => (
            <InfoCard key={card.title} title={card.title} text={card.text} />
          ))}
        </div>
      </PageSection>

      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
        <div className="grid gap-6">
          <MediaFrame
            src={visionCompass}
            alt="Compass-style graphic representing strategic direction"
            className="min-h-[300px]"
          />
          <ServiceInquiryCard
            title="Book a Free Investment Consultation"
            intro="Tell us a little about the opportunity you're considering and we'll help you understand the next sensible step."
          />
        </div>
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Execution readiness"
            title="Where disciplined investor support matters most"
          />
          <Checklist title="Investor priorities" items={investorChecklist} />
          <TextStack paragraphs={paragraphs.slice(3)} />
        </div>
      </PageSection>

      <ActionBanner
        title="Looking at opportunities with a more disciplined lens?"
        text="HMC helps investors source, assess, and structure opportunities with clearer market grounding and steadier execution."
      />
    </ServicePageShell>
  );
}
