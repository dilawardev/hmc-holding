import serviceDetails from "./serviceDescriptionsLong";

const iconById = {
  "business-investment-advisory": "briefcase",
  "real-estate-services": "building",
  "business-solutions": "layers",
  "corporate-advisory": "scale",
  "visa-immigration-services": "globe",
};

function splitTitle(title = "") {
  const match = title.match(/\(([^)]+)\)/);

  return {
    label: title.replace(/\s*\([^)]*\)\s*/g, "").trim(),
    detail: match ? match[1].trim() : "",
  };
}

function toSummary(text = "", maxLength = 145) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const shortened = normalized.slice(0, maxLength);
  const lastSpace = shortened.lastIndexOf(" ");

  return `${(lastSpace > 0 ? shortened.slice(0, lastSpace) : shortened).trim()}...`;
}

const serviceCategories = serviceDetails.map((category) => ({
  id: category.id,
  title: category.name,
  summary: toSummary(category.overview),
  icon: iconById[category.id] || "briefcase",
  items: category.items.map((item) => {
    const { label, detail } = splitTitle(item.title);
    return detail ? { label, detail } : { label };
  }),
}));

export default serviceCategories;
