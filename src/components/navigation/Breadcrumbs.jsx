import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const cx = (...classes) => classes.filter(Boolean).join(" ");

function isExternal(url) {
  return typeof url === "string" && /^https?:\/\//i.test(url);
}

function Crumb({ item, isLast }) {
  const {
    label,
    href,        // kept for compatibility with your current API
    to,          // optional alternative to href
    icon: Icon,  // optional per-crumb icon
    onClick,
    disabled,
  } = item;

  const dest = to ?? href;

  const base =
    "inline-flex max-w-full items-center gap-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200";
  const interactive =
    "text-[#0D354C]/80 hover:text-[#D6B26F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B26F]/40 focus-visible:ring-offset-2";
  const current = "text-[#0D354C] font-extrabold";
  const muted = "text-slate-400 cursor-not-allowed";

  const content = (
    <>
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      <span className="min-w-0 truncate" title={label}>
        {label}
      </span>
    </>
  );

  // Current page crumb (announce to screen readers)
  if (isLast || !dest) {
    return (
      <span
        className={cx(base, current)}
        aria-current={isLast ? "page" : undefined}
      >
        {content}
      </span>
    );
  }

  // Disabled crumb
  if (disabled) {
    return (
      <span className={cx(base, muted)} aria-disabled="true">
        {content}
      </span>
    );
  }

  // External link support
  if (isExternal(dest)) {
    return (
      <a
        href={dest}
        onClick={onClick}
        className={cx(base, interactive)}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  // Internal route
  return (
    <Link to={dest} onClick={onClick} className={cx(base, interactive)}>
      {content}
    </Link>
  );
}

function collapseItems(items, maxItems) {
  if (!maxItems || items.length <= maxItems) return items;

  // Always keep: first + last two (common breadcrumb UX)
  const first = items[0];
  const lastTwo = items.slice(-2);

  return [
    first,
    { label: "…", disabled: true }, // non-interactive ellipsis
    ...lastTwo,
  ];
}

export default function Breadcrumbs({
  items = [],
  className = "",
  maxItems = 0,          // set to e.g. 4 or 5 to enable collapsing
  showHomeIcon = false,  // optional: show Home icon on the first crumb
}) {
  if (!items.length) return null;

  const normalized = items.map((it, i) => ({
    ...it,
    // If requested, put a Home icon on the first crumb (unless already provided)
    icon: showHomeIcon && i === 0 && !it.icon ? Home : it.icon,
  }));

  const displayItems = collapseItems(normalized, maxItems);

  return (
    <nav
      aria-label="Breadcrumb"
      className={cx(
        "inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 shadow-sm ring-1 ring-[#0D354C]/8",
        className
      )}
    >
      <span className="mr-2.5 h-4 w-[2px] rounded-full bg-[#D6B26F]" aria-hidden="true" />
      <ol className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
        {displayItems.map((item, idx) => {
          const isLast = idx === displayItems.length - 1;

          return (
            <li
              key={`${item.label}-${idx}`}
              className="flex min-w-0 items-center gap-1.5 sm:gap-2"
            >
              <Crumb item={item} isLast={isLast} />
              {!isLast && (
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-[#D6B26F]/70"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
