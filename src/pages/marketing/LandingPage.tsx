import { Link } from "react-router-dom";
import {
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  Github,
  Linkedin,
  Menu,
  Shield,
  Twitter,
} from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-700">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-lg font-semibold tracking-tight text-slate-900">KnowRenewals</div>

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

      <main className="mx-auto w-full max-w-7xl space-y-20 px-4 py-12 sm:px-6 lg:px-8">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Manage Contracts with Confidence
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Automated renewal alerts and centralized tracking for growing businesses.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 active:scale-95"
              >
                Start Free Trial
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 active:scale-95"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">Dashboard Preview</p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Live</span>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-500">Total Contracts</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">42</p>
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <p className="text-[11px] text-amber-700">Expiring Soon</p>
                  <p className="mt-1 text-lg font-semibold text-amber-700">7</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[11px] text-slate-500">Monthly Value</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">$18.4k</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-12 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <div className="col-span-6 h-2 rounded bg-slate-300" />
                  <div className="col-span-3 ml-3 h-2 rounded bg-slate-200" />
                  <div className="col-span-3 ml-3 h-2 rounded bg-emerald-200" />
                </div>
                <div className="grid grid-cols-12 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <div className="col-span-6 h-2 rounded bg-slate-300" />
                  <div className="col-span-3 ml-3 h-2 rounded bg-slate-200" />
                  <div className="col-span-3 ml-3 h-2 rounded bg-amber-200" />
                </div>
                <div className="grid grid-cols-12 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <div className="col-span-6 h-2 rounded bg-slate-300" />
                  <div className="col-span-3 ml-3 h-2 rounded bg-slate-200" />
                  <div className="col-span-3 ml-3 h-2 rounded bg-rose-200" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-56 rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur lg:block">
              <p className="text-xs font-medium text-slate-500">Renewal Risk</p>
              <div className="mt-3 h-2 rounded bg-slate-100">
                <div className="h-2 w-3/4 rounded bg-emerald-500" />
              </div>
              <p className="mt-2 text-xs text-slate-600">75% contracts in safe window</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6">
          <p className="text-center text-xs font-medium uppercase tracking-wider text-slate-500">Trusted by</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm text-slate-400 sm:grid-cols-4 lg:grid-cols-6">
            <div>Company A</div>
            <div>Company B</div>
            <div>Company C</div>
            <div>Company D</div>
            <div>Company E</div>
            <div>Company F</div>
          </div>
        </section>

        <section id="features" className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Bell className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">Smart Alerts</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Get notified before contracts expire so your team can act on time.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Shield className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">Secure Repository</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Keep all contract files in one encrypted location with controlled access.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">Spend Analytics</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Track contract spend and identify renewal exposure across vendors.
              </p>
            </article>
          </div>
        </section>

        <section id="pricing" className="space-y-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900">Pricing</h2>
          <div className="mx-auto max-w-md rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-8 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Pro</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Monthly</p>
                <div className="mt-1 flex items-end gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-slate-900">$19</span>
                  <span className="pb-1 text-xs text-slate-500">/month</span>
                </div>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Yearly</p>
                <div className="mt-1 flex items-end gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-slate-900">$190</span>
                  <span className="pb-1 text-xs text-slate-500">/year</span>
                </div>
                <p className="mt-1 text-xs font-medium text-emerald-700">Save $38 vs monthly</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" /> Unlimited Contracts
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" /> Email Alerts
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" /> Slack Integration
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" /> PDF Export
              </li>
            </ul>
            <Link
              to="/signup"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 active:scale-95"
            >
              Start Your 14-Day Free Trial
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div>
            <p className="text-base font-semibold tracking-tight text-slate-900">KnowRenewals</p>
            <p className="mt-2 text-sm text-slate-500">Contract renewals made predictable.</p>
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
