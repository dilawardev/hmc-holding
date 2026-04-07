import businessInvestmentAdvisoryImg from "@/assets/services/Business_Investment_Advisory.jpg";
import businessSolutionsImg from "@/assets/services/Business_Solutions.jpg";
import corporateAdvisoryImg from "@/assets/services/business-advisory-services.png";
import realEstateImg from "@/assets/services/realestate.jpg";
import visaImg from "@/assets/services/visa.webp";
import serviceDetails from "./serviceDescriptionsLong";
import { slugify, toServicePath } from "./servicesCatalog";
import { normalizeCopy, titleParts } from "../utils/serviceCopy";

const visualsById = {
  "business-investment-advisory": {
    image: businessInvestmentAdvisoryImg,
    imageAlt: "Advisors discussing business and investment strategy",
    color: "primary",
  },
  "business-solutions": {
    image: businessSolutionsImg,
    imageAlt: "Team collaborating on business operations and technology",
    color: "secondary",
  },
  "real-estate-services": {
    image: realEstateImg,
    imageAlt: "Modern UAE real estate development",
    color: "primary",
  },
  "corporate-advisory": {
    image: corporateAdvisoryImg,
    imageAlt: "Corporate advisors in a strategy meeting",
    color: "primary",
  },
  "visa-immigration-services": {
    image: visaImg,
    imageAlt: "Travel and immigration documents for UAE visa services",
    color: "secondary",
  },
};

function toSummary(text = "", maxLength = 135) {
  const normalized = normalizeCopy(text).replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const shortened = normalized.slice(0, maxLength);
  const lastSpace = shortened.lastIndexOf(" ");

  return `${(lastSpace > 0 ? shortened.slice(0, lastSpace) : shortened).trim()}...`;
}

const services = serviceDetails.map((category) => {
  const visuals = visualsById[category.id] || {};
  const items = category.items.map((item) => {
    const { label, detail } = titleParts(item.title);
    const slug = slugify(label);

    return {
      label,
      detail,
      title: normalizeCopy(item.title),
      slug,
      path: toServicePath(category.id, slug),
    };
  });

  return {
    id: category.id,
    name: normalizeCopy(category.name),
    description: toSummary(category.overview),
    overview: normalizeCopy(category.overview),
    image: visuals.image,
    imageAlt: visuals.imageAlt || `${category.name} visual`,
    color: visuals.color || "primary",
    items,
    tabContent: {
      title: normalizeCopy(category.name),
      description: normalizeCopy(category.overview),
      features: items.map((item) => (item.detail ? `${item.label} (${item.detail})` : item.label)),
    },
  };
});

export default services;
