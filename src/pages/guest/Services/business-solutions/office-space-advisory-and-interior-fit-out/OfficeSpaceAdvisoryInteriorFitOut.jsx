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
import officeBlueprint from "@/assets/services/business-solutions/office-space-advisory-and-interior-fit-out/office-blueprint.jpg";
import skylineTowers from "@/assets/services/business-solutions/office-space-advisory-and-interior-fit-out/skyline-towers.jpg";

const resolved = findServiceRoute("business-solutions", "office-space-advisory-and-interior-fit-out");

const cards = [
  { title: "Spatial fit", text: "Match workspace planning to team size, workflow, client touchpoints, and operating rhythm." },
  { title: "Project coordination", text: "Keep fit-out decisions, vendors, handoffs, and timing aligned from start to finish." },
  { title: "Brand presence", text: "Use interior choices to reinforce professionalism, confidence, and client perception." },
];

const checklist = [
  "A workspace brief tied to business function, not only aesthetics",
  "Layout, circulation, and visitor experience planned together",
  "Procurement and site coordination managed early",
  "A finish level that matches the company's operating profile",
];

export default function OfficeSpaceAdvisoryInteriorFitOut() {
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
      heroAside={<MediaFrame src={officeBlueprint} alt="Architectural office blueprint sketch" />}
    >
      <PageSection>
        <SectionHeading
          eyebrow="Workspace direction"
          title="Workspace decisions shape how a business is experienced day to day"
          intro="The service connects planning, fit-out delivery, and brand experience inside one coordinated workspace strategy."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <InfoCard key={card.title} title={card.title} text={card.text} />
          ))}
        </div>
      </PageSection>

      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_1fr] items-start">
        <div className="space-y-6">
          <SectionHeading eyebrow="Project flow" title="A workplace has to function operationally before it impresses visually" />
          <TextStack paragraphs={paragraphs.slice(0, 4)} />
          <Checklist title="Delivery anchors" items={checklist} />
        </div>
        <div className="grid gap-6">
          <MediaFrame
            src={skylineTowers}
            alt="Modern high-rise office towers"
            className="min-h-[300px]"
          />
          <ServiceInquiryCard
            title="Book a Free Workspace Consultation"
            intro="Tell us a little about the space you're planning and we'll help you understand the next sensible step."
          />
        </div>
      </PageSection>

      <ActionBanner
        title="Planning a workspace that needs to look right and operate well?"
        text="HMC can help align location logic, interior direction, and delivery coordination so the space supports real business use."
      />
    </ServicePageShell>
  );
}
