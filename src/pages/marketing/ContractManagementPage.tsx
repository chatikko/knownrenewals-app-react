import { Link } from "react-router-dom";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

export function ContractManagementPage() {
  return (
    <SeoPageLayout
      title="Contract Renewal Management Software with Reminder Workflows"
      description="Use a contract reminder system to track expiration dates, notice periods, and ownership before renewals trigger."
    >
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Contract expiration tracking system essentials</h2>
      <p className="text-sm leading-relaxed text-slate-600">
        High-value contracts require more than a date field. Your contract renewal management software should track
        notice terms, auto-renew clauses, account owners, and renewal risk status so teams can act on time.
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Recommended setup</h2>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
        <li>Set 90, 60, and 30 day reminders for each contract</li>
        <li>Assign primary and backup owners across legal, finance, and operations</li>
        <li>Escalate high-value contract reminders automatically</li>
      </ul>
      <p className="text-sm text-slate-600">
        For startup-focused guidance, see{" "}
        <Link className="text-emerald-700 hover:text-emerald-800" to="/saas-renewal-management">
          how to manage SaaS renewals
        </Link>
        .
      </p>
    </SeoPageLayout>
  );
}

export default ContractManagementPage;

