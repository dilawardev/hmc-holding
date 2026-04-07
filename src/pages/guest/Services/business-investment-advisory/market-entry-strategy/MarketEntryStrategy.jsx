import React from "react";
import { findServiceRoute } from "@/pages/guest/Services/data/servicesCatalog";
import { getServiceMeta } from "@/pages/guest/Services/data/serviceMeta";
import { firstSentence, splitParagraphs } from "@/pages/guest/Services/utils/serviceCopy";
import {
  ActionBanner,
  CalloutPanel,
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
import berlinWaterfront from "@/assets/services/business-investment-advisory/market-entry-strategy/berlin-waterfront.jpg";
import greeceHarbor from "@/assets/services/business-investment-advisory/market-entry-strategy/greece-harbor.jpg";

const resolved = findServiceRoute(
  "business-investment-advisory",
  "market-entry-strategy",
);

const metrics = [
  {
    label: "Market fit",
    value: "Sharper entry model",
    detail: "Choose the right route to market before expanding spend or headcount.",
  },
  {
    label: "Launch timing",
    value: "Better sequencing",
    detail: "Coordinate legal setup, commercial rollout, and positioning together.",
  },
  {
    label: "Regional leverage",
    value: "Broader reach",
    detail: "Use the UAE as a strategic platform for surrounding markets.",
  },
];

const entryCards = [
  {
    title: "Market framing",
    text: "Clarify demand signals, competition, and commercial conditions before choosing a launch route.",
  },
  {
    title: "Entry architecture",
    text: "Align jurisdiction, partnerships, and channel strategy with the practical needs of the business.",
  },
  {
    title: "Go-to-market readiness",
    text: "Support pricing, positioning, and launch coordination so entry can convert into traction.",
  },
];

const entryChecklist = [
  "A realistic market-entry model rather than a generic expansion template",
  "Jurisdiction and compliance choices tied to commercial needs",
  "Partner and channel decisions made early enough to reduce friction",
  "Brand and pricing choices localized for the audience being targeted",
];

export default function MarketEntryStrategy() {
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
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1.02fr_0.98fr] items-start">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Launch planning"
            title="Market entry is strongest when launch decisions are sequenced, not rushed"
          />
          <TextStack paragraphs={paragraphs.slice(0, 3)} />
        </div>
        <MediaFrame
          src={berlinWaterfront}
          alt="European city waterfront representing international market reach"
          className="min-h-[320px]"
        />
      </PageSection>

      <PageSection>
        <SectionHeading
          eyebrow="Entry architecture"
          title="How entry strategy becomes usable"
          align="center"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {entryCards.map((card) => (
            <InfoCard key={card.title} title={card.title} text={card.text} />
          ))}
        </div>
      </PageSection>

      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="grid gap-6">
          <MediaFrame
            src={greeceHarbor}
            alt="Greek harbor scene representing regional and international positioning"
            className="min-h-[280px]"
          />
          <CalloutPanel
            title="The best entry strategies reduce uncertainty before a company starts spending heavily"
            text="Clear sequencing helps teams enter with more confidence and fewer avoidable corrections."
          />
          <ServiceInquiryCard
            title="Book a Free Market Entry Consultation"
            intro="Tell us a little about your expansion plans and we'll help you understand the next sensible step."
          />
        </div>
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Entry priorities"
            title="What helps a new market presence settle quickly"
          />
          <Checklist title="Practical anchors" items={entryChecklist} />
          <TextStack paragraphs={paragraphs.slice(3)} />
        </div>
      </PageSection>

      <ActionBanner
        title="Preparing to enter the UAE or use it as a regional base?"
        text="HMC can help shape the structure, partner approach, and go-to-market plan needed for a cleaner market entry."
      />
    </ServicePageShell>
  );
}
