import { readFileSync } from "node:fs";
import path from "node:path";
import { articlePath, loadArticles } from "./seo-utils.mjs";

const root = process.cwd();
const sitemapPath = path.join(root, "public", "sitemap.xml");
const ssgRoutesPath = path.join(root, "src", "routes", "ssg-routes.tsx");

const sitemap = readFileSync(sitemapPath, "utf8");
const ssgRoutesSource = readFileSync(ssgRoutesPath, "utf8");
const articles = loadArticles(root);

const locMatches = [...sitemap.matchAll(/<loc>https:\/\/knowrenewals\.com([^<]*)<\/loc>/g)];
const sitemapPaths = new Set(locMatches.map((match) => match[1] || "/"));

const staticRouteMatches = [...ssgRoutesSource.matchAll(/path:\s*"([^"]+)"/g)];
const staticPaths = staticRouteMatches.map((match) => match[1]);
const articlePaths = articles.map((article) => articlePath(article));
const expectedPaths = new Set([...staticPaths, ...articlePaths]);

const missingPaths = [...expectedPaths].filter((route) => !sitemapPaths.has(route));
const extraPaths = [...sitemapPaths].filter((route) => !expectedPaths.has(route));

if (missingPaths.length || extraPaths.length) {
  if (missingPaths.length) {
    // eslint-disable-next-line no-console
    console.error(`seo: sitemap missing routes -> ${missingPaths.join(", ")}`);
  }
  if (extraPaths.length) {
    // eslint-disable-next-line no-console
    console.error(`seo: sitemap has extra routes -> ${extraPaths.join(", ")}`);
  }
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log(`seo: sitemap check passed (${expectedPaths.size} routes)`);

