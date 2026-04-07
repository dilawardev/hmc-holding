import React from "react";
import { findServiceRoute, toServicePath } from "@/pages/guest/Services/data/servicesCatalog";
import { getServiceMeta } from "@/pages/guest/Services/data/serviceMeta";
import { firstSentence, splitParagraphs } from "@/pages/guest/Services/utils/serviceCopy";
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
import riskDashboard from "@/assets/services/corporate-advisory/insurance/risk-dashboard.jpg";
import burjShore from "@/assets/services/corporate-advisory/insurance/burj-shore.jpg";

const resolved = findServiceRoute("corporate-advisory", "insurance");

const metrics = [
  { label: "Protection", value: "Broader cover logic", detail: "Match coverage decisions to operational exposure, assets, and people." },
  { label: "Continuity", value: "Stronger resilience", detail: "Reduce disruption when claims, incidents, or setbacks appear." },
  { label: "Clarity", value: "Better policy fit", detail: "Keep coverage choices tied to what the business truly needs." },
];

const cards = [
  { title: "Risk evaluation", text: "Understand where the business is most exposed before choosing policy structure." },
  { title: "Coverage design", text: "Match insurance choices to staff, property, contracts, and operating realities." },
  { title: "Provider comparison", text: "Keep options visible so coverage and cost can be balanced more intelligently." },
  { title: "Long-term coordination", text: "Support the insurance posture as the business grows or its exposure changes." },
];

const checklist = [
  "Policies aligned with the actual operational footprint",
  "Coverage scope reviewed before growth creates new exposure",
  "A practical balance between protection level and cost discipline",
  "Better visibility into renewal, claims, and provider decisions",
];

export default function Insaurance() {
  if (!resolved) return null;
  const meta = getServiceMeta(resolved.category.id);
  const paragraphs = splitParagraphs(resolved.subService.body);
  const links = resolved.subService.children.map((child) => ({
    to: toServicePath(resolved.category.slug, resolved.subService.slug, child.slug),
    title: child.label,
    text: firstSentence(child.body, 140),
  }));

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
          <SectionHeading eyebrow="Coverage strategy" title="Insurance decisions should match how the business actually operates" intro="The service focuses on risk evaluation, coverage fit, and long-term protection planning." />
          <TextStack paragraphs={paragraphs.slice(0, 3)} />
        </div>
        <MediaFrame src={riskDashboard} alt="Digital risk management dashboard" className="min-h-[320px]" />
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Specialized tracks" title="Explore the core insurance tracks" intro="These focused insurance areas cover business continuity, health planning, and property risk exposure." align="center" />
        <LinkCardGrid items={links} />
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="grid gap-6">
          <MediaFrame src={burjShore} alt="Burj Al Arab shoreline representing protected premium assets" className="min-h-[280px]" />
          <Checklist title="Coverage priorities" items={checklist} />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Protection priorities" title="Where the advisory lens matters most" intro="The layout reinforces the idea of structured, tailored protection rather than generic policy shopping." />
          <div className="grid gap-5 md:grid-cols-2">
            {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
          </div>
        </div>
      </PageSection>
      <ActionBanner title="Need a more structured insurance strategy?" text="HMC can help evaluate business risk, shape better-fit coverage choices, and keep insurance decisions aligned with long-term operations." />
    </ServicePageShell>
  );
}
