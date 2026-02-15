import { readFileSync } from "node:fs";
import path from "node:path";

export function loadBaseRouteMeta(root = process.cwd()) {
  const filePath = path.join(root, "src", "seo", "routeMeta.json");
  return JSON.parse(readFileSync(filePath, "utf8"));
}

export function loadArticles(root = process.cwd()) {
  const filePath = path.join(root, "src", "content", "articles.json");
  return JSON.parse(readFileSync(filePath, "utf8"));
}

export function articlePath(article) {
  return `/blog/${article.slug}`;
}

export function routePathToTemplateFile(routePath) {
  if (routePath === "/") return "index.html";
  return `${routePath.replace(/^\/+/, "").replace(/\//g, "-")}.html`;
}

export function buildArticleRouteMeta(root = process.cwd()) {
  const articles = loadArticles(root);
  return articles.map((article) => ({
    path: articlePath(article),
    title: article.title,
    description: article.description,
    canonical: `https://knowrenewals.com${articlePath(article)}`,
    robots: "index, follow",
    ogType: "article",
    schemaTypes: ["BreadcrumbList", "Article"],
    priority: 0.65,
    changefreq: "monthly",
    breadcrumbName: article.title,
    updatedAt: article.updatedAt,
  }));
}

export function getAllIndexableRoutes(root = process.cwd()) {
  const base = loadBaseRouteMeta(root);
  const articleMeta = buildArticleRouteMeta(root);
  return [...base, ...articleMeta];
}
