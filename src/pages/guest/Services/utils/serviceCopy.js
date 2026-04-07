const DEFAULT_BLOCK_TITLES = [
  "Strategic context",
  "Operational scope",
  "Execution support",
  "Long-term value",
];

const MOJIBAKE_REPLACEMENTS = [
  ["\u00e2\u20ac\u2122", "'"],
  ["\u00e2\u20ac\u02dc", "'"],
  ["\u00e2\u20ac\u0153", '"'],
  ["\u00e2\u20ac\u009d", '"'],
  ["\u00e2\u20ac\u201c", "-"],
  ["\u00e2\u20ac\u201d", "-"],
  ["\u00e2\u20ac\u00a6", "..."],
  ["\u00c2", ""],
];

export function normalizeCopy(value = "") {
  return MOJIBAKE_REPLACEMENTS.reduce(
    (text, [from, to]) => text.replaceAll(from, to),
    String(value),
  )
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function splitParagraphs(value = "") {
  return normalizeCopy(value)
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function splitSentences(value = "") {
  const matches = normalizeCopy(value).match(/[^.!?]+[.!?]?/g);
  return (matches || []).map((part) => part.trim()).filter(Boolean);
}

export function shortenText(value = "", maxLength = 180) {
  const text = normalizeCopy(value).replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;

  const shortened = text.slice(0, maxLength);
  const boundary = shortened.lastIndexOf(" ");

  return `${(boundary > 0 ? shortened.slice(0, boundary) : shortened).trim()}...`;
}

export function firstSentence(value = "", maxLength = 170) {
  const [sentence] = splitSentences(value);
  return shortenText(sentence || value, maxLength);
}

export function titleParts(value = "") {
  const normalized = normalizeCopy(value);
  const match = normalized.match(/\(([^)]+)\)/);

  return {
    label: normalized.replace(/\s*\([^)]*\)\s*/g, "").trim(),
    detail: match ? match[1].trim() : "",
  };
}

export function buildNarrativeBlocks(paragraphs, titles = DEFAULT_BLOCK_TITLES) {
  const rows = Array.isArray(paragraphs) ? paragraphs.filter(Boolean) : splitParagraphs(paragraphs);

  if (!rows.length) {
    return { lead: [], blocks: [], closing: [] };
  }

  const leadCount = rows.length >= 6 ? 2 : 1;
  const closingCount = rows.length >= 3 ? 1 : 0;
  const lead = rows.slice(0, leadCount);
  const middle = rows.slice(leadCount, rows.length - closingCount);
  const closing = closingCount ? rows.slice(-closingCount) : [];
  const chunkSize = middle.length >= 4 ? 2 : 1;
  const blocks = [];

  for (let index = 0; index < middle.length; index += chunkSize) {
    blocks.push({
      title: titles[blocks.length] || DEFAULT_BLOCK_TITLES[blocks.length] || "More detail",
      paragraphs: middle.slice(index, index + chunkSize),
    });
  }

  if (!blocks.length && closing.length) {
    blocks.push({
      title: titles[0] || DEFAULT_BLOCK_TITLES[0],
      paragraphs: closing,
    });

    return { lead, blocks, closing: [] };
  }

  return { lead, blocks, closing };
}

export function buildHighlights(paragraphs, labels = []) {
  const rows = Array.isArray(paragraphs) ? paragraphs.filter(Boolean) : splitParagraphs(paragraphs);
  const sources = [...rows.slice(1), ...rows.slice(0, 1), ...rows.slice(-1)];
  const uniqueSources = [];

  sources.forEach((item) => {
    if (item && !uniqueSources.includes(item)) {
      uniqueSources.push(item);
    }
  });

  return labels
    .slice(0, uniqueSources.length)
    .map((label, index) => ({
      label,
      text: firstSentence(uniqueSources[index], 150),
    }))
    .filter((item) => item.text);
}
