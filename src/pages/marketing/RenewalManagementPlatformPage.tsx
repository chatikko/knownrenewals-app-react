import { Link } from "react-router-dom";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

export function RenewalManagementPlatformPage() {
  return (
    <SeoPageLayout
      title="Renewal Management Platform for Finance and Ops"
      description="Use one renewal management platform to centralize recurring renewals, ownership, reminders, and reporting."
    >
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Why teams move to a renewal management platform
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          A renewal management platform centralizes subscriptions, contracts, SaaS renewals, domain dates, and license
          expirations. Teams get one operating system for reminders, ownership, and reporting.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Role-based value</h2>
        <h3 className="text-lg font-semibold text-slate-900">Finance</h3>
        <p className="text-sm text-slate-600">
          Get earlier renewal visibility for budget planning and vendor cost control.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Ops and Admin</h3>
        <p className="text-sm text-slate-600">
          Keep accountability clear with owner assignments and status views by risk level.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">IT and Procurement</h3>
        <p className="text-sm text-slate-600">
          Manage critical renewal workflows across tools and vendors without siloed spreadsheets.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Implementation checklist</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Consolidate all renewal records into one standardized data model.</li>
          <li>Create owner-based queues and shared team dashboards by renewal status.</li>
          <li>Enable reminder automation and escalation for risk and near-term deadlines.</li>
          <li>Review performance weekly using due-soon and missed-deadline metrics.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">FAQ</h2>
        <article>
          <h3 className="text-base font-semibold text-slate-900">
            What should a renewal management platform include?
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            It should include centralized records, owner workflows, automated reminders, and reporting for upcoming
            renewals.
          </p>
        </article>
        <article>
          <h3 className="text-base font-semibold text-slate-900">
            Is a renewal management platform useful for startups?
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Yes. Startups gain control quickly by replacing manual tracking before renewal volume grows.
          </p>
        </article>
        <article>
          <h3 className="text-base font-semibold text-slate-900">
            Can it handle multiple renewal types in one workflow?
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Yes. Teams can track subscriptions, contracts, SaaS tools, domains, and licenses in one platform.
          </p>
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Build your centralized renewal workflow</h2>
        <p className="mt-2 text-sm text-slate-600">
          Start with one platform and reduce deadline risk while improving team accountability.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link className="text-emerald-700 hover:text-emerald-800" to="/signup">
            Start Free Trial
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software-pricing">
            View pricing
          </Link>
        </div>
      </section>
    </SeoPageLayout>
  );
}

export default RenewalManagementPlatformPage;
