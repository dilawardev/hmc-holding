import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LockKeyhole,
  Mail,
  Phone,
  MessageCircle,
  TrendingUp,
  Building2,
  Layers,
  ShieldCheck,
  PlaneTakeoff,
} from "lucide-react";

import Logo from "@/assets/logo/HMC.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PROJECTS_MAP_ROUTE } from "@/constants/projectsMap";
import { useProjectsMapLock } from "@/hooks/useProjectsMapLock";
import { servicesCatalog, toServicePath } from "@/pages/guest/Services/data/servicesCatalog";
import { getServiceMeta } from "@/pages/guest/Services/data/serviceMeta";
import { scrollToTop } from "@/utils/scrolling";

const DISABLED_HREF = "#";
const preventNav = (e) => e?.preventDefault();
const isDisabledHref = (href) => !href || href === DISABLED_HREF;
const maybePreventNav = (e, href) => {
  if (isDisabledHref(href)) preventNav(e);
};
const isExternalLikeHref = (href = "") =>
  /^(https?:|mailto:|tel:|#)/i.test(href);

function ProjectsMapBadge({ locked }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
        locked
          ? "border border-[#0D354C]/12 bg-[#0D354C]/[0.06] text-[#0D354C]/70"
          : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-700",
      ].join(" ")}
    >
      <LockKeyhole className="h-3 w-3" />
      {locked ? "Locked" : "Live"}
    </span>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { isUnlocked: isProjectsMapUnlocked, openUnlockModal } =
    useProjectsMapLock();

  const wrapRef = useRef(null);
  const triggerRefs = useRef({});
  const closeTimerRef = useRef(null);

  const iconMap = {
    "business-investment-advisory": TrendingUp,
    "real-estate-services": Building2,
    "business-solutions": Layers,
    "corporate-advisory": ShieldCheck,
    "visa-immigration-services": PlaneTakeoff,
  };

  const servicesCategories = servicesCatalog.map((category) => ({
    label: category.label,
    href: getServiceMeta(category.slug).landingPath,
    icon: iconMap[category.slug],
    children: category.items.map((item) => ({
      label: item.label,
      href: toServicePath(category.slug, item.slug),
      children: item.children.map((subChild) => ({
        label: subChild.label,
        href: toServicePath(category.slug, item.slug, subChild.slug),
      })),
    })),
  }));

  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/services",
      mega: true,
      megaVariant: "services",
      children: servicesCategories,
    },
    {
      label: "Projects",
      href: PROJECTS_MAP_ROUTE,
      badge: { locked: !isProjectsMapUnlocked },
    },
    { label: "Blog", href: "/blog" },
    {
      label: "About Us",
      href: "/our-company",
      children: [
        { label: "Careers", href: "/careers" },
        { label: "Team", href: "/team" },
      ],
    },
    { label: "Contact Now", href: "/contact-us", cta: true },
  ];

  const openMenu = (label) => {
    window.clearTimeout(closeTimerRef.current);
    setOpenMega(label);
  };

  const closeMenu = () => {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setOpenMega(null), 140);
  };

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenSections({});
  };

  const scrollPageTop = () => {
    scrollToTop("smooth");
  };

  const resolveInternalPath = (href) => {
    if (!href || isDisabledHref(href) || isExternalLikeHref(href)) return null;

    try {
      return new URL(href, window.location.origin).pathname;
    } catch {
      return href;
    }
  };

  const handleInternalNav = (e, href, { closeDrawer = false } = {}) => {
    maybePreventNav(e, href);

    if (closeDrawer) {
      closeMobile();
    }

    setOpenMega(null);

    const targetPath = resolveInternalPath(href);
    if (!targetPath) return;

    if (targetPath === PROJECTS_MAP_ROUTE && !isProjectsMapUnlocked) {
      e?.preventDefault();
      openUnlockModal(() => navigate(PROJECTS_MAP_ROUTE));
      return;
    }

    if (targetPath === location.pathname) {
      e?.preventDefault();
      scrollPageTop();
    }
  };

  const onNavigate = (e, href) => {
    handleInternalNav(e, href, { closeDrawer: true });
  };

  // Close mega on outside click
  useEffect(() => {
    function onDocDown(e) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpenMega(null);
    }
    document.addEventListener("pointerdown", onDocDown);
    return () => document.removeEventListener("pointerdown", onDocDown);
  }, []);

  // ESC closes mobile + mega
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        closeMobile();
        setOpenMega(null);
        if (openMega) triggerRefs.current[openMega]?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMega]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // If resized to desktop while open, auto-close drawer
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => {
      if (e.matches) closeMobile();
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const openMegaItem = navItems.find(
    (item) => item.mega && item.label === openMega
  );

  return (
    <>
      {/* ✅ MOBILE DRAWER (Navbar hidden while this is open) */}
      {mobileOpen && (
        <>
          {/* overlay */}
          <button
            className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px] md:hidden"
            aria-label="Close menu"
            onClick={closeMobile}
          />

          {/* drawer */}
          <aside
            className="fixed inset-y-0 right-0 z-50 w-[88%] max-w-sm md:hidden bg-white shadow-2xl ring-1 ring-black/10"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* close button pinned to the side (inside drawer) */}
            <button
              onClick={closeMobile}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 hover:bg-slate-50 transition"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-[#0D354C]" />
            </button>

            <div className="flex h-full flex-col">
              {/* drawer header */}
              <div className="px-5 pt-5 pb-4 border-b border-slate-200">
                <Link to="/" onClick={(e) => onNavigate(e, "/")} className="inline-flex items-center gap-3">
                  <img
                    src={Logo}
                    alt="HMC Holding logo"
                    className="h-8 w-auto"
                    loading="lazy"
                  />
                </Link>
              </div>

              {/* drawer content */}
              <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-3">
                <div className="flex flex-col gap-1 text-[15px] font-semibold text-[#0D354C]">
                  {navItems
                    .filter((x) => !x.cta) // CTA will be in footer
                    .map((item) => (
                      <MobileTreeItem
                        key={item.label}
                        item={item}
                        path={item.label}
                        openSections={openSections}
                        toggleSection={toggleSection}
                        onNavigate={onNavigate}
                      />
                    ))}
                </div>
              </div>

              {/* footer CTA */}
              <div className="p-4 border-t border-slate-200">
                <Link
                  to="/contact-us"
                  onClick={(e) => onNavigate(e, "/contact-us")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#0D354C] px-5 py-3 text-sm font-bold text-white shadow-lg hover:opacity-95"
                >
                  Contact Now
                </Link>

                {/* optional: direct actions in mobile drawer */}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <QuickAction label="WhatsApp" Icon={MessageCircle} href="https://wa.me/971501711384" />
                  <QuickAction label="Email" Icon={Mail} href="mailto:info@hmc-holding.com" />
                  <QuickAction label="Call" Icon={Phone} href="tel:+971501711384" />
                </div>
              </div>
            </div>

            <style>{`
              .no-scrollbar{
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .no-scrollbar::-webkit-scrollbar{
                display: none;
              }
            `}</style>
          </aside>
        </>
      )}

      {/* ✅ TOP NAVBAR (hidden on mobile ONLY when drawer is open) */}
      <header
        className={`fixed top-3 sm:top-4 left-0 right-0 z-[60] ${
          mobileOpen ? "hidden md:block" : ""
        }`}
      >
        <div ref={wrapRef} className="mx-auto max-w-6xl px-4 relative">
          <div className="mx-auto flex items-center justify-between rounded-full bg-white px-4 sm:px-6 py-3 shadow-lg ring-1 ring-black/5 backdrop-blur">
            <Link
              to="/"
              onClick={(e) => handleInternalNav(e, "/")}
              className="flex items-center px-2 sm:px-3 py-1"
            >
              <img
                src={Logo}
                alt="HMC Holding logo"
                className="h-8 w-auto"
                loading="lazy"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 text-md font-bold text-[#0D354C]">
              {navItems.map((item) => {
                if (item.mega) {
                  const isOpen = openMega === item.label;
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => openMenu(item.label)}
                      onMouseLeave={closeMenu}
                      onFocusCapture={() => openMenu(item.label)}
                      onBlurCapture={(e) => {
                        const next = e.relatedTarget;
                        if (!wrapRef.current?.contains(next)) setOpenMega(null);
                      }}
                    >
                      <Link
                        ref={(el) => (triggerRefs.current[item.label] = el)}
                        to={item.href || DISABLED_HREF}
                        onClick={(e) => handleInternalNav(e, item.href)}
                        className="inline-flex items-center gap-1 text-[#0D354C] hover:text-[#D6B26F] transition"
                        aria-haspopup="menu"
                        aria-expanded={isOpen}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </Link>
                    </div>
                  );
                }

                if (item.children) {
                  return (
                    <NavDropdown
                      key={item.label}
                      item={item}
                      onLinkClick={handleInternalNav}
                    />
                  );
                }

                if (item.cta) {
                  return (
                    <ContactNowHover
                      key={item.label}
                      onLinkClick={handleInternalNav}
                    >
                      {item.label}
                    </ContactNowHover>
                  );
                }

                return (
                  <NavLink
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    badge={item.badge}
                    onLinkClick={handleInternalNav}
                  />
                );
              })}
            </nav>

            {/* Mobile toggle */}
            <button
              onClick={() => {
                setMobileOpen(true);
                setOpenMega(null);
              }}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 transition"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5 text-[#0D354C]" />
            </button>
          </div>

          {/* Desktop Mega Menu */}
          {openMegaItem && (
            <div
              onMouseEnter={() => openMenu(openMegaItem.label)}
              onMouseLeave={closeMenu}
              className={[
                "hidden md:block absolute left-0 right-0 top-full mt-3 transition-all duration-200",
                openMega
                  ? "pointer-events-auto opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 -translate-y-1",
              ].join(" ")}
              role="menu"
              aria-label={`${openMegaItem.label} menu`}
            >
              <div className="rounded-3xl bg-white/95 shadow-2xl ring-1 ring-black/10 overflow-hidden backdrop-blur">
                <ServicesMega
                  categories={servicesCategories}
                  onLinkClick={handleInternalNav}
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
function ContactNowHover({ children, onLinkClick }) {
  const phone = "+971501711384";
  const phoneDisplay = "+971 50 171 1384";
  const email = "info@hmc-holding.com";

  const popoverItems = [
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      detail: phoneDisplay,
      href: `https://wa.me/${phone.replace(/\D/g, "")}`,
      accent: true,
    },
    {
      Icon: Mail,
      label: "Email Us",
      detail: email,
      href: `mailto:${email}`,
    },
    {
      Icon: Phone,
      label: "Call Now",
      detail: phoneDisplay,
      href: `tel:${phone}`,
    },
  ];

  return (
    <div className="relative group">
      <Link
        to="/contact-us"
        onClick={(e) => onLinkClick?.(e, "/contact-us")}
        className="inline-flex items-center rounded-full bg-[#0D354C] px-4 py-2 text-sm font-bold text-white hover:opacity-95 transition"
      >
        {children}
      </Link>

      {/* Popover with hover-bridge */}
      <div
        className={[
          "absolute left-1/2 top-full -translate-x-1/2 pt-3 z-[80]",
          "opacity-0 pointer-events-none translate-y-1",
          "transition-all duration-200",
          "group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0",
          "group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0",
        ].join(" ")}
      >
        <div className="w-64 rounded-2xl bg-white shadow-2xl ring-1 ring-[#0D354C]/10 overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D6B26F]">
              Get in touch
            </p>
          </div>
          <div className="px-2 pb-2 flex flex-col gap-0.5">
            {popoverItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[#D6B26F]/10"
              >
                <span
                  className={[
                    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition",
                    item.accent
                      ? "bg-[#25D366]/10 ring-1 ring-[#25D366]/25 group-hover/item:bg-[#25D366]/15"
                      : "bg-[#0D354C]/8 ring-1 ring-[#0D354C]/12 group-hover/item:bg-[#0D354C]/12",
                  ].join(" ")}
                >
                  <item.Icon
                    className={[
                      "h-4 w-4 transition",
                      item.accent ? "text-[#25D366]" : "text-[#0D354C]",
                    ].join(" ")}
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-bold text-[#0D354C] leading-tight">
                    {item.label}
                  </span>
                  <span className="block truncate text-[11px] text-slate-500 leading-tight mt-0.5">
                    {item.detail}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ Icon, label, href }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center justify-center rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-[#0D354C] ring-1 ring-black/5 hover:bg-slate-100 transition"
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

function NavLink({ label, href, onLinkClick, badge }) {
  return (
    <Link
      to={href || DISABLED_HREF}
      onClick={(e) => onLinkClick?.(e, href)}
      className="inline-flex items-center gap-2 text-[#0D354C] hover:text-[#D6B26F] transition"
    >
      {label}
      {badge ? <ProjectsMapBadge locked={badge.locked} /> : null}
    </Link>
  );
}

function ServicesMega({ categories = [], onLinkClick }) {
  const [active, setActive] = useState(categories?.[0]?.label || null);

  useEffect(() => {
    if (!active && categories.length) {
      setActive(categories[0].label);
    }
  }, [active, categories]);

  const activeCategory = categories.find((c) => c.label === active);

  const distributeItems = (items = [], columnCount = 2) => {
    const columns = Array.from({ length: columnCount }, () => ({
      items: [],
      weight: 0,
    }));

    items.forEach((entry) => {
      const childCount = Array.isArray(entry.children) ? entry.children.length : 0;

      // Weight helps balance blocks that contain 3rd-level links
      const weight = 1 + childCount * 0.65;

      const lightestColumn = columns.reduce((min, col, index, arr) =>
        col.weight < arr[min].weight ? index : min,
      0);

      columns[lightestColumn].items.push(entry);
      columns[lightestColumn].weight += weight;
    });

    return columns.map((col) => col.items);
  };

  const columns = distributeItems(activeCategory?.children || [], 2);

  return (
    <div className="grid grid-cols-[260px_1fr] min-h-[440px]">
      {/* LEFT SIDE */}
      <div className="border-r border-slate-200 bg-slate-50/70 p-5">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D6B26F]">
          Services
        </p>

        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = active === cat.label;

            return (
              <Link
                key={cat.label}
                to={cat.href || DISABLED_HREF}
                onClick={(e) => onLinkClick?.(e, cat.href)}
                onMouseEnter={() => setActive(cat.label)}
                onFocus={() => setActive(cat.label)}
                className={[
                  "group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-all duration-200",
                  isActive
                    ? "bg-white text-[#0D354C] shadow-sm ring-1 ring-black/5"
                    : "text-slate-600 hover:bg-white/80 hover:text-[#0D354C]",
                ].join(" ")}
              >
                {Icon && (
                  <span
                    className={[
                      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition",
                      isActive
                        ? "bg-[#0D354C]/10 text-[#0D354C]"
                        : "bg-[#0D354C]/6 text-[#0D354C] group-hover:bg-[#0D354C]/8",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                )}

                <span className="text-sm font-semibold leading-snug">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="p-8">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[28px] font-bold leading-tight text-[#0D354C]">
              {activeCategory?.label}
            </h3>
          </div>

          <Link
            to={activeCategory?.href || DISABLED_HREF}
            onClick={(e) => onLinkClick?.(e, activeCategory?.href)}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-[#0D354C] transition hover:bg-slate-50 hover:text-[#D6B26F]"
          >
            Open Category
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-10">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="space-y-4">
              {column.map((child) => {
                const hasGrandKids =
                  Array.isArray(child.children) && child.children.length > 0;

                return (
                  <div
                    key={child.label}
                    className="rounded-2xl border border-slate-100 bg-white/80 p-4 transition hover:border-[#D6B26F]/30 hover:bg-white hover:shadow-sm"
                  >
                    <Link
                      to={child.href || DISABLED_HREF}
                      onClick={(e) => onLinkClick?.(e, child.href)}
                      className="block text-[17px] font-semibold leading-snug text-[#0D354C] transition hover:text-[#D6B26F]"
                    >
                      {child.label}
                    </Link>

                    {hasGrandKids && (
                      <ul className="mt-3 space-y-2 border-l border-slate-200 pl-3.5">
                        {child.children.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              to={sub.href || DISABLED_HREF}
                              onClick={(e) => onLinkClick?.(e, sub.href)}
                              className="group inline-flex items-start gap-2 text-sm leading-snug text-slate-600 transition hover:text-[#D6B26F]"
                            >
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B26F]" />
                              <span>{sub.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Desktop mega-menu tree (same logic as yours) */
function DesktopMegaTree({ items, depth = 0 }) {
  return (
    <div className={depth === 0 ? "" : "py-2"}>
      {items.map((node) => {
        const hasKids = Array.isArray(node.children) && node.children.length > 0;

        if (!hasKids) {
          return (
            <Link
              key={node.label}
              to={node.href || DISABLED_HREF}
              onClick={(e) => maybePreventNav(e, node.href)}
              className={[
                "flex items-center justify-between py-5 text-base font-semibold text-[#0D354C] hover:text-[#D6B26F] transition",
                depth > 0
                  ? "px-4 py-2 text-sm hover:bg-[#D6B26F]/15 hover:text-[#0D354C]"
                  : "",
              ].join(" ")}
              role="menuitem"
            >
              {node.label}
              {depth === 0 && (
                <span className="text-xl" aria-hidden="true">
                  →
                </span>
              )}
            </Link>
          );
        }

        return (
          <div
            key={node.label}
            className={["relative group", depth === 0 ? "py-5" : "px-2"].join(" ")}
          >
            <Link
              to={node.href || DISABLED_HREF}
              onClick={(e) => maybePreventNav(e, node.href)}
              className={[
                "flex items-center justify-between font-semibold text-[#0D354C] hover:text-[#D6B26F] transition",
                depth === 0
                  ? "text-base"
                  : "text-sm px-2 py-2 rounded-lg hover:bg-[#D6B26F]/15 hover:text-[#0D354C]",
              ].join(" ")}
              role="menuitem"
            >
              <span>{node.label}</span>
              <ChevronRight className="h-4 w-4 opacity-70" aria-hidden="true" />
            </Link>

            <div
              className={[
                "absolute left-full top-0 ml-4 w-64 rounded-2xl bg-white shadow-xl ring-1 ring-[#0D354C]/10",
                "opacity-0 invisible translate-x-1 transition-all duration-150",
                "group-hover:opacity-100 group-hover:visible group-hover:translate-x-0",
                "group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-x-0",
              ].join(" ")}
            >
              <DesktopMegaTree items={node.children} depth={depth + 1} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Mobile accordion item */
function MobileTreeItem({ item, path, openSections, toggleSection, onNavigate, depth = 0 }) {
  const hasKids = Array.isArray(item.children) && item.children.length > 0;
  const open = !!openSections[path];
  const Icon = item.icon;

  if (!hasKids) {
    return (
      <Link
        to={item.href || DISABLED_HREF}
        onClick={(e) => onNavigate(e, item.href)}
        className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-[#D6B26F]/12 transition"
      >
        <span className="flex items-center gap-2 text-sm leading-tight">
          {depth > 0 && <span className="h-1.5 w-1.5 rounded-full bg-[#D6B26F]" aria-hidden="true" />}
          {item.label}
        </span>
        <span className="opacity-60">→</span>
      </Link>
    );
  }

  return (
    <div className="rounded-xl">
      <div className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-[#D6B26F]/12 transition">
        <Link
          to={item.href || DISABLED_HREF}
          onClick={(e) => onNavigate(e, item.href)}
          className="flex-1 inline-flex items-center gap-3"
        >
          {Icon && depth === 0 && (
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D354C]/8 text-[#0D354C] ring-1 ring-[#0D354C]/12">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
          )}
          <span className="text-left leading-tight">{item.label}</span>
        </Link>

        <button
          type="button"
          className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 transition"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSection(path);
          }}
          aria-expanded={open}
          aria-label={`Toggle ${item.label}`}
        >
          <ChevronDown
            className={`h-5 w-5 text-[#0D354C] transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={[
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="ml-5 mt-1 space-y-1 border-l border-[#0D354C]/12 pl-3 pb-2">
            {item.children.map((child) => (
              <MobileTreeItem
                key={`${path}-${child.label}`}
                item={child}
                path={`${path} > ${child.label}`}
                openSections={openSections}
                toggleSection={toggleSection}
                onNavigate={onNavigate}
                depth={depth + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Desktop dropdown (About Us) */
function NavDropdown({ item, onLinkClick }) {
  return (
    <div className="relative group">
      <Link
        to={item.href || DISABLED_HREF}
        onClick={(e) => onLinkClick?.(e, item.href)}
        className="inline-flex items-center gap-1 text-[#0D354C] hover:text-[#D6B26F] transition"
      >
        {item.label}
        <span
          className="text-[10px] transition-transform duration-200 group-hover:rotate-180"
          aria-hidden="true"
        >
          ▾
        </span>
      </Link>
      <div className="absolute left-0 top-full mt-3 w-60 rounded-2xl bg-white shadow-xl ring-1 ring-[#0D354C]/10 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
        <div className="py-2">
          {item.children.map((child) => (
            <Link
              key={child.label}
              to={child.href || DISABLED_HREF}
              onClick={(e) => onLinkClick?.(e, child.href)}
              className="block px-4 py-2 text-sm text-[#0D354C] hover:bg-[#D6B26F]/15 hover:text-[#0D354C]"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
