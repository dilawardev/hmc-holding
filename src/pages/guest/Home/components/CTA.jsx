import React from "react";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

function CTA({
  title = "Ready to partner?",
  subtitle = "Talk with our advisors about your next move.",
  emailLabel = "Email Us",
  emailAddress = "info@hmc-holding.com",
  whatsappLabel = "Chat on WhatsApp",
  whatsappNumber = "+971 501711384",
}) {
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;

  return (
    <section className="relative overflow-hidden bg-[#0D354C] text-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[#D6B26F]/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.8)] backdrop-blur md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-10">
          {/* Copy */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/90">
              <span className="h-2 w-2 rounded-full bg-[#D6B26F]" />
              Let’s plan your next move
            </p>

            <h3 className="mt-4 text-2xl font-semibold leading-tight md:text-3xl">
              {title}
            </h3>

            <p className="mt-2 max-w-xl text-white/80">
              {subtitle}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end md:flex-col md:items-end">
            <a
              href={`mailto:${emailAddress}`}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D6B26F] px-5 py-3 font-semibold text-[#0D354C] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D354C] sm:w-auto"
            >
              <Mail className="h-4 w-4" />
              {emailLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D354C] sm:w-auto"
            >
              <MessageCircle className="h-4 w-4 opacity-90" />
              {whatsappLabel}
            </a>

            <p className="text-xs text-white/60 md:text-right">
              Typical response time: within 1 business day
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
