import { Link } from "react-router-dom";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

export function SaasRenewalPage() {
  return (
    <SeoPageLayout
      title="SaaS Renewal Management for Startups and Finance Teams"
      description="Manage SaaS renewals with a centralized renewal management system that keeps IT, finance, and operations aligned."
    >
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How to manage SaaS renewals at scale</h2>
      <p className="text-sm leading-relaxed text-slate-600">
        B2B subscription tracking software helps teams organize upcoming renewals by month, owner, and vendor risk.
        This creates time to optimize spend, remove unused tools, and negotiate before invoices renew.
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">SaaS renewal management workflow</h2>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
        <li>Capture each tool, billing cycle, and renewal date</li>
        <li>Assign business owner and financial approver</li>
        <li>Use automated renewal reminders for business stakeholders</li>
        <li>Review utilization and contract terms before each deadline</li>
      </ul>
      <p className="text-sm text-slate-600">
        Compare manual and automated options in{" "}
        <Link className="text-emerald-700 hover:text-emerald-800" to="/excel-vs-renewal-tracking-software">
          Excel vs renewal tracking software
        </Link>
        .
      </p>
    </SeoPageLayout>
  );
}

export default SaasRenewalPage;

