import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import {
  BriefcaseBusiness,
  Check,
  ChevronDown,
  FileCheck2,
  Mail,
  Phone,
} from "lucide-react";
import { getServiceInquiryOptions } from "@/pages/guest/Services/data/servicesCatalog";
import { submitServiceInquiry } from "@/utils/inquiryApi";



function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function summarizeSelection(selectedValues, optionsByValue) {
  const labels = selectedValues
    .map((value) => optionsByValue.get(value)?.label)
    .filter(Boolean);

  if (!labels.length) return "Select services";
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return labels.join(", ");

  return `${labels.slice(0, 2).join(", ")} +${labels.length - 2} more`;
}

function Field({ label, name, placeholder, type = "text", required = false }) {
  const Icon = type === "email" ? Mail : type === "tel" ? Phone : FileCheck2;

  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        <Icon className="h-4 w-4 text-[#D6B26F]" />
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#0D354C]/10 bg-white px-4 py-3.5 text-sm text-[#0D354C] outline-none transition placeholder:text-slate-400 focus:border-[#D6B26F] focus:ring-2 focus:ring-[#D6B26F]/20"
      />
    </label>
  );
}


function MultiSelectField({
  label,
  options,
  selectedValues,
  onToggleValue,
  isOpen,
  onToggleOpen,
  onClose,
}) {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState(null);
  const groupedOptions = useMemo(() => {
    const groups = [];
    const groupMap = new Map();

    options.forEach((option) => {
      if (!groupMap.has(option.categoryLabel)) {
        const nextGroup = { label: option.categoryLabel, items: [] };
        groupMap.set(option.categoryLabel, nextGroup);
        groups.push(nextGroup);
      }

      groupMap.get(option.categoryLabel).items.push(option);
    });

    return groups;
  }, [options]);

  const optionsByValue = useMemo(
    () => new Map(options.map((option) => [option.value, option])),
    [options],
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    function handlePointerDown(event) {
      const target = event.target;

      if (containerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;

      onClose();
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return undefined;

    function updateMenuPosition() {
      if (!triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const viewportPadding = 16;
      const gap = 8;
      const spaceBelow =
        window.innerHeight - rect.bottom - gap - viewportPadding;
      const spaceAbove = rect.top - gap - viewportPadding;
      const placeBelow = spaceBelow >= 220 || spaceBelow >= spaceAbove;
      const width = Math.min(rect.width, window.innerWidth - viewportPadding * 2);
      const left = Math.min(
        Math.max(viewportPadding, rect.left),
        window.innerWidth - viewportPadding - width,
      );
      const maxHeight = Math.max(
        120,
        placeBelow ? spaceBelow : spaceAbove,
      );

      setMenuStyle({
        left,
        width,
        maxHeight,
        ...(placeBelow
          ? { top: rect.bottom + gap }
          : { bottom: window.innerHeight - rect.top + gap }),
      });
    }

    updateMenuPosition();

    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isOpen]);

  const dropdown =
    isOpen && menuStyle && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={menuRef}
            className="fixed z-[160] overflow-hidden rounded-2xl border border-[#0D354C]/10 bg-white shadow-[0_22px_52px_-30px_rgba(13,53,76,0.32)]"
            style={menuStyle}
            data-lenis-prevent
            data-lenis-prevent-wheel
          >
            <div
              className="overflow-y-auto overscroll-contain p-2"
              style={{ maxHeight: menuStyle.maxHeight }}
              data-lenis-prevent
              data-lenis-prevent-wheel
              onWheel={(event) => event.stopPropagation()}
              onTouchMove={(event) => event.stopPropagation()}
            >
              {groupedOptions.map((group) => (
                <div key={group.label} className="pb-2 last:pb-0">
                  <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((option) => {
                      const isSelected = selectedValues.includes(option.value);

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => onToggleValue(option.value)}
                          className={cx(
                            "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition",
                            isSelected
                              ? "bg-[#0D354C]/6"
                              : "hover:bg-[#0D354C]/4",
                          )}
                        >
                          <span
                            className={cx(
                              "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-white",
                              isSelected
                                ? "border-[#0D354C] bg-[#0D354C]"
                                : "border-[#0D354C]/18 bg-white",
                            )}
                          >
                            {isSelected ? <Check className="h-3.5 w-3.5" /> : null}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-[#0D354C]">
                              {option.label}
                            </span>
                            <span className="block text-xs text-slate-500">
                              {option.categoryLabel}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div ref={containerRef} className="relative">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        <BriefcaseBusiness className="h-4 w-4 text-[#D6B26F]" />
        {label}
      </span>

      <button
        ref={triggerRef}
        type="button"
        onClick={onToggleOpen}
        className={cx(
          "flex w-full items-center justify-between gap-3 rounded-2xl border border-[#0D354C]/10 bg-white px-4 py-3.5 text-left text-sm text-[#0D354C] outline-none transition",
          isOpen ? "border-[#D6B26F] ring-2 ring-[#D6B26F]/20" : "",
        )}
        aria-expanded={isOpen}
        >
        <span className="min-w-0 truncate">
          {summarizeSelection(selectedValues, optionsByValue)}
        </span>
        <ChevronDown
          className={cx(
            "h-4 w-4 shrink-0 text-[#0D354C]/60 transition-transform",
            isOpen ? "rotate-180" : "",
          )}
        />
      </button>

      {dropdown}
    </div>
  );
}

export function ServiceInquiryCard({
  id = "consultation-form",
  eyebrow = "Free Consultation",
  title = "Book a Free Consultation",
  intro = "Tell us a little about your situation and we'll help you understand the next sensible step.",
  submitLabel = "Talk to an Expert",
  className = "",
}) {
  const location = useLocation();
  const serviceOptions = useMemo(() => getServiceInquiryOptions(), []);
  const defaultSelectedServices = useMemo(
    () =>
      serviceOptions.some((option) => option.value === location.pathname)
        ? [location.pathname]
        : [],
    [location.pathname, serviceOptions],
  );
  const optionsByValue = useMemo(
    () => new Map(serviceOptions.map((option) => [option.value, option])),
    [serviceOptions],
  );
  const formRef = useRef(null);
  const [selectedServices, setSelectedServices] = useState(defaultSelectedServices);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });
  const isSubmitting = submitState.status === "loading";

  useEffect(() => {
    setSelectedServices((previous) => {
      if (
        previous.length === defaultSelectedServices.length &&
        previous.every((value, index) => value === defaultSelectedServices[index])
      ) {
        return previous;
      }

      return defaultSelectedServices;
    });
  }, [defaultSelectedServices]);

  function toggleService(value) {
    setSelectedServices((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value],
    );

    if (submitState.status !== "idle") {
      setSubmitState({ status: "idle", message: "" });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const serviceLabels = selectedServices
      .map((value) => optionsByValue.get(value)?.label)
      .filter(Boolean);

    if (!serviceLabels.length) {
      setSubmitState({
        status: "error",
        message: "Please choose at least one service before sending.",
      });
      return;
    }

    setSubmitState({ status: "loading", message: "" });

    try {
      const response = await submitServiceInquiry({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        services: serviceLabels,
        servicePaths: selectedServices,
        pageUrl:
          typeof window !== "undefined"
            ? window.location.href
            : location.pathname,
        pagePath: location.pathname,
      });

      formRef.current?.reset();
      setSelectedServices(defaultSelectedServices);
      setIsServicesOpen(false);
      setSubmitState({
        status: "success",
        message:
          response.message ||
          "Your inquiry has been sent. We'll get back to you shortly.",
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your inquiry right now. Please try again shortly.",
      });
    }
  }

  return (
    <aside
      id={id}
      className={cx(
        "rounded-[30px] border border-[#0D354C]/10 bg-[#F8FAFC] p-5 shadow-[0_28px_70px_-44px_rgba(13,53,76,0.45)] sm:p-6",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0D354C]">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{intro}</p>

      <form ref={formRef} className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <fieldset className={cx("space-y-4", isSubmitting ? "opacity-80" : "")} disabled={isSubmitting}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="First name"
              name="firstName"
              placeholder="First name"
              required
            />
            <Field
              label="Last name"
              name="lastName"
              placeholder="Last name"
              required
            />
          </div>
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
          />
          <Field
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+971 50 000 0000"
          />

          <MultiSelectField
            label="Services"
            options={serviceOptions}
            selectedValues={selectedServices}
            onToggleValue={toggleService}
            isOpen={isServicesOpen}
            onToggleOpen={() => setIsServicesOpen((previous) => !previous)}
            onClose={() => setIsServicesOpen(false)}
          />

          <button
            type="submit"
            className={cx(
              "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-white transition",
              isSubmitting
                ? "cursor-not-allowed bg-emerald-400"
                : "hover:-translate-y-0.5 hover:bg-emerald-600",
            )}
          >
            {isSubmitting ? "Sending..." : submitLabel}
          </button>
        </fieldset>

        {submitState.message ? (
          <p
            className={cx(
              "text-sm leading-relaxed",
              submitState.status === "success"
                ? "text-emerald-600"
                : "text-rose-600",
            )}
          >
            {submitState.message}
          </p>
        ) : null}
      </form>
    </aside>
  );
}

export default ServiceInquiryCard;
