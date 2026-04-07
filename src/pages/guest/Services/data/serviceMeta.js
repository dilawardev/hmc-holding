const defaultMeta = {
  landingPath: "/services",
  landingEyebrow: "Services",
  landingSummary:
    "Advisory, execution, and coordination tailored to the way businesses and investors operate in the UAE.",
  highlightLabels: ["Strategic fit", "Scope", "Execution"],
  sectionTitles: [
    "Strategic context",
    "What the service covers",
    "How HMC supports delivery",
    "Long-term value",
  ],
  ctaTitle: "Need tailored support?",
  ctaText:
    "Talk with HMC about the right structure, next steps, and the support needed to move forward with confidence.",
};

const serviceMeta = {
  "business-investment-advisory": {
    landingPath: "/business-consulting",
    landingEyebrow: "Business Consulting",
    landingSummary:
      "Strategy, structuring, and market-entry support for founders, operators, and investors building in the UAE.",
    highlightLabels: ["Market opportunity", "Planning", "Growth execution"],
    sectionTitles: [
      "Opportunity and positioning",
      "Strategy and commercial planning",
      "Execution and market traction",
      "Long-term expansion",
    ],
    ctaTitle: "Planning your next move in the UAE?",
    ctaText:
      "We help founders and investors align strategy, structure, and execution before capital or market momentum is lost.",
  },
  "real-estate-services": {
    landingPath: "/real-estate",
    landingEyebrow: "Real Estate Services",
    landingSummary:
      "Property acquisition, portfolio performance, leasing, and financing support shaped around UAE market realities.",
    highlightLabels: ["Asset selection", "Portfolio performance", "Ownership support"],
    sectionTitles: [
      "Market context",
      "Investment or ownership scope",
      "Execution and portfolio support",
      "Value protection",
    ],
    ctaTitle: "Looking at property with an investor's lens?",
    ctaText:
      "From acquisition to asset stewardship, HMC helps you make property decisions with clearer structure and better follow-through.",
  },
  "business-solutions": {
    landingPath: "/business-solutions",
    landingEyebrow: "Business Solutions",
    landingSummary:
      "Workspace, technology, brand, and growth execution services that support day-to-day business performance.",
    highlightLabels: ["Operational setup", "Digital delivery", "Growth support"],
    sectionTitles: [
      "Business need",
      "Solution scope",
      "Delivery support",
      "Operational continuity",
    ],
    ctaTitle: "Need execution support beyond advisory?",
    ctaText:
      "We help translate plans into working environments, platforms, systems, and campaigns that support real business momentum.",
  },
  "corporate-advisory": {
    landingPath: "/corporate-advisory",
    landingEyebrow: "Corporate Advisory",
    landingSummary:
      "Compliance, finance, tax, legal, banking, and risk support designed for businesses operating in the UAE.",
    highlightLabels: ["Compliance priorities", "Financial controls", "Risk management"],
    sectionTitles: [
      "Regulatory context",
      "What the work involves",
      "Compliance and coordination",
      "Business continuity",
    ],
    ctaTitle: "Need tighter governance and compliance support?",
    ctaText:
      "HMC helps businesses keep reporting, structuring, documentation, and risk decisions aligned as operations grow.",
  },
  "visa-immigration-services": {
    landingPath: "/visa-immigration",
    landingEyebrow: "Visa & Immigration Services",
    landingSummary:
      "Residency, employment, investor, and family immigration support with structured coordination across UAE procedures.",
    highlightLabels: ["Eligibility path", "Application handling", "Residency outcomes"],
    sectionTitles: [
      "Residency context",
      "Process and eligibility",
      "Application support",
      "Ongoing mobility needs",
    ],
    ctaTitle: "Need immigration support with less friction?",
    ctaText:
      "We help clients manage UAE visa and residency procedures with clearer preparation, cleaner submissions, and stronger follow-through.",
  },
};

export function getServiceMeta(categoryId) {
  return {
    ...defaultMeta,
    ...(serviceMeta[categoryId] || {}),
  };
}
