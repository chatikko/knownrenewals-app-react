import { Link } from "react-router-dom";
import { blogIdeas } from "@/pages/marketing/blogIdeas";
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
          These topics align with informational search intent and support teams moving from manual tracking to an
          automated renewal management platform.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {blogIdeas.map((idea) => (
          <article key={idea.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-semibold text-slate-900">{idea.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{idea.summary}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Compare and choose the right tool</h2>
        <p className="mt-2 text-sm text-slate-600">
          If you are evaluating alternatives, start with our commercial-intent resources.
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
