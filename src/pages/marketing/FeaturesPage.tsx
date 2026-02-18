import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";
import { trackEvent } from "@/lib/analytics";
import { buildAuthPath, TEMPLATE_IMPORT_ONBOARDING_PATH, TEMPLATE_ONBOARDING_SOURCE } from "@/lib/authIntent";

const coreFeatures = [
  {
    title: "Renewal dashboard",
    outcome: "Track subscription, contract, SaaS, license, and domain renewals in one view.",
  },
  {
    title: "Automated reminders",
    outcome: "Use reminder windows like 90/60/30 days so owners act before deadlines.",
  },
  {
    title: "Owner accountability",
    outcome: "Assign owners and keep renewal decisions visible across teams.",
  },
  {
    title: "Risk visibility",
    outcome: "Prioritize renewals with safe, soon, and risk status signals.",
  },
  {
    title: "CSV import and export",
    outcome: "Import existing data fast and export filled files for audit and reporting workflows.",
  },
  {
    title: "Slack and email alerts",
    outcome: "Coordinate daily digest and critical risk alerts where teams already work.",
  },
] as const;

const roleValue = [
  {
    role: "Finance",
    points: [
      "Forecast annualized spend earlier with renewal visibility by owner and due date.",
      "Reduce surprise auto-renew costs with repeatable review workflows.",
    ],
  },
  {
    role: "Ops and Admin",
    points: [
      "Standardize reminder cadence and keep contract operations consistent every week.",
      "Reduce manual follow-up and spreadsheet maintenance overhead.",
    ],
  },
  {
    role: "IT and Procurement",
    points: [
      "Track software, domains, and licenses in one operational system.",
      "Escalate risk renewals before service or compliance risk appears.",
    ],
  },
] as const;

const workflow = [
  {
    step: "Capture",
    detail: "Import current renewals and owners from spreadsheet or CSV.",
  },
  {
    step: "Automate",
    detail: "Set reminder windows and escalation flow for due-soon renewals.",
  },
  {
    step: "Decide",
    detail: "Review risk queue weekly and close every renewal with clear ownership.",
  },
] as const;

const faqItems = [
  {
    q: "What features matter most in renewal tracking software?",
    a: "Teams usually prioritize automated reminders, ownership workflows, risk visibility, and import/export support.",
  },
  {
    q: "Can we track contracts, SaaS tools, licenses, and domains together?",
    a: "Yes. Teams can centralize these renewal types in one dashboard to avoid fragmented tracking.",
  },
  {
    q: "How do Slack alerts work for renewals?",
    a: "Slack supports daily digest and plan-based instant alerts for high-risk or due-soon renewals.",
  },
  {
    q: "Can we start from a spreadsheet and move into the app?",
    a: "Yes. Download the template, fill it, sign up, and import into Contracts to sync records quickly.",
  },
  {
    q: "Does this replace manual reminder follow-ups?",
    a: "It reduces manual effort by using scheduled reminders and shared status tracking by owner.",
  },
  {
    q: "Which team should own renewals?",
    a: "Most companies use shared ownership across finance, ops, and IT with one renewal workflow and clear assignees.",
  },
] as const;

export function FeaturesPage() {
  const templateSignupPath = useMemo(
    () => buildAuthPath("/signup", TEMPLATE_ONBOARDING_SOURCE, TEMPLATE_IMPORT_ONBOARDING_PATH),
    [],
  );

  useEffect(() => {
    trackEvent("features_page_viewed", { page: "renewal_tracking_features" });
  }, []);

  return (
    <SeoPageLayout
      title="Renewal Tracking Software Features for B2B Teams"
      description="Explore renewal tracking software features including automated reminders, contract tracking, SaaS renewals, Slack alerts, import/export, and team dashboards."
    >
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Features built for operational renewal control</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          This renewal tracking software feature set helps teams move from scattered reminders to a reliable system for
          planning, ownership, and execution.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/signup"
            reloadDocument
            onClick={() => trackEvent("features_cta_clicked", { location: "hero", action: "signup" })}
            className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Start Free Trial
          </Link>
          <Link
            to="/renewal-tracking-software-pricing"
            reloadDocument
            onClick={() => trackEvent("features_cta_clicked", { location: "hero", action: "pricing" })}
            className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
          >
            See Pricing
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Core capabilities and outcomes</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coreFeatures.map((feature) => (
            <article key={feature.title} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Value by team</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {roleValue.map((item) => (
            <article key={item.role} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-lg font-semibold text-slate-900">{item.role}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How it works in 3 steps</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {workflow.map((item, index) => (
            <article key={item.step} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-2 text-base font-semibold text-slate-900">{item.step}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Integrations and onboarding path</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Use{" "}
          <Link className="text-emerald-700 hover:text-emerald-800" to="/slack-renewal-alerts">
            Slack renewal alerts
          </Link>{" "}
          for team coordination, or start with the{" "}
          <Link className="text-emerald-700 hover:text-emerald-800" to="/free-renewal-tracking-spreadsheet-template">
            free spreadsheet template
          </Link>{" "}
          and import when ready.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="text-emerald-700 hover:text-emerald-800" to={templateSignupPath}>
            Sign up and import template data
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/slack-alerts-vs-email-reminders">
            Compare Slack vs email reminders
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software-pricing">
            Review pricing by team size
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Feature FAQs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <article key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-white">
        <p className="text-sm uppercase tracking-wide text-emerald-100">Ready to launch?</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Put every renewal feature into one workflow and reduce deadline risk this week.
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/signup"
            reloadDocument
            onClick={() => trackEvent("features_cta_clicked", { location: "final", action: "signup" })}
            className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            Start Free Trial
          </Link>
          <Link
            to="/renewal-tracking-software-pricing"
            reloadDocument
            onClick={() => trackEvent("features_cta_clicked", { location: "final", action: "pricing" })}
            className="inline-flex items-center rounded-xl border border-emerald-100 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            See Pricing
          </Link>
          <Link
            to="/free-renewal-tracking-spreadsheet-template"
            reloadDocument
            onClick={() => trackEvent("features_cta_clicked", { location: "final", action: "template" })}
            className="inline-flex items-center rounded-xl border border-emerald-100 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Free Spreadsheet Template
          </Link>
        </div>
      </section>
    </SeoPageLayout>
  );
}

export default FeaturesPage;

