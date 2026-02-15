import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { getAllIndexableRoutes, routePathToTemplateFile } from "./seo-utils.mjs";

const root = process.cwd();
const publicRedirectsPath = path.join(root, "public", "_redirects");
const redirectsJsonPath = path.join(root, "redirects.json");

if (!existsSync(publicRedirectsPath)) {
  // eslint-disable-next-line no-console
  console.error("seo: missing public/_redirects");
  process.exit(1);
}

if (!existsSync(redirectsJsonPath)) {
  // eslint-disable-next-line no-console
  console.error("seo: missing redirects.json");
  process.exit(1);
}

const expectedRewrites = new Map(
  getAllIndexableRoutes(root).map((route) => [route.path, `/${routePathToTemplateFile(route.path)}`]),
);
const expectedLandingPaths = ["/landing", "/landing/"];

function parseRedirectsFile() {
  const lines = readFileSync(publicRedirectsPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

  return lines.map((line) => {
    const [source, destination, statusRaw] = line.split(/\s+/);
    const status = statusRaw ?? "";
    const type = status.startsWith("3") ? "redirect" : "rewrite";
    return { source, destination, status, type };
  });
}

function parseRedirectsJson() {
  return JSON.parse(readFileSync(redirectsJsonPath, "utf8"));
}

function hasLandingRedirect(entries, source) {
  return entries.some(
    (entry) =>
      entry.source === source &&
      entry.destination === "/" &&
      entry.type === "redirect" &&
      (entry.status === undefined || entry.status === "" || entry.status === "301"),
  );
}

function hasRewrite(entries, source, destination) {
  return entries.some(
    (entry) => entry.source === source && entry.destination === destination && entry.type === "rewrite",
  );
}

const redirectsFileEntries = parseRedirectsFile();
const redirectsJsonEntries = parseRedirectsJson();
const errors = [];

for (const landingPath of expectedLandingPaths) {
  if (!hasLandingRedirect(redirectsFileEntries, landingPath)) {
    errors.push(`public/_redirects missing redirect ${landingPath} -> / (301)`);
  }
  if (!hasLandingRedirect(redirectsJsonEntries, landingPath)) {
    errors.push(`redirects.json missing redirect ${landingPath} -> / (redirect)`);
  }
}

for (const [routePath, htmlPath] of expectedRewrites.entries()) {
  if (!hasRewrite(redirectsFileEntries, routePath, htmlPath)) {
    errors.push(`public/_redirects missing rewrite ${routePath} -> ${htmlPath}`);
  }
  if (!hasRewrite(redirectsJsonEntries, routePath, htmlPath)) {
    errors.push(`redirects.json missing rewrite ${routePath} -> ${htmlPath}`);
  }
}

const fileFallback = redirectsFileEntries.find((entry) => entry.source === "/*");
const jsonFallback = redirectsJsonEntries.find((entry) => entry.source === "/*");

if (!fileFallback) {
  errors.push("public/_redirects missing final fallback rule");
} else if (fileFallback.destination !== "/spa.html" || fileFallback.type !== "rewrite") {
  errors.push("public/_redirects fallback must be: /* /spa.html 200");
}

if (!jsonFallback) {
  errors.push("redirects.json missing final fallback rule");
} else if (jsonFallback.destination !== "/spa.html" || jsonFallback.type !== "rewrite") {
  errors.push('redirects.json fallback must be: {"source":"/*","destination":"/spa.html","type":"rewrite"}');
}

if (fileFallback && jsonFallback && fileFallback.destination !== jsonFallback.destination) {
  errors.push(
    `fallback mismatch between files: public/_redirects -> ${fileFallback.destination}, redirects.json -> ${jsonFallback.destination}`,
  );
}

if (errors.length) {
  // eslint-disable-next-line no-console
  console.error(`seo: redirects check failed (${errors.length} issues)`);
  for (const error of errors) {
    // eslint-disable-next-line no-console
    console.error(` - ${error}`);
  }
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log(`seo: redirects check passed (${expectedRewrites.size} explicit rewrites)`);
