import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

export function PrivacyPolicyPage() {
  return (
    <SeoPageLayout
      title="Privacy Policy"
      description="Read how KnowRenewals collects, uses, and protects account and renewal-management data."
    >
      <p className="text-sm text-slate-500">Last updated: February 4, 2026</p>

      <section>
        <h2 className="text-base font-semibold text-slate-900">Information We Collect</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          We collect account information such as name, email, and company details, plus contract metadata you enter to
          track renewal dates and notice periods.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900">How We Use Information</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          We use your data to provide the service, send renewal reminders, support your team, and maintain system
          security and reliability.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900">Data Sharing</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          We do not sell your data. We only share data with service providers needed to operate the platform, such as
          hosting and email delivery vendors.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900">Data Retention</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          We retain account and contract data while your account is active and for a limited period after account
          closure to meet legal, security, and operational requirements.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900">Contact</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          For privacy-related questions, contact us at{" "}
          <a className="text-emerald-700 hover:text-emerald-800" href="mailto:contact@knowrenewals.com">
            contact@knowrenewals.com
          </a>
          .
        </p>
      </section>
    </SeoPageLayout>
  );
}

export default PrivacyPolicyPage;

