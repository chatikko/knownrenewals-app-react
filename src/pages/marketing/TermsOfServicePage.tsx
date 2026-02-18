import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

export function TermsOfServicePage() {
  return (
    <SeoPageLayout
      title="Terms of Service"
      description="Review KnowRenewals terms, account responsibilities, billing conditions, and acceptable use."
    >
      <p className="text-sm text-slate-500">Last updated: February 4, 2026</p>

      <section>
        <h2 className="text-base font-semibold text-slate-900">Service Scope</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          KnowRenewals provides contract tracking, renewal alerts, and related dashboard functionality for business
          users.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900">Account Responsibility</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          You are responsible for keeping login credentials secure and ensuring the contract details entered into the
          platform are accurate and up to date.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900">Billing</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Subscriptions renew according to your selected plan until canceled. You can cancel anytime, and access
          remains available through the current billing period.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900">Acceptable Use</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          You agree not to misuse the service, attempt unauthorized access, or use the platform in a way that disrupts
          system availability for other users.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-slate-900">Contact</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Questions about these terms can be sent to{" "}
          <a className="text-emerald-700 hover:text-emerald-800" href="mailto:contact@knowrenewals.com">
            contact@knowrenewals.com
          </a>
          .
        </p>
      </section>
    </SeoPageLayout>
  );
}

export default TermsOfServicePage;

