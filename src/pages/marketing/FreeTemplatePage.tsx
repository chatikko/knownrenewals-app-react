import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { leadMagnetsApi } from "@/api/leadMagnets";
import { getAccessToken, getRefreshToken } from "@/auth/tokenStorage";
import { trackEvent } from "@/lib/analytics";
import { buildAuthPath, TEMPLATE_IMPORT_ONBOARDING_PATH, TEMPLATE_ONBOARDING_SOURCE } from "@/lib/authIntent";

function readUtmParams() {
  if (typeof window === "undefined") {
    return {
      utm_source: undefined,
      utm_medium: undefined,
      utm_campaign: undefined,
      utm_term: undefined,
      utm_content: undefined,
    };
  }

  const params = new URLSearchParams(window.location.search);
  const get = (key: string) => params.get(key) ?? undefined;
  return {
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_term: get("utm_term"),
    utm_content: get("utm_content"),
  };
}

export function FreeTemplatePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<"pending" | "sent" | "failed" | "skipped" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const templateSignupPath = useMemo(
    () => buildAuthPath("/signup", TEMPLATE_ONBOARDING_SOURCE, TEMPLATE_IMPORT_ONBOARDING_PATH),
    [],
  );

  useEffect(() => {
    setIsAuthenticated(Boolean(getAccessToken() && getRefreshToken()));
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const response = await leadMagnetsApi.submitRenewalTemplate({
        email: email.trim(),
        source_path:
          typeof window === "undefined" ? "/free-renewal-tracking-spreadsheet-template" : window.location.pathname,
        referrer: typeof document === "undefined" ? undefined : document.referrer || undefined,
        ...readUtmParams(),
      });
      setSubmissionStatus(response.status);
      trackEvent("template_form_submitted", { status: response.status });

      if (response.status === "failed") {
        setSubmitError("We could not send the template right now. Please retry in a moment.");
      }
    } catch {
      setSubmitError("Could not submit right now. Please retry in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-700 sm:px-6 lg:px-8">
      <main className="mx-auto w-full max-w-4xl space-y-8">
        <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <Link to="/" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
            Back to home
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Free Renewal Tracking Spreadsheet Template
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Download the free spreadsheet with formulas, fill your contracts, then sign up and import the file to sync
            renewals into KnowRenewals without manual contract form entry.
          </p>
        </section>

        <section className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-3 sm:p-8">
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 1</p>
            <h2 className="mt-2 text-base font-semibold text-slate-900">Download template</h2>
            <p className="mt-2 text-sm text-slate-600">Get the formula-ready file and share it with your team.</p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 2</p>
            <h2 className="mt-2 text-base font-semibold text-slate-900">Fill contracts</h2>
            <p className="mt-2 text-sm text-slate-600">Add your renewals, owners, dates, and notes in bulk.</p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 3</p>
            <h2 className="mt-2 text-base font-semibold text-slate-900">Signup and import</h2>
            <p className="mt-2 text-sm text-slate-600">Upload the file in Contracts and auto-sync rows to the app.</p>
          </article>
        </section>

        <section className="grid gap-6 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2 sm:p-8">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">What you get</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li>Formula-based days-until-renewal calculations</li>
              <li>Risk labels for renewals due soon or overdue</li>
              <li>Columns for owner, spend, and renewal type</li>
              <li>Simple structure your team can share immediately</li>
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-900">Already in KnowRenewals?</h2>
                <p className="text-sm text-slate-600">
                  Skip the lead form and upload your filled spreadsheet in Contracts to auto-sync your renewals.
                </p>
                <Link
                  to={TEMPLATE_IMPORT_ONBOARDING_PATH}
                  onClick={() => trackEvent("template_cta_clicked", { location: "template_page", action: "import" })}
                  className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Import Filled Template
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-900">Send me the template</h2>
                {submissionStatus === "sent" || submissionStatus === "pending" ? (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-emerald-700">
                      {submissionStatus === "pending"
                        ? "Request received. Check your inbox in a minute."
                        : "Template sent. Check your inbox."}
                    </p>
                    <Link
                      to={templateSignupPath}
                      reloadDocument
                      onClick={() =>
                        trackEvent("signup_from_template_started", {
                          location: submissionStatus === "pending" ? "template_page_pending" : "template_page_sent",
                        })
                      }
                      className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                      Start Free Trial and Import
                    </Link>
                  </div>
                ) : submissionStatus === "skipped" ? (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-amber-700">
                      Template already sent recently. Check your inbox or sign up now and import your filled file.
                    </p>
                    <Link
                      to={templateSignupPath}
                      reloadDocument
                      onClick={() => trackEvent("signup_from_template_started", { location: "template_page_skipped" })}
                      className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                      Start Free Trial and Import
                    </Link>
                  </div>
                ) : (
                  <form className="space-y-3" onSubmit={onSubmit}>
                    <label htmlFor="template-email" className="text-sm font-medium text-slate-700">
                      Work email
                    </label>
                    <input
                      id="template-email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                      placeholder="you@company.com"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? "Sending..." : "Email Me the Template"}
                    </button>
                    {submitError ? <p className="text-sm text-rose-700">{submitError}</p> : null}
                    <p className="text-xs leading-relaxed text-slate-500">
                      By submitting, you agree to receive this template and practical renewal-tracking follow-up emails.
                    </p>
                  </form>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">What is inside the spreadsheet</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            The template includes pre-filled examples, formula columns for days-until-renewal, and a risk classification
            column that helps finance and ops teams prioritize action before auto-renew deadlines.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            It is a practical starting point for teams that still track renewals manually and want a cleaner workflow
            before moving to a dedicated renewal management platform.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 text-center sm:p-8">
          <p className="text-sm text-slate-600">Need more than a spreadsheet?</p>
          <p className="mt-2 text-base font-medium text-slate-900">
            Track renewals with automated reminders, team ownership, and Slack alerts.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={templateSignupPath}
              reloadDocument
              onClick={() => trackEvent("signup_from_template_started", { location: "template_page_footer" })}
              className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Start Free Trial
            </Link>
            <Link
              to="/renewal-tracking-software"
              reloadDocument
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Read Buyer Guide
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FreeTemplatePage;
