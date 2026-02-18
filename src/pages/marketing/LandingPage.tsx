import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight, Github, Linkedin, Menu, Twitter } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { buildAuthPath, TEMPLATE_IMPORT_ONBOARDING_PATH, TEMPLATE_ONBOARDING_SOURCE } from "@/lib/authIntent";
import { type PlanTier, PRICING_PLANS } from "@/content/pricing";

const operationalProof = [
  {
    label: "Reminder cadence",
    value: "90/60/30-day workflow",
    note: "Teams act before notice periods close.",
  },
  {
    label: "Risk visibility",
    value: "Shared renewal status",
    note: "Safe, soon, and risk queues stay transparent.",
  },
  {
    label: "Owner accountability",
    value: "One source of truth",
    note: "Finance, ops, and IT stay aligned on every renewal.",
  },
] as const;

const roleCards = [
  {
    title: "Finance teams",
    points: [
      "Forecast annualized renewal spend with clear due-date visibility.",
      "Review high-value contracts earlier to improve negotiation timing.",
      "Reduce surprise auto-renew charges and missed budget approvals.",
    ],
  },
  {
    title: "Ops and admins",
    points: [
      "Track owners and reminder status in one operational dashboard.",
      "Standardize weekly renewal reviews across departments.",
      "Cut manual follow-up time on recurring subscriptions.",
    ],
  },
  {
    title: "IT and procurement",
    points: [
      "Monitor software license and domain renewal timelines reliably.",
      "Escalate risk renewals before deadline pressure builds.",
      "Coordinate vendor decisions with finance and legal stakeholders.",
    ],
  },
] as const;

const capabilityCards = [
  {
    title: "Subscription renewal tracker",
    description: "Track recurring software and service renewals with owner-level accountability.",
  },
  {
    title: "Contract reminder system",
    description: "Manage notice periods, expiration dates, and escalation rules in one place.",
  },
  {
    title: "SaaS renewal management",
    description: "Align IT, operations, and finance with shared renewal workflows.",
  },
  {
    title: "License and domain renewals",
    description: "Prevent outages and compliance risk with proactive reminders.",
  },
  {
    title: "Operational dashboards",
    description: "View due-soon, risk, and completed decisions by team and owner.",
  },
  {
    title: "Slack + email alerts",
    description: "Use digest and instant alerts to speed response on critical renewals.",
  },
] as const;

const workflowSteps = [
  {
    title: "Capture",
    detail: "Import subscriptions, contracts, SaaS tools, and renewal owners into one system.",
  },
  {
    title: "Automate",
    detail: "Set reminder windows and escalation rules for due-soon and risk renewals.",
  },
  {
    title: "Decide",
    detail: "Run a weekly review rhythm and close each renewal with a clear outcome.",
  },
] as const;

const buyerResources = [
  { to: "/renewal-tracking-software", label: "Renewal tracking software guide" },
  { to: "/renewal-reminder-software", label: "Renewal reminder software" },
  { to: "/contract-reminder-system", label: "Contract reminder system" },
  { to: "/renewal-management-platform", label: "Renewal management platform overview" },
  { to: "/excel-vs-renewal-tracking-software", label: "Excel vs renewal tracking software" },
  { to: "/renewal-tracking-software-pricing", label: "Renewal tracking software pricing" },
] as const;

const pricingSnapshot = (["founders", "pro", "team"] as PlanTier[]).map((tier) => {
  const plan = PRICING_PLANS[tier];
  return {
    tier: plan.name,
    price: `$${plan.monthlyPrice}/mo`,
    points: [plan.renewalsLimit, plan.seats, `Slack: ${plan.slackDigest}`],
    featured: Boolean(plan.featured),
  };
});

const faqItems = [
  {
    q: "What is renewal tracking software?",
    a: "Renewal tracking software helps teams manage subscription, contract, SaaS, domain, and license renewals with owner workflows and reminders.",
  },
  {
    q: "How do automated renewal reminders work?",
    a: "Teams configure reminder windows like 90, 60, and 30 days, then escalate unresolved renewals before notice periods close.",
  },
  {
    q: "What should I look for in subscription renewal software?",
    a: "Prioritize automation, owner accountability, renewal dashboards, reporting, and pricing that fits your team.",
  },
  {
    q: "Can startups and SMB teams implement quickly?",
    a: "Yes. Most teams can launch in days by importing key renewals and enabling a default reminder cadence.",
  },
  {
    q: "How is this better than spreadsheets?",
    a: "Spreadsheets are manual. A renewal platform adds automation, shared visibility, and fewer missed deadlines.",
  },
  {
    q: "Can finance, ops, and IT use one workflow?",
    a: "Yes. KnowRenewals centralizes ownership and decision timing so cross-functional teams stay aligned.",
  },
] as const;

export function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const templateSignupPath = buildAuthPath(
    "/signup",
    TEMPLATE_ONBOARDING_SOURCE,
    TEMPLATE_IMPORT_ONBOARDING_PATH,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 text-slate-700">
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <img src="/logo.png" alt="KnowRenewals logo" className="h-10 w-auto" />

          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#features" className="transition-colors hover:text-slate-900">
              Features
            </a>
            <a href="#pricing" className="transition-colors hover:text-slate-900">
              Pricing
            </a>
            <a href="#faq" className="transition-colors hover:text-slate-900">
              FAQ
            </a>
            <Link to="/blog" reloadDocument className="transition-colors hover:text-slate-900">
              Blog
            </Link>
            <Link to="/login" reloadDocument className="transition-colors hover:text-slate-900">
              Login
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              to="/signup"
              reloadDocument
              className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 active:scale-95"
            >
              Start Free Trial
            </Link>
          </div>

          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-600 md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div id="mobile-nav" className="border-t border-slate-200 bg-white px-4 py-3 md:hidden sm:px-6">
            <nav className="flex flex-col gap-3 text-sm text-slate-700">
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-slate-900">
                Features
              </a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-slate-900">
                Pricing
              </a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-slate-900">
                FAQ
              </a>
              <Link to="/blog" reloadDocument className="hover:text-slate-900">
                Blog
              </Link>
              <Link
                to="/signup"
                reloadDocument
                className="inline-flex w-fit items-center rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
              >
                Start Free Trial
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-14 px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Renewal Tracking Software for Subscriptions, Contracts, and SaaS
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                KnowRenewals is renewal tracking software for subscriptions, contracts, and SaaS that gives teams one
                clear workflow for reminders, owners, and renewal decisions before deadlines hit.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/signup"
                  reloadDocument
                  className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 active:scale-95"
                >
                  Start Free Trial
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
                <Link
                  to="/renewal-tracking-software-pricing"
                  reloadDocument
                  className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 active:scale-95"
                >
                  See Pricing
                </Link>
              </div>
              <p className="mt-5 text-sm text-slate-500">
                Built for startups, finance/admin teams, and IT/procurement leaders.
              </p>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-slate-50/90 p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Renewal operations live board</p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Active
                </span>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">Cloud Security Contract</p>
                    <span className="text-xs font-semibold uppercase tracking-wide text-rose-700">Risk</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">Renewal in 5 days | Owner: Finance</p>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">Analytics SaaS</p>
                    <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">Soon</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">Renewal in 18 days | Owner: Ops</p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">Primary Domain</p>
                    <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">On track</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">Renewal in 47 days | Owner: IT</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {operationalProof.map((item) => (
            <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
              <p className="mt-2 text-sm text-slate-600">{item.note}</p>
            </article>
          ))}
        </section>

        <section className="space-y-5">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Designed for the teams that run renewals</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {roleCards.map((role) => (
              <article key={role.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{role.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  {role.points.map((point) => (
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

        <section id="features" className="space-y-5">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Core capabilities that reduce missed renewals</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilityCards.map((feature) => (
              <article key={feature.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
          <p className="text-sm text-slate-600">
            Want the full capability breakdown?{" "}
            <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software-features" reloadDocument>
              Explore all features
            </Link>
            .
          </p>
        </section>

        <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">How modern renewal operations run in 3 steps</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <article key={step.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Buyer resources</h2>
          <p className="text-sm text-slate-600">
            Start with the key commercial guides, then explore the full library of renewal operations content.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {buyerResources.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
              >
                <span>{item.label}</span>
                <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
          <div>
            <Link className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800" to="/blog">
              View all guides
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 p-6 shadow-sm sm:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Still using spreadsheets?</h2>
              <p className="text-sm leading-relaxed text-slate-600">
                Start free with our formula-ready template, fill your contracts, then sign up and import the file into
                KnowRenewals without manual contract-by-contract entry.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to={templateSignupPath}
                reloadDocument
                onClick={() => trackEvent("template_cta_clicked", { location: "landing_bridge", action: "signup" })}
                className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Start Free Trial and Import
              </Link>
              <Link
                to="/free-renewal-tracking-spreadsheet-template"
                reloadDocument
                onClick={() => trackEvent("template_cta_clicked", { location: "landing_bridge", action: "download" })}
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400"
              >
                Get Free Template
              </Link>
            </div>
          </div>
        </section>

        <section id="pricing" className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Pricing snapshot for growing teams</h2>
            <p className="text-sm text-slate-600">
              Pick a plan based on renewal volume and team size, then expand workflows as operations mature.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {pricingSnapshot.map((plan) => (
              <article
                key={plan.tier}
                className={`rounded-2xl border p-5 ${
                  plan.featured
                    ? "border-emerald-300 bg-emerald-50 shadow-sm"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">{plan.tier}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{plan.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {plan.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/renewal-tracking-software-pricing"
              reloadDocument
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400"
            >
              Compare all plan details
            </Link>
            <Link
              to="/signup"
              reloadDocument
              className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Start Free Trial
            </Link>
          </div>
        </section>

        <section id="faq" className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Frequently asked questions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <article key={item.q} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-600 to-emerald-500 p-8 text-white shadow-sm">
          <div className="pointer-events-none absolute -right-12 top-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.18em] text-emerald-100">Ready to simplify renewals?</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Replace manual tracking with one renewal workflow your team will actually use.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/signup"
                reloadDocument
                className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition-all hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                Start Free Trial
              </Link>
              <Link
                to="/renewal-tracking-software-pricing"
                reloadDocument
                className="inline-flex items-center rounded-xl border border-emerald-100 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div>
            <p className="text-base font-semibold tracking-tight text-slate-900">KnowRenewals</p>
            <p className="mt-2 text-sm text-slate-500">
              Renewal operations software for startups, SMBs, and cross-functional buyer teams.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/renewal-tracking-software">Renewal tracking software</Link>
              </li>
              <li>
                <Link to="/renewal-tracking-software-pricing">Pricing</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Resources</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/blog">Renewal management blog</Link>
              </li>
              <li>
                <Link to="/excel-vs-renewal-tracking-software">Excel vs software comparison</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service">Terms of Service</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Social</p>
            <div className="mt-3 flex items-center gap-3 text-slate-500">
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
