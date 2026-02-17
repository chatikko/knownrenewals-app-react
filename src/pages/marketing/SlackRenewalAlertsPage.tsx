import { Link } from "react-router-dom";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

const faqItems = [
  {
    question: "Do Slack renewal alerts replace email reminders?",
    answer:
      "They complement email. Slack improves team visibility and faster follow-up, while email still supports formal audit trails.",
  },
  {
    question: "Can one channel cover contracts, SaaS, and subscription renewals?",
    answer:
      "Yes. Most teams start with one default channel, then keep daily digest plus instant risk alerts in the same workflow.",
  },
  {
    question: "How quickly can a team launch Slack renewal alerts?",
    answer:
      "Most teams can connect Slack, pick a default channel, and send a test alert in under 30 minutes.",
  },
] as const;

export function SlackRenewalAlertsPage() {
  return (
    <SeoPageLayout
      title="Slack Renewal Alerts for Subscription and Contract Deadlines"
      description="Send daily digest and instant risk renewal alerts to Slack so finance, ops, and IT teams act before renewal deadlines."
    >
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Why teams miss renewals without real-time alerts</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Missed renewals are usually a workflow visibility problem. When reminders stay buried in spreadsheets or
          inboxes, owners do not escalate decisions early enough. Slack renewal alerts give teams a shared action
          stream before notice deadlines and auto-renew dates.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How KnowRenewals and Slack work together</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Connect one workspace, choose a default channel, and send renewal updates where teams already coordinate
          daily operations.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Daily digest at 09:00 account timezone for upcoming renewals</li>
          <li>Instant alerts for risk renewals and due-in-7-days windows</li>
          <li>Direct links from alerts to contract records for quick action</li>
          <li>One channel setup for consistent finance and operations handoffs</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Role-based value across teams</h2>
        <h3 className="text-lg font-semibold text-slate-900">Finance</h3>
        <p className="text-sm text-slate-600">
          Get earlier visibility into high-risk renewals so budget approvals and vendor negotiation timing do not
          compress into the final week.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Ops and Admin</h3>
        <p className="text-sm text-slate-600">
          Keep one operating rhythm for reminders, escalation, and owner follow-up instead of chasing updates across
          disconnected trackers.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">IT and Procurement</h3>
        <p className="text-sm text-slate-600">
          Move renewals into active channel conversations before renewal locks, reducing late-stage surprises on
          contract terms and tool usage decisions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Implementation checklist</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Connect Slack from Integrations and confirm workspace access</li>
          <li>Select a default channel for renewal operations</li>
          <li>Enable daily digest and test delivery</li>
          <li>Turn on instant risk and due-in-7-days alerts for critical vendors</li>
          <li>Run a weekly review of unresolved renewals from Slack alerts</li>
        </ul>
      </section>

      <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Frequently asked questions</h2>
        {faqItems.map((item) => (
          <article key={item.question}>
            <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Start with a Slack-ready renewal workflow</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="text-emerald-700 hover:text-emerald-800" to="/signup">
            Start Free Trial
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software-pricing">
            View pricing
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/slack-alerts-vs-email-reminders">
            Compare Slack vs email reminders
          </Link>
        </div>
      </section>
    </SeoPageLayout>
  );
}

export default SlackRenewalAlertsPage;
