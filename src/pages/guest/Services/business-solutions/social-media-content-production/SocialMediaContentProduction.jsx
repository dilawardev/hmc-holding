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
import burjShore from "@/assets/services/business-solutions/social-media-content-production/burj-shore.jpg";
import skylineTowers from "@/assets/services/business-solutions/social-media-content-production/skyline-towers.jpg";

const resolved = findServiceRoute("business-solutions", "social-media-content-production");

const metrics = [
  { label: "Channel rhythm", value: "More consistent output", detail: "Build a steadier publishing engine around brand and audience priorities." },
  { label: "Audience pull", value: "Stronger engagement", detail: "Create formats that earn attention more reliably over time." },
  { label: "Content planning", value: "Better reuse", detail: "Turn bigger content efforts into ongoing channel assets." },
];

const cards = [
  { title: "Editorial planning", text: "Set themes, formats, and publishing cadence around what the audience actually responds to." },
  { title: "Platform fit", text: "Adjust content structure for the expectations and behaviors of each core channel." },
  { title: "Ongoing momentum", text: "Keep the channel active with repeatable systems instead of one-off bursts of activity." },
];

const checklist = [
  "A repeatable content calendar tied to real business priorities",
  "Formats designed for the channels they are meant to serve",
  "A publishing rhythm that the team can realistically maintain",
  "A process for turning campaigns and shoots into social assets",
];

export default function SocialMediaContentProduction() {
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
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_1fr] items-start">
        <div className="space-y-6">
          <SectionHeading eyebrow="Channel systems" title="Social content needs rhythm, relevance, and a point of view" intro="The service connects editorial planning, production rhythm, and platform fit into a steadier content system." />
          <TextStack paragraphs={paragraphs.slice(0, 3)} />
        </div>
        <MediaFrame src={burjShore} alt="Burj Al Arab from shore representing polished social visuals" className="min-h-[320px]" />
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Editorial planning" title="What keeps social content working" intro="The structure connects planning, production, and publishing discipline." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="grid gap-6">
          <MediaFrame src={skylineTowers} alt="Modern towers representing always-on business visibility" className="min-h-[280px]" />
          <CalloutPanel title="Social content becomes stronger when planning and production are connected" text="Consistency, not just creativity, is what usually builds trust and sustained visibility." />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Channel discipline" title="Where channel consistency becomes an advantage" />
          <Checklist title="Social priorities" items={checklist} />
          <TextStack paragraphs={paragraphs.slice(3)} />
        </div>
      </PageSection>
      <ActionBanner title="Need a stronger social content engine?" text="HMC can help shape planning, production, and publishing systems that keep channels active, consistent, and commercially relevant." />
    </ServicePageShell>
  );
}
