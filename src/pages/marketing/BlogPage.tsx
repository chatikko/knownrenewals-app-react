import { Link } from "react-router-dom";
import { articles } from "@/content/articles";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

export function BlogPage() {
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
