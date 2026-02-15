import { Link } from "react-router-dom";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

export function SubscriptionTrackerPage() {
  return (
    <SeoPageLayout
      title="Subscription Renewal Tracker for Small Business Teams"
      description="Track recurring payments and renewals with clear owners, reminder schedules, and one subscription renewal calendar."
    >
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How to track subscription renewals</h2>
      <p className="text-sm leading-relaxed text-slate-600">
        Centralize vendor, cost, renewal date, and owner data in a subscription management tool. Then automate
        reminders before each renewal deadline so your team can review usage and pricing before renewals are processed.
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">What this page helps you do</h2>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
        <li>Build a subscription renewal calendar by vendor and due date</li>
        <li>Avoid missing renewal deadlines with automated alerts</li>
        <li>Manage recurring payments and renewals for finance reporting</li>
      </ul>
      <p className="text-sm text-slate-600">
        Need broader coverage for contracts and licenses? Visit the{" "}
        <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software">
          renewal tracking software guide
        </Link>
        .
      </p>
    </SeoPageLayout>
  );
}

export default SubscriptionTrackerPage;
