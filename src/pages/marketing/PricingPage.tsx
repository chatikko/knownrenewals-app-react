import { Link } from "react-router-dom";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

export function PricingPage() {
  return (
    <SeoPageLayout
      title="Renewal Tracking Software Pricing for Startups and SMBs"
      description="Compare affordable renewal management software plans and choose a subscription renewal tracker that fits your team."
    >
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">What impacts renewal software pricing</h2>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
        <li>Number of tracked renewals and contracts</li>
        <li>Team size and ownership workflows</li>
        <li>Reminder automation and reporting needs</li>
      </ul>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How to evaluate affordability</h2>
      <p className="text-sm leading-relaxed text-slate-600">
        Affordable renewal management software should cost less than the avoidable waste from missed deadlines,
        unplanned auto-renewals, and lost negotiation leverage.
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Slack alerts by plan</h2>
      <p className="text-sm leading-relaxed text-slate-600">
        Choose the plan based on how your team wants to coordinate renewal decisions in Slack.
      </p>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
        <li>Founders: Slack daily digest for upcoming renewals</li>
        <li>Pro: Slack daily digest plus instant risk and due-in-7-days alerts</li>
        <li>Team: Full Slack alerting workflow with shared team operations</li>
      </ul>
      <p className="text-sm text-slate-600">
        If your team still uses spreadsheets, start with the{" "}
        <Link className="text-emerald-700 hover:text-emerald-800" to="/free-renewal-tracking-spreadsheet-template">
          free renewal tracking spreadsheet template
        </Link>
        .
      </p>
      <p className="text-sm text-slate-600">
        Review{" "}
        <Link className="text-emerald-700 hover:text-emerald-800" to="/slack-renewal-alerts">
          Slack renewal alerts
        </Link>{" "}
        and{" "}
        <Link className="text-emerald-700 hover:text-emerald-800" to="/slack-alerts-vs-email-reminders">
          Slack vs email reminders
        </Link>{" "}
        before choosing a plan.
      </p>
      <p className="text-sm text-slate-600">
        Compare adjacent options including{" "}
        <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-reminder-software">
          renewal reminder software
        </Link>
        ,{" "}
        <Link className="text-emerald-700 hover:text-emerald-800" to="/contract-reminder-system">
          contract reminder systems
        </Link>
        , and a{" "}
        <Link className="text-emerald-700 hover:text-emerald-800" to="/best-subscription-renewal-software">
          best subscription renewal software buyer guide
        </Link>
        .
      </p>
      <p className="text-sm text-slate-600">
        If your team wants a broader operating model, review the{" "}
        <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-management-platform">
          renewal management platform overview
        </Link>
        .
      </p>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-lg font-semibold text-slate-900">Ready to start?</h3>
        <p className="mt-2 text-sm text-slate-600">
          View full plan details on the{" "}
          <a className="text-emerald-700 hover:text-emerald-800" href="/#pricing">
            pricing section
          </a>{" "}
          or start with the{" "}
          <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software">
            renewal tracking software guide
          </Link>
          .
        </p>
      </div>
    </SeoPageLayout>
  );
}

export default PricingPage;
