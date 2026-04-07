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
import accountingLens from "@/assets/services/corporate-advisory/tax-registration-and-compliance/accounting-lens.jpg";
import systemsGears from "@/assets/services/corporate-advisory/tax-registration-and-compliance/systems-gears.jpg";

const resolved = findServiceRoute("corporate-advisory", "tax-registration-and-compliance");

const metrics = [
  { label: "Accuracy", value: "Cleaner filings", detail: "Reduce avoidable mistakes in reporting, registration, and documentation." },
  { label: "Readiness", value: "Better oversight", detail: "Keep the business prepared for recurring reporting and compliance demands." },
  { label: "Efficiency", value: "Stronger process", detail: "Create a steadier workflow around VAT and corporate tax obligations." },
];

const cards = [
  { title: "Registration and setup", text: "Handle the foundation correctly so later reporting has a cleaner starting point." },
  { title: "Filing discipline", text: "Support timely returns, document control, and transaction classification." },
  { title: "Ongoing compliance", text: "Keep tax obligations visible as rules, activity, and reporting needs evolve." },
];

const checklist = [
  "Accurate registration and entity information",
  "Transaction records that support reporting confidence",
  "A repeatable filing rhythm with fewer last-minute issues",
  "Documentation that supports review, audit, or clarification if needed",
];

export default function TaxFinancialAdvisory() {
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
          <SectionHeading eyebrow="Tax operations" title="Tax work needs precision, reporting discipline, and reliable process" intro="The service is designed around accurate setup, steadier filings, and stronger ongoing reporting control." />
          <TextStack paragraphs={paragraphs.slice(0, 3)} />
        </div>
        <MediaFrame src={accountingLens} alt="Calculator and financial records under magnification" className="min-h-[320px]" />
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Tax scope" title="What the tax support layer should cover" intro="The page frames tax compliance as an operational control, not an occasional admin task." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
        <div className="grid gap-6">
          <MediaFrame src={systemsGears} alt="Mechanical system graphic representing process discipline" className="min-h-[280px]" />
          <CalloutPanel title="Tax compliance gets easier when the reporting process is designed, not improvised" text="Stronger structure reduces both friction and risk as filing obligations continue over time." />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Reporting discipline" title="What steadier tax operations depend on" />
          <Checklist title="Tax anchors" items={checklist} />
          <TextStack paragraphs={paragraphs.slice(3)} />
        </div>
      </PageSection>
      <ActionBanner title="Need tighter tax registration and compliance support?" text="HMC can help make VAT and corporate tax obligations more manageable through better structure, reporting, and follow-through." />
    </ServicePageShell>
  );
}
