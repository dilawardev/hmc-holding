import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";

function Footer() {
  const quickLinks1 = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/our-company" },
    { label: "Contact Us", to: "/contact-us" },
    { label: "Blog", to: "/blog" },
  ];

  const quickLinks2 = [
    { label: "Contact", to: "/contact-us" },
    { label: "Projects", to: "/projects" }, // change if your route differs
    { label: "Properties", to: "/properties" }, // change if your route differs
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0D354C] text-white">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#D6B26F]/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-14">
        {/* Top */}
        <div className="grid gap-10 pb-10 md:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              HMC Holding
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
              HMC stands where your story begins, and dreams find an address —
              turning visions into lasting homes.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#D6B26F]" />
              Dubai, UAE
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-semibold text-white">Quick Links</p>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {quickLinks1.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-2 hover:text-white transition"
                  >
                    {l.label}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links (2) */}
          <div>
            <p className="text-sm font-semibold text-white">Quick Links</p>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {quickLinks2.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-2 hover:text-white transition"
                  >
                    {l.label}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-sm font-semibold text-white">Contact Info</p>

            <div className="mt-4 space-y-4 text-sm text-white/80">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-[#D6B26F]" />
                <p>
                  Office 24 - Golden Mile 2 - Palm Jumeirah Dubai, UAE
                </p>
              </div>

              <a
                href="mailto:info@hmc-holding.com"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <Mail className="h-4 w-4 flex-none text-[#D6B26F]" />
                info@hmc-holding.com
              </a>

              <a
                href="tel:+971501711384"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <Phone className="h-4 w-4 flex-none text-[#D6B26F]" />
                +971 501711384
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col gap-3 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
            <p>© 2025 Copyright By HMC. All rights reserved</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
