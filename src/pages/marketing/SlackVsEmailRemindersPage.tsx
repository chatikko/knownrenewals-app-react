import { Link } from "react-router-dom";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

const faqItems = [
  {
    question: "Is Slack enough without any email reminders?",
    answer:
      "Most teams use both. Slack drives fast collaboration, while email can remain a parallel record for stakeholders who are not in the channel.",
  },
  {
    question: "Which channel setup works best for renewal alerts?",
    answer:
      "A dedicated channel with finance, operations, and relevant owners works best, with clear expectations for response and escalation.",
  },
  {
    question: "Does Slack reduce missed renewal deadlines?",
    answer:
      "Yes. Teams usually respond faster when reminders are visible in shared channels with clear ownership and links to action.",
  },
] as const;

export function SlackVsEmailRemindersPage() {
  return (
    <SeoPageLayout
      title="Slack Alerts vs Email Reminders for Renewal Management"
      description="Compare Slack alerts and email reminders for renewal management speed, ownership, and deadline coverage."
    >
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">The real issue is response speed</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Most renewal failures happen because teams see reminders too late or cannot align decision-makers quickly.
          Comparing Slack and email is mostly about response speed, shared visibility, and how consistently teams close
          decisions before notice windows.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How KnowRenewals delivers alerts across channels</h2>
        <p className="text-sm leading-relaxed text-slate-600">
          KnowRenewals supports workflow-based reminders, and Slack becomes the collaboration layer for daily digest and
          instant risk signals.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Slack: fast visibility and channel-level accountability</li>
          <li>Email: durable record and asynchronous follow-up</li>
          <li>Shared dashboard: source of truth for renewal status and ownership</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Role-based decision impact</h2>
        <h3 className="text-lg font-semibold text-slate-900">Finance</h3>
        <p className="text-sm text-slate-600">
          Slack shortens approval loops when pricing or budget questions surface near renewal deadlines.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">Ops and Admin</h3>
        <p className="text-sm text-slate-600">
          Channel alerts create one shared queue for follow-ups instead of scattered email threads.
        </p>
        <h3 className="text-lg font-semibold text-slate-900">IT and Procurement</h3>
        <p className="text-sm text-slate-600">
          Technical and commercial decisions can happen in one stream with clear owner assignment and escalation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Implementation checklist</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Define one default Slack channel for renewal operations</li>
          <li>Keep a weekly review cadence for open renewal alerts</li>
          <li>Use email for external stakeholders who are not in Slack</li>
          <li>Track outcomes in the dashboard so alerting maps to decisions</li>
          <li>Revisit escalation rules quarterly for high-value contracts</li>
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
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Move from reminders to action</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="text-emerald-700 hover:text-emerald-800" to="/signup">
            Start Free Trial
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software-pricing">
            View pricing
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/slack-renewal-alerts">
            Explore Slack renewal alerts
          </Link>
        </div>
      </section>
    </SeoPageLayout>
  );
}

export default SlackVsEmailRemindersPage;
