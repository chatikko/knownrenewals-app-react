import { Link } from "react-router-dom";
import { articles } from "@/content/articles";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

const slackArticleSlugs = new Set([
  "how-to-send-renewal-reminders-to-slack",
  "how-to-use-slack-for-contract-renewal-workflows",
  "daily-slack-digest-for-renewal-teams",
  "best-slack-channel-setup-for-renewal-alerts",
  "reduce-missed-renewals-with-slack-alerts",
]);

export function BlogPage() {
  const slackArticles = articles.filter((article) => slackArticleSlugs.has(article.slug));

  return (
    <SeoPageLayout
      title="Renewal Management Blog for Startups and SMB Teams"
      description="Actionable guides for subscription renewal tracking, SaaS renewal management, contract reminders, and renewal operations."
    >
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Long-tail guides</h2>
        <p className="text-sm text-slate-600">
          These topics help teams move from manual tracking to an automated renewal management platform.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Slack renewal alerts guides</h2>
        <p className="mt-2 text-sm text-slate-600">
          Use this series to launch channel-based renewal workflows for finance, operations, and procurement teams.
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link className="text-emerald-700 hover:text-emerald-800" to="/slack-renewal-alerts">
            Slack renewal alerts overview
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/slack-alerts-vs-email-reminders">
            Slack vs email reminders
          </Link>
        </div>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {slackArticles.map((article) => (
            <li key={article.slug}>
              <Link className="text-emerald-700 hover:text-emerald-800" to={`/blog/${article.slug}`}>
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <article key={article.slug} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-semibold text-slate-900">
              <Link className="hover:text-emerald-700" to={`/blog/${article.slug}`}>
                {article.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-slate-600">{article.summary}</p>
            <div className="mt-3 text-sm">
              <Link className="text-emerald-700 hover:text-emerald-800" to={`/blog/${article.slug}`}>
                Read article
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Compare and choose the right tool</h2>
        <p className="mt-2 text-sm text-slate-600">
          If you are evaluating alternatives, start with these comparison resources.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link className="text-emerald-700 hover:text-emerald-800" to="/excel-vs-renewal-tracking-software">
            Excel vs renewal tracking software
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software-pricing">
            Renewal tracking software pricing
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software">
            Renewal tracking software guide
          </Link>
        </div>
      </section>
    </SeoPageLayout>
  );
}

export default BlogPage;
