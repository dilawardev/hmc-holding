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
import website from "@/assets/services/business-solutions/website-design-and-development/website.webp";
import visionCompass from "@/assets/services/business-solutions/website-design-and-development/vision-compass.jpg";

const resolved = findServiceRoute("business-solutions", "website-design-and-development");

const cards = [
  { title: "User journey", text: "Shape information flow so visitors can quickly understand the offer and what to do next." },
  { title: "Technical fit", text: "Build with the right level of flexibility, maintainability, and performance for the team." },
  { title: "Commercial clarity", text: "Keep copy, structure, and call-to-action design aligned with real business goals." },
];

const outcomes = [
  { title: "Sharpen first impressions", text: "Build immediate trust through structure, tone, and visual confidence." },
  { title: "Reduce friction", text: "Help visitors find the relevant offer faster and with less hesitation." },
  { title: "Support campaigns", text: "Give marketing and sales activity a more dependable destination." },
  { title: "Stay adaptable", text: "Create a site that can evolve with the business instead of being quickly outgrown." },
];

const checklist = [
  "Clear structure between brand story, offer, and next action",
  "A build scope that matches the business stage and traffic goals",
  "Performance, responsiveness, and content maintainability considered early",
  "Design choices tied to credibility and conversion behavior",
];

export default function WebsiteDesignDevelopment() {
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
      heroAside={
        <CalloutPanel
          title="A website should clarify the business as much as it presents it"
          text="The strongest websites align message, structure, and user flow so visitors understand the offer and act with confidence."
        />
      }
    >
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1.02fr_0.98fr] items-start">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Digital presence"
            title="Digital presence works best when it turns attention into action"
            intro="The service balances UX, technical delivery, and commercial intent."
          />
          <TextStack paragraphs={paragraphs.slice(0, 2)} />
          <Checklist title="Build priorities" items={checklist} />
        </div>
        <MediaFrame src={website} alt="Modern skyline representing polished digital presence" className="min-h-[320px]" />
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="Build process" title="What the build process needs to protect" intro="The work is designed to feel deliberate, polished, and commercially grounded." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <InfoCard key={card.title} title={card.title} text={card.text} />
          ))}
        </div>
      </PageSection>

      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
        <div className="grid gap-6">
          <MediaFrame
            src={visionCompass}
            alt="Compass-style graphic representing strategic navigation and journey design"
            className="min-h-[280px]"
          />
          <ServiceInquiryCard
            title="Book a Free Website Consultation"
            intro="Tell us a little about the website you're planning and we'll help you understand the next sensible step."
          />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Commercial outcome" title="What a better website starts to do" />
          <TextStack paragraphs={paragraphs.slice(2)} />
          <div className="grid gap-5 md:grid-cols-2">
            {outcomes.map((card) => (
              <InfoCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </div>
      </PageSection>

      <ActionBanner
        title="Need a website that feels more commercial and less generic?"
        text="HMC can help align design, build quality, and conversion intent so the site supports business growth more directly."
      />
    </ServicePageShell>
  );
}
