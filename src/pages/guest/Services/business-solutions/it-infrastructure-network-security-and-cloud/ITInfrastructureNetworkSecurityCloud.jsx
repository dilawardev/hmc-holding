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
import systemsGears from "@/assets/services/business-solutions/it-infrastructure-network-security-and-cloud/systems-gears.jpg";
import skylineTowers from "@/assets/services/business-solutions/it-infrastructure-network-security-and-cloud/skyline-towers.jpg";

const resolved = findServiceRoute("business-solutions", "it-infrastructure-network-security-and-cloud");

const cards = [
  { title: "Infrastructure design", text: "Shape the environment around uptime, scale, device access, and day-to-day support realities." },
  { title: "Security controls", text: "Build sensible protection into networks, permissions, and workflows before risk compounds." },
  { title: "Cloud readiness", text: "Use cloud services to improve agility, resilience, and operational visibility." },
];

const outcomes = [
  { title: "Operational continuity", text: "Reduce avoidable outages, weak handoffs, and support blind spots." },
  { title: "Scalable growth", text: "Give teams a stack that can keep pace with growth, hiring, and expansion." },
  { title: "Risk awareness", text: "Improve clarity around exposure, controls, and recovery expectations." },
  { title: "Smarter maintenance", text: "Create a more stable base for support, updates, and long-term oversight." },
];

const checklist = [
  "Infrastructure choices mapped to business continuity needs",
  "Security and access decisions designed into the stack early",
  "Cloud and network architecture sized for growth",
  "Monitoring and support expectations clearly defined",
];

export default function ITInfrastructureNetworkSecurityCloud() {
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
          title="Technology delivery needs resilience, not just implementation"
          text="Reliable infrastructure, security controls, and cloud readiness create a stronger base for daily operations and growth."
        />
      }
    >
      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[1.02fr_0.98fr] items-start">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Infrastructure view"
            title="Digital foundations should support performance under pressure"
            intro="The service centers on systems reliability, security posture, and scalable operational support."
          />
          <TextStack paragraphs={paragraphs.slice(0, 2)} />
          <Checklist title="Operational anchors" items={checklist} />
        </div>
        <MediaFrame src={systemsGears} alt="Industrial gears representing systems and infrastructure" className="min-h-[320px]" />
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="Execution stack" title="The core delivery layers" intro="This service needs enough technical clarity to build trust without becoming too dense." />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <InfoCard key={card.title} title={card.title} text={card.text} />
          ))}
        </div>
      </PageSection>

      <PageSection className="grid gap-8 md:gap-10 lg:grid-cols-[0.92fr_1.08fr] items-start">
        <div className="grid gap-6">
          <MediaFrame
            src={skylineTowers}
            alt="High-rise commercial towers symbolizing connected business operations"
            className="min-h-[280px]"
          />
          <ServiceInquiryCard
            title="Book a Free IT Infrastructure Consultation"
            intro="Tell us a little about your systems, security, or cloud needs and we'll help you understand the next sensible step."
          />
        </div>
        <div className="space-y-6">
          <SectionHeading eyebrow="Operational outcome" title="What better technical foundations unlock" />
          <TextStack paragraphs={paragraphs.slice(2)} />
          <div className="grid gap-5 md:grid-cols-2">
            {outcomes.map((card) => (
              <InfoCard key={card.title} title={card.title} text={card.text} />
            ))}
          </div>
        </div>
      </PageSection>

      <ActionBanner
        title="Need a stronger technical operating base?"
        text="HMC can help shape the infrastructure, security, and cloud decisions that keep operations steady as the business grows."
      />
    </ServicePageShell>
  );
}
