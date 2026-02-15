import rawArticles from "@/content/articles.json";

export type ArticleSection = {
  id: string;
  heading: string;
  content: string;
  bullets?: string[];
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type ArticleCta = {
  label: string;
  to: string;
};

export type ArticleContent = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  sections: ArticleSection[];
  faq: ArticleFaq[];
  primaryCta: ArticleCta;
  secondaryCta: ArticleCta;
};

export const articles = rawArticles as ArticleContent[];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
