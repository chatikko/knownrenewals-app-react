import { Link } from "react-router-dom";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

export function ContractReminderSystemPage() {
  return (
    <SeoPageLayout
      title="Contract Reminder System for Renewal Deadlines"
      description="Track notice periods, expiration dates, and owner actions with a contract reminder system built for B2B teams."
    >
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Why contract reminder systems prevent renewal risk
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          A contract reminder system makes notice periods and expiration dates visible before deadlines close. Teams
          can move from reactive renewals to planned decisions with accountable owners.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Role-based value</h2>
        <h3 className="text-lg font-semibold text-slate-900">Finance</h3>
        <p className="text-sm text-slate-600">
          Review contract value and budget impact earlier, instead of approving last-minute renewals.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Ops and Admin</h3>
        <p className="text-sm text-slate-600">
          Keep one source of truth for owner assignment, reminder status, and renewal progress.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">IT and Procurement</h3>
        <p className="text-sm text-slate-600">
          Coordinate legal and vendor negotiation milestones before notice windows expire.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Implementation checklist</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Record contract expiration date, notice period, owner, and approver for every vendor.</li>
          <li>Set reminder cadence for 90, 60, 30, and 14 days before notice-period deadlines.</li>
          <li>Escalate contracts with no owner updates to finance or procurement at risk thresholds.</li>
          <li>Run weekly reviews for contracts due in the next 30 to 45 days.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">FAQ</h2>
        <article>
          <h3 className="text-base font-semibold text-slate-900">
            What is the difference between a contract reminder system and spreadsheets?
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            A contract reminder system automates reminders and ownership workflows, while spreadsheets require manual
            follow-up.
          </p>
        </article>
        <article>
          <h3 className="text-base font-semibold text-slate-900">How do notice periods affect renewals?</h3>
          <p className="mt-1 text-sm text-slate-600">
            If notice periods are missed, contracts may auto-renew. Early reminders protect negotiation and cancellation
            options.
          </p>
        </article>
        <article>
          <h3 className="text-base font-semibold text-slate-900">Who should own contract reminders?</h3>
          <p className="mt-1 text-sm text-slate-600">
            Assign one business owner per contract, with finance or procurement as the approval owner.
          </p>
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Reduce missed contract deadlines</h2>
        <p className="mt-2 text-sm text-slate-600">
          Standardize your contract reminders and improve renewal decision timing across teams.
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

export default ContractReminderSystemPage;
