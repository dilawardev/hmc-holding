import React from "react";
import serviceDetails from "../data/serviceDescriptionsLong";
import { normalizeCopy, splitParagraphs } from "../utils/serviceCopy";

/**
 * Renders rich service copy (overview + nested items) from serviceDescriptionsLong.
 * Pass a categoryId to render the full category, or itemTitle to render a single sub-service.
 */
export default function ServiceDetailContent({
  categoryId,
  itemTitle,
  showAllItems = true,
  defaultOpenFirst = true,
}) {
  const category = serviceDetails.find((c) => c.id === categoryId);
  if (!category) return null;

  const items = (() => {
    if (!itemTitle) return category.items;
    const match = category.items.find((i) => i.title === itemTitle);
    return match ? [match] : [];
  })();

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
          {normalizeCopy(category.name)}
        </h2>
        {category.overview ? (
          <p className="max-w-4xl text-sm leading-relaxed text-slate-700 sm:text-base">
            {normalizeCopy(category.overview)}
          </p>
        ) : null}
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <details
            key={item.title}
            className="group rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm open:shadow-md transition"
            open={defaultOpenFirst && idx === 0}
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 text-base font-bold leading-snug text-[#0D354C] sm:text-lg">
              <span>{normalizeCopy(item.title)}</span>
              <span className="text-sm text-[#D6B26F] transition group-open:rotate-180">
                {"\u25BE"}
              </span>
            </summary>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
              {splitParagraphs(item.body).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
      </div>

      {showAllItems && itemTitle && category.items.length > 1 ? (
        <div className="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-[0_8px_24px_rgba(13,53,76,0.08)]">
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#D6B26F]">
            Other services in {normalizeCopy(category.name)}
          </p>
          <ul className="grid gap-2 text-sm text-[#0D354C] sm:grid-cols-2">
            {category.items
              .filter((item) => item.title !== itemTitle)
              .map((item) => (
                <li key={item.title} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#D6B26F]" aria-hidden="true" />
                  <span>{normalizeCopy(item.title)}</span>
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
