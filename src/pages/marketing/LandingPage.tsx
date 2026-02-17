import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight, Github, Linkedin, Menu, Twitter } from "lucide-react";

const faqItems = [
  {
    q: "What is renewal tracking software?",
    a: "Renewal tracking software is a centralized system that helps businesses monitor subscription, contract, SaaS, domain, and license renewal dates and trigger automated reminders before deadlines.",
  },
  {
    q: "How is a subscription renewal tracker different from a spreadsheet?",
    a: "A subscription renewal tracker automates reminders, ownership, and status updates. Spreadsheets are manual and more likely to create missed deadlines or duplicate renewals.",
  },
  {
    q: "Who should use contract renewal management software?",
    a: "Finance teams, admin teams, procurement managers, and startup operations leaders use contract renewal management software to avoid auto-renew surprises and improve negotiation timing.",
  },
  {
    q: "Can I track SaaS, contracts, domains, and licenses in one platform?",
    a: "Yes. A renewal management platform can centralize multiple renewal types in one dashboard so teams manage recurring obligations from one source of truth.",
  },
  {
    q: "How do automated renewal reminders work?",
    a: "Set reminder intervals like 90, 60, and 30 days, assign owners, and send alerts to relevant stakeholders before each renewal deadline.",
  },
  {
    q: "What are the benefits for small businesses?",
    a: "Small businesses gain better cash-flow visibility, fewer missed deadlines, improved vendor negotiation leverage, and less manual tracking.",
  },
  {
    q: "Is renewal reminder software useful for compliance?",
    a: "Yes. It helps track software license renewals and required contract dates, reducing risk from expired licenses or unreviewed terms.",
  },
  {
    q: "What should I look for in the best subscription renewal software?",
    a: "Look for automated reminders, team ownership, a renewal dashboard, clear reporting, and straightforward onboarding.",
  },
  {
    q: "How quickly can a team implement a renewal tracking system?",
    a: "Most teams can launch in days by importing renewal records, assigning owners, and activating reminder workflows for high-priority items first.",
  },
  {
    q: "Does renewal tracking software help reduce costs?",
    a: "Yes. It helps prevent unnecessary auto-renewals, supports timely renegotiation, and improves visibility into future commitments.",
  },
] as const;

export function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-700">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <img src="/logo.png" alt="KnowRenewals logo" className="h-10 w-auto" />

          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">
              Features
            </a>
            <a href="#faq" className="hover:text-slate-900">
              FAQ
            </a>
            <a href="#pricing" className="hover:text-slate-900">
              Pricing
            </a>
            <Link to="/blog" reloadDocument className="hover:text-slate-900">
              Blog
            </Link>
            <Link to="/login" reloadDocument className="hover:text-slate-900">
              Login
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              to="/signup"
              reloadDocument
              className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 active:scale-95"
            >
              Get Started
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
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-slate-900">
                FAQ
              </a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-slate-900">
                Pricing
              </a>
              <Link to="/blog" reloadDocument className="hover:text-slate-900">
                Guides
              </Link>
              <Link
                to="/signup"
                reloadDocument
                className="inline-flex w-fit items-center rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
              >
                Start Free Trial
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Renewal Tracking Software for Subscriptions, Contracts, and SaaS
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              KnowRenewals is renewal tracking software for subscriptions, contracts, and SaaS. It helps startups and
              small businesses track subscription renewals, contract renewals, software license renewals, and domain
              renewals in one place.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/signup"
                reloadDocument
                className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 active:scale-95"
              >
                Start Tracking Renewals
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                to="/renewal-tracking-software"
                reloadDocument
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 active:scale-95"
              >
                Read Buyer Guide
              </Link>
            </div>
            <p className="mt-5 text-sm text-slate-500">
              Built for startups, finance teams, operations admins, and procurement owners.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-900">Renewal dashboard for teams</p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Preview</span>
            </div>
            <div className="mb-4 space-y-3">
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">Domain Renewal</p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-rose-700">3 days left</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">Owner: IT Team - Reminder sent</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">Cloud Subscription</p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">10 days left</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">Owner: Ops - Reminder in 3 days</p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">Security License</p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">28 days left</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">Owner: Finance - On track</p>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600">Timeline checkpoints: 90, 60, 30, 14, and 7 days.</p>
            </div>
          </div>
        </section>

        <section id="features" className="space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Track every renewal in one place</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">Subscription renewal tracker</h3>
              <p className="mt-2 text-sm text-slate-600">
                Manage recurring payments and renewals with a shared subscription renewal calendar.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">Contract renewal management software</h3>
              <p className="mt-2 text-sm text-slate-600">
                Track contract notice periods and expiration dates with a contract reminder system.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">SaaS renewal management</h3>
              <p className="mt-2 text-sm text-slate-600">
                Align IT, operations, and finance with one centralized renewal management system.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">License and domain renewal reminders</h3>
              <p className="mt-2 text-sm text-slate-600">
                Track software license renewals and use a domain renewal reminder tool to prevent outages.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Why teams replace manual tracking</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Alternatives to manual renewal tracking reduce missed deadlines
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                B2B subscription tracking software improves ownership and visibility
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Renewal reminder software prevents costly auto-renew surprises
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Renewal dashboard for teams supports planning and audits
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Slack renewal alerts improve response speed on risk contracts
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Internal resources for buyers</h2>
            <div className="mt-4 space-y-2 text-sm">
              <Link className="block text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software">
                Renewal tracking software guide
              </Link>
              <Link className="block text-emerald-700 hover:text-emerald-800" to="/subscription-renewal-tracker">
                How to track subscription renewals
              </Link>
              <Link className="block text-emerald-700 hover:text-emerald-800" to="/contract-renewal-management-software">
                Contract expiration tracking system setup
              </Link>
              <Link className="block text-emerald-700 hover:text-emerald-800" to="/saas-renewal-management">
                How to manage SaaS renewals
              </Link>
              <Link className="block text-emerald-700 hover:text-emerald-800" to="/excel-vs-renewal-tracking-software">
                Excel vs renewal tracking software
              </Link>
              <Link className="block text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software-pricing">
                Renewal tracking software pricing
              </Link>
              <Link className="block text-emerald-700 hover:text-emerald-800" to="/slack-renewal-alerts">
                Slack renewal alerts setup
              </Link>
              <Link className="block text-emerald-700 hover:text-emerald-800" to="/slack-alerts-vs-email-reminders">
                Slack vs email reminders for renewals
              </Link>
              <Link className="block text-emerald-700 hover:text-emerald-800" to="/blog/how-to-send-renewal-reminders-to-slack">
                How to send renewal reminders to Slack
              </Link>
              <Link className="block text-emerald-700 hover:text-emerald-800" to="/blog">
                Blog: long-tail renewal management guides
              </Link>
            </div>
          </article>
        </section>

        <section id="pricing" className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Affordable renewal management software pricing</h2>
            <p className="text-sm text-slate-600">
              Choose the best subscription renewal software plan based on team size and renewal volume.
            </p>
            <p className="text-sm text-slate-600">
              Slack alerts are included across plans: Founders includes daily digest, and Pro/Team include instant risk alerts.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Founders Plan</p>
              <p className="mt-2 text-sm text-slate-600">$19 / month or $190 / year</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Up to 25 renewals</li>
                <li>1 user</li>
                <li>Email reminders</li>
                <li>Slack daily digest alerts</li>
                <li>CSV import and export</li>
              </ul>
              <Link
                to="/signup"
                reloadDocument
                className="mt-6 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Get Founders Plan
              </Link>
            </article>

            <article className="rounded-xl border-2 border-emerald-400 bg-emerald-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">Pro Plan</p>
              <p className="mt-2 text-sm text-slate-600">$99 / month or $990 / year</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Unlimited renewals</li>
                <li>Up to 5 users</li>
                <li>Custom reminder schedules</li>
                <li>Slack daily digest + instant risk alerts</li>
                <li>Team-wide visibility</li>
              </ul>
              <Link
                to="/signup"
                reloadDocument
                className="mt-6 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Start Pro Plan
              </Link>
            </article>

            <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-700">Team Plan</p>
              <p className="mt-2 text-sm text-slate-600">$199 / month or $1,990 / year</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Up to 15 users</li>
                <li>Role-based access</li>
                <li>Shared renewal ownership</li>
                <li>Full Slack alerting workflow</li>
                <li>Priority support</li>
              </ul>
              <Link
                to="/signup"
                reloadDocument
                className="mt-6 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Start Team Plan
              </Link>
            </article>
          </div>
        </section>

        <section id="faq" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Frequently asked questions</h2>
          <div className="mt-6 space-y-5">
            {faqItems.map((item) => (
              <article key={item.q}>
                <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-base text-slate-700">Stop relying on memory and spreadsheets.</p>
          <p className="mt-2 text-base text-slate-700">Start tracking your renewals with confidence.</p>
          <Link
            to="/signup"
            reloadDocument
            className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 active:scale-95"
          >
            Get Started with KnowRenewals
          </Link>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div>
            <p className="text-base font-semibold tracking-tight text-slate-900">KnowRenewals</p>
            <p className="mt-2 text-sm text-slate-500">
              A renewal tracking app for startups, small businesses, and finance/admin teams.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/renewal-tracking-software">Renewal management platform</Link>
              </li>
              <li>
                <Link to="/renewal-tracking-software-pricing">Pricing plans</Link>
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
