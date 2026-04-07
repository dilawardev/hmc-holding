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
import skylineTowers from "@/assets/services/business-investment-advisory/business-consulting-and-development/skyline-towers.jpg";
import advisoryMeeting from "@/assets/services/business-investment-advisory/business-consulting-and-development/advisory-meeting.jpg";

const resolved = findServiceRoute(
  "business-investment-advisory",
  "business-consulting-and-development",
);

const metrics = [
  {
    label: "Decision quality",
    value: "Sharper market choices",
    detail: "Frame expansion, positioning, and operating priorities early.",
  },
  {
    label: "Execution pace",
    value: "Fewer stalled moves",
    detail: "Keep planning tied to what the business can actually activate next.",
  },
  {
    label: "Growth posture",
    value: "Built for scaling",
    detail: "Use structure, partnerships, and timing to support durable momentum.",
  },
];

const focusCards = [
  {
    title: "Commercial positioning",
    text: "Translate market opportunity into a clearer growth direction, audience focus, and value story.",
  },
  {
    title: "Operating structure",
    text: "Align business model, delivery rhythm, and internal priorities with UAE market realities.",
  },
  {
    title: "Partnership leverage",
    text: "Use the right introductions, channels, and strategic relationships to accelerate traction.",
  },
];

const planningChecklist = [
  "A focused market thesis rather than an overly broad launch plan",
  "Commercial priorities tied to real operational capacity",
  "A partnership approach that supports distribution and credibility",
  "Clear sequencing between setup, traction, and expansion",
];

export default function BusinessStructuring() {
  if (!resolved) return null;

  const meta = getServiceMeta(resolved.category.id);
  const paragraphs = splitParagraphs(resolved.subService.body);

  return (
    <ServicePageShell
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: meta.landingEyebrow, href: meta.landingPath },
        { label: resolved.subService.label },
      ]}
      eyebrow={meta.landingEyebrow}
      title={resolved.subService.label}
      summary={firstSentence(paragraphs[0], 210)}
      heroAside={<MetricStrip items={metrics} />}
    >
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1.04fr_0.96fr] items-center">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Growth direction"
            title="Strategy, structure, and traction need to move together"
          />
          <TextStack paragraphs={paragraphs.slice(0, 3)} />
        </div>
        <MediaFrame
          src={skylineTowers}
          alt="Dubai commercial towers viewed from below"
          className="min-h-[320px]"
        />
      </PageSection>

      <PageSection>
        <SectionHeading
          eyebrow="Where HMC adds value"
          title="The advisory work is shaped around momentum, not static reports"
          align="center"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {focusCards.map((card) => (
            <InfoCard key={card.title} title={card.title} text={card.text} />
          ))}
        </div>
      </PageSection>

      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="grid gap-6">
          <MediaFrame
            src={advisoryMeeting}
            alt="Advisory meeting in a modern office"
            className="min-h-[280px]"
          />
          <CalloutPanel
            title="Built for founders and operators moving inside a fast, competitive region"
            text="The work stays useful when strategy, structure, and next actions are kept in the same frame."
          />
          <ServiceInquiryCard
            title="Book a Free Business Consultation"
            intro="Tell us a little about your growth plans and we'll help you understand the next sensible step."
          />
        </div>
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Execution priorities"
            title="What strong execution usually depends on"
          />
          <Checklist title="Practical anchors" items={planningChecklist} />
          <TextStack paragraphs={paragraphs.slice(3)} />
        </div>
      </PageSection>

      <ActionBanner
        title="Need a clearer commercial growth path?"
        text="HMC can help turn broad ambition into a sharper market plan, stronger operating structure, and more confident next move."
      />
    </ServicePageShell>
  );
}
