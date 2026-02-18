import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

type MarketingShellProps = {
  children: ReactNode;
};

export function MarketingShell({ children }: MarketingShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" reloadDocument className="inline-flex items-center">
            <img src="/logo.png" alt="KnowRenewals logo" className="h-10 w-auto" />
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <Link to="/renewal-tracking-software-features" reloadDocument className="transition-colors hover:text-slate-900">
              Features
            </Link>
            <Link to="/renewal-tracking-software-pricing" reloadDocument className="transition-colors hover:text-slate-900">
              Pricing
            </Link>
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
            aria-controls="marketing-shell-mobile-nav"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-600 md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div id="marketing-shell-mobile-nav" className="border-t border-slate-200 bg-white px-4 py-3 md:hidden sm:px-6">
            <nav className="flex flex-col gap-3 text-sm text-slate-700">
              <Link to="/renewal-tracking-software-features" reloadDocument className="hover:text-slate-900">
                Features
              </Link>
              <Link to="/renewal-tracking-software-pricing" reloadDocument className="hover:text-slate-900">
                Pricing
              </Link>
              <Link to="/blog" reloadDocument className="hover:text-slate-900">
                Blog
              </Link>
              <Link to="/login" reloadDocument className="hover:text-slate-900">
                Login
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

      {children}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <p className="text-base font-semibold tracking-tight text-slate-900">KnowRenewals</p>
            <p className="mt-2 text-sm text-slate-500">
              Renewal operations software for startups, SMBs, and finance/admin teams.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/renewal-tracking-software">Renewal tracking software</Link>
              </li>
              <li>
                <Link to="/renewal-tracking-software-features">Features</Link>
              </li>
              <li>
                <Link to="/renewal-tracking-software-pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/free-renewal-tracking-spreadsheet-template">Free template</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Resources</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/excel-vs-renewal-tracking-software">Excel vs software</Link>
              </li>
              <li>
                <Link to="/slack-renewal-alerts">Slack renewal alerts</Link>
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
        </div>
      </footer>
    </div>
  );
}
