import baseRouteMeta from "@/seo/routeMeta.json";
import { articles } from "@/content/articles";

export type SeoSchemaType =
  | "Organization"
  | "WebSite"
  | "SoftwareApplication"
  | "FAQPage"
  | "BreadcrumbList"
  | "CollectionPage"
  | "Product"
  | "Article"
  | "WebPage";

export type SeoOgType = "website" | "article";

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: SeoOgType;
  schemaTypes: SeoSchemaType[];
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  breadcrumbName: string;
};

export const routeMeta = baseRouteMeta as RouteMeta[];

export const articleRouteMeta: RouteMeta[] = articles.map((article) => ({
  path: `/blog/${article.slug}`,
  title: article.title,
  description: article.description,
  canonical: `https://knowrenewals.com/blog/${article.slug}`,
  robots: "index, follow",
  ogType: "article",
  schemaTypes: ["BreadcrumbList", "Article"],
  priority: 0.65,
  changefreq: "monthly",
  breadcrumbName: article.title,
}));

export const allIndexableRouteMeta: RouteMeta[] = [...routeMeta, ...articleRouteMeta];

export const routeMetaByPath = new Map(allIndexableRouteMeta.map((meta) => [meta.path, meta]));

export function getRouteMeta(path: string) {
  return routeMetaByPath.get(path);
}
