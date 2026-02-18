import { Link } from "react-router-dom";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

export function RenewalReminderSoftwarePage() {
  return (
    <SeoPageLayout
      title="Renewal Reminder Software for SMB Teams"
      description="Automate renewal reminders for subscriptions, contracts, domains, and licenses so teams act before deadlines."
    >
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Why teams need renewal reminder software
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Renewal reminder software keeps every due date visible, assigns clear owners, and removes manual follow-up.
          Instead of relying on inbox memory, teams run a repeatable process that prevents missed renewals.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Role-based value</h2>
        <h3 className="text-lg font-semibold text-slate-900">Finance</h3>
        <p className="text-sm text-slate-600">
          Improve spend forecasting and avoid surprise auto-renew charges with earlier visibility.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Ops and Admin</h3>
        <p className="text-sm text-slate-600">
          Standardize owner accountability and reduce manual chasing across recurring renewals.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">IT and Procurement</h3>
        <p className="text-sm text-slate-600">
          Track license, domain, and vendor deadlines in one queue with reliable escalation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Implementation checklist</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Import all subscription, contract, domain, and license renewals into one dashboard.</li>
          <li>Assign one owner and backup owner for each renewal item.</li>
          <li>Enable automated reminder windows at 90, 60, 30, and 14 days.</li>
          <li>Set weekly review routines for contracts due in the next 45 days.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">FAQ</h2>
        <article>
          <h3 className="text-base font-semibold text-slate-900">What does renewal reminder software automate?</h3>
          <p className="mt-1 text-sm text-slate-600">
            It automates reminder schedules, owner notifications, and escalation for at-risk renewals.
          </p>
        </article>
        <article>
          <h3 className="text-base font-semibold text-slate-900">
            How early should reminders start before renewal deadlines?
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Most B2B teams start at 60 to 90 days, then escalate closer to notice-period cutoffs.
          </p>
        </article>
        <article>
          <h3 className="text-base font-semibold text-slate-900">
            Can small teams use renewal reminder software without complex setup?
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Yes. Most teams can launch quickly by importing records and enabling default reminder windows first.
          </p>
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Start with a lead-ready workflow</h2>
        <p className="mt-2 text-sm text-slate-600">
          Use automation to reduce missed deadlines and improve renewal outcomes across finance and operations.
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

export default RenewalReminderSoftwarePage;
