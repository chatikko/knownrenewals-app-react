import { writeFileSync } from "node:fs";
import path from "node:path";
import { getAllIndexableRoutes, routePathToTemplateFile } from "./seo-utils.mjs";

const root = process.cwd();
const publicRedirectsPath = path.join(root, "public", "_redirects");
const redirectsJsonPath = path.join(root, "redirects.json");

const routes = getAllIndexableRoutes(root);

const explicitRewrites = routes.map((route) => ({
  source: route.path,
  destination: `/${routePathToTemplateFile(route.path)}`,
  type: "rewrite",
}));

const permanentRedirects = [
  { source: "/landing", destination: "/", type: "redirect" },
  { source: "/landing/", destination: "/", type: "redirect" },
  {
    source: "/pricing",
    destination: "/renewal-tracking-software-pricing",
    type: "redirect",
  },
  {
    source: "/pricing/",
    destination: "/renewal-tracking-software-pricing",
    type: "redirect",
  },
];

const redirectRules = [
  ...permanentRedirects,
  ...explicitRewrites,
  { source: "/*", destination: "/spa.html", type: "rewrite" },
];

const netlifyLines = [
  ...permanentRedirects.map((rule) => `${rule.source} ${rule.destination} 301`),
  ...explicitRewrites.map((rule) => `${rule.source} ${rule.destination} 200`),
  "/* /spa.html 200",
];

writeFileSync(publicRedirectsPath, `${netlifyLines.join("\n")}\n`, "utf8");
writeFileSync(redirectsJsonPath, `${JSON.stringify(redirectRules, null, 2)}\n`, "utf8");

// eslint-disable-next-line no-console
console.log(`seo: synced redirects (${explicitRewrites.length} explicit rewrites)`);
