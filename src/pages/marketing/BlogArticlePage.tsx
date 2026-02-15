import { Link } from "react-router-dom";
import type { ArticleContent } from "@/content/articles";
import { SeoPageLayout } from "@/pages/marketing/SeoPageLayout";

type BlogArticlePageProps = {
  article: ArticleContent;
};

export function BlogArticlePage({ article }: BlogArticlePageProps) {
  return (
    <SeoPageLayout title={article.title} description={article.description}>
      <section>
        <p className="text-sm leading-relaxed text-slate-600">{article.summary}</p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Table of contents</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {article.sections.map((section) => (
            <li key={section.id}>
              <a className="text-emerald-700 hover:text-emerald-800" href={`#${section.id}`}>
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {article.sections.map((section) => (
        <section key={section.id} id={section.id} className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{section.heading}</h2>
          <p className="text-sm leading-relaxed text-slate-600">{section.content}</p>
          {section.bullets?.length ? (
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Frequently asked questions</h2>
        {article.faq.map((item) => (
          <article key={item.question}>
            <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Next steps</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="text-emerald-700 hover:text-emerald-800" to={article.primaryCta.to}>
            {article.primaryCta.label}
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to={article.secondaryCta.to}>
            {article.secondaryCta.label}
          </Link>
          <Link className="text-emerald-700 hover:text-emerald-800" to="/renewal-tracking-software">
            Renewal tracking software guide
          </Link>
        </div>
      </section>
    </SeoPageLayout>
  );
}

export default BlogArticlePage;
