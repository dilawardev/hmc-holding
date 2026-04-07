import serviceDetails from "./serviceDescriptionsLong";

export function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripParenthetical(value = "") {
  return value.replace(/\s*\([^)]*\)\s*/g, "").trim();
}

const thirdLevelContent = {
  "business-investment-advisory/company-formation": [
    {
      label: "Mainland",
      body:
        "Mainland company formation in the UAE is ideal for businesses that want direct access to the local market and the flexibility to work with private and government entities. It supports wider operational scope, local trade opportunities, and long-term growth potential for service and trading businesses.",
    },
    {
      label: "Free Zone",
      body:
        "Free Zone company formation is popular for international founders seeking streamlined setup, full foreign ownership, and sector-focused business ecosystems. It offers operational efficiency, investor-friendly regulations, and strong infrastructure for import/export and global operations.",
    },
    {
      label: "Offshore",
      body:
        "Offshore company formation is commonly used for international holdings, asset protection, and cross-border transactions. It is a strategic structure for businesses that do not require direct local UAE market operations but need compliant global structuring.",
    },
  ],
  "corporate-advisory/accounting-bookkeeping-payroll": [
    {
      label: "WPS",
      body:
        "Wage Protection System (WPS) compliance is mandatory for eligible employers in the UAE and is essential for legal salary processing. Structured WPS support ensures salaries are paid on time, reporting is accurate, and payroll operations remain aligned with labor regulations.",
    },
  ],
  "corporate-advisory/tax-registration-compliance": [
    {
      label: "VAT",
      body:
        "VAT compliance includes registration, tax invoice controls, transaction classification, return filing, and audit readiness. Proper VAT governance helps businesses avoid penalties while maintaining transparent and accurate financial reporting in line with UAE requirements.",
    },
    {
      label: "Corporate Tax",
      body:
        "Corporate Tax compliance requires accurate taxable income assessment, registration, documentation, and timely filing. A structured Corporate Tax approach supports risk reduction, better financial planning, and sustained compliance with the UAE tax framework.",
    },
  ],
  "corporate-advisory/insurance": [
    {
      label: "Corporate",
      body:
        "Corporate insurance solutions are designed to protect business continuity against operational, liability, and commercial risks. The right policy structure helps companies safeguard assets, contracts, and financial stability across growth stages.",
    },
    {
      label: "Health",
      body:
        "Health insurance planning ensures employee welfare and compliance with UAE requirements across relevant jurisdictions. Tailored group and individual policy options support workforce stability while controlling long-term benefits costs.",
    },
    {
      label: "Property & Risk Coverage",
      body:
        "Property and risk coverage protects physical assets, facilities, and critical business infrastructure from unexpected events. With the right risk framework, companies can reduce loss exposure and maintain operational resilience.",
    },
  ],
};

// Preserve legacy public URLs when labels evolve.
const subServiceSlugOverrides = {
  "corporate-advisory/legal-services": "legal-documentation-and-contracts",
};

function buildThirdLevel(categorySlug, subServiceSlug) {
  const key = `${categorySlug}/${subServiceSlug}`;
  const rows = thirdLevelContent[key] || [];

  return rows.map((row) => ({
    slug: slugify(row.label),
    label: row.label,
    body: row.body,
  }));
}

export const servicesCatalog = serviceDetails.map((category) => {
  const categorySlug = category.id;

  return {
    id: category.id,
    slug: categorySlug,
    label: category.name,
    overview: category.overview,
    items: category.items.map((item) => {
      const cleanLabel = stripParenthetical(item.title);
      const baseSlug = slugify(cleanLabel);
      const subServiceSlug =
        subServiceSlugOverrides[`${categorySlug}/${baseSlug}`] || baseSlug;

      return {
        slug: subServiceSlug,
        label: cleanLabel,
        title: item.title,
        body: item.body,
        children: buildThirdLevel(categorySlug, subServiceSlug),
      };
    }),
  };
});

export function toServicePath(categorySlug, subServiceSlug, subChildSlug) {
  if (subChildSlug) return `/services/${categorySlug}/${subServiceSlug}/${subChildSlug}`;
  return `/services/${categorySlug}/${subServiceSlug}`;
}

export function findServiceRoute(categorySlug, subServiceSlug, subChildSlug) {
  const category = servicesCatalog.find((node) => node.slug === categorySlug);
  if (!category) return null;

  const subService = category.items.find((node) => node.slug === subServiceSlug);
  if (!subService) return null;

  if (!subChildSlug) {
    return { category, subService, subChild: null };
  }

  const subChild = subService.children.find((node) => node.slug === subChildSlug);
  if (!subChild) return null;

  return { category, subService, subChild };
}

export function getServiceInquiryOptions() {
  return servicesCatalog.flatMap((category) =>
    category.items.flatMap((item) => {
      const parentOption = {
        value: toServicePath(category.slug, item.slug),
        label: item.label,
        categoryLabel: category.label,
      };

      const childOptions = item.children.map((child) => ({
        value: toServicePath(category.slug, item.slug, child.slug),
        label: `${item.label} - ${child.label}`,
        categoryLabel: category.label,
      }));

      return [parentOption, ...childOptions];
    }),
  );
}
