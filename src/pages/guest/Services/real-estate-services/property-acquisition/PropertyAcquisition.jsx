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
import ServiceInquiryCard from "@/pages/guest/Services/components/service-pages/ServiceInquiryCard";
import secondarySkyline from "@/assets/services/real-estate-services/off-plan-and-secondary-properties/secondary-skyline.jpg";
import spainPool from "@/assets/services/real-estate-services/off-plan-and-secondary-properties/spain-pool.jpg";

const resolved = findServiceRoute("real-estate-services", "off-plan-and-secondary-properties");

const cards = [
  { title: "Acquisition fit", text: "Match the property type, location, and timeline to the buyer's actual investment or ownership goals." },
  { title: "Market visibility", text: "Compare off-plan and secondary opportunities with a clearer understanding of trade-offs and timing." },
  { title: "Execution confidence", text: "Keep selection, negotiation, and transaction handling aligned through the purchase journey." },
];

const checklist = [
  "A clear brief around use case, budget, timeline, and preferred locations",
  "Comparison between off-plan upside and secondary market immediacy",
  "Decision support tied to value, not only marketing appeal",
  "Transaction coordination handled with pace and detail discipline",
];

export default function PropertyAcquisition() {
  if (!resolved) return null;
  const meta = getServiceMeta(resolved.category.id);
  const paragraphs = splitParagraphs(resolved.subService.body);

  return (
    <ServicePageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: meta.landingEyebrow, href: meta.landingPath }, { label: resolved.subService.label }]}
      eyebrow={meta.landingEyebrow}
      title={resolved.subService.label}
      summary={firstSentence(paragraphs[0], 210)}
      heroAside={<MediaFrame src={secondarySkyline} alt="Dubai skyline and waterfront representing secondary market property opportunities" />}
    >
      <PageSection>
        <SectionHeading eyebrow="Asset view" title="Property acquisition decisions improve when timing, product fit, and market context stay connected" intro="The service focuses on buyer fit, market timing, and stronger transaction readiness." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => <InfoCard key={card.title} title={card.title} text={card.text} />)}
        </div>
      </PageSection>
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1.02fr_0.98fr] items-start">
        <div className="space-y-6">
          <SectionHeading eyebrow="Market positioning" title="What stronger acquisition support usually needs" />
          <TextStack paragraphs={paragraphs.slice(0, 4)} />
          <Checklist title="Acquisition priorities" items={checklist} />
        </div>
        <div className="grid gap-6">
          <MediaFrame
            src={spainPool}
            alt="Luxury poolside villa representing premium off-plan or lifestyle-driven investment"
            className="min-h-[300px]"
          />
          <ServiceInquiryCard
            title="Book a Free Property Consultation"
            intro="Tell us a little about the type of property you're considering and we'll help you understand the next sensible step."
          />
        </div>
      </PageSection>
      <ActionBanner title="Need clearer support around off-plan or secondary market opportunities?" text="HMC can help refine the acquisition brief, screen better-fit opportunities, and support the transaction journey with stronger market grounding." />
    </ServicePageShell>
  );
}
