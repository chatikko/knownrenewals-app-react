import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";
import { trackEvent } from "@/lib/analytics";
import { buildAuthPath, TEMPLATE_IMPORT_ONBOARDING_PATH, TEMPLATE_ONBOARDING_SOURCE } from "@/lib/authIntent";
import { type BillingCycle, type PlanTier, PRICING_COMPARISON_ROWS, PRICING_PLANS } from "@/content/pricing";

const PLAN_ORDER: PlanTier[] = ["founders", "pro", "team"];

const faqItems = [
  {
    question: "Can I start on Founders and upgrade later?",
    answer: "Yes. Teams can start lean, then upgrade to Pro or Team when renewal volume and collaboration needs grow.",
  },
  {
    question: "What is included in Slack alerts by plan?",
    answer:
      "Founders includes daily digest. Pro and Team include digest plus instant alerts for risk and due-in-7-days renewals.",
  },
  {
    question: "Do all plans support spreadsheet import?",
    answer: "Yes. Every plan supports CSV import and export, so onboarding from your existing tracker is straightforward.",
  },
  {
    question: "Is yearly billing discounted?",
    answer: "Yes. Yearly pricing gives the equivalent of two months free compared with monthly billing.",
  },
  {
    question: "Which plan is best for cross-functional teams?",
    answer:
      "Pro works for most finance, ops, and IT teams. Team is best when you need more seats and stronger role-based collaboration.",
  },
  {
    question: "Can I use the free spreadsheet before subscribing?",
    answer:
      "Yes. You can start with the free template and move into the app when you are ready to automate reminders and ownership.",
  },
] as const;

function formatPrice(amount: number, cycle: BillingCycle) {
  return cycle === "monthly" ? `$${amount}/mo` : `$${amount}/yr`;
}

export function PricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("yearly");
  const templateSignupPath = useMemo(
    () => buildAuthPath("/signup", TEMPLATE_ONBOARDING_SOURCE, TEMPLATE_IMPORT_ONBOARDING_PATH),
    [],
  );

  useEffect(() => {
    trackEvent("pricing_compare_table_viewed", { page: "renewal_pricing" });
  }, []);

  const onCycleChange = (nextCycle: BillingCycle) => {
    setCycle(nextCycle);
    trackEvent("pricing_cycle_toggled", { cycle: nextCycle });
  };

  return (
    <SeoPageLayout
      title="Renewal Tracking Software Pricing for Startups and SMB Teams"
      description="Compare monthly and yearly pricing for renewal tracking software and choose the right plan for finance, ops, and IT."
    >
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Choose pricing by renewal complexity</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Renewal tracking software pricing should match your team size, renewal volume, and escalation needs across
          finance, ops/admin, and IT/procurement.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/signup"
            reloadDocument
            onClick={() => trackEvent("pricing_plan_cta_clicked", { plan: "generic", cycle, location: "hero" })}
            className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Start Free Trial
          </Link>
          <Link
            to="/free-renewal-tracking-spreadsheet-template"
            reloadDocument
            className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
          >
            Get Free Template
          </Link>
          <Link
            to="/renewal-tracking-software-features"
            reloadDocument
            className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
          >
            See full feature breakdown
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => onCycleChange("monthly")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              cycle === "monthly" ? "bg-emerald-600 text-white" : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => onCycleChange("yearly")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              cycle === "yearly" ? "bg-emerald-600 text-white" : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Yearly (2 months free)
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {PLAN_ORDER.map((tier) => {
            const plan = PRICING_PLANS[tier];
            return (
              <article
                key={tier}
                id={`pricing-${tier}`}
                className={`rounded-2xl border p-5 ${
                  plan.featured ? "border-emerald-300 bg-emerald-50 shadow-sm" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">{plan.name}</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">
                      {formatPrice(cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice, cycle)}
                    </p>
                  </div>
                  {plan.tagline ? (
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                      {plan.tagline}
                    </span>
                  ) : null}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-sm text-slate-600">
                  Slack alerts: {plan.slackDigest}
                  {plan.slackInstantAlerts !== "Not included" ? ` + ${plan.slackInstantAlerts}` : ""}
                </p>

                <Link
                  to="/signup"
                  reloadDocument
                  onClick={() => trackEvent("pricing_plan_cta_clicked", { plan: tier, cycle, location: "plan_card" })}
                  className={`mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold ${
                    plan.featured
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  Start Free Trial
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Full plan comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="px-4 py-3 font-semibold">Capability</th>
                <th className="px-4 py-3 font-semibold">Founders</th>
                <th className="px-4 py-3 font-semibold">Pro</th>
                <th className="px-4 py-3 font-semibold">Team</th>
              </tr>
            </thead>
            <tbody>
              {PRICING_COMPARISON_ROWS.map((row) => (
                <tr key={row.capability} className="border-t border-slate-200 bg-white">
                  <td className="px-4 py-3 font-medium text-slate-800">{row.capability}</td>
                  <td className="px-4 py-3 text-slate-600">{row.founders}</td>
                  <td className="px-4 py-3 text-slate-600">{row.pro}</td>
                  <td className="px-4 py-3 text-slate-600">{row.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Who each plan is for</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {PLAN_ORDER.map((tier) => {
            const plan = PRICING_PLANS[tier];
            return (
              <article key={`${tier}-fit`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{plan.fit}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Pricing FAQs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <article key={item.question} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-white">
        <p className="text-sm uppercase tracking-wide text-emerald-100">Ready to launch renewal operations?</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Start your trial and automate reminders before your next renewal deadline.
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/signup"
            reloadDocument
            onClick={() => trackEvent("pricing_plan_cta_clicked", { plan: "generic", cycle, location: "final_cta" })}
            className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            Start Free Trial
          </Link>
          <Link
            to="/free-renewal-tracking-spreadsheet-template"
            reloadDocument
            className="inline-flex items-center rounded-xl border border-emerald-100 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Free Spreadsheet Template
          </Link>
        </div>
        <p className="mt-4 text-sm text-emerald-50">
          Filled our template already?{" "}
          <Link to={templateSignupPath} reloadDocument className="font-semibold text-white underline">
            Sign up and import it in Contracts
          </Link>
          .
        </p>
      </section>
    </SeoPageLayout>
  );
}

export default PricingPage;
