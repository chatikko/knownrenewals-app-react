import { Link } from "react-router-dom";

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-700 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="mb-8">
          <Link to="/" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
            ← Back to home
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: February 4, 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-base font-semibold text-slate-900">Information We Collect</h2>
            <p className="mt-2">
              We collect account information such as name, email, and company details, plus contract metadata you
              enter to track renewal dates and notice periods.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">How We Use Information</h2>
            <p className="mt-2">
              We use your data to provide the service, send renewal reminders, support your team, and maintain system
              security and reliability.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Data Sharing</h2>
            <p className="mt-2">
              We do not sell your data. We only share data with service providers needed to operate the platform, such
              as hosting and email delivery vendors.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Data Retention</h2>
            <p className="mt-2">
              We retain account and contract data while your account is active and for a limited period after account
              closure to meet legal, security, and operational requirements.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Contact</h2>
            <p className="mt-2">
              For privacy-related questions, contact us at{" "}
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

export default PrivacyPolicyPage;
