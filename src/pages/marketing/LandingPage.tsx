import { Link } from "react-router-dom";
import { Check, ChevronRight, Github, Linkedin, Menu, Twitter } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-700">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <img src="/logo.png" alt="KnowRenewals logo" className="h-10 w-auto" />

          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">
              Features
            </a>
            <a href="#pricing" className="hover:text-slate-900">
              Pricing
            </a>
            <Link to="/login" className="hover:text-slate-900">
              Login
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              to="/signup"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          <button type="button" className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-600 md:hidden">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Never Miss a Renewal Again. Never Pay for Surprises.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Track all your business renewals - subscriptions, contracts, licenses, domains - in one place with
              automatic reminders.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 active:scale-95"
              >
                Start Tracking Renewals
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
              <a
                href="#why"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 active:scale-95"
              >
                View How It Works
              </a>
            </div>
            <p className="mt-5 text-sm text-slate-500">No integrations - Setup in minutes - Built for small &amp; mid-size teams</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-900">Upcoming Renewal Timeline</p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Preview</span>
            </div>
            <div className="mb-4 space-y-3">
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">Domain Renewal</p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-rose-700">3 days left</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">Owner: IT Team • Reminder sent</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">Cloud Subscription</p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">10 days left</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">Owner: Ops • Reminder in 3 days</p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">Security License</p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">28 days left</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">Owner: Finance • On track</p>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600">Timeline checkpoints: Today, 7 days, 14 days, 30 days.</p>
            </div>
          </div>
        </section>

        <section id="why" className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Renewals fail silently - until they cost you money.</h2>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              <li>Auto-renewals at outdated or inflated pricing</li>
              <li>Missed contract expirations and service disruptions</li>
              <li>No single source of truth for renewal dates</li>
              <li>Last-minute panic before renewals</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">One place to manage every renewal</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Centralize all renewal dates
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Get timely email reminders before renewals happen
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Track who owns each renewal
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Export renewal data for budgeting and audits
              </li>
            </ul>
          </article>
        </section>

        <section id="features" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Core features</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Central renewal dashboard</p>
              <p className="mt-1 text-sm text-slate-600">View all upcoming renewals in one timeline.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Custom reminders</p>
              <p className="mt-1 text-sm text-slate-600">Get notified days or weeks before a renewal.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Multiple renewal types</p>
              <p className="mt-1 text-sm text-slate-600">Subscriptions, contracts, licenses, domains, certificates.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">CSV import &amp; export</p>
              <p className="mt-1 text-sm text-slate-600">Move from spreadsheets in minutes.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Team access</p>
              <p className="mt-1 text-sm text-slate-600">Share visibility across ops, finance, and IT.</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Pricing</h2>
            <p className="text-lg font-medium text-slate-800">Simple pricing. Built for teams that cannot afford renewal mistakes.</p>
            <p className="text-sm text-slate-600">Track all your business renewals with clear pricing and no hidden fees.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Founders Plan (Early Access)</p>
              <p className="mt-2 text-sm text-slate-600">$19 / month or $190 / year</p>
              <p className="mt-1 text-xs font-medium text-amber-700">Only for the first 50 users.</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Up to 25 renewals</li>
                <li>1 user</li>
                <li>Email reminders</li>
                <li>CSV import &amp; export</li>
              </ul>
              <Link to="/signup" className="mt-6 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                Get Founders Plan
              </Link>
            </article>

            <article className="rounded-xl border-2 border-emerald-400 bg-emerald-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">Pro Plan (Most Popular)</p>
              <p className="mt-2 text-sm text-slate-600">$99 / month or $990 / year</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>Unlimited renewals</li>
                <li>Up to 5 users</li>
                <li>Custom reminder schedules</li>
                <li>Team-wide visibility</li>
              </ul>
              <Link to="/signup" className="mt-6 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
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
                <li>Priority support</li>
              </ul>
              <Link to="/signup" className="mt-6 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                Start Team Plan
              </Link>
            </article>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-base text-slate-700">Stop relying on memory and spreadsheets.</p>
          <p className="mt-2 text-base text-slate-700">Start tracking your renewals with confidence.</p>
          <Link
            to="/signup"
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
              KnowRenewals is built for clarity, reliability, and speed - not complexity.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a href="mailto:contact@knowrenewals.com">Contact</a>
              </li>
              <li>
                <a href="#">About</a>
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
