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
import riskDashboard from "@/assets/services/corporate-advisory/insurance/corporate/risk-dashboard.jpg";
import handshake from "@/assets/services/corporate-advisory/insurance/corporate/handshake.jpg";

const resolved = findServiceRoute("corporate-advisory", "insurance", "corporate");

const metrics = [
  { label: "Continuity", value: "Protected operations", detail: "Support business resilience across incidents, disruption, and claims events." },
  { label: "Exposure", value: "Sharper policy fit", detail: "Match cover to real liabilities, assets, and contractual responsibilities." },
  { label: "Control", value: "Better oversight", detail: "Keep renewals, provider choices, and policy structure more intentional." },
];

const cards = [
  { title: "Operational liability", text: "Review the commercial risks tied to service delivery, staff activity, and client obligations." },
  { title: "Asset and property exposure", text: "Protect premises, equipment, and business-critical infrastructure where loss would be disruptive." },
  { title: "Policy coordination", text: "Keep multiple policies aligned so protection gaps and duplicated cover are easier to avoid." },
];

const checklist = [
  "Policies mapped to the actual operating footprint of the business",
  "Coverage reviewed as contracts, staff, or locations change",
  "Limits and exclusions checked before a claim scenario appears",
  "Renewal and provider decisions handled with commercial context in mind",
];

export default function Corporate() {
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
          <SectionHeading eyebrow="Coverage focus" title="Corporate coverage should protect continuity where exposure is highest" intro="The service focuses on liability, asset exposure, and policy coordination across the business." />
          <TextStack paragraphs={[resolved.subChild.body, "Corporate insurance planning works best when liability, operational exposure, contractual commitments, and asset protection are reviewed together instead of in isolation."]} />
        </div>
        <MediaFrame src={riskDashboard} alt="Digital dashboard representing corporate risk visibility" className="min-h-[320px]" />
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Coverage logic" title="What corporate cover usually needs to account for" intro="Good policy design follows business reality, not generic insurance bundles." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="grid gap-6">
          <MediaFrame src={handshake} alt="Business handshake representing policy and partner alignment" className="min-h-[280px]" />
          <Checklist title="Corporate coverage anchors" items={checklist} />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Related insurance topics" title="Explore the other insurance tracks" intro="The related insurance areas help connect corporate cover with broader health and property protection needs." />
          <LinkCardGrid items={links} columns="md:grid-cols-2" />
        </div>
      </PageSection>
      <ActionBanner title="Need insurance that reflects how the business actually operates?" text="HMC can help review operational exposure, compare coverage options, and shape a corporate insurance mix that supports steadier continuity." />
    </ServicePageShell>
  );
}
