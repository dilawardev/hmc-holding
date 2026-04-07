import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarDays,
  ArrowUpRight,
  Search,
  Clock3,
  Tag,
  X,
} from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import posts from "./data/posts";

gsap.registerPlugin(ScrollTrigger);

function safeDateValue(dateStr) {
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}

function PostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      data-anim="post-card"
      className="group relative block rounded-3xl bg-white ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)] transition
                 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(13,53,76,0.16)] hover:ring-[#D6B26F]/35
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B26F]"
      aria-label={`Read article: ${post.title}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <div className="overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.04] group-hover:brightness-105"
            loading="lazy"
          />
        </div>

        {/* Soft gradient for readability */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0D354C]/35 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#0D354C] ring-1 ring-[#0D354C]/10 backdrop-blur-sm">
          <Tag className="h-3.5 w-3.5 text-[#D6B26F]" />
          {post.category}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-7">
        <h3 className="text-xl sm:text-[22px] font-black tracking-tight text-[#0D354C] leading-snug">
          {post.title}
        </h3>

        <p className="mt-3 text-sm sm:text-[15px] text-slate-700 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
            <CalendarDays className="h-4 w-4 text-[#D6B26F]" />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
            <Clock3 className="h-4 w-4 text-[#D6B26F]" />
            {post.readTime}
          </span>
        </div>

        {/* Read CTA */}
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#0D354C] transition group-hover:text-[#D6B26F]">
          <span className="border-b-2 border-transparent group-hover:border-[#D6B26F] transition-colors">
            Read article
          </span>
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}

export default function Blog() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const contentRef = useRef(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)));
    return ["All", ...unique];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return [...posts]
      .sort((a, b) => safeDateValue(b.date) - safeDateValue(a.date))
      .filter((p) => (activeCategory === "All" ? true : p.category === activeCategory))
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      });
  }, [query, activeCategory]);

  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Helper: animate elements in when scrolled into view
      const animateIn = (trigger, targets, { stagger = 0, y = 30, duration = 0.7 } = {}) => {
        const els = gsap.utils.toArray(targets);
        if (!els.length) return;

        gsap.set(els, { autoAlpha: 0, y });

        ScrollTrigger.create({
          trigger: typeof trigger === "string" ? document.querySelector(trigger) : trigger,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(els, {
              autoAlpha: 1,
              y: 0,
              duration,
              stagger,
              ease: "power2.out",
            });
          },
        });
      };

      animateIn("[data-anim='post-grid']", "[data-anim='post-card']", { stagger: 0.1 });
      animateIn("[data-anim='newsletter']", "[data-anim='newsletter']", { y: 40, duration: 0.8 });
    }, contentRef);

    return () => ctx.revert();
  }, [filtered]);

  return (
    <>
      {/* Navy Hero Banner */}
      <section className="relative overflow-hidden bg-[#0D354C] pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[#D6B26F]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 space-y-5">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/blog" },
            ]}
            showHomeIcon
          />

          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
              Insights & Updates
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Thinking ahead of the market
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Brief, practical takes on advisory, real estate, governance, and mobility—built
              from the work we do every day with clients.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[50%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-10 sm:pt-14 space-y-10">
          {/* Controls */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search insights…"
                aria-label="Search insights"
                className="w-full rounded-full bg-white px-11 py-3 text-sm text-slate-700
                           ring-1 ring-[#0D354C]/10 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-[#D6B26F] transition"
              />
              {query?.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-500 hover:bg-slate-100 transition"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = cat === activeCategory;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={[
                      "rounded-full px-4 py-2 text-xs font-extrabold transition ring-1",
                      active
                        ? "bg-[#0D354C] text-white ring-[#0D354C] shadow"
                        : "bg-white text-[#0D354C] ring-[#0D354C]/10 hover:ring-[#D6B26F]/40 hover:-translate-y-0.5",
                    ].join(" ")}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* List */}
          <div data-anim="post-grid" className="grid gap-7 sm:grid-cols-2">
            {filtered.map((post) => (
              <PostCard key={post.title} post={post} />
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-10 ring-1 ring-[#0D354C]/10 text-center">
              <p className="text-sm font-semibold text-slate-600">
                No posts match your search. Try a different keyword or category.
              </p>
            </div>
          )}

          {/* Newsletter CTA -- navy block */}
          <div data-anim="newsletter" className="relative rounded-3xl bg-[#0D354C] p-8 sm:p-10 shadow-2xl overflow-hidden">
            {/* Decorative orbs */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D6B26F]/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                  Newsletter
                </div>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Stay ahead with HMC
                </h2>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  Get occasional briefs on market moves, capital strategy, and mobility from the team.
                </p>
              </div>

              <a
                href="mailto:info@hmc-holding.com?subject=Newsletter%20Signup"
                className="inline-flex items-center justify-center rounded-full bg-[#D6B26F] px-6 py-3 text-sm font-black text-[#0D354C]
                           shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                Join the list
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
