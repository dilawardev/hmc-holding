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
import burjBeach from "@/assets/services/business-solutions/branding-pr-and-reputation-management/burj-beach.jpg";
import handshake from "@/assets/services/business-solutions/branding-pr-and-reputation-management/handshake.jpg";

const resolved = findServiceRoute("business-solutions", "branding-pr-and-reputation-management");

const metrics = [
  { label: "Positioning", value: "Clearer public signal", detail: "Shape how the business is interpreted before conversations begin." },
  { label: "Reputation", value: "Stronger trust base", detail: "Protect perception across media, partners, and client touchpoints." },
  { label: "Message control", value: "More consistency", detail: "Align narrative across channels and stakeholder groups." },
];

const cards = [
  { title: "Brand positioning", text: "Refine the story, tone, and visual cues that shape how the market reads the business." },
  { title: "PR alignment", text: "Support public visibility through messaging that protects credibility as awareness grows." },
  { title: "Reputation management", text: "Maintain coherence across partner, media, and audience-facing communications." },
];

const checklist = [
  "A brand narrative that matches the actual service experience",
  "Public messaging aligned across site, campaigns, and stakeholder touchpoints",
  "A response approach for high-visibility or sensitive moments",
  "Consistency in how the business presents itself over time",
];

export default function BrandingPRReputationManagement() {
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
        <MediaFrame src={burjBeach} alt="Burj Al Arab shoreline representing premium brand perception" className="min-h-[320px]" />
        <div className="space-y-6">
          <SectionHeading eyebrow="Reputation lens" title="Brand credibility is built through consistency, clarity, and public confidence" intro="The service focuses on positioning, message discipline, and public confidence across every touchpoint." />
          <TextStack paragraphs={paragraphs.slice(0, 3)} />
        </div>
      </PageSection>
      <PageSection>
        <SectionHeading eyebrow="Brand stewardship" title="What stronger brand stewardship includes" intro="The emphasis here is narrative discipline and public-facing confidence." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="space-y-6">
          <SectionHeading eyebrow="Consistency" title="Where brand momentum usually breaks down" />
          <Checklist title="Reputation priorities" items={checklist} />
          <TextStack paragraphs={paragraphs.slice(3)} />
        </div>
        <div className="grid gap-6">
          <MediaFrame src={handshake} alt="Business handshake representing trust and relationship management" className="min-h-[280px]" />
          <CalloutPanel title="Premium brands often feel coherent before they feel loud" text="Stronger brand and PR work tends to come from clearer positioning and steadier consistency, not more noise." />
          <ServiceInquiryCard
            title="Book a Free Branding Consultation"
            intro="Tell us a little about your brand, PR, or reputation goals and we'll help you understand the next sensible step."
          />
        </div>
      </PageSection>
      <ActionBanner title="Need a stronger brand signal and steadier reputation posture?" text="HMC can help shape positioning, public messaging, and reputation management so the business is perceived with more clarity and trust." />
    </ServicePageShell>
  );
}
