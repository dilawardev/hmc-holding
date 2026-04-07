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
  PageSection,
  SectionHeading,
  ServicePageShell,
  TextStack,
} from "@/pages/guest/Services/components/service-pages/ServicePagePrimitives";
import ServiceInquiryCard from "@/pages/guest/Services/components/service-pages/ServiceInquiryCard";
import visionCompass from "@/assets/services/business-solutions/digital-marketing-and-performance-advertising/vision-compass.jpg";
import advisoryMeeting from "@/assets/services/business-solutions/digital-marketing-and-performance-advertising/advisory-meeting.jpg";

const resolved = findServiceRoute("business-solutions", "digital-marketing-and-performance-advertising");

const cards = [
  { title: "Performance targeting", text: "Shape audience, intent, and platform choices around the outcomes being pursued." },
  { title: "Campaign structure", text: "Build offers, creative, and landing flows that can be measured and improved." },
  { title: "Optimization rhythm", text: "Use reporting and testing loops to refine spend allocation and improve returns." },
];

const outcomes = [
  { title: "Cleaner acquisition", text: "Reduce wasted spend by tightening the path between audience and offer." },
  { title: "Better reporting", text: "Make performance decisions from clearer data instead of broad assumptions." },
  { title: "More scalable campaigns", text: "Give good-performing work the structure needed to scale with less friction." },
  { title: "Faster iteration", text: "Create a testing cadence that keeps campaigns responsive and useful." },
];

const checklist = [
  "Audience and message alignment before spend is scaled",
  "Landing and conversion pathways built for the traffic being bought",
  "Reporting tied to business outcomes rather than vanity signals",
  "A testing rhythm that keeps campaigns learning over time",
];

export default function DigitalMarketingPerformanceAdvertising() {
  if (!resolved) return null;
  const meta = getServiceMeta(resolved.category.id);
  const paragraphs = splitParagraphs(resolved.subService.body);

  return (
    <ServicePageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: meta.landingEyebrow, href: meta.landingPath }, { label: resolved.subService.label }]}
      eyebrow={meta.landingEyebrow}
      title={resolved.subService.label}
      summary={firstSentence(paragraphs[0], 210)}
      heroAside={<CalloutPanel title="Performance work needs visibility, testing, and commercial discipline" text="Campaign structure, measurement, and optimization need to stay close together for paid growth to perform reliably." />}
    >
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1.02fr_0.98fr] items-start">
        <div className="space-y-6">
          <SectionHeading eyebrow="Campaign engine" title="Campaign performance improves when targeting and measurement stay close together" intro="The service positions digital marketing as an execution engine, not a vague awareness channel." />
          <TextStack paragraphs={paragraphs.slice(0, 2)} />
          <Checklist title="Campaign anchors" items={checklist} />
        </div>
        <MediaFrame src={visionCompass} alt="Compass-like business graphic representing campaign direction" className="min-h-[320px]" />
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Execution stack" title="What the marketing engine needs" intro="The work combines audience targeting, campaign structure, and reporting discipline into one sharper growth system." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.92fr_1.08fr] items-start">
        <div className="grid gap-6">
          <MediaFrame
            src={advisoryMeeting}
            alt="Business meeting scene representing campaign planning"
            className="min-h-[280px]"
          />
          <ServiceInquiryCard
            title="Book a Free Marketing Consultation"
            intro="Tell us a little about your campaigns or growth goals and we'll help you understand the next sensible step."
          />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Optimization" title="What stronger campaign discipline delivers" />
          <TextStack paragraphs={paragraphs.slice(2)} />
          <div className="grid gap-5 md:grid-cols-2">
            {outcomes.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
          </div>
        </div>
      </PageSection>
      <ActionBanner title="Need performance marketing that is easier to evaluate and scale?" text="HMC can help sharpen targeting, campaign structure, and reporting so paid growth becomes easier to trust and improve." />
    </ServicePageShell>
  );
}
