import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const gitLastmodCache = new Map();

function isValidIsoDateString(value) {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function assertIsoDate(value, context) {
  if (!isIsoDateString(value)) {
    throw new Error(`Invalid ISO date (${context}): ${value}`);
  }
  return value;
}

function resolveImportPath(importPath, root = process.cwd()) {
  const basePath = importPath.startsWith("@/")
    ? path.join(root, "src", importPath.slice(2))
    : path.resolve(root, importPath);

  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    `${basePath}.js`,
    `${basePath}.mjs`,
    path.join(basePath, "index.ts"),
    path.join(basePath, "index.tsx"),
    path.join(basePath, "index.js"),
    path.join(basePath, "index.mjs"),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}

function getLatestArticleUpdateDate(articles) {
  if (!articles.length) {
    throw new Error("No articles found; cannot determine /blog lastmod");
  }

  const articleDates = articles.map((article) =>
    assertIsoDate(article.updatedAt, `article ${article.slug} updatedAt`),
  );

  return articleDates.reduce((latest, current) => (current > latest ? current : latest));
}

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

export function isIsoDateString(value) {
  return typeof value === "string" && isValidIsoDateString(value);
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
    updatedAt: assertIsoDate(article.updatedAt, `article ${article.slug} updatedAt`),
  }));
}

export function getAllIndexableRoutes(root = process.cwd()) {
  const base = loadBaseRouteMeta(root);
  const articleMeta = buildArticleRouteMeta(root);
  return [...base, ...articleMeta];
}

export function getMarketingRouteSourceFileByPath(root = process.cwd()) {
  const ssgRoutesPath = path.join(root, "src", "routes", "ssg-routes.tsx");
  const ssgRoutesSource = readFileSync(ssgRoutesPath, "utf8");

  const componentImportPathByName = new Map();
  const importMatches = ssgRoutesSource.matchAll(
    /import\s+\{\s*([^}]+)\s*\}\s+from\s+"([^"]+)";/g,
  );

  for (const match of importMatches) {
    const namesRaw = match[1];
    const sourcePath = match[2];
    if (!sourcePath.startsWith("@/pages/marketing/")) continue;

    const importNames = namesRaw
      .split(",")
      .map((name) => name.trim().replace(/^type\s+/, ""))
      .filter(Boolean);

    for (const importName of importNames) {
      componentImportPathByName.set(importName, sourcePath);
    }
  }

  const routeSourceFileByPath = new Map();
  const staticRouteMatches = ssgRoutesSource.matchAll(
    /\{\s*path:\s*"([^"]+)"\s*,\s*element:\s*<([A-Za-z0-9_]+)\s*\/>\s*\}/g,
  );

  for (const match of staticRouteMatches) {
    const routePath = match[1];
    const componentName = match[2];
    const importPath = componentImportPathByName.get(componentName);

    if (!importPath) continue;

    const resolvedSourceFile = resolveImportPath(importPath, root);
    if (!resolvedSourceFile) {
      throw new Error(
        `Could not resolve source file for route ${routePath} from import ${importPath}`,
      );
    }

    routeSourceFileByPath.set(routePath, resolvedSourceFile);
  }

  return routeSourceFileByPath;
}

export function getGitLastModifiedDateForFile(filePath, root = process.cwd()) {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(root, filePath);
  const cacheKey = `${root}::${absolutePath}`;

  if (gitLastmodCache.has(cacheKey)) {
    return gitLastmodCache.get(cacheKey);
  }

  const relativePath = path.relative(root, absolutePath).replaceAll("\\", "/");

  let output = "";
  try {
    output = execFileSync("git", ["log", "-1", "--format=%cs", "--", relativePath], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`Unable to read git lastmod for ${relativePath}: ${reason}`);
  }

  if (!output) {
    throw new Error(`No git history found for ${relativePath}; cannot determine truthful lastmod`);
  }

  const lastmod = assertIsoDate(output, `git lastmod for ${relativePath}`);
  gitLastmodCache.set(cacheKey, lastmod);
  return lastmod;
}

export function getExpectedSitemapLastmodByPath(routes, root = process.cwd()) {
  const articles = loadArticles(root);
  const latestArticleDate = getLatestArticleUpdateDate(articles);
  const articleLastmodByPath = new Map(
    articles.map((article) => [
      articlePath(article),
      assertIsoDate(article.updatedAt, `article ${article.slug} updatedAt`),
    ]),
  );
  const routeSourceFileByPath = getMarketingRouteSourceFileByPath(root);

  const lastmodByPath = new Map();

  for (const route of routes) {
    let lastmod = null;

    if (route.path.startsWith("/blog/")) {
      lastmod = articleLastmodByPath.get(route.path);
      if (!lastmod) {
        throw new Error(`Missing article metadata for blog route: ${route.path}`);
      }
    } else if (route.path === "/blog") {
      lastmod = latestArticleDate;
    } else {
      const sourceFile = routeSourceFileByPath.get(route.path);
      if (!sourceFile) {
        throw new Error(
          `Missing route source mapping for ${route.path}. Expected route in src/routes/ssg-routes.tsx`,
        );
      }
      lastmod = getGitLastModifiedDateForFile(sourceFile, root);
    }

    if (lastmodByPath.has(route.path)) {
      throw new Error(`Duplicate route path while building sitemap lastmod: ${route.path}`);
    }

    lastmodByPath.set(route.path, lastmod);
  }

  return lastmodByPath;
}
