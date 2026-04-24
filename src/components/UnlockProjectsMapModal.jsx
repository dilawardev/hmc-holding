import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, LockKeyhole, X } from "lucide-react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const phoneRegex = /^[+]?[\d\s\-().]{7,}$/;
const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function UnlockProjectsMapModal({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    previousActiveElementRef.current = document.activeElement;
    setForm({
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
    });
    setErrors({});
    setSubmitError("");
    setSubmitting(false);

    const timer = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 60);

    return () => window.clearTimeout(timer);
  }, [initialData, open]);

  useEffect(() => {
    if (open) return undefined;

    const previous = previousActiveElementRef.current;
    if (previous && typeof previous.focus === "function") {
      previous.focus();
    }

    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements =
        dialogRef.current.querySelectorAll(focusableSelector);

      if (!focusableElements.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const isValid =
    form.name.trim().length > 1 &&
    phoneRegex.test(form.phone.trim()) &&
    emailRegex.test(form.email.trim());

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
    setSubmitError("");

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      const trimmedValue = value.trim();

      if (name === "name" && trimmedValue) {
        delete nextErrors.name;
      }

      if (name === "phone" && phoneRegex.test(trimmedValue)) {
        delete nextErrors.phone;
      }

      if (name === "email" && emailRegex.test(trimmedValue)) {
        delete nextErrors.email;
      }

      return nextErrors;
    });
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      await onSubmit?.({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your map access request right now. Please try again shortly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#061722]/70 px-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="unlock-projects-map-title"
        className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/12 bg-[#0B2434] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_52%)]" />
        <div className="pointer-events-none absolute -right-16 top-8 h-48 w-48 rounded-full bg-[#D6B26F]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D6B26F]/30 bg-[#D6B26F]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5E6BF]">
                <LockKeyhole className="h-3.5 w-3.5" />
                Secure access
              </span>
              <div>
                <h2
                  id="unlock-projects-map-title"
                  className="text-2xl font-black tracking-tight text-white sm:text-3xl"
                >
                  Unlock the HMC live projects map
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/[0.72]">
                  Share your details to view live Dubai project availability,
                  pricing, and developer inventory.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onClose?.()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              aria-label="Close map unlock form"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-white/[0.86]"
                htmlFor="projectsMapName"
              >
                Full name
              </label>
              <input
                ref={firstFieldRef}
                id="projectsMapName"
                name="name"
                type="text"
                placeholder="Ayesha Rahman"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#D6B26F]/45 focus:ring-2 focus:ring-[#D6B26F]/20"
              />
              {errors.name ? (
                <p className="text-sm text-rose-300">{errors.name}</p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-white/[0.86]"
                  htmlFor="projectsMapPhone"
                >
                  Phone number
                </label>
                <input
                  id="projectsMapPhone"
                  name="phone"
                  type="tel"
                  placeholder="+971 5x xxx xxxx"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#D6B26F]/45 focus:ring-2 focus:ring-[#D6B26F]/20"
                />
                {errors.phone ? (
                  <p className="text-sm text-rose-300">{errors.phone}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-white/[0.86]"
                  htmlFor="projectsMapEmail"
                >
                  Email
                </label>
                <input
                  id="projectsMapEmail"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#D6B26F]/45 focus:ring-2 focus:ring-[#D6B26F]/20"
                />
                {errors.email ? (
                  <p className="text-sm text-rose-300">{errors.email}</p>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || submitting}
              className={[
                "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold",
                "transition duration-200",
                submitting || !isValid
                  ? "cursor-not-allowed bg-[#D6B26F]/70 text-[#0D354C]/70"
                  : "bg-[#D6B26F] text-[#0D354C] hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(214,178,111,0.24)]",
              ].join(" ")}
            >
              {submitting ? "Submitting..." : "Unlock Projects Map"}
              <ArrowRight className="h-4 w-4" />
            </button>

            {submitError ? (
              <p className="text-sm text-rose-300">{submitError}</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
