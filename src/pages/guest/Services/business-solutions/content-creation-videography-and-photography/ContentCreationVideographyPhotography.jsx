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
import burjBeach from "@/assets/services/business-solutions/content-creation-videography-and-photography/burj-beach.jpg";
import greeceHarbor from "@/assets/services/business-solutions/content-creation-videography-and-photography/greece-harbor.jpg";

const resolved = findServiceRoute("business-solutions", "content-creation-videography-and-photography");

const metrics = [
  { label: "Story value", value: "Sharper visual narrative", detail: "Create content that reinforces positioning instead of filling channels." },
  { label: "Production fit", value: "Purposeful outputs", detail: "Plan content formats around real campaign or brand use." },
  { label: "Library quality", value: "Reusable assets", detail: "Build a stronger media base for ongoing campaigns and launches." },
];

const cards = [
  { title: "Concept development", text: "Start with message, audience, and intended use before the camera work begins." },
  { title: "Production coordination", text: "Align shot planning, schedules, and deliverables so the content set stays usable." },
  { title: "Content utility", text: "Create assets that can support campaigns, brand storytelling, and ongoing channel needs." },
];

const checklist = [
  "A concept built around campaign or brand objectives",
  "Shot planning tied to deliverables and channel use",
  "Consistent visual quality across stills and video outputs",
  "A content library that supports reuse over time",
];

export default function ContentCreationVideographyPhotography() {
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
        <MediaFrame src={burjBeach} alt="Dubai coastline and landmark representing visual storytelling" className="min-h-[320px]" />
        <div className="space-y-6">
          <SectionHeading eyebrow="Production lens" title="Content production works best when it starts with the commercial story" intro="The service is built around concept development, production planning, and content utility across campaigns and channels." />
          <TextStack paragraphs={paragraphs.slice(0, 3)} />
        </div>
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Production process" title="What the production process should protect" intro="The work is more editorial and visual, with careful planning behind each output." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="grid gap-6">
          <MediaFrame src={greeceHarbor} alt="Greek harbor scene representing destination-style production imagery" className="min-h-[280px]" />
          <CalloutPanel title="Good visual content makes a business easier to understand before a conversation starts" text="The strongest outputs usually come from clear intent, careful planning, and disciplined delivery." />
          <ServiceInquiryCard
            title="Book a Free Content Consultation"
            intro="Tell us a little about your content, videography, or photography goals and we'll help you understand the next sensible step."
          />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Production utility" title="How production becomes commercially useful" />
          <Checklist title="Production anchors" items={checklist} />
          <TextStack paragraphs={paragraphs.slice(3)} />
        </div>
      </PageSection>
      <ActionBanner title="Need content production that feels more strategic and less improvised?" text="HMC can help shape visual storytelling, production planning, and deliverable structure so content works harder across channels." />
    </ServicePageShell>
  );
}
