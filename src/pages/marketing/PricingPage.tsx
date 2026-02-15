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
