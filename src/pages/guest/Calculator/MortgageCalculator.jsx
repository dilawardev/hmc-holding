import React, { useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Globe2,
  House,
  Landmark,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import {
  ActionBanner,
  CalloutPanel,
  Checklist,
  InfoCard,
  MediaFrame,
  PageSection,
  SectionHeading,
  ServicePageShell,
} from "@/pages/guest/Services/components/service-pages/ServicePagePrimitives";
import ThemedSelect from "@/components/forms/ThemedSelect";
import mortgageServicesImage from "@/assets/services/real-estate-services/mortgage-services/mortgage-services.jpg";
import corporateBankingImage from "@/assets/services/corporate-advisory/corporate-banking-and-mortgage-advisory/corporate-banking-mortgage.jpg";
import { submitMortgageCalculatorInquiry } from "@/utils/inquiryApi";

const aedFormatter = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const planningCards = [
  {
    title: "Repayment visibility",
    text: "See how price, deposit, rate, and term change the monthly payment before you move into bank conversations.",
  },
  {
    title: "Loan sizing",
    text: "Frame the borrowing amount and upfront cash requirement so the acquisition brief stays commercially grounded.",
  },
  {
    title: "Advisory handoff",
    text: "Turn the estimate into a cleaner financing discussion with HMC when you are ready to review lender fit and next steps.",
  },
];

const assumptionsChecklist = [
  "The estimate is based on principal and interest repayments only.",
  "Bank fees, valuation fees, insurance, transfer costs, and broker commissions are excluded.",
  "Final pricing depends on lender policy, borrower profile, residency status, and the property itself.",
  "Use this tool for planning clarity, not as a formal credit approval or binding quote.",
];

const residencyOptions = [
  "UAE resident",
  "Non-resident investor",
  "Not sure yet",
];

const propertyUseOptions = [
  "Primary home",
  "Investment property",
  "Holiday or second home",
];

const initialScenario = {
  propertyValue: "1850000",
  downPaymentPercent: "25",
  interestRate: "4.35",
  loanTermYears: "25",
  monthlyIncome: "48000",
  residencyStatus: "UAE resident",
  propertyUse: "Primary home",
  rateType: "Fixed planning assumption",
};

const initialLeadForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

function parseNumber(value) {
  const normalized = String(value ?? "").replace(/,/g, "").trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function calculateMonthlyPayment(principal, annualRate, totalMonths) {
  if (!principal || !totalMonths) return 0;

  const monthlyRate = annualRate / 100 / 12;

  if (!monthlyRate) {
    return principal / totalMonths;
  }

  const factor = (1 + monthlyRate) ** totalMonths;
  return (principal * monthlyRate * factor) / (factor - 1);
}

function formatCurrency(value) {
  return aedFormatter.format(Number.isFinite(value) ? value : 0);
}

function formatPercent(value) {
  return `${percentFormatter.format(Number.isFinite(value) ? value : 0)}%`;
}

function getPaymentRatioTone(ratio) {
  if (!Number.isFinite(ratio)) {
    return {
      label: "Add monthly income to see your payment-to-income ratio.",
      className: "border-white/12 bg-white/[0.08] text-white/75",
      barClassName: "bg-white/30",
    };
  }

  if (ratio > 45) {
    return {
      label: "This scenario looks stretched against the income entered.",
      className: "border-rose-300/30 bg-rose-300/10 text-rose-50",
      barClassName: "bg-rose-300",
    };
  }

  if (ratio > 35) {
    return {
      label: "This scenario is workable, but it leaves less monthly breathing room.",
      className: "border-amber-300/30 bg-amber-300/10 text-amber-50",
      barClassName: "bg-amber-300",
    };
  }

  return {
    label: "This sits in a more comfortable planning range based on the income entered.",
    className: "border-emerald-300/30 bg-emerald-300/10 text-emerald-50",
    barClassName: "bg-emerald-300",
  };
}

export default function MortgageCalculatorPage() {
  const [scenario, setScenario] = useState(initialScenario);
  const [leadForm, setLeadForm] = useState(initialLeadForm);
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });

  const propertyValue = Math.max(parseNumber(scenario.propertyValue), 0);
  const downPaymentPercent = clamp(
    parseNumber(scenario.downPaymentPercent),
    5,
    90,
  );
  const interestRate = clamp(parseNumber(scenario.interestRate), 0, 15);
  const loanTermYears = clamp(parseNumber(scenario.loanTermYears), 5, 35);
  const monthlyIncome = Math.max(parseNumber(scenario.monthlyIncome), 0);
  const totalMonths = Math.max(Math.round(loanTermYears * 12), 0);
  const downPaymentAmount = propertyValue * (downPaymentPercent / 100);
  const loanAmount = Math.max(propertyValue - downPaymentAmount, 0);
  const monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    interestRate,
    totalMonths,
  );
  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = Math.max(totalPayment - loanAmount, 0);
  const paymentRatio =
    monthlyIncome > 0 ? (monthlyPayment / monthlyIncome) * 100 : Number.NaN;
  const paymentRatioTone = getPaymentRatioTone(paymentRatio);
  const paymentRatioWidth = Number.isFinite(paymentRatio)
    ? `${clamp(paymentRatio, 0, 60) / 0.6}%`
    : "0%";
  const isSubmitting = submitState.status === "loading";

  function updateScenario(field, value) {
    setScenario((currentScenario) => ({
      ...currentScenario,
      [field]: value,
    }));
  }

  function updateLeadForm(field, value) {
    setLeadForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    if (submitState.status !== "idle") {
      setSubmitState({ status: "idle", message: "" });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitState({ status: "loading", message: "" });

    try {
      const response = await submitMortgageCalculatorInquiry({
        firstName: leadForm.firstName,
        lastName: leadForm.lastName,
        email: leadForm.email,
        phone: leadForm.phone,
        residencyStatus: scenario.residencyStatus,
        propertyUse: scenario.propertyUse,
        rateType: scenario.rateType,
        propertyValue: String(Math.round(propertyValue)),
        downPaymentPercent: downPaymentPercent.toFixed(1),
        downPaymentAmount: String(Math.round(downPaymentAmount)),
        interestRate: interestRate.toFixed(2),
        loanTermYears: String(loanTermYears),
        monthlyIncome: monthlyIncome ? String(Math.round(monthlyIncome)) : "",
        loanAmount: String(Math.round(loanAmount)),
        monthlyPayment: String(Math.round(monthlyPayment)),
        totalPayment: String(Math.round(totalPayment)),
        totalInterest: String(Math.round(totalInterest)),
        paymentToIncomeRatio: Number.isFinite(paymentRatio)
          ? paymentRatio.toFixed(1)
          : "",
        pageUrl:
          typeof window !== "undefined"
            ? window.location.href
            : "/mortgage-calculator",
        pagePath: "/mortgage-calculator",
      });

      setLeadForm(initialLeadForm);
      setSubmitState({
        status: "success",
        message:
          response.message ||
          "Your mortgage review request has been sent successfully.",
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your mortgage review request right now. Please try again shortly.",
      });
    }
  }

  return (
    <ServicePageShell
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Mortgage Calculator" },
      ]}
      eyebrow="Real Estate Tool"
      title="Mortgage Calculator"
      summary="Model your monthly repayment, deposit requirement, and financing size before you move into lender discussions or property negotiations."
      heroAside={
        <div className="grid gap-4">
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
            <img
              src={mortgageServicesImage}
              alt="Residential towers representing UAE mortgage and property financing planning"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D354C]/90 via-[#0D354C]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
                Planning baseline
              </p>
              <p className="mt-2 text-2xl font-black tracking-tight">
                {formatCurrency(propertyValue)}
              </p>
              <p className="mt-1 text-sm text-white/75">
                Property value currently entered
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B26F]">
              Live estimate snapshot
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <SnapshotStat
                label="Monthly payment"
                value={formatCurrency(monthlyPayment)}
              />
              <SnapshotStat
                label="Loan amount"
                value={formatCurrency(loanAmount)}
              />
              <SnapshotStat
                label="Down payment"
                value={formatCurrency(downPaymentAmount)}
              />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/75">
              This snapshot updates as you adjust the calculator below. It is a
              planning estimate, not a lender quote.
            </p>
          </div>
        </div>
      }
    >
      <PageSection className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Scenario builder"
            title="Shape the mortgage estimate around your property and financing assumptions"
            intro="Start with the price, deposit, rate, and loan term, then check how the repayment sits against the income you entered."
          />

          <div className="rounded-[32px] border border-[#0D354C]/10 bg-white p-4 shadow-[0_24px_60px_-38px_rgba(13,53,76,0.35)] sm:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <NumberField
                label="Property value"
                value={scenario.propertyValue}
                onChange={(value) => updateScenario("propertyValue", value)}
                prefix="AED"
                min={0}
                step="10000"
                helper={`Current working amount: ${formatCurrency(propertyValue)}`}
              />

              <NumberField
                label="Monthly income"
                value={scenario.monthlyIncome}
                onChange={(value) => updateScenario("monthlyIncome", value)}
                prefix="AED"
                min={0}
                step="1000"
                helper="Optional, but useful for payment-to-income planning."
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <RangeField
                label="Down payment"
                value={scenario.downPaymentPercent}
                onChange={(value) =>
                  updateScenario("downPaymentPercent", value)
                }
                min={5}
                max={90}
                step={1}
                displayValue={`${Math.round(downPaymentPercent)}%`}
                percentage={((downPaymentPercent - 5) / 85) * 100}
                helper={`Estimated cash required: ${formatCurrency(
                  downPaymentAmount,
                )}`}
              />

              <RangeField
                label="Interest rate"
                value={scenario.interestRate}
                onChange={(value) => updateScenario("interestRate", value)}
                min={0.5}
                max={10}
                step={0.05}
                displayValue={`${interestRate.toFixed(2)}%`}
                percentage={((interestRate - 0.5) / 9.5) * 100}
                helper="Use the rate you want to test for planning."
              />
            </div>

            <div className="mt-4">
              <RangeField
                label="Loan term"
                value={scenario.loanTermYears}
                onChange={(value) => updateScenario("loanTermYears", value)}
                min={5}
                max={35}
                step={1}
                displayValue={`${Math.round(loanTermYears)} years`}
                percentage={((loanTermYears - 5) / 30) * 100}
                helper={`Repayment period: ${totalMonths} months`}
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <ThemedSelect
                label="Residency"
                value={scenario.residencyStatus}
                options={residencyOptions}
                onChange={(value) => updateScenario("residencyStatus", value)}
                icon={Globe2}
              />

              <ThemedSelect
                label="Property use"
                value={scenario.propertyUse}
                options={propertyUseOptions}
                onChange={(value) => updateScenario("propertyUse", value)}
                icon={House}
              />

            
            </div>
          </div>
        </div>

        <aside className="rounded-[32px] bg-[#0D354C] p-5 text-white shadow-[0_30px_70px_-38px_rgba(13,53,76,0.52)] sm:p-7 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
            Mortgage estimate
          </p>
          <div className="mt-3 rounded-3xl border border-white/10 bg-white/[0.07] p-5">
            <p className="text-sm font-semibold text-white/65">
              Estimated monthly payment
            </p>
            <p className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              {formatCurrency(monthlyPayment)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Principal and interest estimate over {Math.round(loanTermYears)} years.
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ResultStat
              label="Loan amount"
              value={formatCurrency(loanAmount)}
              detail="Property price minus the deposit entered"
            />
            <ResultStat
              label="Total repayment"
              value={formatCurrency(totalPayment)}
              detail="Estimated payment across the full term"
            />
            <ResultStat
              label="Total interest"
              value={formatCurrency(totalInterest)}
              detail="Finance cost over the selected repayment horizon"
            />
          </div>

          <div
            className={[
              "mt-5 rounded-2xl border px-4 py-4 text-sm leading-relaxed",
              paymentRatioTone.className,
            ].join(" ")}
          >
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4 text-[#D6B26F]" />
              Payment-to-income ratio
            </div>
            <p className="mt-2">
              {Number.isFinite(paymentRatio)
                ? `${formatPercent(paymentRatio)} of the monthly income entered.`
                : "Add monthly income above to see the share of income this payment could consume."}
            </p>
            <p className="mt-2 opacity-90">{paymentRatioTone.label}</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/12">
              <div
                className={[
                  "h-full rounded-full transition-all duration-300",
                  paymentRatioTone.barClassName,
                ].join(" ")}
                style={{ width: paymentRatioWidth }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px] font-semibold uppercase tracking-[0.14em] opacity-70">
              <span>0%</span>
              <span>35%</span>
              <span>45%+</span>
            </div>
          </div>

          <div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <SummaryRow
              label="Property value"
              value={formatCurrency(propertyValue)}
            />
            <SummaryRow
              label="Deposit"
              value={`${formatCurrency(downPaymentAmount)} (${formatPercent(
                downPaymentPercent,
              )})`}
            />
            <SummaryRow
              label="Rate and term"
              value={`${interestRate.toFixed(2)}% over ${Math.round(
                loanTermYears,
              )} years`}
            />
            <SummaryRow
              label="Scenario"
              value={`${scenario.residencyStatus} / ${scenario.propertyUse}`}
            />
          </div>

          <p className="mt-5 text-sm leading-relaxed text-white/70">
            This tool excludes lender fees, insurance, transfer charges, and
            valuation costs. Use it to frame the financing conversation, then
            refine the structure with HMC.
          </p>
        </aside>
      </PageSection>

      <PageSection>
        <SectionHeading
          eyebrow="Why use it"
          title="What this mortgage calculator helps you clarify"
          intro="A stronger mortgage conversation usually starts with a cleaner view of repayment pressure, cash required upfront, and whether the property brief is still commercially sensible."
          align="center"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {planningCards.map((card) => (
            <InfoCard key={card.title} title={card.title} text={card.text} />
          ))}
        </div>
      </PageSection>

      <PageSection className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
        <aside className="rounded-[32px] border border-[#0D354C]/10 bg-[#F8FAFC] p-5 shadow-[0_24px_60px_-40px_rgba(13,53,76,0.4)] sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D6B26F]">
            Free review
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0D354C]">
            Send this mortgage scenario to HMC
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Share your details and we&apos;ll use this estimate as the starting
            point for a sharper financing conversation.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <fieldset
              className={isSubmitting ? "space-y-4 opacity-80" : "space-y-4"}
              disabled={isSubmitting}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="First name"
                  value={leadForm.firstName}
                  placeholder="First name"
                  onChange={(value) => updateLeadForm("firstName", value)}
                  required
                />
                <TextField
                  label="Last name"
                  value={leadForm.lastName}
                  placeholder="Last name"
                  onChange={(value) => updateLeadForm("lastName", value)}
                  required
                />
              </div>

              <TextField
                label="Email"
                type="email"
                value={leadForm.email}
                placeholder="name@example.com"
                onChange={(value) => updateLeadForm("email", value)}
                required
              />

              <TextField
                label="Phone"
                type="tel"
                value={leadForm.phone}
                placeholder="+971 50 000 0000"
                onChange={(value) => updateLeadForm("phone", value)}
                required
              />

              <div className="rounded-2xl border border-[#0D354C]/8 bg-white px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-[#0D354C]">
                    Scenario being sent
                  </p>
                  <CircleDollarSign className="h-5 w-5 text-[#D6B26F]" />
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <InlineSummary
                    label="Property value"
                    value={formatCurrency(propertyValue)}
                  />
                  <InlineSummary
                    label="Loan amount"
                    value={formatCurrency(loanAmount)}
                  />
                  <InlineSummary
                    label="Monthly payment"
                    value={formatCurrency(monthlyPayment)}
                  />
                  <InlineSummary
                    label="Deposit"
                    value={formatCurrency(downPaymentAmount)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0D354C] px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#124560] disabled:cursor-not-allowed disabled:bg-[#0D354C]/70"
              >
                {isSubmitting ? "Sending..." : "Request Mortgage Review"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </fieldset>

            {submitState.message ? (
              <p
                className={
                  submitState.status === "success"
                    ? "text-sm font-medium text-emerald-600"
                    : "text-sm font-medium text-rose-600"
                }
              >
                {submitState.message}
              </p>
            ) : null}
          </form>
        </aside>

        <div className="space-y-6">
          <MediaFrame
            src={corporateBankingImage}
            alt="Professional mortgage and banking advisory meeting"
            className="min-h-[280px]"
          />

          <SectionHeading
            eyebrow="Planning notes"
            title="Keep the estimate useful by staying clear on the assumptions behind it"
            intro="A mortgage calculator is strongest when it helps you ask better questions before documentation, approvals, and property commitments start to move."
          />

          <Checklist title="Assumptions behind this tool" items={assumptionsChecklist} />

          <div className="grid gap-5 md:grid-cols-2">
            <InfoCard
              title="Residency matters"
              text="Resident and non-resident buyers often face different product ranges, documentation requirements, and lender appetite."
            />
            <InfoCard
              title="Property use matters"
              text="Financing a primary home can look different from structuring an investment purchase or second-home scenario."
            />
          </div>

          <CalloutPanel
            title="Use the estimate to improve the financing brief, not to overcommit early"
            text="The strongest next step is usually a cleaner brief around price, deposit, income strength, and property intent, then a lender-fit discussion based on real documentation."
          />
        </div>
      </PageSection>

      <ActionBanner
        title="Need a sharper mortgage view before you proceed with a property?"
        text="Use this estimate to frame the numbers first, then let HMC help you shape the financing conversation around fit, readiness, and execution."
        primaryLabel="Talk to HMC"
      />
    </ServicePageShell>
  );
}

function SnapshotStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
        {label}
      </p>
      <p className="mt-2 text-base font-bold text-white">{value}</p>
    </div>
  );
}

function ResultStat({ label, value, detail }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-4 transition hover:bg-white/[0.11]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{detail}</p>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-white/70">{label}</span>
      <span className="text-right text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

function InlineSummary({ label, value }) {
  return (
    <div className="rounded-xl border border-[#0D354C]/8 bg-[#F8FAFC] px-3 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#0D354C]">{value}</p>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  min,
  step,
  helper,
}) {
  return (
    <div className="block rounded-3xl border border-[#0D354C]/10 bg-white p-4 shadow-[0_14px_34px_-30px_rgba(13,53,76,0.45)]">
      <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        <Building2 className="h-4 w-4 text-[#D6B26F]" />
        {label}
      </span>
      <div className="flex items-center rounded-2xl border border-[#0D354C]/10 bg-[#F8FAFC] px-4 py-3 transition focus-within:border-[#D6B26F] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#D6B26F]/20">
        {prefix ? (
          <span className="mr-3 rounded-full bg-[#0D354C]/6 px-2.5 py-1 text-xs font-semibold text-[#0D354C]">
            {prefix}
          </span>
        ) : null}
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-xl font-black text-[#0D354C] outline-none sm:text-2xl"
        />
      </div>
      </label>
      {helper ? (
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{helper}</p>
      ) : null}
    </div>
  );
}

function RangeField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  displayValue,
  percentage = 0,
  helper,
}) {
  const safePercentage = clamp(percentage, 0, 100);

  return (
    <label className="block rounded-3xl border border-[#0D354C]/10 bg-white p-4 shadow-[0_14px_34px_-30px_rgba(13,53,76,0.45)]">
      <div className="flex items-center justify-between gap-4">
        <span className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
          <Landmark className="h-4 w-4 text-[#D6B26F]" />
          {label}
        </span>
        <span className="rounded-full bg-[#0D354C]/6 px-3 py-1 text-xs font-semibold text-[#0D354C]">
          {displayValue}
        </span>
      </div>
      <div className="mt-2 rounded-2xl bg-[#F8FAFC] px-3 py-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[#D6B26F]"
          style={{
            background: `linear-gradient(to right, #D6B26F ${safePercentage}%, rgba(13,53,76,0.12) ${safePercentage}%)`,
          }}
        />
        <div className="mt-3 flex justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
      {helper ? (
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{helper}</p>
      ) : null}
    </label>
  );
}

function TextField({
  label,
  value,
  placeholder,
  onChange,
  type = "text",
  required = false,
}) {
  const Icon = type === "email" ? Mail : type === "tel" ? Phone : CheckCircle2;

  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        <Icon className="h-4 w-4 text-[#D6B26F]" />
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[#0D354C]/10 bg-white px-4 py-3.5 text-base text-[#0D354C] outline-none transition placeholder:text-slate-400 focus:border-[#D6B26F] focus:ring-2 focus:ring-[#D6B26F]/20"
      />
    </label>
  );
}
