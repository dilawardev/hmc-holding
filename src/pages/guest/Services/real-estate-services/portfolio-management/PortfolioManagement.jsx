import React from "react";
import { findServiceRoute } from "@/pages/guest/Services/data/servicesCatalog";
import { getServiceMeta } from "@/pages/guest/Services/data/serviceMeta";
import { firstSentence, splitParagraphs } from "@/pages/guest/Services/utils/serviceCopy";
import {
  ActionBanner,
  Checklist,
  InfoCard,
  MediaFrame,
  PageSection,
  SectionHeading,
  ServicePageShell,
  TextStack,
} from "@/pages/guest/Services/components/service-pages/ServicePagePrimitives";
import ServiceInquiryCard from "@/pages/guest/Services/components/service-pages/ServiceInquiryCard";
import secondarySkyline from "@/assets/services/real-estate-services/asset-management/secondary-skyline.jpg";
import germanyWaterfront from "@/assets/services/real-estate-services/asset-management/germany-waterfront.jpg";

const resolved = findServiceRoute("real-estate-services", "asset-management");

const cards = [
  { title: "Portfolio view", text: "Track performance, risk, and ownership priorities with a longer horizon in mind." },
  { title: "Value protection", text: "Support stronger maintenance, leasing, and market-timing decisions over time." },
  { title: "Decision readiness", text: "Keep the owner better positioned for refinancing, repositioning, or exit choices." },
];

const checklist = [
  "A clear ownership strategy for income, appreciation, or mixed return goals",
  "Regular review of occupancy, expenses, and market shifts",
  "Maintenance and tenant decisions tied to long-term value protection",
  "A stronger information base for future sale or restructuring choices",
];

export default function PortfolioManagement() {
  if (!resolved) return null;
  const meta = getServiceMeta(resolved.category.id);
  const paragraphs = splitParagraphs(resolved.subService.body);

  return (
    <ServicePageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: meta.landingEyebrow, href: meta.landingPath }, { label: resolved.subService.label }]}
      eyebrow={meta.landingEyebrow}
      title={resolved.subService.label}
      summary={firstSentence(paragraphs[0], 210)}
      heroAside={<MediaFrame src={secondarySkyline} alt="Dubai skyline representing portfolio-scale real estate exposure" />}
    >
      <PageSection>
        <SectionHeading eyebrow="Asset view" title="Asset management should protect value long after acquisition is complete" intro="The service focuses on portfolio oversight, long-term value protection, and stronger ownership decisions." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1.02fr_0.98fr] items-start">
        <div className="space-y-6">
          <SectionHeading eyebrow="Ownership strategy" title="What steadier asset management relies on" />
          <TextStack paragraphs={paragraphs.slice(0, 4)} />
          <Checklist title="Asset priorities" items={checklist} />
        </div>
        <div className="grid gap-6">
          <MediaFrame
            src={germanyWaterfront}
            alt="European waterfront development representing long-term asset stewardship"
            className="min-h-[300px]"
          />
          <ServiceInquiryCard
            title="Book a Free Asset Management Consultation"
            intro="Tell us a little about the property or portfolio you're managing and we'll help you understand the next sensible step."
          />
        </div>
      </PageSection>
      <ActionBanner title="Need a more strategic approach to property ownership and performance?" text="HMC can help keep portfolio oversight, asset decisions, and long-term ownership planning better connected as the market evolves." />
    </ServicePageShell>
  );
}
