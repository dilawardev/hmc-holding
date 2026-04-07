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
import accountingLens from "@/assets/services/corporate-advisory/corporate-structuring-and-compliance/accounting-lens.jpg";
import handshake from "@/assets/services/corporate-advisory/corporate-structuring-and-compliance/handshake.jpg";

const resolved = findServiceRoute("corporate-advisory", "corporate-structuring-and-compliance");

const metrics = [
  { label: "Governance", value: "Cleaner structures", detail: "Organize control, ownership, and responsibility more deliberately." },
  { label: "Compliance", value: "Better continuity", detail: "Reduce avoidable gaps across documentation and reporting expectations." },
  { label: "Scalability", value: "Stronger foundations", detail: "Build a structure that can support new partners, growth, and change." },
];

const cards = [
  { title: "Entity design", text: "Shape ownership, control, and operational structure around how the business actually works." },
  { title: "Documentation discipline", text: "Keep records, approvals, and governance artifacts more complete and easier to manage." },
  { title: "Ongoing alignment", text: "Support compliance continuity as the company grows, restructures, or adds complexity." },
];

const checklist = [
  "Clear ownership and operating responsibilities",
  "Documentation that stays current as the business evolves",
  "Compliance expectations defined before they become urgent",
  "A structure that can absorb future growth with less friction",
];

export default function ComplianceGovernance() {
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
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
        <div className="space-y-6">
          <SectionHeading eyebrow="Control framework" title="Corporate structure should reduce friction, not add more of it" intro="The service is designed to bring ownership, documentation, and compliance continuity into a clearer operating framework." />
          <TextStack paragraphs={paragraphs.slice(0, 3)} />
        </div>
        <MediaFrame src={accountingLens} alt="Calculator and documents representing structured compliance review" className="min-h-[320px]" />
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Governance scope" title="Where structuring work matters most" intro="The page positions governance as a stabilizing layer for growing businesses." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
        <div className="grid gap-6">
          <MediaFrame src={handshake} alt="Business handshake representing governance alignment" className="min-h-[280px]" />
          <CalloutPanel title="Corporate structure becomes valuable when it makes decisions easier, not heavier" text="Good governance helps protect momentum by reducing confusion, duplication, and avoidable risk." />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Governance priorities" title="What stronger governance usually needs" />
          <Checklist title="Governance anchors" items={checklist} />
          <TextStack paragraphs={paragraphs.slice(3)} />
        </div>
      </PageSection>
      <ActionBanner title="Need a more stable governance and structuring base?" text="HMC can help shape the documentation, operating structure, and compliance posture needed for steadier growth." />
    </ServicePageShell>
  );
}
