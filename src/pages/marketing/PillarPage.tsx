import { Link } from "react-router-dom";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

export function PillarPage() {
  return (
    <SeoPageLayout
      title="Renewal Tracking Software for Modern B2B Teams"
      description="Use one renewal management platform to track subscriptions, contracts, SaaS tools, licenses, and domains with automated renewal reminders."
    >
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">What renewal tracking software solves</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Teams miss deadlines when renewal data is spread across inboxes and spreadsheets. A centralized renewal
          management system improves visibility, prevents unwanted auto-renewals, and gives finance and admin teams
          time to negotiate before commitments lock in.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">What to track in one dashboard</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Subscription renewal tracker data for recurring software and services</li>
          <li>Contract expiration tracking system details including notice periods</li>
          <li>SaaS renewal management milestones by owner and department</li>
          <li>Software license and domain expiration dates with reminder workflows</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How to choose the best solution</h2>
        <h3 className="text-lg font-semibold text-slate-900">Prioritize automation and accountability</h3>
        <p className="text-sm text-slate-600">
          Look for automated renewal reminders, shared ownership, audit-ready history, and reporting that supports
          recurring payment planning across teams.
        </p>
        <p className="text-sm text-slate-600">
          Teams that coordinate in channels can use{" "}
          <Link className="text-emerald-700 hover:text-emerald-800" to="/slack-renewal-alerts">
            Slack renewal alerts
          </Link>{" "}
          to improve response speed on risk renewals.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Validate cost against avoidable waste</h3>
        <p className="text-sm text-slate-600">
          Compare software cost against fees from missed deadlines, unreviewed auto-renewals, and avoidable price
          increases.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Next steps</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software-pricing">
            View pricing
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/excel-vs-renewal-tracking-software">
            Compare with spreadsheets
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/blog">
            Read implementation guides
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/slack-renewal-alerts">
            Explore Slack renewal alerts
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/slack-alerts-vs-email-reminders">
            Review Slack vs email reminders
          </Link>
        </div>
      </section>
    </SeoPageLayout>
  );
}

export default PillarPage;
