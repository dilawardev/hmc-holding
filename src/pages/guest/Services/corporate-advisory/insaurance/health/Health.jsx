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
import riskDashboard from "@/assets/services/corporate-advisory/insurance/health/risk-dashboard.jpg";
import burjBeach from "@/assets/services/corporate-advisory/insurance/health/burj-beach.jpg";

const resolved = findServiceRoute("corporate-advisory", "insurance", "health");

const metrics = [
  { label: "Employee care", value: "Stronger reassurance", detail: "Give teams clearer access to dependable medical cover and support." },
  { label: "Compliance", value: "Cleaner employer posture", detail: "Keep required health coverage aligned with UAE expectations." },
  { label: "Cost control", value: "Better plan fit", detail: "Balance budget discipline with workforce needs and retention goals." },
];

const cards = [
  { title: "Plan selection", text: "Compare policy options around network strength, coverage depth, and suitability for the workforce." },
  { title: "Employer coordination", text: "Support enrollment, renewals, and policy administration with less friction." },
  { title: "Long-term fit", text: "Keep health cover aligned as headcount, demographics, or budget priorities evolve." },
];

const checklist = [
  "Plans chosen around actual workforce needs, not only price",
  "Compliance requirements reviewed before onboarding or renewal deadlines",
  "Coverage clarity around dependents, exclusions, and provider access",
  "A practical balance between employee confidence and employer cost control",
];

export default function Health() {
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
          <SectionHeading eyebrow="Coverage focus" title="Health coverage should support workforce stability as well as compliance" intro="The service focuses on workforce reassurance, policy suitability, and employer coordination." />
          <TextStack paragraphs={[resolved.subChild.body, "Health insurance decisions influence hiring confidence, employee reassurance, and long-term workforce experience, especially when teams need plans that balance care quality, coverage scope, and employer cost discipline."]} />
        </div>
        <MediaFrame src={riskDashboard} alt="Digital risk dashboard representing coverage oversight" className="min-h-[320px]" />
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Health cover planning" title="What health cover planning should keep in view" intro="Policy quality, access, and employer practicality all matter together." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="grid gap-6">
          <MediaFrame src={burjBeach} alt="Dubai shoreline representing confidence and wellbeing" className="min-h-[280px]" />
          <Checklist title="Health cover priorities" items={checklist} />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Related insurance topics" title="Explore the other insurance tracks" intro="The related insurance areas connect health cover with wider corporate and property protection decisions." />
          <LinkCardGrid items={links} columns="md:grid-cols-2" />
        </div>
      </PageSection>
      <ActionBanner title="Need a clearer health insurance approach for your team or family?" text="HMC can help compare options, coordinate cover decisions, and shape a health insurance setup that feels practical, compliant, and better matched to your needs." />
    </ServicePageShell>
  );
}
