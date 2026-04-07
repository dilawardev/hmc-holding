import React from "react";
import { findServiceRoute, toServicePath } from "@/pages/guest/Services/data/servicesCatalog";
import { getServiceMeta } from "@/pages/guest/Services/data/serviceMeta";
import { firstSentence } from "@/pages/guest/Services/utils/serviceCopy";
import {
  ActionBanner,
  Checklist,
  InfoCard,
  LinkCardGrid,
  MediaFrame,
  MetricStrip,
  PageSection,
  SectionHeading,
  ServicePageShell,
  TextStack,
} from "@/pages/guest/Services/components/service-pages/ServicePagePrimitives";
import riskDashboard from "@/assets/services/corporate-advisory/insurance/property-and-risk-coverage/risk-dashboard.jpg";
import secondarySkyline from "@/assets/services/corporate-advisory/insurance/property-and-risk-coverage/secondary-skyline.jpg";

const resolved = findServiceRoute("corporate-advisory", "insurance", "property-and-risk-coverage");

const metrics = [
  { label: "Asset protection", value: "Broader safeguard", detail: "Reduce the financial shock of damage, disruption, or loss." },
  { label: "Risk visibility", value: "Clearer exposure", detail: "Understand where physical assets and facilities are most vulnerable." },
  { label: "Recovery posture", value: "Stronger continuity", detail: "Keep protection tied to business interruption and response realities." },
];

const cards = [
  { title: "Physical asset review", text: "Assess buildings, interiors, equipment, and inventory exposure before policy structure is set." },
  { title: "Risk scenario planning", text: "Consider interruption, damage, and location-specific threats that could affect continuity." },
  { title: "Coverage coordination", text: "Align property-related policies with wider corporate protection and recovery expectations." },
];

const checklist = [
  "Policies informed by the actual value and usage of physical assets",
  "Business interruption and location risk considered early",
  "Coverage limits reviewed against realistic recovery costs",
  "Protection updated as sites, fit-outs, or asset values change",
];

export default function PropertyAndRishCoverage() {
  if (!resolved) return null;
  const meta = getServiceMeta(resolved.category.id);
  const links = resolved.subService.children
    .filter((child) => child.slug !== resolved.subChild.slug)
    .map((child) => ({
      to: toServicePath(resolved.category.slug, resolved.subService.slug, child.slug),
      title: child.label,
      text: firstSentence(child.body, 140),
    }));

  return (
    <ServicePageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: meta.landingEyebrow, href: meta.landingPath }, { label: resolved.subService.label, href: toServicePath(resolved.category.slug, resolved.subService.slug) }, { label: resolved.subChild.label }]}
      eyebrow={resolved.subService.label}
      title={resolved.subChild.label}
      summary={firstSentence(resolved.subChild.body, 210)}
      heroAside={<MetricStrip items={metrics} />}
    >
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_1fr] items-center">
        <div className="space-y-6">
          <SectionHeading eyebrow="Coverage focus" title="Property cover matters most when asset exposure has been properly understood" intro="The service focuses on physical asset protection, disruption planning, and recovery readiness." />
          <TextStack paragraphs={[resolved.subChild.body, "Property and risk coverage becomes more valuable when buildings, fit-outs, equipment, and interruption scenarios are reviewed with the same seriousness as acquisition or operating decisions."]} />
        </div>
        <MediaFrame src={riskDashboard} alt="Digital risk dashboard representing property exposure review" className="min-h-[320px]" />
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Asset protection" title="What property-focused cover should account for" intro="Asset protection is part of operational resilience, not a narrow back-office decision." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="grid gap-6">
          <MediaFrame src={secondarySkyline} alt="Dubai skyline representing protected real estate and built assets" className="min-h-[280px]" />
          <Checklist title="Property cover anchors" items={checklist} />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Related insurance topics" title="Explore the other insurance tracks" intro="The related insurance areas connect property cover with wider corporate and health protection planning." />
          <LinkCardGrid items={links} columns="md:grid-cols-2" />
        </div>
      </PageSection>
      <ActionBanner title="Need stronger protection for property, facilities, or key assets?" text="HMC can help review physical asset exposure, compare policy options, and shape cover that better supports continuity when disruption occurs." />
    </ServicePageShell>
  );
}
