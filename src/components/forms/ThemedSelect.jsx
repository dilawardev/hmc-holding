import React, { useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";

function normalizeOption(option) {
  if (typeof option === "string") {
    return { label: option, value: option };
  }

  return {
    label: option.label,
    value: option.value,
  };
}

export default function ThemedSelect({
  label,
  name,
  value,
  options,
  placeholder = "Select an option",
  required = false,
  onChange,
  icon: Icon = Globe2,
  textSize = "text-sm",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const normalizedOptions = options.map(normalizeOption);
  const selectedOption = normalizedOptions.find((option) => option.value === value);
  const displayValue = selectedOption?.label || placeholder;

  function handleSelect(optionValue) {
    onChange?.(optionValue);
    setIsOpen(false);
  }

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      {label ? (
        <span className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
          {React.createElement(Icon, { className: "h-4 w-4 text-[#D6B26F]" })}
          {label}
        </span>
      ) : null}

      {name ? <input type="hidden" name={name} value={value || ""} /> : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={[
          "flex w-full items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3.5 text-left font-semibold text-[#0D354C] outline-none transition",
          textSize,
          isOpen
            ? "border-[#D6B26F] ring-2 ring-[#D6B26F]/20"
            : "border-[#0D354C]/10 hover:border-[#D6B26F]/60",
          !selectedOption ? "text-slate-400" : "",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-required={required}
      >
        <span className="truncate">{displayValue}</span>
        <ChevronDown
          className={[
            "h-4 w-4 shrink-0 text-[#D6B26F] transition-transform",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {isOpen ? (
        <div
          className="absolute left-0 right-0 top-full z-40 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-[#0D354C]/10 bg-white shadow-[0_22px_48px_-28px_rgba(13,53,76,0.55)]"
          role="listbox"
        >
          {normalizedOptions.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={[
                  "flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-semibold transition",
                  textSize,
                  selected
                    ? "bg-[#0D354C] text-white"
                    : "bg-white text-[#0D354C] hover:bg-[#D6B26F]/12",
                ].join(" ")}
                role="option"
                aria-selected={selected}
              >
                <span>{option.label}</span>
                {selected ? <Check className="h-4 w-4 shrink-0 text-[#D6B26F]" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
