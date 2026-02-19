import { readFileSync } from "node:fs";
import path from "node:path";
import {
  getAllIndexableRoutes,
  getExpectedSitemapLastmodByPath,
  isIsoDateString,
} from "./seo-utils.mjs";

const root = process.cwd();
const sitemapPath = path.join(root, "public", "sitemap.xml");
const sitemap = readFileSync(sitemapPath, "utf8");
const errors = [];

function routePathFromLoc(locValue) {
  let parsed;
  try {
    parsed = new URL(locValue);
  } catch {
    throw new Error(`Invalid <loc> URL: ${locValue}`);
  }

  if (parsed.origin !== "https://knowrenewals.com") {
    throw new Error(`Unexpected <loc> origin: ${locValue}`);
  }

  if (parsed.search || parsed.hash) {
    throw new Error(`Sitemap <loc> must not include query/hash: ${locValue}`);
  }

  const pathname = parsed.pathname || "/";
  if (pathname !== "/" && pathname.endsWith("/")) {
    throw new Error(`Sitemap <loc> must not include trailing slash: ${locValue}`);
  }

  return pathname;
}

if (!/^\uFEFF?\s*<\?xml version="1\.0" encoding="UTF-8"\?>/.test(sitemap)) {
  errors.push('Sitemap must begin with XML declaration: <?xml version="1.0" encoding="UTF-8"?>');
}

if (!/<urlset\s+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"\s*>/.test(sitemap)) {
  errors.push("Sitemap <urlset> must use sitemap protocol namespace");
}

if (/<changefreq>/i.test(sitemap)) {
  errors.push("Sitemap must not contain <changefreq> tags");
}

if (/<priority>/i.test(sitemap)) {
  errors.push("Sitemap must not contain <priority> tags");
}

const urlBlocks = [...sitemap.matchAll(/<url>\s*([\s\S]*?)\s*<\/url>/g)];
if (!urlBlocks.length) {
  errors.push("Sitemap contains no <url> entries");
}

const sitemapLastmodByPath = new Map();

for (const [index, match] of urlBlocks.entries()) {
  const block = match[1];
  const blockLabel = `url entry #${index + 1}`;

  const tagNames = [...block.matchAll(/<\/?([A-Za-z0-9:_-]+)>/g)].map((tagMatch) =>
    tagMatch[1].toLowerCase(),
  );
  const unexpectedTagNames = [...new Set(tagNames.filter((name) => name !== "loc" && name !== "lastmod"))];
  if (unexpectedTagNames.length) {
    errors.push(`${blockLabel} contains unsupported tags: ${unexpectedTagNames.join(", ")}`);
  }

  const locMatches = [...block.matchAll(/<loc>([^<]+)<\/loc>/g)];
  if (locMatches.length !== 1) {
    errors.push(`${blockLabel} must contain exactly one <loc> tag`);
    continue;
  }

  const lastmodMatches = [...block.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)];
  if (lastmodMatches.length !== 1) {
    errors.push(`${blockLabel} must contain exactly one <lastmod> tag`);
    continue;
  }

  const loc = locMatches[0][1].trim();
  const lastmod = lastmodMatches[0][1].trim();

  if (!isIsoDateString(lastmod)) {
    errors.push(`${blockLabel} has invalid <lastmod> date: ${lastmod}`);
  }

  try {
    const routePath = routePathFromLoc(loc);
    if (sitemapLastmodByPath.has(routePath)) {
      errors.push(`Sitemap contains duplicate route path: ${routePath}`);
      continue;
    }
    sitemapLastmodByPath.set(routePath, lastmod);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    errors.push(`${blockLabel} invalid <loc>: ${reason}`);
  }
}

const routes = getAllIndexableRoutes(root);
const expectedPaths = new Set(routes.map((route) => route.path));
const sitemapPaths = new Set(sitemapLastmodByPath.keys());

const missingPaths = [...expectedPaths].filter((routePath) => !sitemapPaths.has(routePath));
const extraPaths = [...sitemapPaths].filter((routePath) => !expectedPaths.has(routePath));

if (missingPaths.length) {
  errors.push(`Sitemap missing routes -> ${missingPaths.join(", ")}`);
}

if (extraPaths.length) {
  errors.push(`Sitemap has extra routes -> ${extraPaths.join(", ")}`);
}

const expectedLastmodByPath = getExpectedSitemapLastmodByPath(routes, root);
for (const [routePath, expectedLastmod] of expectedLastmodByPath.entries()) {
  const actualLastmod = sitemapLastmodByPath.get(routePath);
  if (!actualLastmod) continue;

  if (actualLastmod !== expectedLastmod) {
    errors.push(
      `Sitemap lastmod mismatch for ${routePath}: expected ${expectedLastmod}, found ${actualLastmod}`,
    );
  }
}

if (errors.length) {
  // eslint-disable-next-line no-console
  console.error(`seo: sitemap check failed (${errors.length} issues)`);
  for (const error of errors) {
    // eslint-disable-next-line no-console
    console.error(` - ${error}`);
  }
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log(`seo: sitemap check passed (${expectedPaths.size} routes)`);
