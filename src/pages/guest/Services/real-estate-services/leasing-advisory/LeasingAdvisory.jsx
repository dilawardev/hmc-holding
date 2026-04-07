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
import spainVilla from "@/assets/services/real-estate-services/property-management-and-leasing/spain-villa.jpg";
import spainCoast from "@/assets/services/real-estate-services/property-management-and-leasing/spain-coast.jpg";

const resolved = findServiceRoute("real-estate-services", "property-management-and-leasing");

const cards = [
  { title: "Occupancy flow", text: "Support stronger tenant matching, leasing pace, and day-to-day property coordination." },
  { title: "Asset condition", text: "Protect the presentation and upkeep of the property through steadier oversight." },
  { title: "Owner confidence", text: "Keep communication, tenancy handling, and property decisions easier to track." },
];

const checklist = [
  "Positioning the property for the right tenant profile",
  "Managing viewings, negotiation, and documentation with consistency",
  "Keeping maintenance and presentation standards visible",
  "Reducing avoidable owner friction through clearer coordination",
];

export default function LeasingAdvisory() {
  if (!resolved) return null;
  const meta = getServiceMeta(resolved.category.id);
  const paragraphs = splitParagraphs(resolved.subService.body);

  return (
    <ServicePageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: meta.landingEyebrow, href: meta.landingPath }, { label: resolved.subService.label }]}
      eyebrow={meta.landingEyebrow}
      title={resolved.subService.label}
      summary={firstSentence(paragraphs[0], 210)}
      heroAside={<MediaFrame src={spainVilla} alt="Luxury villa representing managed residential leasing stock" />}
    >
      <PageSection>
        <SectionHeading eyebrow="Asset view" title="Leasing and management work best when asset performance and tenant experience move together" intro="The service focuses on occupancy quality, property presentation, and steadier owner coordination." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1.02fr_0.98fr] items-center">
        <div className="space-y-6">
          <SectionHeading eyebrow="Leasing discipline" title="What good leasing support tends to involve" />
          <TextStack paragraphs={paragraphs.slice(0, 4)} />
          <Checklist title="Leasing priorities" items={checklist} />
        </div>
        <MediaFrame src={spainCoast} alt="Coastal property scene representing premium tenant and lifestyle positioning" className="min-h-[300px]" />
      </PageSection>
      <ActionBanner title="Need stronger property management and leasing support?" text="HMC can help coordinate tenant-facing activity, day-to-day property needs, and leasing decisions so ownership feels more structured and less reactive." />
    </ServicePageShell>
  );
}
