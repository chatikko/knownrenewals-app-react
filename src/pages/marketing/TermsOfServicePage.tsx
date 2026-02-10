import { Link } from "react-router-dom";

export function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-700 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="mb-8">
          <Link to="/" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
            ← Back to home
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Terms of Service</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: February 4, 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-base font-semibold text-slate-900">Service Scope</h2>
            <p className="mt-2">
              KnowRenewals provides contract tracking, renewal alerts, and related dashboard functionality for business
              users.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Account Responsibility</h2>
            <p className="mt-2">
              You are responsible for keeping login credentials secure and ensuring the contract details entered into
              the platform are accurate and up to date.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Billing</h2>
            <p className="mt-2">
              Subscriptions renew according to your selected plan until canceled. You can cancel anytime, and access
              remains available through the current billing period.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Acceptable Use</h2>
            <p className="mt-2">
              You agree not to misuse the service, attempt unauthorized access, or use the platform in a way that
              disrupts system availability for other users.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
              <a className="text-emerald-700 hover:text-emerald-800" href="mailto:contact@knowrenewals.com">
                contact@knowrenewals.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsOfServicePage;
