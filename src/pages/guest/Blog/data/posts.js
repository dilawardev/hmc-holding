import BlogImage from "@/assets/blog/image.png";

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const posts = [
  {
    title: "Capital Structuring for Cross-Border Expansion",
    excerpt:
      "How leadership teams can align governance, treasury, and capital flows when entering new markets without slowing execution.",
    category: "Advisory",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    image: BlogImage,
    body: [
      "Cross-border expansion is one of the most complex strategic moves a company can make. It demands alignment across governance, treasury, legal, and operational functions — often simultaneously.",
      "Leadership teams that succeed in new markets tend to share one trait: they structure capital before they deploy it. Rather than scrambling to patch together financing after a market-entry decision, they design capital flows that anticipate regulatory, currency, and compliance requirements.",
      "At HMC, we work with leadership teams to build capital structures that balance flexibility with control. This means establishing clear treasury policies, aligning governance frameworks with local regulations, and creating reporting lines that keep headquarters informed without slowing execution on the ground.",
      "The UAE, in particular, offers a unique environment for cross-border capital structuring. Its free zone framework, bilateral tax treaties, and increasingly sophisticated regulatory landscape make it an ideal hub for companies expanding across the Middle East, Africa, and South Asia.",
      "The key is to treat capital structuring not as a finance function alone, but as a strategic enabler. When done well, it accelerates market entry, reduces risk, and gives leadership teams the confidence to commit resources at the right pace.",
      "Our advisory approach combines deep market knowledge with practical execution support — ensuring that structuring decisions translate into operational reality.",
    ],
  },
  {
    title: "Dubai Real Estate: From Acquisition to Portfolio Care",
    excerpt:
      "A practical view on acquisition, financing, and asset management for investors seeking resilient returns in the UAE.",
    category: "Real Estate",
    date: "Dec 5, 2025",
    readTime: "5 min read",
    image: BlogImage,
    body: [
      "Dubai's real estate market has matured significantly over the past decade. For investors, this means greater transparency, stronger regulatory protections, and a wider range of asset classes — but also higher expectations around due diligence and asset management.",
      "The acquisition phase is where most investors focus their attention, and rightly so. Property selection, pricing analysis, legal review, and financing terms all require careful consideration. But acquisition is only the beginning.",
      "Portfolio care — the ongoing management, maintenance, and optimisation of real estate assets — is where long-term value is created or destroyed. Investors who treat property as a passive holding often find returns eroding over time through vacancy, deferred maintenance, or misaligned tenant strategies.",
      "At HMC, we support investors across the full lifecycle. From identifying opportunities and conducting market analysis to arranging financing and managing assets post-acquisition, our approach is designed to protect capital and enhance returns over time.",
      "Dubai's unique position as a global city with strong demand fundamentals, favourable tax treatment, and world-class infrastructure makes it an attractive market — but only for investors who approach it with discipline and the right advisory support.",
    ],
  },
  {
    title: "Mobility & Immigration: Keeping Talent Moving",
    excerpt:
      "How integrated visa planning and compliance keep leadership and critical teams operating across borders without friction.",
    category: "Mobility",
    date: "Nov 20, 2025",
    readTime: "4 min read",
    image: BlogImage,
    body: [
      "In a globalised economy, the ability to move talent quickly and compliantly across borders is a competitive advantage. Yet many organisations still treat visa and immigration as an afterthought — a paperwork exercise handled reactively.",
      "The consequences of this approach can be severe: delayed market entries, compliance violations, frustrated employees, and missed opportunities. Integrated mobility planning addresses these risks by aligning immigration strategy with business objectives.",
      "This means anticipating visa requirements before they become urgent, maintaining compliance across jurisdictions, and ensuring that leadership and critical teams can operate without friction — whether they are relocating permanently or travelling for short-term assignments.",
      "The UAE's immigration framework has evolved rapidly, with new visa categories, golden visa programmes, and streamlined processing for certain industries. Navigating this landscape requires up-to-date knowledge and strong relationships with regulatory bodies.",
      "At HMC, our mobility and immigration services are designed to keep your people moving. From initial visa applications to family sponsorship and long-term residency planning, we provide end-to-end support that removes complexity from the process.",
    ],
  },
  {
    title: "Risk, Governance, and Family Capital",
    excerpt:
      "Structuring family assets with transparent oversight while preserving agility for opportunistic investments.",
    category: "Governance",
    date: "Oct 12, 2025",
    readTime: "7 min read",
    image: BlogImage,
    body: [
      "Family capital presents a unique governance challenge. Unlike institutional investors, families must balance financial objectives with personal values, generational transitions, and often complex interpersonal dynamics.",
      "The most successful family offices share a commitment to transparent governance structures. This does not mean bureaucracy — it means clear decision-making frameworks, defined investment mandates, regular reporting, and mechanisms for resolving disagreements before they escalate.",
      "Risk management in the family capital context goes beyond portfolio diversification. It encompasses succession planning, key-person risk, concentration risk in operating businesses, and the reputational risks that come with high-profile investments.",
      "At HMC, we work with families to build governance frameworks that are robust enough to protect capital across generations, yet flexible enough to seize opportunities when they arise. This balance is critical — overly rigid structures stifle entrepreneurial instincts, while too little structure invites costly mistakes.",
      "The UAE has become an increasingly popular jurisdiction for family capital management, thanks to its favourable regulatory environment, strategic location, and growing ecosystem of professional services. Many families are establishing or expanding their presence here as part of a broader diversification strategy.",
      "Our approach is always tailored. We begin by understanding the family's values, objectives, and existing structures before recommending changes. The goal is not to impose a template, but to build something that works for the specific dynamics of each family.",
      "Effective governance is not a constraint on ambition — it is the foundation that allows ambition to be pursued responsibly and sustainably.",
    ],
  },
];

// Add slug to each post
const postsWithSlugs = posts.map((post) => ({
  ...post,
  slug: slugify(post.title),
}));

export { slugify };
export default postsWithSlugs;
