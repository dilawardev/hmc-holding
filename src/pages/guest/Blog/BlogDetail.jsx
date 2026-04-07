import React, { useLayoutEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarDays,
  Clock3,
  Tag,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import posts from "./data/posts";
import { scrollToTop } from "@/utils/scrolling";

gsap.registerPlugin(ScrollTrigger);

function RelatedCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      data-anim="related-card"
      className="group block rounded-2xl bg-white ring-1 ring-[#0D354C]/10 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition
                 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(13,53,76,0.18)] hover:ring-[#D6B26F]/35 overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0D354C]/30 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold text-[#D6B26F]">{post.category}</p>
        <h4 className="mt-1.5 text-base font-bold text-[#0D354C] leading-snug line-clamp-2">
          {post.title}
        </h4>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#0D354C] transition group-hover:text-[#D6B26F]">
          Read article
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const contentRef = useRef(null);

  const post = posts.find((p) => p.slug === slug);

  useLayoutEffect(() => {
    // Scroll to top on post change
    scrollToTop("auto");
  }, [slug]);

  useLayoutEffect(() => {
    if (!post) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
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

      animateIn("[data-anim='related-grid']", "[data-anim='related-card']", { stagger: 0.1 });
    }, contentRef);

    return () => ctx.revert();
  }, [post]);

  // 404 for unknown slugs
  if (!post) {
    return (
      <>
        <section className="relative overflow-hidden bg-[#0D354C] pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[#D6B26F]/20 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Article not found
            </h1>
            <p className="text-white/80">The article you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-[#D6B26F] text-[#0D354C] px-6 py-3 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Insights
            </Link>
          </div>
        </section>
      </>
    );
  }

  const relatedPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

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
              { label: post.title },
            ]}
            showHomeIcon
            maxItems={4}
          />
          <div className="max-w-3xl space-y-4">
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-[#D6B26F]">
                <Tag className="h-3.5 w-3.5" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                <CalendarDays className="h-3.5 w-3.5 text-[#D6B26F]" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                <Clock3 className="h-3.5 w-3.5 text-[#D6B26F]" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {post.title}
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="relative bg-white pb-16 sm:pb-20">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-184 -translate-x-1/2 rounded-full bg-[#D6B26F]/10 blur-3xl" />
          <div className="absolute top-[60%] -right-40 h-72 w-72 rounded-full bg-[#0D354C]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-10 sm:pt-14">
          {/* Featured Image */}
          <div className="overflow-hidden rounded-3xl ring-1 ring-[#0D354C]/10 shadow-[0_14px_50px_rgba(13,53,76,0.10)]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
          </div>

          {/* Article Body */}
          <article className="mx-auto max-w-3xl mt-10 sm:mt-14 space-y-5">
            {post.body.map((paragraph, idx) => (
              <p
                key={idx}
                className={[
                  "text-[15px] sm:text-base leading-relaxed",
                  idx === 0
                    ? "text-lg sm:text-xl font-semibold text-[#0D354C] leading-relaxed"
                    : "text-slate-600",
                ].join(" ")}
              >
                {paragraph}
              </p>
            ))}
          </article>

          {/* Back link */}
          <div className="mx-auto max-w-3xl mt-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-[#0D354C] text-white px-5 py-2.5 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Insights
            </Link>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 sm:mt-20 space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
                  Keep Reading
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#0D354C]">
                  Related Articles
                </h2>
              </div>
              <div data-anim="related-grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <RelatedCard key={rp.slug} post={rp} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
